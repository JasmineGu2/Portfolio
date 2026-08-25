'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ArchitectureNode, ArchitecturePort } from '@/lib/portfolio/abstraction-engine-data'
import { getExperienceForStage } from '@/lib/portfolio/abstraction-engine-data'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { cn } from '@/lib/utils'

const PORTS: ArchitecturePort[] = ['top', 'bottom', 'left', 'right']

interface FlowNodeProps {
  node: ArchitectureNode
  traced?: boolean
  dimmed?: boolean
  highlighted?: boolean
  onHover?: (id: string | null) => void
  nodeRef?: (el: HTMLElement | null) => void
}

function ConnectionPorts({ ports }: { ports?: Partial<Record<ArchitecturePort, boolean>> }) {
  if (!ports) return null
  return (
    <>
      {PORTS.filter((port) => ports[port]).map((port) => (
        <span
          key={port}
          className={cn('arch-flow-port', `arch-flow-port--${port}`)}
          aria-hidden
        />
      ))}
    </>
  )
}

export function ExperienceFlowNode({
  node,
  traced,
  dimmed,
  highlighted,
  onHover,
  nodeRef,
}: FlowNodeProps) {
  const exp = node.experienceId
    ? getExperienceForStage(node.experienceId as WorkId)
    : null

  const inner = (
    <>
      <ConnectionPorts ports={node.ports} />
      <span className="arch-flow-node__head">
        <span className="arch-flow-node__label font-analogue">{node.label}</span>
        {exp && <ArrowUpRight className="arch-flow-node__arrow h-3 w-3" aria-hidden />}
      </span>
      {exp && <span className="arch-flow-node__role font-analogue">{exp.role}</span>}
      {node.metadata?.evidence && (
        <span className="arch-flow-node__meta font-analogue">{node.metadata.evidence}</span>
      )}
    </>
  )

  const className = cn(
    'arch-flow-node arch-flow-node--experience',
    traced && 'arch-flow-node--traced',
    dimmed && 'arch-flow-node--dimmed',
    highlighted && 'arch-flow-node--highlighted'
  )

  if (exp) {
    return (
      <Link
        href={exp.href}
        className={className}
        data-node-id={node.id}
        ref={nodeRef}
        onMouseEnter={() => onHover?.(node.id)}
        onMouseLeave={() => onHover?.(null)}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      className={className}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {inner}
    </div>
  )
}

export function ConceptFlowNode(props: FlowNodeProps) {
  const { node, dimmed, highlighted, onHover, nodeRef } = props
  const meta = node.metadata ?? {}
  const isRich =
    meta.variant === 'input' ||
    meta.variant === 'capability' ||
    meta.variant === 'memory' ||
    meta.variant === 'stack' ||
    meta.variant === 'payoff' ||
    Boolean(meta.desc || meta.items || meta.entered)

  return (
    <div
      className={cn(
        'arch-flow-node arch-flow-node--concept font-analogue',
        isRich && 'arch-flow-node--concept-rich',
        dimmed && 'arch-flow-node--dimmed',
        highlighted && 'arch-flow-node--highlighted'
      )}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <ConnectionPorts ports={node.ports} />
      {meta.experience && (
        <span className="arch-flow-node__meta font-analogue">{meta.experience}</span>
      )}
      <span className="arch-flow-node__label">{node.label}</span>
      {meta.entered && (
        <span className="arch-flow-node__meta font-analogue">{meta.entered}</span>
      )}
      {meta.desc && (
        <span className="arch-flow-node__meaning font-awesome-shorten">{meta.desc}</span>
      )}
      {meta.items && (
        <span className="arch-flow-node__meta font-analogue">{meta.items}</span>
      )}
      {meta.status && (
        <span className="arch-flow-node__meta font-analogue">{meta.status}</span>
      )}
    </div>
  )
}

export function QuestionFlowNode(props: FlowNodeProps) {
  const { node, dimmed, highlighted, onHover, nodeRef } = props
  return (
    <div
      className={cn(
        'arch-flow-node arch-flow-node--question font-awesome-shorten',
        dimmed && 'arch-flow-node--dimmed',
        highlighted && 'arch-flow-node--highlighted'
      )}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <ConnectionPorts ports={node.ports} />
      <span className="arch-flow-node__question-tag font-analogue">Input</span>
      {node.label}
    </div>
  )
}

export function OutputFlowNode(props: FlowNodeProps) {
  const { node, dimmed, highlighted, onHover, nodeRef } = props
  const isArtifact = node.metadata?.variant === 'artifact'

  return (
    <div
      className={cn(
        'arch-flow-node arch-flow-node--output',
        isArtifact && 'arch-flow-node--output-artifact',
        dimmed && 'arch-flow-node--dimmed',
        highlighted && 'arch-flow-node--highlighted'
      )}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <ConnectionPorts ports={node.ports} />
      {!isArtifact && (
        <span className="arch-flow-node__unlock-status font-analogue">Unlocked</span>
      )}
      {isArtifact && (
        <span className="arch-flow-node__unlock-status font-analogue">Output</span>
      )}
      <span className="arch-flow-node__unlock-keyword font-analogue">{node.label}</span>
      {node.metadata?.meaning && (
        <span className="arch-flow-node__meaning font-awesome-shorten">{node.metadata.meaning}</span>
      )}
      {node.metadata?.examples && (
        <span className="arch-flow-node__meta font-analogue">{node.metadata.examples}</span>
      )}
    </div>
  )
}

export function AgentStateFlowNode(props: FlowNodeProps) {
  const { node, dimmed, highlighted, onHover, nodeRef } = props
  const meta = node.metadata ?? {}

  return (
    <div
      className={cn(
        'arch-flow-node arch-flow-node--agent font-analogue',
        dimmed && 'arch-flow-node--dimmed',
        highlighted && 'arch-flow-node--highlighted'
      )}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <ConnectionPorts ports={node.ports} />
      <div className="arch-flow-agent__grid">
        {(['ROLE', 'TASK', 'SCOPE', 'INPUT'] as const).map((key) =>
          meta[key] ? (
            <div key={key} className="arch-flow-agent__field">
              <span className="arch-flow-agent__key">{key}</span>
              <span className="arch-flow-agent__val">{meta[key]}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export function ArchitectureNodeRenderer(props: FlowNodeProps) {
  switch (props.node.type) {
    case 'experience':
      return <ExperienceFlowNode {...props} />
    case 'tool':
      return <ToolFlowNode {...props} />
    case 'concept':
      return <ConceptFlowNode {...props} />
    case 'question':
      return <QuestionFlowNode {...props} />
    case 'output':
      return <OutputFlowNode {...props} />
    case 'agent':
      return <AgentStateFlowNode {...props} />
    default:
      return <ConceptFlowNode {...props} />
  }
}

function ToolFlowNode(props: FlowNodeProps) {
  const { node, dimmed, highlighted, onHover, nodeRef } = props
  return (
    <div
      className={cn(
        'arch-flow-node arch-flow-node--tool font-analogue',
        dimmed && 'arch-flow-node--dimmed',
        highlighted && 'arch-flow-node--highlighted'
      )}
      data-node-id={node.id}
      ref={nodeRef}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <ConnectionPorts ports={node.ports} />
      <span className="arch-flow-node__label">{node.label}</span>
      {node.metadata?.tools && (
        <span className="arch-flow-node__meta font-analogue">{node.metadata.tools}</span>
      )}
    </div>
  )
}
