'use client'

import { useReducedMotion } from '@/lib/motion'
import type { ExecutionState } from '@/lib/workflow/types'

interface ExecutionStatusProps {
  state: ExecutionState
  message?: string
  compact?: boolean
}

const STATE_CONFIG: Record<
  ExecutionState,
  { label: string; dotClass: string; textClass: string }
> = {
  idle: {
    label: 'waiting',
    dotClass: 'bg-workflow-muted',
    textClass: 'text-workflow-muted',
  },
  queued: {
    label: 'queued',
    dotClass: 'bg-workflow-sand',
    textClass: 'text-workflow-sand',
  },
  running: {
    label: 'running',
    dotClass: 'bg-workflow-blue',
    textClass: 'text-workflow-blue',
  },
  complete: {
    label: 'complete',
    dotClass: 'bg-workflow-coral',
    textClass: 'text-workflow-coral',
  },
}

export function ExecutionStatus({
  state,
  message,
  compact = false,
}: ExecutionStatusProps) {
  const prefersReducedMotion = useReducedMotion()
  const config = STATE_CONFIG[state]

  return (
    <div
      className="flex items-center gap-2"
      role="status"
      aria-live="polite"
      aria-label={`Execution status: ${config.label}${message ? `, ${message}` : ''}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        {state === 'running' && !prefersReducedMotion ? (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${config.dotClass} opacity-75 animate-ping`}
          />
        ) : null}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${config.dotClass}`}
        />
      </span>
      <span
        className={`font-mono text-[10px] uppercase tracking-wider ${config.textClass}`}
      >
        {config.label}
      </span>
      {message && !compact && (
        <span className="font-mono text-[10px] text-workflow-muted truncate max-w-[140px]">
          {message}
        </span>
      )}
    </div>
  )
}
