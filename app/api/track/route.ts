import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  deviceFromUserAgent,
  hashVisitor,
  isBot,
  recordEvent,
  type AnalyticsEvent,
  type AnalyticsEventName,
} from '@/lib/analytics/events'

export const runtime = 'edge'

const ALLOWED_EVENTS: AnalyticsEventName[] = ['pageview_client', 'engagement', 'outbound_click']

/**
 * First-party analytics beacon.
 *
 * Served from our own domain, so blocklists that target third-party analytics
 * hosts don't match it. It records what the server-side middleware can't observe:
 * that a real browser executed JavaScript, the viewport and timezone, how long
 * someone actually stayed, and which outbound links they took.
 */
export async function POST(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')
  if (isBot(userAgent)) {
    return new NextResponse(null, { status: 204 })
  }

  let payload: Partial<AnalyticsEvent>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  // Only accept the event names this endpoint owns, and clamp the fields the
  // client controls, this route is public, so treat its input as untrusted.
  if (!payload.name || !ALLOWED_EVENTS.includes(payload.name)) {
    return NextResponse.json({ error: 'unknown event' }, { status: 400 })
  }

  const visitor = await hashVisitor(request.ip ?? request.headers.get('x-forwarded-for'))

  await recordEvent({
    name: payload.name,
    path: typeof payload.path === 'string' ? payload.path.slice(0, 512) : '/',
    at: new Date().toISOString(),
    visitor,
    referrer: typeof payload.referrer === 'string' ? payload.referrer.slice(0, 512) : undefined,
    country: request.geo?.country,
    region: request.geo?.region,
    city: request.geo?.city,
    userAgent: userAgent ?? undefined,
    device: deviceFromUserAgent(userAgent),
    seconds:
      typeof payload.seconds === 'number' && Number.isFinite(payload.seconds)
        ? Math.min(Math.round(payload.seconds), 60 * 60)
        : undefined,
    screen: typeof payload.screen === 'string' ? payload.screen.slice(0, 32) : undefined,
    timezone: typeof payload.timezone === 'string' ? payload.timezone.slice(0, 64) : undefined,
    href: typeof payload.href === 'string' ? payload.href.slice(0, 512) : undefined,
  })

  return new NextResponse(null, { status: 204 })
}
