'use client'

import { motion } from '@/lib/motion'
import type { AutodeskBranch } from '@/lib/workflow/types'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'
import { WorkflowGroup } from './WorkflowGroup'
import { ConnectorLabel } from './Connector'

interface AutodeskWorkflowProps {
  branches: AutodeskBranch[]
  mergeMessage: string
}

export function AutodeskWorkflow({
  branches,
  mergeMessage,
}: AutodeskWorkflowProps) {
  return (
    <WorkflowGroup
      id="autodesk-workflow"
      title="Autodesk dual-path workflow"
      subtitle="How do you create a strong platform? Build the right platform, and build it right."
    >
      {/* Switch node */}
      <div className="flex justify-center mb-6">
        <div
          className="rounded-xl border bg-workflow-ivory px-6 py-4 shadow-sm text-center"
          style={{ borderColor: `${WORKFLOW_COLORS.sand.border}66` }}
        >
          <span className="font-mono text-[10px] uppercase text-workflow-muted">
            Switch
          </span>
          <p className="text-base font-semibold text-workflow-text mt-1">
            How do you create a strong platform?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {branches.map((branch, i) => {
          const colors = WORKFLOW_COLORS[branch.color]
          return (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-workflow-ivory p-5 md:p-6 shadow-sm"
              style={{
                borderColor: `${colors.border}66`,
                borderTopWidth: 3,
                borderTopColor: colors.accent,
              }}
            >
              <h3 className="text-lg font-bold text-workflow-text">
                {branch.title}
              </h3>
              <p className="text-sm text-workflow-blue mt-1">
                {branch.role} · {branch.area}
              </p>
              <ul className="mt-4 space-y-2">
                {branch.questions.map((q) => (
                  <li
                    key={q}
                    className="text-sm text-workflow-secondary flex items-start gap-2"
                  >
                    <span className="text-workflow-connector font-mono text-xs mt-0.5">
                      ?
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {/* Merge */}
      <div className="flex flex-col items-center mt-8">
        <div className="hidden md:flex w-full max-w-md justify-between mb-2 px-8">
          <svg width="100%" height="40" aria-hidden>
            <path
              d="M 50% 0 Q 25% 30, 20% 40"
              fill="none"
              stroke="#7D8CA3"
              strokeWidth="1.5"
            />
            <path
              d="M 50% 0 Q 75% 30, 80% 40"
              fill="none"
              stroke="#7D8CA3"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <ConnectorLabel label="Merge" className="mb-3" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border-2 bg-workflow-ivory px-8 py-5 text-center shadow-md max-w-lg"
          style={{
            borderColor: WORKFLOW_COLORS.blue.border,
            boxShadow: `0 8px 32px ${WORKFLOW_COLORS.blue.light}`,
          }}
        >
          <p className="text-lg md:text-xl font-bold text-workflow-text italic">
            {mergeMessage}
          </p>
          <p className="text-sm text-workflow-secondary mt-2">
            Translation between product and engineering — on both sides of the
            platform.
          </p>
        </motion.div>
      </div>
    </WorkflowGroup>
  )
}
