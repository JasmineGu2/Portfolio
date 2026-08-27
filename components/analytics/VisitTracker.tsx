'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const ENDPOINT = '/api/track'

function send(body: Record<string, unknown>, useBeacon = false) {
  const payload = JSON.stringify(body)

  // `sendBeacon` is the only thing that reliably survives a page being closed,
  // which is exactly when the engagement event fires.
  if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }))
    return
  }

  void fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Analytics failing is never worth surfacing to a visitor.
  })
}

/**
 * Client half of the tracking setup.
 *
 * The middleware already counts the visit server-side, so this deliberately only
 * reports what a server can't see: that JS actually ran, the viewport, the
 * visitor's timezone, how long they stayed on each page, and outbound clicks.
 */
export function VisitTracker() {
  const pathname = usePathname()
  const enteredAt = useRef(Date.now())
  const foregroundMs = useRef(0)

  // Pageview, once per route change.
  useEffect(() => {
    enteredAt.current = Date.now()
    foregroundMs.current = 0

    send({
      name: 'pageview_client',
      path: pathname,
      href: window.location.href,
      referrer: document.referrer || undefined,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  }, [pathname])

  // Engagement time, accumulated only while the tab is actually visible so a
  // forgotten background tab doesn't read as an hour of deep reading.
  useEffect(() => {
    let visibleSince = document.visibilityState === 'visible' ? Date.now() : null

    function accumulate() {
      if (visibleSince !== null) {
        foregroundMs.current += Date.now() - visibleSince
        visibleSince = null
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        visibleSince = Date.now()
        return
      }
      accumulate()
      flush(true)
    }

    function flush(useBeacon: boolean) {
      const seconds = Math.round(foregroundMs.current / 1000)
      if (seconds < 3) return
      send({ name: 'engagement', path: pathname, seconds }, useBeacon)
      foregroundMs.current = 0
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', () => {
      accumulate()
      flush(true)
    })

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      accumulate()
      flush(false)
    }
  }, [pathname])

  // Outbound clicks, résumé, LinkedIn, email. Worth knowing which one a visitor
  // leaves through, and no server-side layer can observe it.
  useEffect(() => {
    function onClick(clickEvent: MouseEvent) {
      const anchor = (clickEvent.target as HTMLElement | null)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const isExternal =
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.endsWith('.pdf') ||
        (href.startsWith('http') && !href.includes(window.location.host))

      if (isExternal) {
        send({ name: 'outbound_click', path: pathname, href }, true)
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [pathname])

  return null
}
