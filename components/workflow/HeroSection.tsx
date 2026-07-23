'use client'

import Link from 'next/link'
import { motion } from '@/lib/motion'
import { HERO_COPY } from '@/lib/workflow/workflow-data'
import { TriggerNode } from './TriggerNode'
import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'

interface HeroSectionProps {
  triggerNode: WorkflowNodeData
  triggerState: ExecutionState
  isTriggerActive: boolean
  onRunWorkflow: () => void
}

export function HeroSection({
  triggerNode,
  triggerState,
  isTriggerActive,
  onRunWorkflow,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 py-12 md:py-16"
      aria-labelledby="hero-headline"
    >
      <div className="flex-1 max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-workflow-blue mb-4"
        >
          Systems Orchestrator · Technical Translator
        </motion.p>

        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-workflow-text leading-[1.05] tracking-tight"
        >
          {HERO_COPY.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-workflow-secondary mt-4 leading-relaxed"
        >
          {HERO_COPY.subheadline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-workflow-muted mt-3 leading-relaxed"
        >
          {HERO_COPY.supporting}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <button
            type="button"
            onClick={onRunWorkflow}
            className="px-6 py-3 rounded-xl bg-workflow-blue text-white font-semibold text-sm hover:bg-workflow-blue/90 transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue focus-visible:ring-offset-2"
          >
            {HERO_COPY.primaryCta}
          </button>
          <Link
            href="#execution-history"
            className="px-6 py-3 rounded-xl border border-workflow-border text-workflow-text font-semibold text-sm hover:bg-workflow-powder-light transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue"
          >
            {HERO_COPY.secondaryCta}
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 w-full max-w-sm lg:max-w-md">
        <TriggerNode
          node={triggerNode}
          executionState={triggerState}
          isActive={isTriggerActive}
        />
      </div>

      {/* Screen reader workflow description */}
      <p className="sr-only">
        This portfolio is structured as a multi-agent automation workflow. A
        trigger node receives an ambiguous problem, which flows through context,
        user, product, engineering, and operations agents before routing through
        specialization paths, merging perspectives, and producing a reliable
        outcome orchestrated by Jasmine Gu.
      </p>
    </section>
  )
}
