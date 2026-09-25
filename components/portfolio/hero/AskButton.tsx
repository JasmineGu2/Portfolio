'use client'

import { openAsk } from '@/lib/portfolio/ask-events'

/** The button in the hero that slides the "Ask me anything" panel in from the right. */
export function AskButton() {
  return (
    <button type="button" className="pf-btn" onClick={() => openAsk()}>
      <span aria-hidden className="mr-1.5" style={{ color: 'var(--pf-brand-orange)' }}>
        ✦
      </span>
      Ask me anything
    </button>
  )
}
