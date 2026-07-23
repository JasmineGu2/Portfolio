'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CanvasNode } from './canvas-data'

const STORAGE_KEY = 'jasmine-portfolio-node-positions'

type Position = { x: number; y: number }
type PositionMap = Record<string, Position>

function loadPositions(nodes: CanvasNode[]): PositionMap {
  if (typeof window === 'undefined') {
    return Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as PositionMap
      return Object.fromEntries(
        nodes.map((n) => [n.id, parsed[n.id] ?? { x: n.x, y: n.y }])
      )
    }
  } catch {
    /* ignore corrupt storage */
  }
  return Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
}

export function useNodePositions(
  nodes: CanvasNode[],
  scaleRef?: React.RefObject<number>
) {
  const [positions, setPositions] = useState<PositionMap>(() =>
    loadPositions(nodes)
  )
  const dragRef = useRef<{
    id: string
    pointerId: number
    startX: number
    startY: number
    origX: number
    origY: number
    moved: boolean
  } | null>(null)
  const lastWasDragRef = useRef(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    } catch {
      /* storage full or unavailable */
    }
  }, [positions])

  const getPosition = useCallback(
    (id: string): Position => {
      return positions[id] ?? { x: 0, y: 0 }
    },
    [positions]
  )

  const resetPositions = useCallback(() => {
    const defaults = Object.fromEntries(
      nodes.map((n) => [n.id, { x: n.x, y: n.y }])
    )
    setPositions(defaults)
    localStorage.removeItem(STORAGE_KEY)
  }, [nodes])

  const onPointerDown = useCallback(
    (id: string, e: React.PointerEvent) => {
      const pos = positions[id]
      if (!pos) return
      dragRef.current = {
        id,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origX: pos.x,
        origY: pos.y,
        moved: false,
      }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [positions]
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const scale = scaleRef?.current ?? 1
    const dx = (e.clientX - drag.startX) / scale
    const dy = (e.clientY - drag.startY) / scale
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true

    setPositions((prev) => ({
      ...prev,
      [drag.id]: {
        x: Math.max(0, drag.origX + dx),
        y: Math.max(0, drag.origY + dy),
      },
    }))
  }, [scaleRef])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    lastWasDragRef.current = drag.moved
    dragRef.current = null
  }, [])

  const consumeWasDrag = useCallback(() => {
    const was = lastWasDragRef.current
    lastWasDragRef.current = false
    return was
  }, [])

  return {
    positions,
    getPosition,
    resetPositions,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    consumeWasDrag,
  }
}
