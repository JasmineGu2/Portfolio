'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ARCHITECTURE_STAGE_ORDER } from '@/lib/portfolio/abstraction-engine-data'

export interface ArchitectureFlowState {
  activeStageIndex: number
  stageProgress: number[]
  payoffVisible: boolean
  hoveredNodeId: string | null
  hoveredEdgeId: string | null
  setHoveredNodeId: (id: string | null) => void
  setHoveredEdgeId: (id: string | null) => void
  registerStageMarker: (index: number, el: HTMLElement | null) => void
  registerPayoff: (el: HTMLElement | null) => void
}

export function useArchitectureFlow(): ArchitectureFlowState {
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [stageProgress, setStageProgress] = useState<number[]>(() =>
    ARCHITECTURE_STAGE_ORDER.map(() => 0.5)
  )
  const [payoffVisible, setPayoffVisible] = useState(false)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null)

  const stageRefs = useRef<(HTMLElement | null)[]>([])
  const payoffRef = useRef<HTMLElement | null>(null)

  const registerStageMarker = useCallback((index: number, el: HTMLElement | null) => {
    stageRefs.current[index] = el
  }, [])

  const registerPayoff = useCallback((el: HTMLElement | null) => {
    payoffRef.current = el
  }, [])

  useEffect(() => {
    const stageCount = ARCHITECTURE_STAGE_ORDER.length
    const progress = new Array<number>(stageCount).fill(0)
    let active = 0
    let payoff = false

    const updateFromRects = () => {
      const viewportCenter = window.innerHeight * 0.45

      stageRefs.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const markerCenter = rect.top + rect.height / 2
        const dist = Math.abs(markerCenter - viewportCenter)
        const range = window.innerHeight * 0.38
        const ratio = Math.max(0, Math.min(1, 1 - dist / range))
        progress[index] = ratio

        if (ratio > 0.4) {
          active = index
        }
      })

      const payoffEl = payoffRef.current
      if (payoffEl) {
        const rect = payoffEl.getBoundingClientRect()
        payoff = rect.top < window.innerHeight * 0.78
        if (payoff) active = stageCount - 1
      }

      setActiveStageIndex(active)
      setStageProgress([...progress])
      setPayoffVisible(payoff)
    }

    updateFromRects()
    window.addEventListener('scroll', updateFromRects, { passive: true })
    window.addEventListener('resize', updateFromRects)

    return () => {
      window.removeEventListener('scroll', updateFromRects)
      window.removeEventListener('resize', updateFromRects)
    }
  }, [])

  return {
    activeStageIndex,
    stageProgress,
    payoffVisible,
    hoveredNodeId,
    hoveredEdgeId,
    setHoveredNodeId,
    setHoveredEdgeId,
    registerStageMarker,
    registerPayoff,
  }
}
