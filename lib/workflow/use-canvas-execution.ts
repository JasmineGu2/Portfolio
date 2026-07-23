'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ExecutionState } from './types'
import {
  CANVAS_EXECUTION_ORDER,
  EXECUTION_LABELS,
} from './canvas-data'

const STEP_MS = 700
const BRANCH_MS = 350
const QUEUED_MS = 150

export type WorkflowControlAction = 'run' | 'pause' | 'reset' | 'skip'

const initStates = (): Record<string, ExecutionState> =>
  Object.fromEntries(
    CANVAS_EXECUTION_ORDER.map((id) => [id, 'idle' as ExecutionState])
  )

export function useCanvasExecution() {
  const [nodeStates, setNodeStates] = useState(initStates)
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Workflow idle')

  const stepRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const runStep = useCallback(
    (index: number) => {
      if (pausedRef.current) return

      if (index >= CANVAS_EXECUTION_ORDER.length) {
        setIsRunning(false)
        setActiveEdgeId(null)
        setProgress(100)
        setStatusMessage(EXECUTION_LABELS.contact ?? 'Done')
        return
      }

      const nodeId = CANVAS_EXECUTION_ORDER[index]
      const prevId = index > 0 ? CANVAS_EXECUTION_ORDER[index - 1] : null

      if (prevId) setActiveEdgeId(`${prevId}->${nodeId}`)
      setCurrentNodeId(nodeId)
      setStatusMessage(EXECUTION_LABELS[nodeId] ?? 'Processing…')
      setProgress(Math.round((index / CANVAS_EXECUTION_ORDER.length) * 100))

      setNodeStates((prev) => {
        const next = { ...prev }
        if (prevId) next[prevId] = 'complete'
        next[nodeId] = 'queued'
        return next
      })

      const isBranch = ['omers', 'laurelspace', 'ivey', 'autodesk-eng', 'autodesk-pm'].includes(nodeId)
      const duration = isBranch ? BRANCH_MS : STEP_MS

      timerRef.current = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, [nodeId]: 'running' }))
        timerRef.current = setTimeout(() => {
          setNodeStates((prev) => ({ ...prev, [nodeId]: 'complete' }))
          stepRef.current = index + 1
          runStep(index + 1)
        }, duration)
      }, QUEUED_MS)
    },
    []
  )

  const run = useCallback(() => {
    clearTimer()
    pausedRef.current = false
    setIsPaused(false)
    setIsRunning(true)
    stepRef.current = 0
    setNodeStates(initStates())
    setActiveEdgeId(null)
    setProgress(0)
    runStep(0)
  }, [clearTimer, runStep])

  const pause = useCallback(() => {
    pausedRef.current = true
    setIsPaused(true)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    pausedRef.current = false
    setIsPaused(false)
    setIsRunning(false)
    stepRef.current = 0
    setNodeStates(initStates())
    setActiveEdgeId(null)
    setCurrentNodeId(null)
    setProgress(0)
    setStatusMessage('Workflow idle')
  }, [clearTimer])

  const skipToOutput = useCallback(() => {
    clearTimer()
    pausedRef.current = false
    setIsPaused(false)
    setIsRunning(false)
    setNodeStates(
      Object.fromEntries(
        CANVAS_EXECUTION_ORDER.map((id) => [id, 'complete' as ExecutionState])
      )
    )
    setCurrentNodeId('contact')
    setActiveEdgeId(null)
    setProgress(100)
    setStatusMessage(EXECUTION_LABELS.contact ?? 'Done')
  }, [clearTimer])

  const handleControl = useCallback(
    (action: WorkflowControlAction) => {
      switch (action) {
        case 'run':
          if (isPaused) {
            pausedRef.current = false
            setIsPaused(false)
            runStep(stepRef.current)
          } else {
            run()
          }
          break
        case 'pause':
          pause()
          break
        case 'reset':
          reset()
          break
        case 'skip':
          skipToOutput()
          break
      }
    },
    [isPaused, pause, reset, run, runStep, skipToOutput]
  )

  useEffect(() => () => clearTimer(), [clearTimer])

  return {
    nodeStates,
    activeEdgeId,
    currentNodeId,
    selectedNodeId,
    setSelectedNodeId,
    isRunning,
    isPaused,
    progress,
    statusMessage,
    handleControl,
    run,
  }
}
