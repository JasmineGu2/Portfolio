'use client'

import { ArrowUpRight } from 'lucide-react'
import { useAgentActionDispatch } from '@/lib/portfolio/agent/actions'
import { getWritingEntry } from '@/lib/portfolio/agent/writing'
import { THEME_LABELS, type ResolvedReference } from '@/lib/portfolio/agent/types'

/**
 * Writing-specific "Read next" card (spec §14). Renders nothing until real
 * entries exist in `writing.ts`, so callers can drop it in and fall back to a
 * plain `ReferenceCard` for everything else.
 */
export function WritingPreview({ reference }: { reference: ResolvedReference }) {
  const dispatch = useAgentActionDispatch()
  const entry = getWritingEntry(reference.id)
  if (!entry) return null

  return (
    <button
      type="button"
      className="agent-writing-preview"
      onClick={() => dispatch({ type: 'openWriting', id: entry.id })}
    >
      <span className="agent-ref-card__kind font-analogue">Writing</span>
      <span className="agent-ref-card__title">{entry.title}</span>
      <span className="agent-writing-preview__blurb">{entry.blurb}</span>
      <span className="agent-writing-preview__why">{reference.reason || entry.why}</span>
      <span className="agent-writing-preview__themes">
        {entry.themes.map((theme) => (
          <span key={theme} className="agent-writing-preview__theme font-analogue">
            {THEME_LABELS[theme]}
          </span>
        ))}
      </span>
      <ArrowUpRight className="agent-ref-card__arrow" aria-hidden />
    </button>
  )
}
