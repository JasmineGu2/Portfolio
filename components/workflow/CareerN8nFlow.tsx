'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateCcw, X, Zap } from 'lucide-react'
import type { StoryStep } from '@/lib/workflow/story-narrative'
import {
  GRAPH_CANVAS,
  GRAPH_EDGES,
  GRAPH_NODES,
  MAIN_Y,
  STAGE_LABELS,
  type GraphNode,
  edgesForNode,
  getPortPoint,
  isEdgeLit,
  smoothStepPath,
} from '@/lib/workflow/flow-graph'
import { TIMELINE_YEARS } from '@/lib/workflow/flow-visual'
import {
  N8nConfigurationNode,
  N8nDefaultNode,
  N8nStickyNode,
  N8N_NODE_SIZE,
} from '@/components/workflow/n8n/N8nNodes'

function MilestoneNode({
  node,
  step,
  active,
  dimmed,
  onHover,
  onSelect,
}: {
  node: GraphNode
  step: StoryStep
  active: boolean
  dimmed: boolean
  onHover: (on: boolean) => void
  onSelect: () => void
}) {
  return (
    <div
      className="absolute transition-opacity duration-150"
      style={{
        left: node.x,
        top: node.y,
        width: N8N_NODE_SIZE.w,
        opacity: dimmed ? 0.28 : 1,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <N8nDefaultNode
        step={step}
        active={active}
        isTrigger={step.id === 'education'}
        isRunning={node.isCurrent}
        onClick={onSelect}
      />
      {active && step.outcome && (
        <p
          className="absolute left-1/2 -translate-x-1/2 text-[10px] text-[var(--color--primary)] text-center truncate pointer-events-none whitespace-nowrap"
          style={{ top: '100%', marginTop: '3.5rem' }}
        >
          → {step.outcome}
        </p>
      )}
    </div>
  )
}

function ProjectNode({
  label,
  active,
  dimmed,
  onHover,
  onSelect,
  x,
  y,
}: {
  label: string
  active: boolean
  dimmed: boolean
  onHover: (on: boolean) => void
  onSelect: () => void
  x: number
  y: number
}) {
  return (
    <div
      className="absolute transition-opacity duration-150"
      style={{ left: x, top: y, opacity: dimmed ? 0.22 : 0.9 }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <N8nStickyNode label={label} active={active} onClick={onSelect} />
    </div>
  )
}

function RouterNode({
  node,
  active,
  dimmed,
  onHover,
  onSelect,
}: {
  node: GraphNode
  active: boolean
  dimmed: boolean
  onHover: (on: boolean) => void
  onSelect: () => void
}) {
  return (
    <div
      className="absolute transition-opacity duration-150"
      style={{
        left: node.x,
        top: node.y,
        opacity: dimmed ? 0.28 : 1,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <N8nConfigurationNode
        label={node.label}
        active={active}
        onClick={onSelect}
      />
    </div>
  )
}

function FlowEdges({
  activeId,
}: {
  activeId: string | null
}) {
  const hasActive = activeId !== null

  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      width={GRAPH_CANVAS.width}
      height={GRAPH_CANVAS.height}
      aria-hidden
    >
      <defs>
        <marker
          id="flow-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L6,3.5 L0,7" fill="var(--node--type-main--color)" />
        </marker>
        <marker
          id="flow-arrow-lit"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L6,3.5 L0,7" fill="var(--color--primary)" />
        </marker>
      </defs>
      {GRAPH_EDGES.map((edge) => {
        const from = getPortPoint(edge.from, edge.fromPort)
        const to = getPortPoint(edge.to, edge.toPort)
        if (!from || !to) return null
        const lit = isEdgeLit(edge, activeId)
        const dim = hasActive && !lit
        const isMain = edge.kind === 'main'

        return (
          <path
            key={edge.id}
            d={smoothStepPath(from.x, from.y, to.x, to.y)}
            className={
              isMain
                ? lit
                  ? 'n8n-edge-main n8n-edge-main--lit'
                  : 'n8n-edge-main'
                : lit
                  ? 'n8n-edge-branch n8n-edge-branch--lit'
                  : 'n8n-edge-branch'
            }
            strokeOpacity={dim ? 0.1 : undefined}
            markerEnd={
              isMain && !dim
                ? lit
                  ? 'url(#flow-arrow-lit)'
                  : 'url(#flow-arrow)'
                : undefined
            }
          />
        )
      })}
    </svg>
  )
}

function StageAxis() {
  const y = GRAPH_CANVAS.height - 32
  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      width={GRAPH_CANVAS.width}
      height={GRAPH_CANVAS.height}
      aria-hidden
    >
      <line
        x1={20}
        y1={y}
        x2={GRAPH_CANVAS.width - 20}
        y2={y}
        stroke="var(--n8n-border)"
        strokeOpacity={0.35}
      />
      <polygon
        points={`${GRAPH_CANVAS.width - 20},${y} ${GRAPH_CANVAS.width - 28},${y - 4} ${GRAPH_CANVAS.width - 28},${y + 4}`}
        fill="var(--n8n-dim)"
        fillOpacity={0.6}
      />
      {STAGE_LABELS.map((s) => (
        <text
          key={s.label}
          x={s.x}
          y={y + 16}
          fill="var(--n8n-dim)"
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
        >
          {s.label}
        </text>
      ))}
      {TIMELINE_YEARS.map((year, i) => (
        <text
          key={year}
          x={60 + i * 260}
          y={18}
          fill="var(--n8n-dim)"
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          opacity={0.7}
        >
          {year}
        </text>
      ))}
    </svg>
  )
}

function InspectorPanel({
  step,
  node,
  onClose,
}: {
  step: StoryStep | null
  node: GraphNode
  onClose: () => void
}) {
  if (node.kind === 'router') {
    return (
      <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-n8n-border bg-n8n-panel flex flex-col">
        <div className="flex items-start justify-between gap-3 p-4 border-b border-n8n-border">
          <div>
            <p className="font-semibold text-n8n-text text-sm">Autodesk</p>
            <p className="text-xs text-n8n-muted mt-0.5">
              Engineering → Product split
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-n8n-dim hover:text-n8n-text"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 text-sm text-n8n-text leading-relaxed">
          Started in full-stack engineering on Fusion libraries, then moved into
          platform PM for data products — building and shaping the same
          platform from two sides.
        </div>
      </aside>
    )
  }

  if (!step) return null

  return (
    <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-n8n-border bg-n8n-panel flex flex-col max-h-[50vh] lg:max-h-none">
      <div className="flex items-start justify-between gap-3 p-4 border-b border-n8n-border">
        <div className="min-w-0">
          <p className="font-semibold text-n8n-text text-sm leading-snug">
            {step.flowRole ?? step.role}
          </p>
          <p className="text-xs text-n8n-muted mt-0.5">
            {step.company} · {step.period}
          </p>
          {node.category && (
            <p className="mt-2 text-[10px] font-mono uppercase tracking-wide text-n8n-dim">
              {node.category}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded text-n8n-dim hover:text-n8n-text"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <p className="text-[11px] text-n8n-muted mb-2">{step.tag}</p>
        <p className="text-sm text-n8n-text leading-relaxed">{step.story}</p>
        {step.outcome && (
          <p className="text-xs font-mono text-n8n-accent mt-3">
            → {step.outcome}
          </p>
        )}
        {step.links && (
          <div className="flex flex-wrap gap-2 mt-4">
            {step.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-n8n-accent hover:underline"
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

interface CareerN8nFlowProps {
  steps: StoryStep[]
}

export function CareerN8nFlow({ steps }: CareerN8nFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const stepMap = Object.fromEntries(steps.map((s) => [s.id, s]))
  const activeId = hoveredId ?? selectedId
  const selectedNode = selectedId
    ? GRAPH_NODES.find((n) => n.id === selectedId)
    : null
  const selectedStep = selectedNode
    ? selectedNode.kind === 'router'
      ? null
      : stepMap[selectedNode.stepId]
    : null

  const fit = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const pad = 32
    const sx = (el.clientWidth - pad) / GRAPH_CANVAS.width
    const sy = (el.clientHeight - pad) / GRAPH_CANVAS.height
    setScale(Math.min(sx, sy, 1))
  }, [])

  useEffect(() => {
    fit()
    const ro = new ResizeObserver(fit)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [fit])

  const nodeLabel = (node: GraphNode, step: StoryStep) => {
    if (node.label) return node.label
    if (node.kind === 'project' && node.id.startsWith('branch-')) {
      return step.tag
    }
    return step.flowRole ?? step.role
  }

  const isDimmed = (nodeId: string) => {
    if (!activeId) return false
    if (nodeId === activeId) return false
    const related = new Set<string>([activeId])
    edgesForNode(activeId).forEach((e) => {
      related.add(e.from)
      related.add(e.to)
    })
    return !related.has(nodeId)
  }

  return (
    <section id="workflow" className="scroll-mt-8 border-t border-n8n-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-n8n-dim mb-1">
            How I got here
          </h2>
          <p className="text-sm text-n8n-muted">
            Main path left → right · branches are projects & side roles · click
            for details
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedId(null)
            fit()
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-n8n-border text-n8n-muted hover:text-n8n-text hover:bg-n8n-node text-xs shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset view
        </button>
      </div>

      <div className="flex flex-col lg:flex-row border-y border-n8n-border">
        <div
          ref={containerRef}
          className="canvas-grid-n8n flex-1 overflow-x-auto relative min-h-[420px] lg:min-h-[500px]"
        >
          <div className="flex items-center justify-center min-w-max p-8">
            <div
              style={{
                width: GRAPH_CANVAS.width * scale,
                height: GRAPH_CANVAS.height * scale,
              }}
            >
              <div
                className="relative origin-top-left"
                style={{
                  width: GRAPH_CANVAS.width,
                  height: GRAPH_CANVAS.height,
                  transform: `scale(${scale})`,
                }}
              >
                <StageAxis />
                <FlowEdges activeId={activeId} />
                {GRAPH_NODES.map((node) => {
                  const step = stepMap[node.stepId]
                  if (!step) return null
                  const active = activeId === node.id
                  const dimmed = isDimmed(node.id)
                  const hoverProps = {
                    onHover: (on: boolean) =>
                      setHoveredId(on ? node.id : null),
                    onSelect: () =>
                      setSelectedId(selectedId === node.id ? null : node.id),
                  }

                  if (node.kind === 'router') {
                    return (
                      <RouterNode
                        key={node.id}
                        node={node}
                        active={active}
                        dimmed={dimmed}
                        {...hoverProps}
                      />
                    )
                  }
                  if (node.kind === 'project') {
                    return (
                      <ProjectNode
                        key={node.id}
                        x={node.x}
                        y={node.y}
                        label={nodeLabel(node, step)}
                        active={active}
                        dimmed={dimmed}
                        onHover={hoverProps.onHover}
                        onSelect={hoverProps.onSelect}
                      />
                    )
                  }
                  return (
                    <MilestoneNode
                      key={node.id}
                      node={node}
                      step={step}
                      active={active}
                      dimmed={dimmed}
                      {...hoverProps}
                    />
                  )
                })}
                <Zap
                  className="absolute text-n8n-trigger fill-n8n-trigger pointer-events-none"
                  style={{ left: 4, top: MAIN_Y + 20 }}
                  width={14}
                  height={14}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        {selectedNode && (selectedStep || selectedNode.kind === 'router') && (
          <InspectorPanel
            step={selectedStep}
            node={selectedNode}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </section>
  )
}
