'use client'

import { useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductStoryNode } from '@/lib/portfolio/product-story-graph'
import {
  STORY_NODE_H,
  STORY_NODE_W,
  STORY_TYPE_H,
} from '@/lib/portfolio/product-story-graph'

const TRACK_LABEL: Record<ProductStoryNode['track'], string> = {
  highlight: 'Story',
  shared: 'Foundation',
  engineering: 'Engineering',
  business: 'Business',
  merge: 'Converge',
}

interface ProductStoryNodeCardProps {
  node: ProductStoryNode
  x: number
  y: number
  isSelected?: boolean
  onSelect?: (id: string) => void
  onPointerDown?: (id: string, e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

function NodeLogo({ node }: { node: ProductStoryNode }) {
  if (node.kind === 'start') {
    return <Sparkles className="w-4 h-4 text-[var(--pf-violet)]" aria-hidden />
  }

  if (node.logo) {
    const onDarkBg = node.logo.includes('metaverse') || node.logo.includes('autodesk-icon')
    return (
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-md overflow-hidden shrink-0',
          onDarkBg ? 'bg-transparent' : 'bg-white/90'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.logo} alt="" className="w-6 h-6 object-contain" draggable={false} />
      </div>
    )
  }

  return (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-xs font-bold shrink-0"
      style={{ color: node.accent }}
    >
      {node.logoLetter ?? node.company.charAt(0)}
    </span>
  )
}

export function ProductStoryNodeCard({
  node,
  x,
  y,
  isSelected = false,
  onSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: ProductStoryNodeCardProps) {
  const movedRef = useRef(false)
  const isStart = node.kind === 'start'
  const isMerge = node.kind === 'merge'

  const card = (
    <div
      role="button"
      tabIndex={0}
      onPointerDown={(e) => onPointerDown?.(node.id, e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect?.(node.id)
      }}
      className={cn(
        'ps-node-card relative cursor-grab active:cursor-grabbing rounded-xl border bg-white/95 shadow-sm transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-violet)]',
        isSelected && 'ring-2 ring-[var(--pf-violet)] shadow-md',
        isStart && 'ps-node-card--start border-[var(--pf-violet)]/30',
        isMerge && 'ps-node-card--merge border-[var(--pf-violet)]/40'
      )}
      style={{
        width: STORY_NODE_W,
        height: STORY_NODE_H,
        borderColor: isSelected ? undefined : `${node.accent}33`,
      }}
      aria-label={`${node.company}: ${node.role}`}
    >
      {!isStart && (
        <span
          className="ps-node-port ps-node-port--in"
          aria-hidden
        />
      )}
      {!isMerge && (
        <span
          className="ps-node-port ps-node-port--out"
          aria-hidden
        />
      )}

      <div className="flex items-center gap-2 h-full px-2.5 py-1.5 min-w-0">
        <NodeLogo node={node} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-[var(--pf-ink)] truncate leading-tight">
            {isStart ? node.role : node.company}
          </p>
          <p className="text-[8px] text-[var(--pf-muted)] truncate leading-tight mt-0.5">
            {isStart ? node.period : node.role}
          </p>
          <p
            className="text-[7px] font-medium truncate mt-0.5 opacity-80"
            style={{ color: node.accent }}
          >
            {node.tag}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="absolute select-none touch-none"
      style={{ left: x, top: y, width: STORY_NODE_W }}
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
      <p className="text-[8px] font-medium text-[var(--pf-muted)] text-center mb-1 truncate px-1">
        <span className="opacity-70">{TRACK_LABEL[node.track]}</span>
        <span className="mx-1">·</span>
        {node.typeLabel}
      </p>

      {card}

      <p className="text-[7px] text-[var(--pf-muted)] text-center mt-1 truncate px-0.5">
        {node.period}
      </p>
    </div>
  )
}

export { STORY_NODE_H, STORY_NODE_W, STORY_TYPE_H }
