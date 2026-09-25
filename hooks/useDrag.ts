'use client'

import { useRef, useCallback, useEffect } from 'react'
import { useSound } from '@/components/portfolio/SoundProvider'
import { SOUND_CUES } from '@/lib/portfolio/sound-cues'

export interface DragOptions {
  onDragStart?: () => void
  onDrag?: (x: number, y: number) => void
  onDragEnd?: (x: number, y: number) => void
  constrainX?: [number, number]
  constrainY?: [number, number]
  mouseOnly?: boolean
  withSound?: boolean
}

export function useDrag(ref: React.RefObject<HTMLElement>, options: DragOptions = {}) {
  const sound = useSound()
  const isDraggingRef = useRef(false)
  const startPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const dragLoopRef = useRef<any>(null)
  const dragStartDistanceRef = useRef(0)

  const {
    onDragStart,
    onDrag,
    onDragEnd,
    constrainX,
    constrainY,
    mouseOnly = false,
    withSound = true,
  } = options

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (mouseOnly && e.pointerType !== 'mouse') return
      if (!ref.current) return

      isDraggingRef.current = true
      startPosRef.current = { x: e.clientX, y: e.clientY }
      dragStartDistanceRef.current = 0

      if (withSound) {
        // Start drag loop sound
        sound.playLoop(SOUND_CUES.DRAG_START).then((handle) => {
          dragLoopRef.current = handle
        })
      }

      onDragStart?.()

      ref.current.setPointerCapture(e.pointerId)
    },
    [ref, onDragStart, sound, withSound]
  )

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDraggingRef.current || !ref.current) return

      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y
      dragStartDistanceRef.current = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      let x = currentPosRef.current.x + deltaX
      let y = currentPosRef.current.y + deltaY

      // Apply constraints
      if (constrainX) {
        x = Math.max(constrainX[0], Math.min(constrainX[1], x))
      }
      if (constrainY) {
        y = Math.max(constrainY[0], Math.min(constrainY[1], y))
      }

      currentPosRef.current = { x, y }
      onDrag?.(x, y)
    },
    [constrainX, constrainY, onDrag]
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (!isDraggingRef.current || !ref.current) return

      // Only treat as drag if moved more than 4px
      if (dragStartDistanceRef.current > 4) {
        if (withSound) {
          // Stop drag loop and play drop sound
          if (dragLoopRef.current) {
            sound.stopLoop(dragLoopRef.current)
            dragLoopRef.current = null
          }
          sound.play(SOUND_CUES.DRAG_STOP)
        }
      }

      isDraggingRef.current = false
      onDragEnd?.(currentPosRef.current.x, currentPosRef.current.y)

      ref.current.releasePointerCapture(e.pointerId)
    },
    [ref, onDragEnd, sound, withSound]
  )

  // Set initial position from element's transform or position
  const updateInitialPosition = useCallback(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const transform = ref.current.style.transform

    // Parse transform if it exists
    if (transform && transform.includes('translate')) {
      const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/)
      if (match) {
        currentPosRef.current.x = parseFloat(match[1])
        currentPosRef.current.y = parseFloat(match[2])
      }
    } else {
      currentPosRef.current.x = rect.left
      currentPosRef.current.y = rect.top
    }
  }, [ref])

  useEffect(() => {
    updateInitialPosition()

    const element = ref.current
    if (!element) return

    element.addEventListener('pointerdown', handlePointerDown as any)
    document.addEventListener('pointermove', handlePointerMove as any)
    document.addEventListener('pointerup', handlePointerUp as any)

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown as any)
      document.removeEventListener('pointermove', handlePointerMove as any)
      document.removeEventListener('pointerup', handlePointerUp as any)
    }
  }, [ref, handlePointerDown, handlePointerMove, handlePointerUp, updateInitialPosition])

  return {
    isDragging: isDraggingRef.current,
    currentPos: currentPosRef.current,
    reset: () => {
      updateInitialPosition()
    },
  }
}
