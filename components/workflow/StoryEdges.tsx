'use client'

import type { CanvasEdge } from '@/lib/workflow/canvas-data'
import {
  NODE_BOX,
  NODE_TYPE_H,
  getCanvasNode,
  getNodePort,
} from '@/lib/workflow/canvas-data'

type PositionMap = Record<string, { x: number; y: number }>

interface StoryEdgesProps {
  edges: CanvasEdge[]
  positions: PositionMap
  activeEdgeId: string | null
  completedNodes: Set<string>
}

function pathBetween(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  const dy = to.y - from.y
  const dx = to.x - from.x

  if (Math.abs(dx) > Math.abs(dy) * 0.8) {
    const midX = from.x + dx * 0.5
    return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`
  }

  const midY = from.y + dy * 0.5
  return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`
}

function resolvePorts(
  fromId: string,
  toId: string,
  positions: PositionMap
) {
  const fromPos = positions[fromId]
  const toPos = positions[toId]
  if (!fromPos || !toPos) return null

  const fromCenter = fromPos.x + NODE_BOX / 2
  const toCenter = toPos.x + NODE_BOX / 2
  const vertical = toPos.y > fromPos.y + NODE_BOX

  if (vertical && Math.abs(fromCenter - toCenter) < 60) {
    return {
      from: getNodePort(fromPos.x, fromPos.y, 'bottom'),
      to: getNodePort(toPos.x, toPos.y, 'top'),
    }
  }

  if (toPos.x + NODE_BOX < fromPos.x) {
    return {
      from: getNodePort(fromPos.x, fromPos.y, 'left'),
      to: getNodePort(toPos.x, toPos.y, 'right'),
    }
  }

  if (toPos.x > fromPos.x + NODE_BOX) {
    return {
      from: getNodePort(fromPos.x, fromPos.y, 'right'),
      to: getNodePort(toPos.x, toPos.y, 'left'),
    }
  }

  return {
    from: getNodePort(fromPos.x, fromPos.y, 'bottom'),
    to: getNodePort(toPos.x, toPos.y, 'top'),
  }
}

export function StoryEdges({
  edges,
  positions,
  activeEdgeId,
  completedNodes,
}: StoryEdgesProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ width: '100%', height: '100%' }}
      aria-hidden
    >
      <defs>
        <marker
          id="n8n-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L7,3 L0,6" fill="#7a8194" />
        </marker>
        <marker
          id="n8n-arrow-active"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L7,3 L0,6" fill="#ff6d5a" />
        </marker>
      </defs>

      {edges.map((edge) => {
        if (!getCanvasNode(edge.from) || !getCanvasNode(edge.to)) return null

        const edgeKey = `${edge.from}->${edge.to}`
        const isActive = activeEdgeId === edgeKey
        const isDone =
          completedNodes.has(edge.from) &&
          (completedNodes.has(edge.to) || isActive)

        const ports = resolvePorts(edge.from, edge.to, positions)
        if (!ports) return null

        const { from: fromPort, to: toPort } = ports
        const d = pathBetween(fromPort, toPort)
        const stroke = isActive ? '#ff6d5a' : isDone ? '#9ca3af' : '#5c6370'
        const midX = (fromPort.x + toPort.x) / 2
        const midY = (fromPort.y + toPort.y) / 2
        const pillW = edge.pill ? Math.min(edge.pill.length * 5 + 14, 56) : 0

        return (
          <g key={edge.id}>
            <path
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth={isActive ? 2.5 : 2}
              strokeDasharray={edge.dashed ? '6 4' : undefined}
              markerEnd={`url(#${isActive ? 'n8n-arrow-active' : 'n8n-arrow'})`}
              opacity={isDone || isActive ? 1 : 0.65}
            />
            {edge.pill && (
              <>
                <rect
                  x={midX - pillW / 2}
                  y={midY - 8}
                  width={pillW}
                  height={16}
                  rx={8}
                  fill="#2d3142"
                  stroke="#5c6370"
                  strokeWidth={1}
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill="#c4c9d4"
                  style={{ fontSize: 7, fontFamily: 'system-ui' }}
                >
                  {edge.pill}
                </text>
              </>
            )}
            {isActive && (
              <circle r={4} fill="#ff6d5a">
                <animateMotion dur="1s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        )
      })}
    </svg>
  )
}
