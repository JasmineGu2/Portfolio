'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from '@/lib/motion'
import { renderBlobDotField, renderDotField } from './dotFieldMath'
import { resolveDotFieldConfig } from './dotFieldPresets'
import { usePointerField } from './usePointerField'
import type { DotFieldConfig, DotFieldProps } from './types'

const MAX_DPR = 1.75

export function DotField({
  preset = 'ambient',
  colorScheme,
  spacing,
  dotRadius,
  opacity,
  waveAmplitude,
  waveFrequency,
  waveSpeed,
  noiseScale,
  noiseStrength,
  noiseSpeed,
  foldStrength,
  mouseRadius,
  mouseStrength,
  deformationPoints,
  interactive = false,
  animate = true,
  className,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)
  const visibleRef = useRef(true)
  const reducedMotion = useReducedMotion()

  const config = useMemo<DotFieldConfig>(
    () =>
      resolveDotFieldConfig(preset, {
        colorScheme,
        spacing,
        dotRadius,
        opacity,
        waveAmplitude,
        waveFrequency,
        waveSpeed,
        noiseScale,
        noiseStrength,
        noiseSpeed,
        foldStrength,
        mouseRadius,
        mouseStrength,
        deformationPoints,
      }),
    [
      preset,
      colorScheme,
      spacing,
      dotRadius,
      opacity,
      waveAmplitude,
      waveFrequency,
      waveSpeed,
      noiseScale,
      noiseStrength,
      noiseSpeed,
      foldStrength,
      mouseRadius,
      mouseStrength,
      deformationPoints,
    ]
  )

  const { pointerRef, updatePointer } = usePointerField(containerRef, interactive && !reducedMotion)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(container)

    const startTime = performance.now()
    let running = true

    const draw = (now: number) => {
      if (!running) return

      if (visibleRef.current) {
        updatePointer()
        const shouldAnimate = animate && !reducedMotion
        const time = shouldAnimate ? now - startTime : 0

        const renderCtx = {
          width,
          height,
          time,
          config,
          pointer: pointerRef.current,
          reducedMotion,
          globalOpacity: 1,
        }

        if (config.renderMode === 'blobs') {
          renderBlobDotField(ctx, renderCtx)
        } else {
          renderDotField(ctx, renderCtx)
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      intersectionObserver.disconnect()
    }
  }, [animate, config, pointerRef, reducedMotion, updatePointer])

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  )
}
