'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { StoryStep } from '@/lib/workflow/story-narrative'
import {
  STORY_HEADLINE,
  STORY_SUBLINE,
  STORY_ZONES,
  CONTACT_LINKS,
} from '@/lib/workflow/story-narrative'

const ZONE_CANVAS_W = 1100
const ZONE_CANVAS_H = 480

function ZoneNode({ step }: { step: StoryStep }) {
  return (
    <div
      className="rounded-lg border bg-n8n-node/90 backdrop-blur-sm p-2.5 w-[148px]"
      style={{ borderColor: `${step.accent}66` }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        {step.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={step.logo}
            alt=""
            className={`object-contain shrink-0 ${
              step.logo.includes('autodesk-icon')
                ? 'w-7 h-7'
                : 'w-7 h-7 rounded bg-white p-0.5'
            }`}
          />
        ) : step.id === 'laurelspace' ? (
          <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm font-bold shrink-0 text-n8n-muted">
            ?
          </span>
        ) : (
          <span
            className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{ color: step.accent }}
          >
            {step.company.slice(0, 2)}
          </span>
        )}
        <p className="text-[11px] font-bold text-n8n-text leading-tight truncate">
          {step.company}
        </p>
      </div>
      <p className="text-[10px] font-medium text-n8n-text leading-snug line-clamp-2">
        {step.role}
      </p>
      <p className="text-[9px] text-n8n-muted mt-1">{step.period}</p>
      <p
        className="text-[9px] mt-1.5 rounded px-1.5 py-1 leading-snug line-clamp-2"
        style={{ background: `${step.accent}18`, color: step.accent }}
      >
        {step.tag}
      </p>
    </div>
  )
}

interface ZonedStoryOptionProps {
  steps: StoryStep[]
}

/** Option C — n8n-style themed zones that frame the narrative in chapters */
export function ZonedStoryOption({ steps }: ZonedStoryOptionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const stepMap = Object.fromEntries(steps.map((s) => [s.id, s]))

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    const sx = (el.clientWidth - 16) / ZONE_CANVAS_W
    const sy = (el.clientHeight - 16) / ZONE_CANVAS_H
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

  const zoneW = ZONE_CANVAS_W / STORY_ZONES.length - 8

  return (
    <div ref={ref} className="h-full flex flex-col canvas-grid-n8n overflow-hidden">
      <div className="px-4 py-3 border-b border-n8n-border bg-n8n-toolbar shrink-0">
        <h2 className="text-sm font-semibold text-n8n-text">{STORY_HEADLINE}</h2>
        <p className="text-[11px] text-n8n-muted mt-0.5">{STORY_SUBLINE}</p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 p-2">
        <div style={{ width: ZONE_CANVAS_W * scale, height: ZONE_CANVAS_H * scale }}>
          <div
            className="relative origin-top-left flex gap-2 px-2"
            style={{
              width: ZONE_CANVAS_W,
              height: ZONE_CANVAS_H,
              transform: `scale(${scale})`,
            }}
          >
            {STORY_ZONES.map((zone, zi) => (
              <div
                key={zone.id}
                className="relative rounded-xl border overflow-hidden flex flex-col"
                style={{
                  width: zoneW,
                  borderColor: `${zone.color}44`,
                  background: `linear-gradient(180deg, ${zone.color}18 0%, transparent 60%)`,
                }}
              >
                {/* zone header */}
                <div
                  className="px-3 py-2 border-b shrink-0"
                  style={{
                    borderColor: `${zone.color}33`,
                    background: `${zone.color}12`,
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: zone.color }}
                  >
                    Step {zone.step}
                  </p>
                  <p className="text-[13px] font-bold text-n8n-text">{zone.title}</p>
                  <p className="text-[10px] text-n8n-muted">{zone.subtitle}</p>
                </div>

                {/* nodes stacked in zone */}
                <div className="flex-1 p-3 flex flex-col gap-3 justify-center">
                  {zone.nodeIds.map((id) => {
                    const step = stepMap[id]
                    if (!step) return null
                    return <ZoneNode key={id} step={step} />
                  })}
                </div>

                {/* flow arrow to next zone */}
                {zi < STORY_ZONES.length - 1 && (
                  <div
                    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-n8n-muted bg-n8n-canvas border border-n8n-border text-xs"
                    aria-hidden
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-4 py-2 border-t border-n8n-border flex items-center justify-between">
        <p className="text-[10px] text-n8n-dim">
          Each zone = a chapter of the story · left to right = time
        </p>
        <div className="flex gap-3 text-[11px]">
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
    </div>
  )
}
