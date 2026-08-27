'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/motion'
import { DEFAULT_FLOWERS_BACKGROUND_CONFIG } from '@/components/visuals/FlowersBackground/FlowersBackground'
import './flowers-loader.css'

/** Block size (CSS px) at the very start, 1 means the video draws at native resolution. */
const START_PIXEL = 1
/**
 * How many wallpaper cells wide a loader block ends up. Whole numbers only, the loader
 * blocks stay aligned to the background's grid, so the handoff still lands on the same
 * lattice, just one step coarser than the wallpaper itself.
 */
const END_PIXEL_CELLS = 2
/**
 * Block size at the end, a multiple of the wallpaper's own dot grid, so the loader stops
 * pixelating on the same lattice as the background it hands off to.
 */
const END_PIXEL = DEFAULT_FLOWERS_BACKGROUND_CONFIG.cellSize * END_PIXEL_CELLS
/** At or below this the buffer round-trip is pointless, so draw the video straight to the canvas. */
const CRISP_THRESHOLD = 1.5
/** Floor on how long the loader stays up, so the resolve actually reads as an animation. */
const MIN_DURATION_MS = 1900
/** Hard ceiling, dismiss no matter what the video or the page are doing. */
const MAX_DURATION_MS = 5000
/** Progress creeps to this while the page is still loading, then releases to 1. */
const PENDING_CAP = 0.82
/** How long to hold at the cap waiting for the first decodable video frame before giving up on it. */
const VIDEO_WAIT_MS = 3000
const EXIT_FADE_MS = 700
const MAX_DPR = 1.5
const CAPTURE_TIME = 1.5

/** Ease-in, holds the frame crisp early, then blocks up over the back half of the run. */
function easeIn(t: number) {
  return t * t
}

/**
 * Full-screen launch animation: the flowers wallpaper video plays at full resolution
 * and progressively pixelates as the page finishes loading, settling at the same grid
 * the wallpaper uses before fading out to reveal the site underneath.
 */
export function FlowersLoader() {
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  // Lock scroll while the overlay is up.
  useEffect(() => {
    if (done) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [done])

  useEffect(() => {
    if (done) return
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const buffer = document.createElement('canvas')
    const bufferCtx = buffer.getContext('2d')
    if (!bufferCtx) return

    let running = true
    let frame: number | null = null
    let width = 0
    let height = 0
    let dpr = 1
    let progress = 0
    let pageReady = document.readyState === 'complete'
    let exitStarted = false
    const start = performance.now()

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.imageSmoothingEnabled = false
    }

    const onReady = () => {
      pageReady = true
    }
    if (!pageReady) window.addEventListener('load', onReady)

    const beginExit = () => {
      if (exitStarted) return
      exitStarted = true
      setExiting(true)
      window.setTimeout(() => setDone(true), EXIT_FADE_MS)
    }

    const drawPixelated = (pixelSize: number) => {
      // Cream base, so any transparent gap or a stalled video still reads as the site.
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = '#fbf3e6'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const vw = video.videoWidth
      const vh = video.videoHeight
      if (video.readyState < 2 || !vw || !vh) return

      // Cover-fit crop of the source frame.
      const scale = Math.max(width / vw, height / vh)
      const sw = width / scale
      const sh = height / scale
      const sx = (vw - sw) / 2
      const sy = (vh - sh) / 2

      if (pixelSize <= CRISP_THRESHOLD) {
        ctx.imageSmoothingEnabled = true
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
        return
      }

      const cols = Math.max(1, Math.ceil(width / pixelSize))
      const rows = Math.max(1, Math.ceil(height / pixelSize))
      if (buffer.width !== cols || buffer.height !== rows) {
        buffer.width = cols
        buffer.height = rows
      }

      bufferCtx.imageSmoothingEnabled = true
      bufferCtx.drawImage(video, sx, sy, sw, sh, 0, 0, cols, rows)

      ctx.imageSmoothingEnabled = false
      ctx.drawImage(buffer, 0, 0, cols, rows, 0, 0, canvas.width, canvas.height)
    }

    const paintProgress = (value: number) => {
      const pct = Math.min(100, Math.round(value * 100))
      if (barRef.current) barRef.current.style.width = `${pct}%`
      if (countRef.current) countRef.current.textContent = `${String(pct).padStart(3, '0')}%`
    }

    const loop = (now: number) => {
      if (!running) return
      const elapsed = now - start

      // Hold at the cap until there's an actual frame to pixelate, otherwise a cold
      // cache would fade a blank cream screen in and out.
      const hasFrame = video.readyState >= 2
      const canRelease = pageReady && (hasFrame || elapsed >= VIDEO_WAIT_MS)
      const ramp = Math.min(1, elapsed / MIN_DURATION_MS)
      const target = Math.min(ramp, canRelease ? 1 : PENDING_CAP)
      progress += (target - progress) * 0.12
      if (elapsed >= MAX_DURATION_MS) progress = 1

      const eased = easeIn(Math.min(1, progress))
      const pixelSize = START_PIXEL * Math.pow(END_PIXEL / START_PIXEL, eased)

      drawPixelated(reducedMotion ? START_PIXEL : pixelSize)
      paintProgress(progress)

      if (progress >= 0.995 || elapsed >= MAX_DURATION_MS) {
        paintProgress(1)
        beginExit()
        return
      }
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reducedMotion) {
      // No playback, no pixelate ramp, a single crisp frozen frame, dismissed promptly.
      video.addEventListener('loadeddata', () => drawPixelated(START_PIXEL), { once: true })
      const onMeta = () => {
        video.currentTime = Math.min(CAPTURE_TIME, Math.max(0, video.duration - 0.1))
      }
      video.addEventListener('loadedmetadata', onMeta, { once: true })
      if (video.readyState >= 1) onMeta()
    } else {
      void video.play().catch(() => {
        // Autoplay blocked, fall back to a frozen frame; the pixelate ramp still runs.
        video.currentTime = CAPTURE_TIME
      })
    }

    frame = requestAnimationFrame(loop)

    return () => {
      running = false
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('load', onReady)
    }
  }, [done, reducedMotion])

  if (done) return null

  return (
    <div
      className={`flowers-loader${exiting ? ' flowers-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <video
        ref={videoRef}
        className="flowers-loader__video"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/videos/flowers-background.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="flowers-loader__canvas" aria-hidden />
      <div className="flowers-loader__veil" aria-hidden />
      <div className="flowers-loader__content">
        <span className="flowers-loader__name">Jasmine Gu</span>
        <div className="flowers-loader__bar">
          <div ref={barRef} className="flowers-loader__bar-fill" />
        </div>
        <span ref={countRef} className="flowers-loader__count">
          000%
        </span>
      </div>
    </div>
  )
}
