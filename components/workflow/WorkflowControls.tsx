'use client'

import { Play, Pause, RotateCcw, FastForward } from 'lucide-react'
import type { WorkflowControlAction } from '@/lib/workflow/types'

interface WorkflowControlsProps {
  isRunning: boolean
  isPaused: boolean
  progress: number
  statusMessage: string
  onControl: (action: WorkflowControlAction) => void
}

export function WorkflowControls({
  isRunning,
  isPaused,
  progress,
  statusMessage,
  onControl,
}: WorkflowControlsProps) {
  return (
    <div className="mx-auto max-w-xl" role="toolbar" aria-label="Workflow controls">
      <div className="rounded-lg border border-n8n-border bg-n8n-node px-3 py-2">
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-n8n-muted">
              Execution
            </span>
            <span className="font-mono text-[9px] text-n8n-accent">{progress}%</span>
          </div>
          <div
            className="h-1 rounded-full bg-n8n-border overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-n8n-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-[9px] text-n8n-muted mt-1 truncate">
            {statusMessage}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <ControlButton
            label={isPaused ? 'Resume' : isRunning ? 'Pause' : 'Run'}
            onClick={() => onControl(isPaused ? 'run' : isRunning ? 'pause' : 'run')}
            primary
            icon={
              isRunning && !isPaused ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )
            }
          >
            {isRunning && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Run'}
          </ControlButton>
          <ControlButton
            label="Reset"
            onClick={() => onControl('reset')}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </ControlButton>
          <ControlButton
            label="Skip"
            onClick={() => onControl('skip')}
            icon={<FastForward className="w-3.5 h-3.5" />}
          >
            Skip
          </ControlButton>
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  children,
  label,
  onClick,
  primary = false,
  icon,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  primary?: boolean
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-n8n-accent ${
        primary
          ? 'bg-n8n-accent text-white hover:bg-[#e85a48]'
          : 'border border-n8n-border text-n8n-muted hover:bg-n8n-panel'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </button>
  )
}
