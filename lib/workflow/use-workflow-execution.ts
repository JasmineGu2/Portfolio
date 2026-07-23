'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ExecutionState, WorkflowControlAction } from './types'
import { EXECUTION_SEQUENCE } from './workflow-data'
import { EXECUTION_MESSAGES } from './colors'

const STEP_DURATION_MS = 900
const BRANCH_STEP_DURATION_MS = 400
const QUEUED_DURATION_MS = 200

export interface WorkflowExecutionState {
  nodeStates: Record<string, ExecutionState>
  activeEdgeId: string | null
  currentNodeId: string | null
  isRunning: boolean
  isPaused: boolean
  progress: number
  statusMessage: string
}

const INITIAL_STATES = (): Record<string, ExecutionState> =>
  Object.fromEntries(EXECUTION_SEQUENCE.map((id) => [id, 'idle' as ExecutionState]))

export function useWorkflowExecution() {
  const [nodeStates, setNodeStates] = useState<Record<string, ExecutionState>>(
    INITIAL_STATES
  )
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Workflow idle')

  const stepIndexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const getEdgeForStep = useCallback((fromId: string, toId: string) => {
    return `${fromId}->${toId}`
  }, [])

  const runStep = useCallback(
    (index: number) => {
      if (pausedRef.current) return

      if (index >= EXECUTION_SEQUENCE.length) {
        setIsRunning(false)
        setActiveEdgeId(null)
        setProgress(100)
        setStatusMessage(EXECUTION_MESSAGES.output)
        return
      }

      const nodeId = EXECUTION_SEQUENCE[index]
      const prevId = index > 0 ? EXECUTION_SEQUENCE[index - 1] : null

      if (prevId) {
        setActiveEdgeId(getEdgeForStep(prevId, nodeId))
      }

      setCurrentNodeId(nodeId)
      setStatusMessage(EXECUTION_MESSAGES[nodeId] ?? 'Processing…')
      setProgress(Math.round((index / EXECUTION_SEQUENCE.length) * 100))

      setNodeStates((prev) => {
        const next = { ...prev }
        if (prevId) next[prevId] = 'complete'
        next[nodeId] = 'queued'
        return next
      })

      const isBranch =
        nodeId === 'experience' ||
        nodeId === 'intelligence' ||
        nodeId === 'reliability' ||
        nodeId === 'delivery'

      const duration = isBranch ? BRANCH_STEP_DURATION_MS : STEP_DURATION_MS

      timerRef.current = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, [nodeId]: 'running' }))

        timerRef.current = setTimeout(() => {
          setNodeStates((prev) => ({ ...prev, [nodeId]: 'complete' }))
          stepIndexRef.current = index + 1
          runStep(index + 1)
        }, duration)
      }, QUEUED_DURATION_MS)
    },
    [getEdgeForStep]
  )

  const run = useCallback(() => {
    clearTimer()
    pausedRef.current = false
    setIsPaused(false)
    setIsRunning(true)
    stepIndexRef.current = 0
    setNodeStates(INITIAL_STATES())
    setActiveEdgeId(null)
    setProgress(0)
    document.getElementById('main-workflow')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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
    stepIndexRef.current = 0
    setNodeStates(INITIAL_STATES())
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
    const allComplete = Object.fromEntries(
      EXECUTION_SEQUENCE.map((id) => [id, 'complete' as ExecutionState])
    )
    setNodeStates(allComplete)
    setCurrentNodeId('output')
    setActiveEdgeId(null)
    setProgress(100)
    setStatusMessage(EXECUTION_MESSAGES.output)
  }, [clearTimer])

  const handleControl = useCallback(
    (action: WorkflowControlAction) => {
      switch (action) {
        case 'run':
          if (isPaused) {
            pausedRef.current = false
            setIsPaused(false)
            runStep(stepIndexRef.current)
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

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    nodeStates,
    activeEdgeId,
    currentNodeId,
    isRunning,
    isPaused,
    progress,
    statusMessage,
    handleControl,
    run,
    pause,
    reset,
    skipToOutput,
  }
}
