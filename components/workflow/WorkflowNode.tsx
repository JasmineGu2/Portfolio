'use client'

import { useState } from 'react'
import { motion } from '@/lib/motion'
import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'
import { NodeIcon } from './NodeIcon'
import { ExecutionStatus } from './ExecutionStatus'
import { ExpandableNodePanel } from './ExpandableNodePanel'

interface WorkflowNodeProps {
  node: WorkflowNodeData
  executionState?: ExecutionState
  isActive?: boolean
  children?: React.ReactNode
  className?: string
  highlight?: boolean
}

export function WorkflowNode({
  node,
  executionState = 'idle',
  isActive = false,
  children,
  className = '',
  highlight = false,
}: WorkflowNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = WORKFLOW_COLORS[node.color]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className={`relative workflow-node ${className}`}
      data-node-id={node.id}
      aria-labelledby={`node-title-${node.id}`}
    >
      {/* Input port */}
      <div
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-workflow-connector bg-workflow-ivory z-10"
        aria-hidden
      />

      <div
        role="group"
        tabIndex={0}
        aria-label={`${node.title} workflow node`}
        className={`relative rounded-xl border bg-workflow-ivory shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-workflow-blue/40 outline-none ${
          isActive
            ? 'shadow-md ring-2 ring-workflow-blue/30'
            : highlight
              ? 'shadow-lg ring-1 ring-workflow-blue/20'
              : ''
        }`}
        style={{
          borderColor: isActive ? colors.border : `${colors.border}55`,
          boxShadow: isActive
            ? `0 4px 24px ${colors.light}`
            : highlight
              ? `0 8px 32px ${colors.light}`
              : undefined,
        }}
      >
        {/* Colored header accent */}
        <div
          className="h-1 rounded-t-xl"
          style={{ backgroundColor: colors.accent }}
          aria-hidden
        />

        <div className="p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: colors.light }}
              >
                <NodeIcon name={node.icon} color={colors.accent} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted">
                {node.categoryLabel}
              </span>
            </div>
            <ExecutionStatus state={executionState} />
          </div>

          <h3
            id={`node-title-${node.id}`}
            className="text-base md:text-lg font-semibold text-workflow-text leading-tight"
          >
            {node.title}
          </h3>

          {node.subtitle && (
            <p className="text-xs text-workflow-muted mt-1 leading-relaxed">
              {node.subtitle}
            </p>
          )}

          <p className="text-sm text-workflow-secondary mt-2 leading-relaxed">
            {node.description}
          </p>

          {node.inputTags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {node.inputTags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-workflow-border text-workflow-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(node.input || node.output) && (
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
              {node.input && (
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] uppercase text-workflow-muted shrink-0">
                    In
                  </span>
                  <span className="text-workflow-secondary">{node.input}</span>
                </div>
              )}
              {node.output && (
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] uppercase text-workflow-muted shrink-0">
                    Out
                  </span>
                  <span className="text-workflow-secondary">{node.output}</span>
                </div>
              )}
            </div>
          )}

          {node.responsibilities && (
            <ul className="mt-3 space-y-1">
              {node.responsibilities.slice(0, 3).map((r) => (
                <li
                  key={r}
                  className="text-xs text-workflow-secondary flex items-start gap-1.5"
                >
                  <span className="text-workflow-connector mt-0.5" aria-hidden>
                    ›
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          )}

          {node.experienceRefs && (
            <div className="mt-3 flex flex-wrap gap-1">
              {node.experienceRefs.map((ref) => (
                <span
                  key={ref}
                  className="text-[10px] px-2 py-0.5 rounded bg-workflow-powder-light text-workflow-blue font-medium"
                >
                  {ref}
                </span>
              ))}
            </div>
          )}

          {node.details && (
            <ExpandableNodePanel
              details={node.details}
              isOpen={expanded}
              onToggle={() => setExpanded(!expanded)}
            />
          )}

          {children}
        </div>
      </div>

      {/* Output port */}
      <div
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-workflow-connector bg-workflow-ivory z-10"
        aria-hidden
      />
    </motion.article>
  )
}
