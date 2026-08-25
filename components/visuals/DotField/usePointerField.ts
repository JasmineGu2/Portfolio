'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import type { PointerState } from './types'

const SMOOTH_ALPHA = 0.06
const MAX_VELOCITY = 30

const INITIAL_POINTER: PointerState = {
  targetX: 0,
  targetY: 0,
  smoothX: 0,
  smoothY: 0,
  velocity: 0,
  active: false,
}

export function usePointerField(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const pointerRef = useRef<PointerState>({ ...INITIAL_POINTER })
  const prevRef = useRef({ x: 0, y: 0 })

  const updatePointer = useCallback(() => {
    const p = pointerRef.current
    if (!p.active) return

    const prevX = prevRef.current.x
    const prevY = prevRef.current.y

    p.smoothX += (p.targetX - p.smoothX) * SMOOTH_ALPHA
    p.smoothY += (p.targetY - p.smoothY) * SMOOTH_ALPHA

    const vx = p.smoothX - prevX
    const vy = p.smoothY - prevY
    p.velocity = Math.min(Math.hypot(vx, vy), MAX_VELOCITY)

    prevRef.current.x = p.smoothX
    prevRef.current.y = p.smoothY
  }, [])

  useEffect(() => {
    if (!enabled) {
      pointerRef.current = { ...INITIAL_POINTER }
      return
    }

    const container = containerRef.current
    if (!container) return

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerRef.current.targetX = event.clientX - rect.left
      pointerRef.current.targetY = event.clientY - rect.top
      pointerRef.current.active = true
    }

    const onLeave = () => {
      pointerRef.current.active = false
      pointerRef.current.velocity = 0
    }

    container.addEventListener('pointermove', onMove, { passive: true })
    container.addEventListener('pointerleave', onLeave)

    return () => {
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
    }
  }, [containerRef, enabled])

  return { pointerRef, updatePointer }
}
