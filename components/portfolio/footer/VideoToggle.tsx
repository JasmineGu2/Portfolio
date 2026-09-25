'use client'

import { useEffect, useState } from 'react'
import { VIDEOS_EVENT, VIDEOS_KEY } from '@/components/portfolio/VideoAutoplay'

/**
 * "Pause videos" / "Play videos" in the footer: the way to stop the autoplaying tiles (WCAG 2.2.2). It only shows on a
 * page that has an autoplay video (VideoAutoplay marks <html data-has-videos>; see `.pf-foot__motion`), and the choice
 * is remembered between visits.
 */
export function VideoToggle() {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const read = () => setPaused(document.documentElement.dataset.videos === 'paused')
    read()
    window.addEventListener(VIDEOS_EVENT, read)
    return () => window.removeEventListener(VIDEOS_EVENT, read)
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = root.dataset.videos !== 'paused'
    if (next) root.dataset.videos = 'paused'
    else delete root.dataset.videos
    try {
      localStorage.setItem(VIDEOS_KEY, next ? 'paused' : 'playing')
    } catch {}
    window.dispatchEvent(new Event(VIDEOS_EVENT))
  }

  return (
    <button type="button" className="pf-foot__motion" onClick={toggle}>
      {paused ? 'Play videos' : 'Pause videos'}
    </button>
  )
}
