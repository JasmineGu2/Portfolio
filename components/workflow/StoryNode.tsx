'use client'

import { useRef } from 'react'
import { Zap } from 'lucide-react'
import type { CanvasNode } from '@/lib/workflow/canvas-data'
import { NODE_BOX, NODE_TYPE_H } from '@/lib/workflow/canvas-data'
import type { ExecutionState } from '@/lib/workflow/types'

interface StoryNodeProps {
  node: CanvasNode
  x: number
  y: number
  state?: ExecutionState
  isActive?: boolean
  isSelected?: boolean
  onSelect?: (id: string) => void
  onPointerDown?: (id: string, e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

/** Short monogram when no logo file exists in /public yet */
function nodeMonogram(label: string): string {
  if (label === 'ADSK Eng' || label === 'ADSK PM') return 'A'
  if (label === 'Stealth') return '?'
  if (label === 'Ivey') return 'I'
  return label.slice(0, 2).toUpperCase()
}

function NodeLogo({ node }: { node: CanvasNode }) {
  if (node.kind === 'start') {
    return (
      <Zap
        className="w-5 h-5 text-n8n-trigger fill-n8n-trigger"
        aria-hidden
      />
    )
  }

  if (node.logo) {
    const onDarkBg =
      node.logo.includes('metaverse') || node.logo.includes('autodesk-icon')
    return (
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-md overflow-hidden ${
          onDarkBg ? 'bg-transparent' : 'bg-white'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.logo}
          alt=""
          className="w-7 h-7 object-contain"
          draggable={false}
        />
      </div>
    )
  }

  return (
    <span
      className="text-[11px] font-bold tracking-tight"
      style={{ color: node.accent }}
    >
      {nodeMonogram(node.label)}
    </span>
  )
}

export function StoryNode({
  node,
  x,
  y,
  state = 'idle',
  isActive = false,
  isSelected = false,
  onSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: StoryNodeProps) {
  const isTrigger = node.kind === 'start'
  const isEnd = node.kind === 'end'
  const movedRef = useRef(false)
  const isRunning = state === 'running'
  const isDone = state === 'complete'

  return (
    <div
      className="absolute select-none touch-none"
      style={{ left: x, top: y, width: NODE_BOX }}
      onPointerMove={(e) => {
        if (e.buttons > 0) movedRef.current = true
        onPointerMove?.(e)
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e)
        if (!movedRef.current) onSelect?.(node.id)
        movedRef.current = false
      }}
    >
      <p className="text-[8px] text-n8n-muted text-center mb-0.5 truncate">
        {node.typeLabel}
      </p>

      <div
        role="button"
        tabIndex={0}
        onPointerDown={(e) => onPointerDown?.(node.id, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onSelect?.(node.id)
        }}
        className={`relative cursor-grab active:cursor-grabbing rounded-md border bg-n8n-node transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-n8n-accent ${
          isSelected || isActive
            ? 'border-n8n-accent shadow-md shadow-n8n-accent/30'
            : isTrigger
              ? 'border-n8n-trigger/50'
              : isEnd
                ? 'border-n8n-end/50'
                : 'border-n8n-border hover:border-n8n-border-hover'
        }`}
        style={{ width: NODE_BOX, height: NODE_BOX }}
        aria-label={`${node.label}: ${node.sublabel}`}
      >
        {isTrigger && (
          <Zap
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-n8n-trigger fill-n8n-trigger"
            aria-hidden
          />
        )}

        {!isTrigger && (
          <span
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-n8n-canvas border border-n8n-port"
            aria-hidden
          />
        )}

        <div className="flex items-center justify-center h-full p-1">
          <NodeLogo node={node} />
        </div>

        {!isEnd && (
          <span
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-n8n-canvas border border-n8n-port"
            aria-hidden
          />
        )}

        {(isRunning || isDone) && (
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              isDone ? 'bg-n8n-trigger' : 'bg-n8n-accent animate-pulse'
            }`}
            aria-hidden
          />
        )}
      </div>

      <div className="mt-1 text-center w-[72px] -ml-[10px]">
        <p className="text-[9px] font-semibold text-n8n-text leading-none truncate">
          {node.label}
        </p>
        <p className="text-[7px] text-n8n-dim leading-tight truncate mt-0.5">
          {node.sublabel}
        </p>
      </div>
    </div>
  )
}

export { NODE_BOX, NODE_TYPE_H }
