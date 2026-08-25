'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import {
  ArchitectureConnectors,
  getRelatedNodeIds,
} from '@/components/portfolio/architecture/ArchitectureConnectors'
import { ArchitectureNodeRenderer } from '@/components/portfolio/architecture/ArchitectureNodes'
import { ExperienceLevelMatrix } from '@/components/portfolio/architecture/ExperienceLevelMatrix'
import { useArchitectureFlow } from '@/components/portfolio/architecture/useArchitectureFlow'
import { FLOW_Y_MAX } from '@/components/portfolio/architecture/architecture-flow-utils'
import {
  ARCHITECTURE_NODES,
  ARCHITECTURE_STAGE_ORDER,
  getStageMeta,
} from '@/lib/portfolio/abstraction-engine-data'
import { cn } from '@/lib/utils'

/** First node y per stage — anchors compact level pills. */
const STAGE_ANCHOR_Y: Record<string, number> = {
  automation: 2,
  'zero-to-one': 13,
  interface: 22,
  system: 31,
  platform: 41,
  product: 51,
  'zoom-narrative': 62,
  runtime: 68,
  tools: 74,
  memory: 78,
  outputs: 86,
  loop: 91,
  payoff: 96,
}

export function ArchitectureFlow() {
  const { traceIds } = usePortfolioState()
  const flow = useArchitectureFlow()
  const canvasRef = useRef<HTMLDivElement>(null)
  const nodeElements = useRef<Map<string, HTMLDivElement>>(new Map())
  const nodeRefCallbacks = useRef<Map<string, (el: HTMLElement | null) => void>>(new Map())
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null)
  const [layoutRevision, setLayoutRevision] = useState(0)

  const relatedNodeIds = useMemo(
    () => getRelatedNodeIds(flow.hoveredNodeId),
    [flow.hoveredNodeId]
  )

  const getNodeRef = useCallback((id: string) => {
    let cb = nodeRefCallbacks.current.get(id)
    if (!cb) {
      cb = (el: HTMLElement | null) => {
        const map = nodeElements.current
        if (el) {
          if (map.get(id) === el) return
          map.set(id, el as HTMLDivElement)
        } else {
          if (!map.has(id)) return
          map.delete(id)
        }
        setLayoutRevision((n) => n + 1)
      }
      nodeRefCallbacks.current.set(id, cb)
    }
    return cb
  }, [])

  const measureCanvas = useCallback(() => {
    if (canvasRef.current) {
      setCanvasRect(canvasRef.current.getBoundingClientRect())
    }
  }, [])

  useEffect(() => {
    measureCanvas()
    window.addEventListener('resize', measureCanvas)
    window.addEventListener('scroll', measureCanvas, { passive: true })
    return () => {
      window.removeEventListener('resize', measureCanvas)
      window.removeEventListener('scroll', measureCanvas)
    }
  }, [measureCanvas])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new ResizeObserver(() => {
      measureCanvas()
      setLayoutRevision((n) => n + 1)
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [measureCanvas])

  return (
    <section className="arch-section arch-section--light arch-section--engine" id="arch-abstraction">
      <div className="arch-container arch-container--engine">
        <p className="arch-eyebrow font-analogue">ABSTRACTION ENGINE</p>
        <h2 className="arch-section__title font-bootzy">
          Different experiences trained different parts of how I work.
        </h2>
        <p className="arch-section__sub font-awesome-shorten">
          Each role trained a different layer — from automating tasks to shaping product direction.
        </p>

        <div className="arch-level-matrix-section">
          <p className="arch-level-matrix-section__label font-analogue">Level map</p>
          <ExperienceLevelMatrix />
        </div>

        <div className="architecture-flow">
          <div className="architecture-flow__viewport">
            <div className="architecture-flow__canvas" ref={canvasRef}>
              <ArchitectureConnectors
                nodeElements={nodeElements.current}
                layoutRevision={layoutRevision}
                canvasRect={canvasRect}
                activeStageIndex={flow.activeStageIndex}
                stageProgress={flow.stageProgress}
                hoveredNodeId={flow.hoveredNodeId}
                hoveredEdgeId={flow.hoveredEdgeId}
                onEdgeHover={flow.setHoveredEdgeId}
                relatedNodeIds={relatedNodeIds}
              />

              {ARCHITECTURE_STAGE_ORDER.map((stageId, stageIndex) => {
                const meta = getStageMeta(stageId)
                const anchorY = STAGE_ANCHOR_Y[stageId] ?? 0
                const isActive = flow.activeStageIndex === stageIndex
                const isPayoffStage = stageIndex === ARCHITECTURE_STAGE_ORDER.length - 1

                return (
                  <div
                    key={stageId}
                    className={cn(
                      'architecture-flow__stage-pill font-analogue',
                      isActive && 'architecture-flow__stage-pill--active'
                    )}
                    style={{
                      top: `${(anchorY / FLOW_Y_MAX) * 100}%`,
                    }}
                    ref={(el) => {
                      flow.registerStageMarker(stageIndex, el)
                      if (isPayoffStage) flow.registerPayoff(el)
                    }}
                    data-stage-index={stageIndex}
                  >
                    {meta && (
                      <>
                        <span className="architecture-flow__stage-pill-level">{meta.level}</span>
                        <span className="architecture-flow__stage-pill-sep" aria-hidden>
                          /
                        </span>
                        <span className="architecture-flow__stage-pill-label">{meta.label}</span>
                      </>
                    )}
                  </div>
                )
              })}

              <div className="architecture-flow__nodes" aria-label="Agent architecture diagram">
                {ARCHITECTURE_NODES.map((node) => {
                  const traced =
                    node.experienceId != null && traceIds.includes(node.experienceId)
                  const highlighted =
                    flow.hoveredNodeId === node.id ||
                    (flow.hoveredNodeId != null && relatedNodeIds.has(node.id))
                  const dimmed =
                    flow.hoveredNodeId != null &&
                    !relatedNodeIds.has(node.id) &&
                    flow.hoveredNodeId !== node.id

                  return (
                    <div
                      key={node.id}
                      className="architecture-flow__node-wrap"
                      style={{
                        left: `${node.x}%`,
                        top: `${(node.y / FLOW_Y_MAX) * 100}%`,
                      }}
                    >
                      <ArchitectureNodeRenderer
                        node={node}
                        traced={traced}
                        dimmed={dimmed}
                        highlighted={highlighted}
                        onHover={flow.setHoveredNodeId}
                        nodeRef={getNodeRef(node.id)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
