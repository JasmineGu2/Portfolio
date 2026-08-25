'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import './flowers-background.css'

export type InteractionMode = 'repel' | 'attract' | 'ripple' | 'grow'

export type FlowersBackgroundConfig = {
  /** Grid cell size in px — smaller = more granular. */
  cellSize: number
  /** Bubble diameter as a fraction of the cell. */
  bubbleScale: number
  /** Max random per-cell jitter (px) so the grid isn't perfectly rigid. */
  jitter: number
  /** Screen-blend amount (0–1) that lifts shadows so the field reads brighter. */
  brighten: number
  /** Fraction of cells (0–1) rendered as an ASCII glyph instead of a plain dot. */
  asciiChance: number
  /** Opacity (0–1) of the whole dot/ASCII overlay — lower lets the raw frame read through more. */
  overlayOpacity: number
  /** Gaussian blur (px) applied to the overlay — softens the grid so it doesn't read as blocky. */
  blurPx: number
  /** Seconds into the source video to freeze as the static frame. */
  captureTime: number
  /** How the field reacts to the cursor. */
  interactionMode: InteractionMode
  /** Radius (px) around the cursor within which dots react. */
  interactRadius: number
  /** Max push/pull distance (px), or radius growth amount for 'grow'. */
  interactStrength: number
  /** Spring easing (0–1 per frame) for dots moving to/from their reacted state. */
  interactEase: number
  /** 'ripple' only: spatial wavelength of the ring pattern. */
  rippleFrequency: number
  /** 'ripple' only: how fast the rings travel outward. */
  rippleSpeed: number
  /** Max px of ambient per-cell drift, independent of the cursor. Keep tiny for a barely-there breathing effect. */
  idleDriftAmount: number
  /** Angular speed (radians/sec) of the ambient drift. Small = slow. */
  idleDriftSpeed: number
}

export const DEFAULT_FLOWERS_BACKGROUND_CONFIG: FlowersBackgroundConfig = {
  cellSize: 8,
  bubbleScale: 0.98,
  jitter: 0.6,
  brighten: 0.15,
  asciiChance: 0.04,
  blurPx: 2.5,
  overlayOpacity: 0.72,
  captureTime: 1.5,
  interactionMode: 'grow',
  interactRadius: 130,
  interactStrength: 9,
  interactEase: 0.18,
  rippleFrequency: 0.05,
  rippleSpeed: 4,
  idleDriftAmount: 0.45,
  idleDriftSpeed: 0.35,
}

const MAX_DPR = 1.5
const RENDER_FPS = 30
const ASCII_RAMP = ' .:-=+*#%@'
const ASCII_FONT_FAMILY = "'JetBrains Mono', ui-monospace, monospace"
/** Caps how close a brightened channel can get to pure white, so highlight dots don't blow out and read as more opaque than the rest. */
const MAX_CHANNEL = 188

function brighten(channel: number, amount: number) {
  return Math.min(MAX_CHANNEL, channel + (255 - channel) * amount)
}

type FlowersBackgroundProps = {
  dark?: boolean
  className?: string
  config?: Partial<FlowersBackgroundConfig>
  /** When false, fills its own positioned container instead of the whole viewport. Default true. */
  fixed?: boolean
}

export function FlowersBackground({
  dark = false,
  className,
  config,
  fixed = true,
}: FlowersBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const {
    cellSize: CELL_SIZE,
    bubbleScale: BUBBLE_SCALE,
    jitter: JITTER,
    brighten: BRIGHTEN,
    asciiChance: ASCII_CHANCE,
    overlayOpacity: OVERLAY_OPACITY,
    blurPx: BLUR_PX,
    captureTime: CAPTURE_TIME,
    interactionMode: INTERACTION_MODE,
    interactRadius: INTERACT_RADIUS,
    interactStrength: INTERACT_STRENGTH,
    interactEase: INTERACT_EASE,
    rippleFrequency: RIPPLE_FREQUENCY,
    rippleSpeed: RIPPLE_SPEED,
    idleDriftAmount: IDLE_DRIFT_AMOUNT,
    idleDriftSpeed: IDLE_DRIFT_SPEED,
  } = { ...DEFAULT_FLOWERS_BACKGROUND_CONFIG, ...config }

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!video || !canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sampleCanvas = document.createElement('canvas')
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true })
    if (!sampleCtx) return
    sampleCtx.imageSmoothingEnabled = true
    sampleCtx.imageSmoothingQuality = 'high'

    let running = true
    let cols = 0
    let rows = 0
    let cellW = 0
    let cellH = 0
    let radius = 0
    let isAscii: Uint8Array = new Uint8Array(0)
    let baseX: Float32Array = new Float32Array(0)
    let baseY: Float32Array = new Float32Array(0)
    let curDX: Float32Array = new Float32Array(0)
    let curDY: Float32Array = new Float32Array(0)
    let curScale: Float32Array = new Float32Array(0)
    let phaseX: Float32Array = new Float32Array(0)
    let phaseY: Float32Array = new Float32Array(0)
    let cellColor: string[] = []
    let cellChar: string[] = []

    const pointer = { x: -9999, y: -9999, active: false }

    const buildGrid = () => {
      if (video.readyState < 2) return

      const width = container.clientWidth
      const height = container.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${Math.round(CELL_SIZE * 1.35)}px ${ASCII_FONT_FAMILY}`

      cols = Math.ceil(width / CELL_SIZE)
      rows = Math.ceil(height / CELL_SIZE)
      cellW = width / cols
      cellH = height / rows
      radius = Math.min(cellW, cellH) * 0.5 * BUBBLE_SCALE
      sampleCanvas.width = cols
      sampleCanvas.height = rows

      sampleCtx.drawImage(video, 0, 0, cols, rows)
      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data

      const cellCount = cols * rows
      isAscii = new Uint8Array(cellCount)
      baseX = new Float32Array(cellCount)
      baseY = new Float32Array(cellCount)
      curDX = new Float32Array(cellCount)
      curDY = new Float32Array(cellCount)
      curScale = new Float32Array(cellCount).fill(1)
      phaseX = new Float32Array(cellCount)
      phaseY = new Float32Array(cellCount)
      cellColor = new Array(cellCount)
      cellChar = new Array(cellCount)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          const p = idx * 4
          const r = brighten(pixels[p], BRIGHTEN)
          const g = brighten(pixels[p + 1], BRIGHTEN)
          const b = brighten(pixels[p + 2], BRIGHTEN)

          const jitterX = (Math.random() - 0.5) * 2 * JITTER
          const jitterY = (Math.random() - 0.5) * 2 * JITTER
          baseX[idx] = col * cellW + cellW / 2 + jitterX
          baseY[idx] = row * cellH + cellH / 2 + jitterY
          phaseX[idx] = Math.random() * Math.PI * 2
          phaseY[idx] = Math.random() * Math.PI * 2

          cellColor[idx] = `rgb(${r | 0}, ${g | 0}, ${b | 0})`
          isAscii[idx] = Math.random() < ASCII_CHANCE ? 1 : 0

          if (isAscii[idx]) {
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b
            const rampIdx = Math.min(
              ASCII_RAMP.length - 1,
              Math.floor((luminance / 255) * ASCII_RAMP.length)
            )
            cellChar[idx] = ASCII_RAMP[rampIdx]
          }
        }
      }
    }

    const renderFrame = (time: number) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const cellCount = cols * rows

      ctx.fillStyle = dark ? '#2a2018' : '#fbf3e6'
      ctx.fillRect(0, 0, width, height)

      for (let idx = 0; idx < cellCount; idx++) {
        let targetDX = Math.sin(time * IDLE_DRIFT_SPEED + phaseX[idx]) * IDLE_DRIFT_AMOUNT
        let targetDY = Math.cos(time * IDLE_DRIFT_SPEED + phaseY[idx]) * IDLE_DRIFT_AMOUNT
        let targetScale = 1

        if (pointer.active) {
          const dx = baseX[idx] - pointer.x
          const dy = baseY[idx] - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < INTERACT_RADIUS && dist > 0.001) {
            const falloff = 1 - dist / INTERACT_RADIUS

            switch (INTERACTION_MODE) {
              case 'repel': {
                const force = falloff * INTERACT_STRENGTH
                targetDX += (dx / dist) * force
                targetDY += (dy / dist) * force
                break
              }
              case 'attract': {
                const force = falloff * INTERACT_STRENGTH
                targetDX += -(dx / dist) * force
                targetDY += -(dy / dist) * force
                break
              }
              case 'ripple': {
                const wave = Math.sin(dist * RIPPLE_FREQUENCY - time * RIPPLE_SPEED)
                const force = wave * falloff * INTERACT_STRENGTH
                targetDX += (dx / dist) * force
                targetDY += (dy / dist) * force
                break
              }
              case 'grow': {
                targetScale = 1 + falloff * (INTERACT_STRENGTH / 10)
                break
              }
            }
          }
        }

        curDX[idx] += (targetDX - curDX[idx]) * INTERACT_EASE
        curDY[idx] += (targetDY - curDY[idx]) * INTERACT_EASE
        curScale[idx] += (targetScale - curScale[idx]) * INTERACT_EASE

        const cx = baseX[idx] + curDX[idx]
        const cy = baseY[idx] + curDY[idx]

        ctx.fillStyle = cellColor[idx]

        if (isAscii[idx]) {
          const char = cellChar[idx]
          if (char !== ' ') {
            ctx.fillText(char, cx, cy)
          }
        } else {
          ctx.beginPath()
          ctx.arc(cx, cy, radius * curScale[idx], 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (dark) {
        ctx.fillStyle = 'rgba(20, 16, 12, 0.32)'
        ctx.fillRect(0, 0, width, height)
      }
    }

    const onSeeked = () => {
      buildGrid()
      renderFrame(0)
    }
    const onLoadedMetadata = () => {
      video.currentTime = Math.min(CAPTURE_TIME, Math.max(0, video.duration - 0.1 || CAPTURE_TIME))
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('seeked', onSeeked)
    if (video.readyState >= 1) onLoadedMetadata()

    const resizeObserver = new ResizeObserver(() => {
      buildGrid()
      renderFrame(0)
    })
    resizeObserver.observe(container)

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const withinBounds =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = withinBounds
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      document.addEventListener('mouseleave', onPointerLeave)
    }

    let lastRender = 0
    const renderIntervalMs = 1000 / RENDER_FPS

    const loop = (now: number) => {
      if (!running) return
      if (now - lastRender >= renderIntervalMs) {
        lastRender = now
        if (cols > 0 && rows > 0) renderFrame(now / 1000)
      }
      frameRef.current = requestAnimationFrame(loop)
    }

    if (!reducedMotion) {
      frameRef.current = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('seeked', onSeeked)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [
    dark,
    reducedMotion,
    CELL_SIZE,
    BUBBLE_SCALE,
    JITTER,
    BRIGHTEN,
    ASCII_CHANCE,
    CAPTURE_TIME,
    INTERACTION_MODE,
    INTERACT_RADIUS,
    INTERACT_STRENGTH,
    INTERACT_EASE,
    RIPPLE_FREQUENCY,
    RIPPLE_SPEED,
    IDLE_DRIFT_AMOUNT,
    IDLE_DRIFT_SPEED,
  ])

  return (
    <div
      ref={containerRef}
      className={cn(
        'flowers-background',
        !fixed && 'flowers-background--inline',
        dark && 'flowers-background--dark',
        className
      )}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="flowers-background__video"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/flowers-background.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="flowers-background__bubbles"
        style={{ opacity: OVERLAY_OPACITY, filter: `blur(${BLUR_PX}px)` }}
      />
    </div>
  )
}
