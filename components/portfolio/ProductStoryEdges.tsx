'use client'

import type { ProductStoryEdge } from '@/lib/portfolio/product-story-graph'
import {
  STORY_NODE_H,
  STORY_NODE_W,
  STORY_TYPE_H,
  getStoryNodePort,
} from '@/lib/portfolio/product-story-graph'

type PositionMap = Record<string, { x: number; y: number }>

const TRACK_STROKE: Record<ProductStoryEdge['track'], string> = {
  highlight: 'var(--pf-violet)',
  shared: 'var(--pf-muted)',
  engineering: '#2dd4bf',
  business: '#a78bfa',
  merge: 'var(--pf-violet)',
  cross: 'var(--pf-orange)',
}

interface ProductStoryEdgesProps {
  edges: ProductStoryEdge[]
  positions: PositionMap
}

function pathBetween(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dy = to.y - from.y
  const dx = to.x - from.x

  if (Math.abs(dx) > Math.abs(dy) * 0.65) {
    const midX = from.x + dx * 0.5
    return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`
  }

  const midY = from.y + dy * 0.5
  return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`
}

function resolvePorts(fromId: string, toId: string, positions: PositionMap) {
  const fromPos = positions[fromId]
  const toPos = positions[toId]
  if (!fromPos || !toPos) return null

  const fromCenter = fromPos.x + STORY_NODE_W / 2
  const toCenter = toPos.x + STORY_NODE_W / 2
  const vertical = toPos.y > fromPos.y + STORY_NODE_H

  if (vertical && Math.abs(fromCenter - toCenter) < 80) {
    return {
      from: getStoryNodePort(fromPos.x, fromPos.y, 'bottom'),
      to: getStoryNodePort(toPos.x, toPos.y, 'top'),
    }
  }

  if (toPos.x + STORY_NODE_W < fromPos.x) {
    return {
      from: getStoryNodePort(fromPos.x, fromPos.y, 'left'),
      to: getStoryNodePort(toPos.x, toPos.y, 'right'),
    }
  }

  if (toPos.x > fromPos.x + STORY_NODE_W) {
    return {
      from: getStoryNodePort(fromPos.x, fromPos.y, 'right'),
      to: getStoryNodePort(toPos.x, toPos.y, 'left'),
    }
  }

  return {
    from: getStoryNodePort(fromPos.x, fromPos.y, 'bottom'),
    to: getStoryNodePort(toPos.x, toPos.y, 'top'),
  }
}

export function ProductStoryEdges({ edges, positions }: ProductStoryEdgesProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      width="100%"
      height="100%"
      aria-hidden
    >
      <defs>
        <marker
          id="ps-arrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--pf-muted)" opacity="0.6" />
        </marker>
      </defs>

      {edges.map((edge) => {
        const ports = resolvePorts(edge.from, edge.to, positions)
        if (!ports) return null

        const d = pathBetween(ports.from, ports.to)
        const stroke = TRACK_STROKE[edge.track]
        const midX = (ports.from.x + ports.to.x) / 2
        const midY = (ports.from.y + ports.to.y) / 2

        return (
          <g key={edge.id}>
            <path
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth={edge.track === 'cross' ? 1.5 : 2}
              strokeDasharray={edge.dashed ? '6 4' : undefined}
              opacity={edge.dashed ? 0.55 : 0.75}
              markerEnd="url(#ps-arrow)"
            />
            {edge.pill && (
              <g transform={`translate(${midX}, ${midY - 8})`}>
                <rect
                  x="-22"
                  y="-8"
                  width="44"
                  height="14"
                  rx="7"
                  fill="white"
                  stroke={stroke}
                  strokeWidth="1"
                  opacity="0.95"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y="0"
                  fill="var(--pf-ink)"
                  fontSize="7"
                  fontWeight="600"
                >
                  {edge.pill}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function ProductStoryRails() {
  const { engRailY, busRailY, bridgeY, width } = {
    engRailY: 96,
    busRailY: 348,
    bridgeY: 222,
    width: 1280,
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      width="100%"
      height="100%"
      aria-hidden
    >
      <line
        x1="120"
        y1={engRailY + STORY_TYPE_H + STORY_NODE_H / 2}
        x2={width - 80}
        y2={engRailY + STORY_TYPE_H + STORY_NODE_H / 2}
        stroke="#2dd4bf"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.35"
      />
      <line
        x1="120"
        y1={busRailY + STORY_TYPE_H + STORY_NODE_H / 2}
        x2={width - 80}
        y2={busRailY + STORY_TYPE_H + STORY_NODE_H / 2}
        stroke="#a78bfa"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.35"
      />
      <text x="124" y={engRailY - 8} fill="#2dd4bf" fontSize="9" fontWeight="600" opacity="0.8">
        Engineering chain →
      </text>
      <text x="124" y={busRailY - 8} fill="#a78bfa" fontSize="9" fontWeight="600" opacity="0.8">
        Business chain →
      </text>
      <text
        x={width - 120}
        y={bridgeY - 24}
        fill="var(--pf-muted)"
        fontSize="8"
        fontWeight="500"
        textAnchor="end"
      >
        2022 → 2026
      </text>
    </svg>
  )
}
