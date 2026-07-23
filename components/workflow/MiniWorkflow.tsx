'use client'

import type { AgentType } from '@/lib/workflow/types'
import { AGENT_LABELS, AGENT_COLOR_MAP } from '@/lib/workflow/colors'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'
import { NodeIcon, getAgentIcon } from './NodeIcon'

interface MiniWorkflowProps {
  agents: AgentType[]
  input?: string
  output?: string
  compact?: boolean
}

export function MiniWorkflow({
  agents,
  input,
  output,
  compact = false,
}: MiniWorkflowProps) {
  return (
    <div
      className={`flex items-center gap-1 overflow-x-auto py-2 ${
        compact ? 'scale-90 origin-left' : ''
      }`}
      aria-label={`Mini workflow: ${agents.map((a) => AGENT_LABELS[a]).join(' to ')}`}
    >
      {input && (
        <>
          <MiniPort label={input} type="input" />
          <MiniConnector />
        </>
      )}
      {agents.map((agent, i) => {
        const color = WORKFLOW_COLORS[AGENT_COLOR_MAP[agent]]
        return (
          <div key={`${agent}-${i}`} className="flex items-center gap-1 shrink-0">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium whitespace-nowrap"
              style={{
                borderColor: `${color.border}66`,
                backgroundColor: color.light,
                color: color.text,
              }}
            >
              <NodeIcon
                name={getAgentIcon(agent)}
                className="w-3 h-3"
                color={color.accent}
              />
              <span className="hidden sm:inline">
                {AGENT_LABELS[agent].replace(' Agent', '')}
              </span>
            </div>
            {i < agents.length - 1 && <MiniConnector />}
          </div>
        )
      })}
      {output && (
        <>
          <MiniConnector />
          <MiniPort label={output} type="output" />
        </>
      )}
    </div>
  )
}

function MiniConnector() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" aria-hidden>
      <path
        d="M0 4 H12 M10 2 L14 4 L10 6"
        fill="none"
        stroke="#7D8CA3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MiniPort({ label, type }: { label: string; type: 'input' | 'output' }) {
  return (
    <span
      className={`font-mono text-[9px] px-1.5 py-0.5 rounded border whitespace-nowrap ${
        type === 'input'
          ? 'border-workflow-coral/40 text-workflow-coral bg-workflow-coral-light'
          : 'border-workflow-blue/40 text-workflow-blue bg-workflow-powder-light'
      }`}
    >
      {label.length > 20 ? `${label.slice(0, 18)}…` : label}
    </span>
  )
}
