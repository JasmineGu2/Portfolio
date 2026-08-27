import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import {
  deviceFromUserAgent,
  hashVisitor,
  isBot,
  isIgnoredPath,
  recordEvent,
  utmFromSearch,
} from '@/lib/analytics/events'

/**
 * Server-side visit tracking.
 *
 * This is the layer that survives ad blockers: it runs before any client script,
 * so a visitor who blocks `/_vercel/insights` is still counted here. It only ever
 * observes, the response is passed straight through, and the logging is handed to
 * `event.waitUntil` so it never adds latency to the page.
 */
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname, searchParams } = request.nextUrl
  const userAgent = request.headers.get('user-agent')

  if (isIgnoredPath(pathname) || isBot(userAgent)) {
    return NextResponse.next()
  }

  event.waitUntil(
    hashVisitor(request.ip ?? request.headers.get('x-forwarded-for')).then((visitor) =>
      recordEvent({
        name: 'pageview_server',
        path: pathname,
        at: new Date().toISOString(),
        visitor,
        referrer: request.headers.get('referer') ?? undefined,
        country: request.geo?.country,
        region: request.geo?.region,
        city: request.geo?.city,
        utm: utmFromSearch(searchParams),
        userAgent: userAgent ?? undefined,
        device: deviceFromUserAgent(userAgent),
      })
    )
  )

  return NextResponse.next()
}

export const config = {
  /*
   * Run on page requests only. Excluding the asset and infrastructure paths here
   * as well as in `isIgnoredPath` keeps the middleware from being invoked at all
   * for them, which matters because middleware invocations are metered.
   */
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|icons|images|fonts|robots.txt|sitemap.xml).*)',
  ],
}
