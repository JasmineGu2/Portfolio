'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Play, RotateCcw, X } from 'lucide-react'
import {
  CANVAS_NODES,
  CANVAS_EDGES,
  CANVAS_META,
  getCanvasNode,
} from '@/lib/workflow/canvas-data'
import { useCanvasExecution } from '@/lib/workflow/use-canvas-execution'
import { useNodePositions } from '@/lib/workflow/use-node-positions'
import { StoryNode } from './StoryNode'
import { StoryEdges } from './StoryEdges'

export function N8nCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const {
    nodeStates,
    activeEdgeId,
    currentNodeId,
    selectedNodeId,
    setSelectedNodeId,
    isRunning,
    handleControl,
    run,
  } = useCanvasExecution()

  const scaleRef = useRef(1)
  scaleRef.current = scale

  const {
    positions,
    getPosition,
    resetPositions,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useNodePositions(CANVAS_NODES, scaleRef)

  const updateScale = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const pad = 24
    const sx = (el.clientWidth - pad) / CANVAS_META.width
    const sy = (el.clientHeight - pad) / (CANVAS_META.height + 40)
    setScale(Math.min(sx, sy, 1.15))
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

  const completedNodes = useMemo(
    () =>
      new Set(
        Object.entries(nodeStates)
          .filter(([, s]) => s === 'complete' || s === 'running')
          .map(([id]) => id)
      ),
    [nodeStates]
  )

  const selected = selectedNodeId ? getCanvasNode(selectedNodeId) : null

  return (
    <div
      id="canvas"
      className={`relative flex flex-col bg-n8n-canvas overflow-hidden ${className ?? 'h-[calc(100vh-3rem)]'}`}
    >
      {/* Minimal chrome */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-n8n-border bg-n8n-toolbar shrink-0">
        <div>
          <h1 className="text-xs font-semibold text-n8n-text">{CANVAS_META.title}</h1>
          <p className="text-[9px] text-n8n-muted">{CANVAS_META.subtitle}</p>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={resetPositions}
            className="p-1.5 rounded border border-n8n-border text-n8n-muted hover:bg-n8n-node"
            title="Reset layout"
            aria-label="Reset layout"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={isRunning ? () => handleControl('pause') : run}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-n8n-accent text-white text-[10px] font-semibold"
          >
            <Play className="w-3 h-3 fill-current" />
            {isRunning ? 'Pause' : 'Run'}
          </button>
        </div>
      </div>

      {/* Fit-to-screen canvas */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center canvas-grid-n8n overflow-hidden min-h-0"
      >
        <div
          style={{
            width: CANVAS_META.width * scale,
            height: (CANVAS_META.height + 40) * scale,
          }}
        >
          <div
            className="relative origin-top-left"
            style={{
              width: CANVAS_META.width,
              height: CANVAS_META.height + 40,
              transform: `scale(${scale})`,
            }}
          >
            <StoryEdges
              edges={CANVAS_EDGES}
              positions={positions}
              activeEdgeId={activeEdgeId}
              completedNodes={completedNodes}
            />
            {CANVAS_NODES.map((node) => {
              const pos = getPosition(node.id)
              return (
                <StoryNode
                  key={node.id}
                  node={node}
                  x={pos.x}
                  y={pos.y}
                  state={nodeStates[node.id] ?? 'idle'}
                  isActive={currentNodeId === node.id}
                  isSelected={selectedNodeId === node.id}
                  onSelect={setSelectedNodeId}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Compact detail popover */}
      {selected && (
        <div
          className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-72 rounded-lg border border-n8n-border bg-n8n-panel shadow-xl z-40 text-xs"
          role="dialog"
        >
          <div className="flex justify-between items-start px-3 py-2 border-b border-n8n-border">
            <div>
              <p className="font-semibold text-n8n-text">
                {selected.label}
                {selected.year && (
                  <span className="text-n8n-muted font-normal ml-1">
                    · {selected.year}
                  </span>
                )}
              </p>
              {selected.role && (
                <p className="text-[10px] text-n8n-muted">{selected.role}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedNodeId(null)}
              className="p-0.5 text-n8n-muted hover:text-n8n-text"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="px-3 py-2 text-n8n-muted space-y-1.5 max-h-32 overflow-y-auto">
            {selected.story && <p className="text-n8n-text">{selected.story}</p>}
            {selected.unlocked && (
              <p className="text-n8n-accent font-medium">→ {selected.unlocked}</p>
            )}
            {selected.links && (
              <div className="flex gap-2 pt-1">
                {selected.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="text-n8n-accent hover:underline"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
