'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Move, RotateCcw, X } from 'lucide-react'
import { ProductStoryNodeCard } from './ProductStoryNode'
import { ProductStoryEdges, ProductStoryRails } from './ProductStoryEdges'
import { useBentoWorkspace } from './bento-workflows/BentoWorkspaceContext'
import { SchemeTag } from './bento-workflows/SchemeTag'
import { getSchemePaletteColor } from '@/lib/portfolio/bento-workflows/work-accents'
import {
  PRODUCT_STORY_EDGES,
  PRODUCT_STORY_META,
  PRODUCT_STORY_NODES,
  STORY_ZONES,
  getProductStoryNode,
} from '@/lib/portfolio/product-story-graph'
import { useStoryPositions } from '@/lib/portfolio/use-story-positions'

export function ProductStoryCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const panDragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    origX: number
    origY: number
  } | null>(null)
  const scaleRef = useRef(1)
  scaleRef.current = scale
  const { colorScheme } = useBentoWorkspace()

  const {
    positions,
    getPosition,
    resetPositions,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useStoryPositions(PRODUCT_STORY_NODES, scaleRef)

  const updateScale = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const pad = 32
    const sx = (el.clientWidth - pad) / PRODUCT_STORY_META.width
    const sy = (el.clientHeight - pad) / PRODUCT_STORY_META.height
    setScale(Math.min(sx, sy, 1))
  }, [])

  useEffect(() => {
    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', updateScale)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [updateScale])

  const onCanvasPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.target !== canvasRef.current) return
    panDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    }
    canvasRef.current?.setPointerCapture(e.pointerId)
  }, [pan.x, pan.y])

  const onCanvasPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = panDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    setPan({
      x: drag.origX + (e.clientX - drag.startX) / scale,
      y: drag.origY + (e.clientY - drag.startY) / scale,
    })
  }, [scale])

  const onCanvasPointerUp = useCallback((e: React.PointerEvent) => {
    const drag = panDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    panDragRef.current = null
  }, [])

  const handleReset = useCallback(() => {
    resetPositions()
    setPan({ x: 0, y: 0 })
    setSelectedId(null)
  }, [resetPositions])

  const selected = selectedId ? getProductStoryNode(selectedId) : null
  const selectedZone = selected
    ? STORY_ZONES.find((zone) => zone.nodeIds.includes(selected.id as never))
    : null

  return (
    <section className="ps-canvas-section" aria-label="Product story canvas">
      <div className="ps-canvas-toolbar">
        <div>
          <p className="ps-canvas-eyebrow">{PRODUCT_STORY_META.title}</p>
          <h2 className="ps-canvas-title font-serif-display">{PRODUCT_STORY_META.headline}</h2>
          <p className="ps-canvas-sub">{PRODUCT_STORY_META.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="ps-canvas-hint hidden sm:inline-flex items-center gap-1">
            <Move className="w-3 h-3" aria-hidden />
            Drag nodes · pan canvas
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="ps-canvas-btn"
            title="Reset layout"
            aria-label="Reset layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="ps-canvas-legend">
        <SchemeTag label="Engineering" color="#2dd4bf" size="legend" />
        <SchemeTag label="Business" color="#a78bfa" size="legend" />
        <SchemeTag label="Shared / merge" color={getSchemePaletteColor(colorScheme, 1)} size="legend" />
      </div>

      <div
        ref={containerRef}
        className="ps-canvas-viewport bw-workflow-canvas--n8n"
      >
        <div
          ref={canvasRef}
          className="ps-canvas-stage"
          style={{
            width: PRODUCT_STORY_META.width * scale,
            height: PRODUCT_STORY_META.height * scale,
          }}
        >
          <div
            className="ps-canvas-inner origin-top-left relative"
            style={{
              width: PRODUCT_STORY_META.width,
              height: PRODUCT_STORY_META.height,
              transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
            }}
          >
            <div
              className="absolute inset-0 z-0"
              aria-hidden
              onPointerDown={onCanvasPointerDown}
              onPointerMove={onCanvasPointerMove}
              onPointerUp={onCanvasPointerUp}
            />
            <div className="relative z-10">
            <ProductStoryRails />
            <ProductStoryEdges edges={PRODUCT_STORY_EDGES} positions={positions} />

            {PRODUCT_STORY_NODES.map((node) => {
              const pos = getPosition(node.id)
              return (
                <ProductStoryNodeCard
                  key={node.id}
                  node={node}
                  x={pos.x}
                  y={pos.y}
                  isSelected={selectedId === node.id}
                  onSelect={setSelectedId}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                />
              )
            })}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="ps-inspector" role="dialog" aria-label="Experience details">
          <div className="ps-inspector-header">
            <div className="min-w-0">
              <p className="ps-inspector-company">{selected.company}</p>
              <p className="ps-inspector-role">{selected.role}</p>
              <p className="ps-inspector-period">{selected.period}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="ps-inspector-close"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedZone && (
            <p className="ps-inspector-zone">
              Phase {selectedZone.step}: {selectedZone.title}: {selectedZone.subtitle}
            </p>
          )}

          <p className="ps-inspector-story">{selected.story}</p>
          {selected.outcome && (
            <p className="ps-inspector-outcome">→ {selected.outcome}</p>
          )}

          <div className="ps-inspector-actions">
            {selected.href && (
              <Link href={selected.href} className="ps-inspector-link">
                Open experience →
              </Link>
            )}
            {selected.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="ps-inspector-link ps-inspector-link--muted"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
