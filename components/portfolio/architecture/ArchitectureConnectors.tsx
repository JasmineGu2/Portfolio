'use client'

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  ARCHITECTURE_EDGES,
  ARCHITECTURE_RELATIONSHIP_LABELS,
  type ArchitectureEdge,
} from '@/lib/portfolio/abstraction-engine-data'
import {
  buildOrthogonalPath,
  getConnectorAccentMix,
  getConnectorOpacity,
  portOffset,
  type Point,
} from '@/components/portfolio/architecture/architecture-flow-utils'
import { cn } from '@/lib/utils'

interface ConnectorPath {
  edge: ArchitectureEdge
  d: string
  length: number
  midX: number
  midY: number
}

interface ArchitectureConnectorsProps {
  nodeElements: Map<string, HTMLDivElement>
  layoutRevision: number
  canvasRect: DOMRect | null
  activeStageIndex: number
  stageProgress: number[]
  hoveredNodeId: string | null
  hoveredEdgeId: string | null
  onEdgeHover: (id: string | null) => void
  relatedNodeIds: Set<string>
}

export function ArchitectureConnectors({
  nodeElements,
  layoutRevision,
  canvasRect,
  activeStageIndex,
  stageProgress,
  hoveredNodeId,
  hoveredEdgeId,
  onEdgeHover,
  relatedNodeIds,
}: ArchitectureConnectorsProps) {
  const [paths, setPaths] = useState<ConnectorPath[]>([])

  const computePaths = useCallback(() => {
    if (!canvasRect || nodeElements.size === 0) {
      setPaths([])
      return
    }

    const next: ConnectorPath[] = []

    for (const edge of ARCHITECTURE_EDGES) {
      const fromEl = nodeElements.get(edge.from)
      const toEl = nodeElements.get(edge.to)
      if (!fromEl || !toEl) continue

      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      const fromPort = edge.fromPort ?? 'bottom'
      const toPort = edge.toPort ?? 'top'

      const fromLocal = portOffset(fromPort, fromRect.width, fromRect.height)
      const toLocal = portOffset(toPort, toRect.width, toRect.height)

      const from: Point = {
        x: fromRect.left - canvasRect.left + fromLocal.x,
        y: fromRect.top - canvasRect.top + fromLocal.y,
      }
      const to: Point = {
        x: toRect.left - canvasRect.left + toLocal.x,
        y: toRect.top - canvasRect.top + toLocal.y,
      }

      const d = buildOrthogonalPath(from, to)

      const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      probe.setAttribute('d', d)
      const length = probe.getTotalLength()
      const midPoint = probe.getPointAtLength(length / 2)

      next.push({
        edge,
        d,
        length,
        midX: midPoint.x,
        midY: midPoint.y,
      })
    }

    setPaths(next)
  }, [canvasRect, layoutRevision, nodeElements])

  useEffect(() => {
    computePaths()
    window.addEventListener('resize', computePaths)
    return () => window.removeEventListener('resize', computePaths)
  }, [computePaths])

  const connectedEdges = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>()
    return new Set(
      ARCHITECTURE_EDGES.filter(
        (edge) => edge.from === hoveredNodeId || edge.to === hoveredNodeId
      ).map((edge) => edge.id)
    )
  }, [hoveredNodeId])

  if (!canvasRect) return null

  const hasHoverFocus = hoveredNodeId != null

  return (
    <svg
      className="architecture-connectors"
      aria-hidden
      width={canvasRect.width}
      height={canvasRect.height}
      viewBox={`0 0 ${canvasRect.width} ${canvasRect.height}`}
    >
      <defs>
        <filter id="arch-junction-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map(({ edge, d, midX, midY }) => {
        const isHovered = hoveredEdgeId === edge.id || connectedEdges.has(edge.id)
        const isRelated =
          relatedNodeIds.has(edge.from) || relatedNodeIds.has(edge.to) || isHovered
        const isActiveStage = edge.revealStage === activeStageIndex

        const strokeOpacity = getConnectorOpacity(
          edge.revealStage,
          activeStageIndex,
          stageProgress,
          isRelated,
          hasHoverFocus && !isRelated
        )

        const accentMix = getConnectorAccentMix(
          edge.revealStage,
          activeStageIndex,
          stageProgress
        )

        const junctionOpacity = isRelated
          ? 0.85
          : isActiveStage
            ? 0.55 + (stageProgress[activeStageIndex] ?? 0.5) * 0.35
            : 0.28

        return (
          <g
            key={edge.id}
            className={cn(
              'arch-connector',
              isActiveStage && 'arch-connector--active',
              isHovered && 'arch-connector--hovered'
            )}
            data-edge-id={edge.id}
            onMouseEnter={() => onEdgeHover(edge.id)}
            onMouseLeave={() => onEdgeHover(null)}
          >
            <path
              d={d}
              className="arch-connector__hit"
              stroke="transparent"
              strokeWidth={12}
              fill="none"
            />
            <path
              d={d}
              className="arch-connector__line"
              fill="none"
              style={
                {
                  '--connector-accent-mix': accentMix,
                  opacity: strokeOpacity,
                } as CSSProperties
              }
            />
            <circle
              cx={midX}
              cy={midY}
              r={3}
              className="arch-connector__junction"
              style={{ opacity: junctionOpacity }}
              filter="url(#arch-junction-glow)"
            />
            <text
              x={midX}
              y={midY - 10}
              className={cn(
                'arch-connector__label font-analogue',
                isHovered && 'arch-connector__label--hovered'
              )}
              textAnchor="middle"
              style={{ opacity: isRelated ? 1 : isActiveStage ? 0.88 : 0.78 }}
            >
              {ARCHITECTURE_RELATIONSHIP_LABELS[edge.relationship]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function getRelatedNodeIds(hoveredNodeId: string | null): Set<string> {
  if (!hoveredNodeId) return new Set()
  const related = new Set<string>([hoveredNodeId])
  let changed = true
  while (changed) {
    changed = false
    for (const edge of ARCHITECTURE_EDGES) {
      if (related.has(edge.from) && !related.has(edge.to)) {
        related.add(edge.to)
        changed = true
      }
      if (related.has(edge.to) && !related.has(edge.from)) {
        related.add(edge.from)
        changed = true
      }
    }
  }
  return related
}
