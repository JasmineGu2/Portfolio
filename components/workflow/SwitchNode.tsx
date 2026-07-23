'use client'

import { motion } from '@/lib/motion'
import type { ExecutionState } from '@/lib/workflow/types'
import type { SwitchBranch } from '@/lib/workflow/types'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'
import { NodeIcon, getAgentIcon } from './NodeIcon'
import { ExecutionStatus } from './ExecutionStatus'

interface SwitchNodeProps {
  title: string
  description: string
  branches: SwitchBranch[]
  branchStates: Record<string, ExecutionState>
  isActive: boolean
}

export function SwitchNode({
  title,
  description,
  branches,
  branchStates,
  isActive,
}: SwitchNodeProps) {
  return (
    <div className="w-full" aria-label="Specialization switch node">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-xl border bg-workflow-ivory p-4 md:p-5 shadow-sm ${
          isActive ? 'ring-2 ring-workflow-sand/40 shadow-md' : ''
        }`}
        style={{ borderColor: `${WORKFLOW_COLORS.sand.border}88` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: WORKFLOW_COLORS.sand.light }}
          >
            <NodeIcon name="git-branch" color={WORKFLOW_COLORS.sand.accent} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted">
            Switch / Router
          </span>
        </div>
        <h3 className="text-base md:text-lg font-semibold text-workflow-text">
          {title}
        </h3>
        <p className="text-sm text-workflow-secondary mt-1">{description}</p>
      </motion.div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {branches.map((branch) => {
          const colors = WORKFLOW_COLORS[branch.color]
          const state = branchStates[branch.id] ?? 'idle'
          return (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-lg border bg-workflow-ivory p-3 shadow-sm"
              style={{
                borderColor: `${colors.border}66`,
                boxShadow:
                  state === 'running' || state === 'complete'
                    ? `0 2px 16px ${colors.light}`
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <NodeIcon
                    name={getAgentIcon(branch.agentType)}
                    className="w-4 h-4"
                    color={colors.accent}
                  />
                  <span className="text-sm font-semibold text-workflow-text">
                    {branch.title}
                  </span>
                </div>
                <ExecutionStatus state={state} compact />
              </div>
              <ul className="space-y-0.5 mb-2">
                {branch.focus.slice(0, 4).map((f) => (
                  <li key={f} className="text-[11px] text-workflow-secondary">
                    · {f}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] font-medium text-workflow-blue">
                → {branch.output}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {branch.experienceRefs.map((ref) => (
                  <span
                    key={ref}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-workflow-powder-light text-workflow-muted"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
