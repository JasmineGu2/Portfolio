'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { StoryStep } from '@/lib/workflow/story-narrative'
import { STORY_HEADLINE, STORY_SUBLINE, CONTACT_LINKS } from '@/lib/workflow/story-narrative'

/** Miro-style layout: main box + oval tag, zigzag down the canvas */
const MIRO_LAYOUT: Record<string, { x: number; y: number; tagSide: 'top' | 'bottom' }> = {
  education: { x: 24, y: 280, tagSide: 'bottom' },
  metaverse: { x: 200, y: 120, tagSide: 'bottom' },
  omers: { x: 380, y: 300, tagSide: 'top' },
  laurelspace: { x: 540, y: 100, tagSide: 'bottom' },
  intuit: { x: 720, y: 280, tagSide: 'top' },
  ivey: { x: 860, y: 80, tagSide: 'bottom' },
  tesla: { x: 1000, y: 260, tagSide: 'top' },
  'autodesk-eng': { x: 1160, y: 100, tagSide: 'bottom' },
  'autodesk-pm': { x: 1320, y: 280, tagSide: 'top' },
}

const BOX_W = 148
const BOX_H = 72
const TAG_H = 36
const CANVAS_W = 1500
const CANVAS_H = 420

function MiroNode({ step, layout }: { step: StoryStep; layout: (typeof MIRO_LAYOUT)[string] }) {
  const tagAbove = layout.tagSide === 'top'

  return (
    <div
      className="absolute"
      style={{ left: layout.x, top: layout.y, width: BOX_W }}
    >
      {tagAbove && (
        <div
          className="mb-2 mx-auto w-[90%] rounded-full border border-n8n-border bg-n8n-panel px-3 py-1.5 text-center"
          style={{ borderColor: `${step.accent}55` }}
        >
          <p className="text-[10px] leading-snug text-n8n-text">{step.tag}</p>
        </div>
      )}

      <div
        className="rounded-md border-2 bg-white text-[#1a1d24] px-3 py-2 shadow-md"
        style={{ borderColor: step.accent, minHeight: BOX_H }}
      >
        <div className="flex items-center gap-2">
        {step.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={step.logo}
            alt=""
            className={`object-contain shrink-0 ${
              step.logo.includes('autodesk-icon') ? 'w-9 h-9' : 'w-8 h-8'
            }`}
          />
        ) : step.id === 'laurelspace' ? (
          <span className="w-8 h-8 flex items-center justify-center text-base font-bold text-gray-400 rounded shrink-0 bg-gray-100">
            ?
          </span>
        ) : (
            <span
              className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded shrink-0"
              style={{ background: `${step.accent}22`, color: step.accent }}
            >
              {step.company.slice(0, 1)}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-tight">{step.company}</p>
            <p className="text-[10px] text-gray-600 leading-tight mt-0.5 line-clamp-2">
              {step.role}
            </p>
          </div>
        </div>
        <p className="text-[9px] text-gray-500 mt-1">{step.period}</p>
      </div>

      {!tagAbove && (
        <div
          className="mt-2 mx-auto w-[90%] rounded-full border border-n8n-border bg-n8n-panel px-3 py-1.5 text-center"
          style={{ borderColor: `${step.accent}55` }}
        >
          <p className="text-[10px] leading-snug text-n8n-text">{step.tag}</p>
        </div>
      )}
    </div>
  )
}

function MiroEdges() {
  const ids = Object.keys(MIRO_LAYOUT)
  const paths: string[] = []

  for (let i = 0; i < ids.length - 1; i++) {
    const a = MIRO_LAYOUT[ids[i]]
    const b = MIRO_LAYOUT[ids[i + 1]]
    const x1 = a.x + BOX_W
    const y1 = a.y + (a.tagSide === 'top' ? TAG_H + BOX_H / 2 : BOX_H / 2)
    const x2 = b.x
    const y2 = b.y + (b.tagSide === 'top' ? TAG_H + BOX_H / 2 : BOX_H / 2)
    const midX = (x1 + x2) / 2
    paths.push(`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`)
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      width={CANVAS_W}
      height={CANVAS_H}
      aria-hidden
    >
      <defs>
        <marker id="miro-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6" fill="#9ca3af" />
        </marker>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#6b7280"
          strokeWidth={2}
          markerEnd="url(#miro-arrow)"
        />
      ))}
    </svg>
  )
}

interface MiroFlowOptionProps {
  steps: StoryStep[]
}

/** Option B, recreates Miro zigzag with square nodes + oval tags */
export function MiroFlowOption({ steps }: MiroFlowOptionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    const sx = (el.clientWidth - 16) / CANVAS_W
    const sy = (el.clientHeight - 16) / CANVAS_H
    setScale(Math.min(sx, sy, 1))
  }, [])

  useEffect(() => {
    fit()
    const ro = new ResizeObserver(fit)
    if (ref.current) ro.observe(ref.current)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [fit])

  return (
    <div ref={ref} className="h-full flex flex-col canvas-grid-n8n overflow-hidden">
      <div className="px-4 py-3 border-b border-n8n-border bg-n8n-toolbar shrink-0">
        <h2 className="text-sm font-semibold text-n8n-text">{STORY_HEADLINE}</h2>
        <p className="text-[11px] text-n8n-muted mt-0.5">{STORY_SUBLINE}</p>
        <p className="text-[10px] text-n8n-dim mt-1">
          Chronological left → right · boxes = roles · ovals = what you built
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 p-2 overflow-hidden">
        <div style={{ width: CANVAS_W * scale, height: CANVAS_H * scale }}>
          <div
            className="relative origin-top-left"
            style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})` }}
          >
            <MiroEdges />
            {steps.map((step) => {
              const layout = MIRO_LAYOUT[step.id]
              if (!layout) return null
              return <MiroNode key={step.id} step={step} layout={layout} />
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-4 py-2 border-t border-n8n-border flex gap-3 text-[11px]">
        {CONTACT_LINKS.map((l) => (
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
    </div>
  )
}
