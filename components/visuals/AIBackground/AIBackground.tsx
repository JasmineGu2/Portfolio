'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import {
  createContourGrid,
  drawContourFlowField,
  getGridCellCount,
  resolvePalette,
  type ContourGrid,
} from './contourFlowField'
import type { AIBackgroundProps, DomObstacle } from './types'
import './ai-background.css'

const MAX_DPR = 1.75
const OBSTACLE_REFRESH_MS = 120
const TARGET_FRAME_MS_ARCHITECTURE = 1000 / 44
const TARGET_FRAME_MS_WORK = 1000 / 50

export function AIBackground({
  variant = 'architecture',
  density = 0.6,
  interactWithSelectors = '',
  className,
  animate = true,
}: AIBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const gridRef = useRef<ContourGrid | null>(null)
  const obstaclesRef = useRef<DomObstacle[]>([])
  const scrollProgressRef = useRef(0)
  const sizeRef = useRef({ width: 0, height: 0 })

  const palette = useMemo(() => resolvePalette(variant), [variant])

  const selectorList = useMemo(
    () =>
      interactWithSelectors
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [interactWithSelectors]
  )

  const measureObstacles = useCallback(() => {
    if (selectorList.length === 0) {
      obstaclesRef.current = []
      return
    }

    const next: DomObstacle[] = []
    for (const selector of selectorList) {
      document.querySelectorAll(selector).forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.width < 2 || rect.height < 2) return
        next.push({
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          centerX: rect.left + rect.width * 0.5,
          centerY: rect.top + rect.height * 0.5,
        })
      })
    }
    obstaclesRef.current = next
  }, [selectorList])

  const measureScroll = useCallback(() => {
    const doc = document.documentElement
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight)
    scrollProgressRef.current = Math.min(1, window.scrollY / maxScroll)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', measureScroll, { passive: true })
    window.addEventListener('resize', measureObstacles)

    measureScroll()
    measureObstacles()

    const obstacleTimer = window.setInterval(measureObstacles, OBSTACLE_REFRESH_MS)

    return () => {
      window.removeEventListener('scroll', measureScroll)
      window.removeEventListener('resize', measureObstacles)
      window.clearInterval(obstacleTimer)
    }
  }, [measureObstacles, measureScroll])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      sizeRef.current = { width, height }

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      gridRef.current = createContourGrid(width, height, variant)
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const targetFrameMs =
      variant === 'work' ? TARGET_FRAME_MS_WORK : TARGET_FRAME_MS_ARCHITECTURE
    const startTime = performance.now()
    let lastFrameTime = 0

    const draw = (now: number) => {
      if (!running) return

      const elapsed = now - lastFrameTime
      if (elapsed < targetFrameMs) {
        frameRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = now - (elapsed % targetFrameMs)

      const grid = gridRef.current
      const { width, height } = sizeRef.current
      if (grid && width > 0 && height > 0) {
        const time = animate && !reducedMotion ? now - startTime : 0

        drawContourFlowField(ctx, grid, {
          width,
          height,
          time,
          scrollProgress: scrollProgressRef.current,
          density,
          variant,
          palette,
          obstacles: obstaclesRef.current,
          reducedMotion,
        })
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [animate, density, palette, reducedMotion, variant])

  return (
    <div
      ref={containerRef}
      className={cn('ai-background', `ai-background--${variant}`, className)}
      aria-hidden
      data-grid-cells={gridRef.current ? getGridCellCount(gridRef.current) : undefined}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
