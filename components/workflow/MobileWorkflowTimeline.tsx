'use client'

import type { ExecutionState } from '@/lib/workflow/types'
import { EXECUTION_SEQUENCE } from '@/lib/workflow/workflow-data'
import { MAIN_WORKFLOW_NODES } from '@/lib/workflow/workflow-data'

interface MobileWorkflowTimelineProps {
  nodeStates: Record<string, ExecutionState>
  currentNodeId: string | null
  progress: number
}

export function MobileWorkflowTimeline({
  nodeStates,
  currentNodeId,
  progress,
}: MobileWorkflowTimelineProps) {
  const displayNodes = EXECUTION_SEQUENCE.filter(
    (id) => !['experience', 'intelligence', 'reliability', 'delivery'].includes(id)
  )

  return (
    <div
      className="md:hidden sticky top-16 z-40 bg-workflow-ivory/90 backdrop-blur-sm border-b border-workflow-border/40 px-4 py-2"
      aria-label="Workflow progress timeline"
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {displayNodes.map((id) => {
          const node = MAIN_WORKFLOW_NODES.find((n) => n.id === id)
          const state = nodeStates[id] ?? 'idle'
          const isCurrent = currentNodeId === id
          return (
            <div
              key={id}
              className={`flex items-center gap-1 shrink-0 px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wide border transition-all ${
                isCurrent
                  ? 'border-workflow-blue bg-workflow-powder-light text-workflow-blue'
                  : state === 'complete'
                    ? 'border-workflow-coral/40 text-workflow-coral'
                    : 'border-workflow-border/40 text-workflow-muted'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  state === 'complete'
                    ? 'bg-workflow-coral'
                    : state === 'running'
                      ? 'bg-workflow-blue animate-pulse'
                      : 'bg-workflow-muted'
                }`}
                aria-hidden
              />
              {node?.title.split(' ')[0] ?? id}
            </div>
          )
        })}
      </div>
      <div
        className="h-0.5 rounded-full bg-workflow-powder-light mt-1"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-workflow-blue transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
