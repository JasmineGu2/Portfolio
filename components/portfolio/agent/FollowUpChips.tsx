'use client'

import { INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentIntent } from '@/lib/portfolio/agent/types'

/** "Keep exploring" — up to three questions that deepen the current thread (spec §7). */
export function FollowUpChips({
  intents,
  onPick,
  label = 'Keep exploring',
}: {
  intents: AgentIntent[]
  onPick: (intent: AgentIntent) => void
  label?: string
}) {
  if (intents.length === 0) return null

  return (
    <div className="agent-followups">
      {label && <p className="agent-answer__section-label font-analogue">{label}</p>}
      <div className="agent-followups__chips">
        {intents.slice(0, 3).map((intent) => (
          <button
            key={intent}
            type="button"
            className="agent-followup-chip"
            onClick={() => onPick(intent)}
            data-cuelume-hover
            data-cuelume-press
          >
            {INTENT_QUESTIONS[intent]}
          </button>
        ))}
      </div>
    </div>
  )
}
