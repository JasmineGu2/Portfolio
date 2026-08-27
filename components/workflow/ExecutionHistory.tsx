'use client'

import { motion } from '@/lib/motion'
import type { ExperienceExecution } from '@/lib/workflow/types'
import { MiniWorkflow } from './MiniWorkflow'
import { WorkflowGroup } from './WorkflowGroup'

interface ExecutionHistoryProps {
  experiences: ExperienceExecution[]
}

export function ExecutionHistory({ experiences }: ExecutionHistoryProps) {
  return (
    <WorkflowGroup
      id="execution-history"
      title="Execution history"
      subtitle="Prior workflow executions. Each company represents a problem translated into a reliable system."
    >
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-workflow-border/50 bg-workflow-ivory p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted">
                  Execution #{String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-workflow-text mt-1">
                  {exp.company}
                </h3>
                {(exp.role || exp.area) && (
                  <p className="text-sm text-workflow-blue mt-0.5">
                    {exp.role}
                    {exp.area ? ` · ${exp.area}` : ''}
                  </p>
                )}
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded border border-workflow-coral/30 text-workflow-coral self-start">
                complete
              </span>
            </div>

            <MiniWorkflow
              agents={exp.agentsActivated}
              input={exp.problemReceived}
              output={exp.resultProduced}
            />

            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <DetailItem label="Problem received" value={exp.problemReceived} />
              <DetailItem label="Workflow built" value={exp.workflowBuilt} />
              <DetailItem label="Result produced" value={exp.resultProduced} />
              <DetailItem
                label="Capability unlocked"
                value={exp.capabilityUnlocked}
                highlight
              />
            </dl>
          </motion.article>
        ))}
      </div>
    </WorkflowGroup>
  )
}

function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted mb-0.5">
        {label}
      </dt>
      <dd
        className={`text-workflow-secondary leading-relaxed ${
          highlight ? 'text-workflow-blue font-medium' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
