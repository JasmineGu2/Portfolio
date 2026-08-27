/**
 * Analytics event capture and sinks.
 *
 * Why this exists alongside Vercel Web Analytics: Vercel's client script can be
 * blocked (uBlock and friends carry rules for `/_vercel/insights`), custom events
 * are a paid-plan feature, and Hobby-tier runtime logs are short-lived. So visits
 * are captured in two independent places:
 *
 *   1. `middleware.ts`, server-side, before any JS runs. Cannot be ad-blocked.
 *   2. `app/api/track/route.ts`, a first-party beacon on our own domain, which
 *      adds what the server can't see (screen size, timezone, engagement time)
 *      and proves a real browser executed JS.
 *
 * Both funnel through `recordEvent` so the destination is one edit, not three.
 */

export type AnalyticsEventName =
  | 'pageview_server'
  | 'pageview_client'
  | 'engagement'
  | 'outbound_click'

export interface AnalyticsEvent {
  name: AnalyticsEventName
  path: string
  at: string
  /** Salted hash of the client IP. Never the IP itself, see `hashVisitor`. */
  visitor?: string
  referrer?: string
  country?: string
  region?: string
  city?: string
  /** Marketing params, when someone arrives from a tagged link. */
  utm?: Record<string, string>
  userAgent?: string
  device?: string
  /** Seconds of foreground time on the page, on `engagement` events. */
  seconds?: number
  screen?: string
  timezone?: string
  href?: string
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|monitor|preview|scan|curl|wget|python-requests|node-fetch|axios|vercel-screenshot/i

export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true
  return BOT_PATTERN.test(userAgent)
}

/**
 * Infrastructure and asset paths that shouldn't count as a visit. Real pages,
 * including the `/work/*` routes that redirect to a case study, are not listed.
 */
const IGNORED_PREFIX = /^\/(api|_next|_vercel|favicon|icons|images|fonts|robots|sitemap)/
const ASSET_EXTENSION = /\.(png|jpe?g|gif|svg|webp|avif|ico|css|js|map|woff2?|ttf|mp4|webm|pdf|txt|xml|json)$/i

export function isIgnoredPath(pathname: string): boolean {
  return IGNORED_PREFIX.test(pathname) || ASSET_EXTENSION.test(pathname)
}

/**
 * Salted SHA-256 of the IP, truncated. Enough to count unique visitors and dedupe
 * repeat loads without storing anything that identifies a person. Set
 * `ANALYTICS_SALT` so the hashes aren't reproducible from the source alone.
 */
export async function hashVisitor(ip: string | null | undefined): Promise<string | undefined> {
  if (!ip) return undefined
  const salt = process.env.ANALYTICS_SALT ?? 'portfolio-default-salt'
  const data = new TextEncoder().encode(`${salt}:${ip}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .slice(0, 8)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function deviceFromUserAgent(userAgent: string | null | undefined): string | undefined {
  if (!userAgent) return undefined
  if (/iPad|Tablet/i.test(userAgent)) return 'tablet'
  if (/Mobi|Android|iPhone/i.test(userAgent)) return 'mobile'
  return 'desktop'
}

export function utmFromSearch(search: URLSearchParams): Record<string, string> | undefined {
  const utm: Record<string, string> = {}
  for (const [key, value] of search.entries()) {
    if (key.startsWith('utm_') || key === 'ref' || key === 'source') utm[key] = value
  }
  return Object.keys(utm).length > 0 ? utm : undefined
}

/**
 * Fan an event out to every configured sink.
 *
 * - Structured console line: always on, readable in Vercel runtime logs.
 * - `ANALYTICS_WEBHOOK_URL`: any JSON endpoint. A Discord or Slack incoming
 *   webhook here turns this into a live "someone opened your site" ping.
 * - `NEXT_PUBLIC_POSTHOG_KEY`: durable storage and per-visitor history.
 *
 * Never throws and never blocks the response, analytics must not be able to
 * break a page load.
 */
export async function recordEvent(event: AnalyticsEvent): Promise<void> {
  try {
    console.log(`[analytics] ${JSON.stringify(event)}`)

    await Promise.all([sendToWebhook(event), sendToPostHog(event)])
  } catch (error) {
    console.error('[analytics] sink failed', error)
  }
}

async function sendToWebhook(event: AnalyticsEvent): Promise<void> {
  const url = process.env.ANALYTICS_WEBHOOK_URL
  if (!url) return

  // Discord and Slack both reject unknown top-level keys, so send a `content`
  // string they can render and the raw event alongside it for everyone else.
  const summary = [
    event.name === 'engagement'
      ? `📖 ${event.seconds}s on ${event.path}`
      : `👀 ${event.path}`,
    event.country ? `· ${[event.city, event.country].filter(Boolean).join(', ')}` : '',
    event.referrer ? `· from ${event.referrer}` : '',
    event.device ? `· ${event.device}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content: summary, text: summary, event }),
  })
}

async function sendToPostHog(event: AnalyticsEvent): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'
  const { name, visitor, ...properties } = event

  await fetch(`${host}/capture/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      api_key: key,
      event: name,
      distinct_id: visitor ?? 'anonymous',
      properties: { ...properties, $current_url: event.href ?? event.path },
      timestamp: event.at,
    }),
  })
}
