'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FLOW_LAYOUT, getDefaultBoxPosition, getDefaultTagPosition } from './flow-layout'

const STORAGE_KEY = 'jasmine-portfolio-flow-positions-v2'

type Position = { x: number; y: number }
type PositionMap = Record<string, Position>

function defaultPositions(): PositionMap {
  const boxPositions = Object.fromEntries(
    Object.keys(FLOW_LAYOUT).map((id) => [id, getDefaultBoxPosition(id)])
  )
  const tagPositions = Object.fromEntries(
    Object.keys(FLOW_LAYOUT).map((id) => [
      `${id}-tag`,
      getDefaultTagPosition(id),
    ])
  )
  return { ...boxPositions, ...tagPositions }
}

function loadPositions(): PositionMap {
  if (typeof window === 'undefined') return defaultPositions()
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as PositionMap
      const defaults = defaultPositions()
      return Object.fromEntries(
        Object.keys(defaults).map((id) => [id, parsed[id] ?? defaults[id]])
      )
    }
  } catch {
    /* ignore corrupt storage */
  }
  return defaultPositions()
}

export function useFlowPositions(scaleRef?: React.RefObject<number>) {
  const [positions, setPositions] = useState<PositionMap>(loadPositions)
  const dragRef = useRef<{
    id: string
    pointerId: number
    startX: number
    startY: number
    origX: number
    origY: number
    moved: boolean
  } | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    } catch {
      /* storage full or unavailable */
    }
  }, [positions])

  const getPosition = useCallback(
    (id: string): Position => positions[id] ?? { x: 0, y: 0 },
    [positions]
  )

  const resetPositions = useCallback(() => {
    setPositions(defaultPositions())
    localStorage.removeItem(STORAGE_KEY)
  }, [])

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

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
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
    },
    [scaleRef]
  )

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    dragRef.current = null
  }, [])

  return {
    positions,
    getPosition,
    resetPositions,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
