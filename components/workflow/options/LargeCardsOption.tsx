'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { StoryStep } from '@/lib/workflow/story-narrative'
import { STORY_HEADLINE, STORY_SUBLINE, CONTACT_LINKS } from '@/lib/workflow/story-narrative'

function StepLogo({ step }: { step: StoryStep }) {
  if (step.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={step.logo}
        alt=""
        className={`w-10 h-10 object-contain shrink-0 ${
          step.logo.includes('autodesk-icon') ? '' : 'rounded bg-white p-1'
        }`}
      />
    )
  }
  return (
    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-lg font-bold shrink-0 text-n8n-muted">
      ?
    </div>
  )
}

interface LargeCardsOptionProps {
  steps: StoryStep[]
}

/** Option A, big horizontal cards, one screen, readable at a glance */
export function LargeCardsOption({ steps }: LargeCardsOptionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const fit = useCallback(() => {
    const el = ref.current
    if (!el) return
    const cardW = 168
    const gap = 16
    const pad = 32
    const logicalW = steps.length * cardW + (steps.length - 1) * gap + pad
    const logicalH = 220
    const sx = (el.clientWidth - 16) / logicalW
    const sy = (el.clientHeight - 16) / logicalH
    setScale(Math.min(sx, sy, 1))
  }, [steps.length])

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

  const cardW = 168
  const gap = 16
  const pad = 32
  const logicalW = steps.length * cardW + (steps.length - 1) * gap + pad
  const logicalH = 220

  return (
    <div ref={ref} className="h-full flex flex-col canvas-grid-n8n overflow-hidden">
      <div className="px-4 py-3 border-b border-n8n-border bg-n8n-toolbar shrink-0">
        <h2 className="text-sm font-semibold text-n8n-text">{STORY_HEADLINE}</h2>
        <p className="text-[11px] text-n8n-muted mt-0.5 max-w-2xl">{STORY_SUBLINE}</p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 p-2">
        <div style={{ width: logicalW * scale, height: logicalH * scale }}>
          <div
            className="relative origin-top-left"
            style={{ width: logicalW, height: logicalH, transform: `scale(${scale})` }}
          >
            {/* connector line */}
            <div
              className="absolute top-[88px] h-0.5 bg-n8n-border"
              style={{ left: pad / 2 + cardW / 2, right: pad / 2 + cardW / 2 }}
            />

            <div className="flex items-start gap-4" style={{ padding: `0 ${pad / 2}px` }}>
              {steps.map((step, i) => (
                <div key={step.id} className="relative shrink-0" style={{ width: cardW }}>
                  <div
                    className="rounded-lg border-2 bg-n8n-node p-3 shadow-lg h-[168px] flex flex-col"
                    style={{ borderColor: `${step.accent}88` }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <StepLogo step={step} />
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-n8n-muted">{step.period}</p>
                        <p className="text-[13px] font-bold text-n8n-text leading-tight truncate">
                          {step.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-n8n-text leading-snug mb-1.5 line-clamp-2">
                      {step.role}
                    </p>
                    <p
                      className="text-[10px] leading-snug line-clamp-3 mt-auto rounded px-1.5 py-1"
                      style={{ background: `${step.accent}22`, color: step.accent }}
                    >
                      {step.tag}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <span
                      className="absolute -right-[10px] top-[76px] w-2 h-2 rounded-full border-2 border-n8n-canvas z-10"
                      style={{ background: step.accent }}
                    />
                  )}
                </div>
              ))}
            </div>
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
