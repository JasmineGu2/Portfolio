'use client'

import { useEffect } from 'react'

/** Set on <html> while videos are paused, and remembered between visits by the footer's Pause videos control. */
export const VIDEOS_KEY = 'pf-videos'
export const VIDEOS_EVENT = 'pf-videos-change'

// Tells the home/about scripts in public/mocks (k2.js `K.videos`) to leave their tile videos to this component, so only one system plays them.
if (typeof window !== 'undefined') (window as Window & { pfVideoAutoplay?: boolean }).pfVideoAutoplay = true

/**
 * Makes every muted, looping `<video autoplay>` on the site behave: it plays on phones, loads only when it is about to
 * scroll into view, pauses when it leaves, and can be paused by the visitor.
 *
 * - Mobile browsers only autoplay a video that is muted, inline, and (on iOS) has the `muted` attribute in the markup
 *   itself, and they pause videos that scroll out of view. This sets those properties on every video (including ones
 *   added later, like a new tab's tiles), plays a video when it comes into view, pauses it when it leaves, and retries
 *   once on the first touch for browsers that hold autoplay back until then (battery-saver modes).
 * - A video with `data-src` has no `src` in the markup: its file is only fetched when it is within 300px of the screen,
 *   so a page with many videos does not start every download on load.
 * - Motion is optional: visitors who ask their system for reduced motion start with the videos paused on their first
 *   frame, and the footer's "Pause videos" control (which sets `data-videos="paused"` on <html>) works for everyone.
 *
 * It also marks <html data-has-videos> while the page has an autoplay video, so the footer control only shows up then.
 * Renders nothing.
 */
export function VideoAutoplay() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let saved: string | null = null
    try {
      saved = localStorage.getItem(VIDEOS_KEY)
    } catch {}
    // her choice wins; with none, someone who asked for reduced motion starts paused
    if (saved === 'paused' || (saved === null && reduced.matches)) root.dataset.videos = 'paused'
    const paused = () => root.dataset.videos === 'paused'

    const inView = (video: HTMLVideoElement) => {
      const r = video.getBoundingClientRect()
      return r.bottom > -120 && r.top < window.innerHeight + 120
    }
    const load = (video: HTMLVideoElement) => {
      const src = video.dataset.src
      if (src && !video.getAttribute('src')) {
        video.preload = 'auto'
        video.src = src
        video.load()
      }
    }
    const play = (video: HTMLVideoElement) => {
      load(video)
      if (!paused()) void video.play().catch(() => {})
    }

    const seen = new WeakSet<HTMLVideoElement>()
    // a video is fetched when it is within 300px of the screen, and plays only when it is within 120px
    const ioLoad = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) load(entry.target as HTMLVideoElement)
      },
      { rootMargin: '300px 0px' },
    )
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) play(video)
          else video.pause()
        }
      },
      { rootMargin: '120px 0px' },
    )

    const prepare = (video: HTMLVideoElement) => {
      if (seen.has(video) || video.controls || !video.autoplay) return
      seen.add(video)
      video.muted = true
      video.defaultMuted = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.playsInline = true
      video.disablePictureInPicture = true
      io.observe(video)
      ioLoad.observe(video)
    }
    const scan = () => {
      const all = document.querySelectorAll('video')
      all.forEach(prepare)
      root.dataset.hasVideos = document.querySelector('video[autoplay]') ? 'true' : 'false'
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    // the `autoplay` attribute starts a video the moment it has data, even when she has paused: stop it on its first frame
    const holdWhenPaused = (e: Event) => {
      const video = e.target
      if (video instanceof HTMLVideoElement && video.autoplay && paused()) video.pause()
    }
    document.addEventListener('play', holdWhenPaused, true)

    const onChange = () => {
      document.querySelectorAll('video').forEach((video) => {
        if (!video.autoplay) return
        if (paused()) video.pause()
        else if (inView(video)) play(video)
      })
    }
    window.addEventListener(VIDEOS_EVENT, onChange)

    const retry = () =>
      document.querySelectorAll('video').forEach((video) => {
        if (video.autoplay && video.paused && !paused() && inView(video)) play(video)
      })
    window.addEventListener('touchstart', retry, { once: true, passive: true })
    window.addEventListener('pointerdown', retry, { once: true })
    document.addEventListener('visibilitychange', retry)

    return () => {
      io.disconnect()
      ioLoad.disconnect()
      mo.disconnect()
      document.removeEventListener('play', holdWhenPaused, true)
      window.removeEventListener(VIDEOS_EVENT, onChange)
      window.removeEventListener('touchstart', retry)
      window.removeEventListener('pointerdown', retry)
      document.removeEventListener('visibilitychange', retry)
    }
  }, [])

  return null
}
