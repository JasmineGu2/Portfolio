'use client'

import { motion } from '@/lib/motion'
import type { ProjectExecution } from '@/lib/workflow/types'
import { MiniWorkflow } from './MiniWorkflow'
import { WorkflowGroup } from './WorkflowGroup'

interface ProjectExecutionsProps {
  projects: ProjectExecution[]
}

export function ProjectExecutions({ projects }: ProjectExecutionsProps) {
  return (
    <WorkflowGroup
      id="selected-projects"
      title="Selected project executions"
      subtitle="Focused workflows where translation between agents produced measurable outcomes."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-workflow-border/50 bg-workflow-ivory p-5 shadow-sm"
          >
            <span className="font-mono text-[10px] uppercase text-workflow-muted">
              Project execution
            </span>
            <h3 className="text-base font-semibold text-workflow-text mt-1 leading-snug">
              {project.title}
            </h3>
            <div className="mt-3">
              <MiniWorkflow
                agents={project.agents}
                input={project.input}
                output={project.output}
                compact
              />
            </div>
          </motion.article>
        ))}
      </div>
    </WorkflowGroup>
  )
}
