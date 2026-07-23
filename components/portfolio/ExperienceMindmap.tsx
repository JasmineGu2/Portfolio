'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { X, Zap } from 'lucide-react'
import {
  ACCENT_HEX,
  ALL_WORKFLOW_NODES,
  CANVAS_W,
  NODE_H,
  NODE_W,
  SCHOOL_NODE,
  computeFlowLayout,
  edgePath,
  type WorkflowNode,
} from '@/lib/portfolio/workflow-layers'
import { useFitScale } from '@/lib/portfolio/use-mindmap-positions'

function FlowNodeRow({
  node,
  pos,
  active,
  dimmed,
  isSchool,
  onSelect,
  onHover,
}: {
  node: WorkflowNode
  pos: { x: number; y: number }
  active: boolean
  dimmed: boolean
  isSchool?: boolean
  onSelect: () => void
  onHover: (on: boolean) => void
}) {
  const accent = ACCENT_HEX[node.accent]

  return (
    <button
      type="button"
      className={`n8n-node absolute text-left ${active ? 'n8n-node--active' : ''} ${
        isSchool ? 'n8n-node--school' : ''
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        width: NODE_W,
        minHeight: NODE_H,
        opacity: dimmed ? 0.38 : 1,
        borderColor: active ? accent : undefined,
      }}
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      aria-pressed={active}
    >
      <span className="n8n-port n8n-port--top" aria-hidden />
      <span className="n8n-port n8n-port--bottom" aria-hidden />

      <div
        className="n8n-node-icon"
        style={{ backgroundColor: `${accent}20`, borderColor: `${accent}55` }}
      >
        {node.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={node.logo} alt="" className="w-7 h-7 object-contain" />
        ) : (
          <span className="font-playful font-bold text-lg" style={{ color: accent }}>
            {node.logoLetter ?? node.title.slice(0, 1)}
          </span>
        )}
      </div>

      <div className="n8n-node-body min-w-0 flex-1">
        <p className="n8n-node-title">{node.title}</p>
        <p className="n8n-node-sub">{node.subtitle}</p>
      </div>

      <div
        className="n8n-node-pill"
        style={{ backgroundColor: `${accent}18`, color: accent, borderColor: `${accent}40` }}
      >
        <span className="n8n-node-dot" style={{ backgroundColor: accent }} />
        {node.pill}
      </div>

      {isSchool && (
        <span className="n8n-node-trigger">
          <Zap className="w-3 h-3" aria-hidden />
          Start
        </span>
      )}
    </button>
  )
}

function LayerBox({
  layout,
}: {
  layout: { x: number; y: number; width: number; height: number; label: string }
}) {
  return (
    <div
      className="n8n-layer absolute pointer-events-none"
      style={{
        left: layout.x,
        top: layout.y,
        width: layout.width,
        height: layout.height,
      }}
    >
      <div className="n8n-layer-label">{layout.label}</div>
    </div>
  )
}

function DetailPanel({ node, onClose }: { node: WorkflowNode; onClose: () => void }) {
  const accent = ACCENT_HEX[node.accent]

  return (
    <div
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-[24rem] z-[60] n8n-node n8n-node--active shadow-2xl bg-white"
      style={{ borderColor: accent }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div
              className="n8n-node-icon shrink-0"
              style={{ backgroundColor: `${accent}20`, borderColor: `${accent}55` }}
            >
              {node.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={node.logo} alt="" className="w-7 h-7 object-contain" />
              ) : (
                <span className="font-playful font-bold text-lg" style={{ color: accent }}>
                  {node.logoLetter ?? node.title.slice(0, 1)}
                </span>
              )}
            </div>
            <div>
              {node.period && <p className="n8n-node-period mb-0.5">{node.period}</p>}
              <h3 className="n8n-node-title">{node.title}</h3>
              <p className="n8n-node-sub">{node.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--pf-border)] hover:bg-[var(--pf-bio-bg)]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm leading-relaxed text-[var(--pf-muted)] mb-3">{node.story}</p>
        {node.links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold hover:underline"
            style={{ color: accent }}
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ExperienceMindmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const layout = useMemo(() => computeFlowLayout(), [])
  const scale = useFitScale(containerRef, CANVAS_W, layout.canvasHeight)
  const activeId = selectedId ?? hoveredId

  const nodeMap = useMemo(() => {
    const m = new Map<string, WorkflowNode>()
    ALL_WORKFLOW_NODES.forEach((n) => m.set(n.id, n))
    return m
  }, [])

  const isEdgeLit = useCallback(
    (from: string, to: string) => {
      if (!activeId) return true
      const ids = ALL_WORKFLOW_NODES.map((n) => n.id)
      const ai = ids.indexOf(activeId)
      const fi = ids.indexOf(from)
      const ti = ids.indexOf(to)
      return ai >= fi && ai <= ti
    },
    [activeId]
  )

  const isDimmed = useCallback(
    (id: string) => {
      if (!activeId) return false
      const ids = ALL_WORKFLOW_NODES.map((n) => n.id)
      const ai = ids.indexOf(activeId)
      const ni = ids.indexOf(id)
      return Math.abs(ai - ni) > 2
    },
    [activeId]
  )

  return (
    <section id="work-experience" className="scroll-mt-20 border-t border-[var(--pf-border)]">
      <div className="px-6 md:px-10 pt-10 pb-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="pf-keycap-tag pf-pill-sm pf-pill--cream">Workflow</span>
          <span className="pf-keycap-tag pf-pill-sm pf-pill--mint">
            School → Eng → Business → Community
          </span>
        </div>
        <h2 className="font-serif-display text-2xl md:text-3xl text-[var(--pf-ink)]">
          My path so far
        </h2>
        <p className="text-sm text-[var(--pf-muted)] mt-1">
          n8n-style flowchart · click any node for details
        </p>
      </div>

      <div
        ref={containerRef}
        className="n8n-canvas relative w-full overflow-hidden border-y border-[var(--pf-border)]"
        style={{ height: 'min(92vh, 920px)', minHeight: '680px' }}
      >
        <div className="absolute inset-0 flex justify-center p-4 overflow-y-auto">
          <div
            style={{
              width: CANVAS_W * scale,
              height: layout.canvasHeight * scale,
            }}
          >
            <div
              className="relative origin-top-left"
              style={{
                width: CANVAS_W,
                height: layout.canvasHeight,
                transform: `scale(${scale})`,
              }}
            >
              <svg
                className="absolute inset-0 pointer-events-none overflow-visible"
                width={CANVAS_W}
                height={layout.canvasHeight}
                aria-hidden
              >
                {layout.edges.map(({ from, to }) => {
                  const a = layout.nodes[from]
                  const b = layout.nodes[to]
                  if (!a || !b) return null
                  const lit = isEdgeLit(from, to)
                  return (
                    <path
                      key={`${from}-${to}`}
                      d={edgePath(a, b)}
                      fill="none"
                      stroke={lit ? '#111' : '#ccc'}
                      strokeWidth={lit ? 2 : 1.5}
                      opacity={lit ? 1 : 0.35}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )
                })}
              </svg>

              {layout.layers.map((layerLayout) => (
                <LayerBox key={layerLayout.id} layout={layerLayout} />
              ))}

              <FlowNodeRow
                node={SCHOOL_NODE}
                pos={layout.nodes[SCHOOL_NODE.id]}
                active={selectedId === SCHOOL_NODE.id}
                dimmed={isDimmed(SCHOOL_NODE.id)}
                isSchool
                onSelect={() =>
                  setSelectedId(selectedId === SCHOOL_NODE.id ? null : SCHOOL_NODE.id)
                }
                onHover={(on) => setHoveredId(on ? SCHOOL_NODE.id : null)}
              />

              {ALL_WORKFLOW_NODES.filter((n) => n.id !== SCHOOL_NODE.id).map((node) => {
                const pos = layout.nodes[node.id]
                if (!pos) return null
                return (
                  <FlowNodeRow
                    key={node.id}
                    node={node}
                    pos={pos}
                    active={selectedId === node.id}
                    dimmed={isDimmed(node.id)}
                    onSelect={() => setSelectedId(selectedId === node.id ? null : node.id)}
                    onHover={(on) => setHoveredId(on ? node.id : null)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedId && nodeMap.get(selectedId) && (
        <DetailPanel node={nodeMap.get(selectedId)!} onClose={() => setSelectedId(null)} />
      )}
    </section>
  )
}
