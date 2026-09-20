'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { play } from 'cuelume'
import { useReducedMotion } from '@/lib/motion'
import type { ResolvedReference } from '@/lib/portfolio/agent/types'

/**
 * Expandable retrieval trace — a real record of what `resolveIntent` found,
 * not a simulated reasoning chain. Every row is a reference already resolved
 * against real portfolio data (spec grounding rules still apply, even though
 * the choreography around them is now deliberately AI-chat-shaped).
 */
const STAGE_GAPS = [150, 120, 220, 220]

function useStage(reducedMotion: boolean) {
  const [stage, setStage] = useState(reducedMotion ? 4 : 0)
  useEffect(() => {
    if (reducedMotion || stage >= STAGE_GAPS.length) return
    const t = setTimeout(() => setStage((s) => s + 1), STAGE_GAPS[stage])
    return () => clearTimeout(t)
  }, [stage, reducedMotion])
  return stage
}

export function AgentThinkingTrace({
  question,
  references,
  onSettled,
}: {
  question: string
  references: ResolvedReference[]
  onSettled?: () => void
}) {
  const reducedMotion = useReducedMotion()
  const stage = useStage(reducedMotion)
  const [manualExpanded, setManualExpanded] = useState<boolean | null>(null)

  const settled = stage >= 4
  const working = !settled
  const autoExpanded = stage >= 1
  const expanded = manualExpanded ?? autoExpanded
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, references.length) : references.length

  const rowsRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  useLayoutEffect(() => {
    if (rowsRef.current) setLineHeight(rowsRef.current.offsetHeight)
  }, [visible, expanded])

  const settledRef = useRef(false)
  useEffect(() => {
    if (working || settledRef.current) return
    settledRef.current = true
    play('ready')
    onSettled?.()
  }, [working, onSettled])

  const headerLabel = stage < 2 ? 'Looking through her work' : working
    ? `Checking ${references.length} source${references.length === 1 ? '' : 's'}`
    : `Checked ${references.length} source${references.length === 1 ? '' : 's'}`

  return (
    <div className="agent-trace">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className="agent-trace__header"
      >
        <Search className="agent-trace__icon" aria-hidden />
        <span role="status" className={`agent-trace__label${working && !reducedMotion ? ' agent-shimmer-text' : ''}`}>
          {headerLabel}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          className="agent-trace__chevron"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="agent-trace__panel" style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}>
        <div className="agent-trace__panel-inner">
          <div className="agent-trace__timeline">
            <span
              aria-hidden
              className="agent-trace__timeline-line"
              style={{ height: expanded ? lineHeight : 0 }}
            />
            <div ref={rowsRef} className="agent-trace__rows">
              {visible > 0 && (
                <div className="agent-trace__query">
                  <Search className="agent-trace__query-icon" aria-hidden />
                  <span>{question}</span>
                </div>
              )}
              {references.slice(0, visible).map((reference, i) => (
                <div
                  key={`${reference.type}-${reference.id}`}
                  className="agent-trace__row"
                  style={reducedMotion ? undefined : { animationDelay: `${i * 50}ms` }}
                >
                  <span className={`agent-trace__dot agent-trace__dot--${i % 3}`} aria-hidden />
                  <span className="agent-trace__row-title">{reference.title}</span>
                  <span className="agent-trace__row-kind">{reference.kindLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
