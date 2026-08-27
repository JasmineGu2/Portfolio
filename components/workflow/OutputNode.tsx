'use client'

import { motion } from '@/lib/motion'
import Link from 'next/link'
import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'
import { NodeIcon } from './NodeIcon'
import { ExecutionStatus } from './ExecutionStatus'
import { ExpandableNodePanel } from './ExpandableNodePanel'
import { useState } from 'react'

interface OrchestratorNodeProps {
  node: WorkflowNodeData
  executionState: ExecutionState
  isActive: boolean
}

export function OrchestratorNode({
  node,
  executionState,
  isActive,
}: OrchestratorNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = WORKFLOW_COLORS[node.color]
  const labels = node.connectedLabels ?? []
  const primaryLabels = labels.slice(0, 3)
  const operationsLabel = labels[3]

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full max-w-xl mx-auto"
      aria-labelledby="orchestrator-title"
    >
      {/* Hub layout, Jasmine at intersection of Users, Products, Technical Systems */}
      <div className="relative mb-6 hidden md:block" aria-hidden>
        <div className="flex justify-center mb-3">
          <HubLabel label={primaryLabels[0] ?? 'Users'} position="top" active={isActive} />
        </div>
        <div className="flex items-center justify-between gap-4 px-4">
          <HubLabel label={primaryLabels[1] ?? 'Products'} position="left" active={isActive} />
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-workflow-blue/40 flex items-center justify-center bg-workflow-powder-light/50">
            <span className="text-[10px] font-bold text-workflow-blue text-center leading-tight px-1">
              Translation hub
            </span>
          </div>
          <HubLabel
            label={primaryLabels[2] ?? 'Technical Systems'}
            position="right"
            active={isActive}
          />
        </div>
        {operationsLabel && (
          <div className="flex justify-center mt-3">
            <HubLabel label={operationsLabel} position="bottom" active={isActive} small />
          </div>
        )}
        {/* Connector lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" aria-hidden>
          <line x1="50%" y1="18%" x2="50%" y2="42%" stroke="#7D8CA3" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          <line x1="22%" y1="50%" x2="38%" y2="50%" stroke="#7D8CA3" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          <line x1="62%" y1="50%" x2="78%" y2="50%" stroke="#7D8CA3" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          <line x1="50%" y1="58%" x2="50%" y2="78%" stroke="#7D8CA3" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        </svg>
      </div>

      {/* Mobile labels */}
      <div className="flex flex-wrap gap-2 mb-4 md:hidden justify-center">
        {labels.map((label) => (
          <span
            key={label}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-workflow-blue/30 text-workflow-blue bg-workflow-powder-light"
          >
            {label}
          </span>
        ))}
      </div>

      <div
        className={`relative rounded-2xl border-2 bg-workflow-ivory p-6 md:p-8 shadow-lg transition-all ${
          isActive ? 'ring-4 ring-workflow-blue/20' : ''
        }`}
        style={{
          borderColor: colors.border,
          boxShadow: `0 12px 40px ${colors.light}`,
        }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-workflow-blue text-white text-xs font-semibold">
          Systems Orchestrator
        </div>

        <div className="flex items-center justify-between mb-3 mt-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: colors.light }}
          >
            <NodeIcon name="orchestrator" className="w-6 h-6" color={colors.accent} />
          </div>
          <ExecutionStatus state={executionState} />
        </div>

        <h3
          id="orchestrator-title"
          className="text-xl md:text-2xl font-bold text-workflow-text"
        >
          {node.title}
        </h3>
        <p className="text-sm font-medium text-workflow-blue mt-1">
          {node.description}
        </p>
        {node.subtitle && (
          <p className="text-sm text-workflow-muted mt-0.5">{node.subtitle}</p>
        )}

        {node.body && (
          <p className="text-sm text-workflow-secondary mt-4 leading-relaxed">
            {node.body}
          </p>
        )}

        {node.coreStatement && (
          <blockquote className="mt-4 pl-4 border-l-4 border-workflow-coral">
            <p className="text-lg font-semibold text-workflow-text italic">
              {node.coreStatement}
            </p>
            {node.supportingStatement && (
              <p className="text-sm text-workflow-secondary mt-1">
                {node.supportingStatement}
              </p>
            )}
          </blockquote>
        )}

        {labels[3] && (
          <span className="inline-block mt-3 text-xs px-2 py-1 rounded border border-workflow-sand text-workflow-sand font-medium md:hidden">
            {labels[3]}
          </span>
        )}

        {node.details && (
          <ExpandableNodePanel
            details={node.details}
            isOpen={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        )}
      </div>
    </motion.article>
  )
}

function HubLabel({
  label,
  position,
  active,
  small = false,
}: {
  label: string
  position: 'top' | 'left' | 'right' | 'bottom'
  active: boolean
  small?: boolean
}) {
  return (
    <span
      className={`font-semibold rounded-full border text-workflow-blue bg-workflow-powder-light transition-all ${
        small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1.5'
      } ${
        active
          ? 'border-workflow-blue shadow-sm ring-2 ring-workflow-blue/20'
          : 'border-workflow-blue/30'
      }`}
      data-position={position}
    >
      {label}
    </span>
  )
}

interface OutputNodeProps {
  node: WorkflowNodeData
  executionState: ExecutionState
  isActive: boolean
}

export function OutputNode({ node, executionState, isActive }: OutputNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = WORKFLOW_COLORS[node.color]

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto"
      aria-labelledby="output-title"
    >
      <div
        className={`rounded-2xl border bg-workflow-ivory p-6 shadow-md ${
          isActive ? 'ring-2 ring-workflow-coral/40' : ''
        }`}
        style={{ borderColor: `${colors.border}88` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <NodeIcon name="check-circle" color={colors.accent} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted">
              Output / Response
            </span>
          </div>
          <ExecutionStatus state={executionState} />
        </div>

        <h3 id="output-title" className="text-xl font-bold text-workflow-text">
          {node.title}
        </h3>
        <p className="text-base font-medium text-workflow-blue mt-2">
          {node.description}
        </p>

        {node.secondaryOutputs && (
          <ul className="mt-4 space-y-1.5">
            {node.secondaryOutputs.map((out) => (
              <li
                key={out}
                className="text-sm text-workflow-secondary flex items-start gap-2"
              >
                <span className="text-workflow-coral font-mono text-xs mt-0.5">
                  ✓
                </span>
                {out}
              </li>
            ))}
          </ul>
        )}

        {node.targetRoles && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase text-workflow-muted mb-2">
              Target roles
            </p>
            <div className="flex flex-wrap gap-1.5">
              {node.targetRoles.map((role) => (
                <span
                  key={role}
                  className="text-xs px-2 py-1 rounded-full bg-workflow-powder-light text-workflow-text font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {node.finalLine && (
          <p className="mt-4 text-sm font-semibold italic text-workflow-text">
            {node.finalLine}
          </p>
        )}

        {node.buttons && (
          <div className="mt-5 flex flex-wrap gap-2">
            {node.buttons.map((btn) =>
              btn.external ? (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg border border-workflow-blue text-workflow-blue hover:bg-workflow-powder-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue"
                >
                  {btn.label}
                </a>
              ) : (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="text-xs px-3 py-1.5 rounded-lg border border-workflow-blue text-workflow-blue hover:bg-workflow-powder-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue"
                >
                  {btn.label}
                </Link>
              )
            )}
          </div>
        )}

        {node.details && (
          <ExpandableNodePanel
            details={node.details}
            isOpen={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        )}
      </div>
    </motion.article>
  )
}
