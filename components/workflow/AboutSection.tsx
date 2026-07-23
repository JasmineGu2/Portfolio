'use client'

import { motion } from '@/lib/motion'
import { ABOUT_COPY } from '@/lib/workflow/workflow-data'
import { WorkflowGroup } from './WorkflowGroup'

export function AboutSection() {
  return (
    <WorkflowGroup id="about" title={ABOUT_COPY.title}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl rounded-xl border border-workflow-border/50 bg-workflow-ivory p-6 md:p-8 shadow-sm"
      >
        <p className="text-base md:text-lg text-workflow-secondary leading-relaxed">
          {ABOUT_COPY.body}
        </p>
        <p className="text-base text-workflow-secondary leading-relaxed mt-4">
          {ABOUT_COPY.closing}
        </p>
        <blockquote className="mt-6 pl-4 border-l-4 border-workflow-coral">
          <p className="text-xl font-bold text-workflow-text italic">
            {ABOUT_COPY.statement}
          </p>
        </blockquote>
      </motion.div>
    </WorkflowGroup>
  )
}
