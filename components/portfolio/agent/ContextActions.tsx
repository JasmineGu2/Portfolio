'use client'

import { ArrowRight } from 'lucide-react'
import { getPortfolioItem } from '@/lib/portfolio/portfolio-data'
import { useAgentActionDispatch } from '@/lib/portfolio/agent/actions'
import type { AgentAction } from '@/lib/portfolio/agent/types'

const ROUTE_LABELS: Record<string, string> = {
  '/': 'See all of her work',
  '/projects': 'Browse the explorations',
  '/gallery': 'Open the Gallery',
  '/architecture': 'Explore the Journey',
}

function labelFor(action: AgentAction): string | null {
  switch (action.type) {
    case 'navigate':
      return ROUTE_LABELS[action.href] ?? null
    case 'openExperience': {
      const item = getPortfolioItem(action.id)
      return item ? `Open the ${item.title} page` : null
    }
    case 'trace':
      return 'Trace this on the Journey'
    default:
      return null
  }
}

/**
 * Inline navigation into the portfolio (spec §10, §12) — makes the agent feel
 * like an interface to the work rather than a chat window.
 */
export function ContextActions({ actions }: { actions: AgentAction[] }) {
  const dispatch = useAgentActionDispatch()

  const rendered = actions
    .map((action) => ({ action, label: labelFor(action) }))
    .filter((entry): entry is { action: AgentAction; label: string } => entry.label !== null)

  const seen = new Set<string>()
  const unique = rendered.filter((entry) => {
    if (seen.has(entry.label)) return false
    seen.add(entry.label)
    return true
  })

  if (unique.length === 0) return null

  return (
    <div className="agent-context-actions">
      {unique.slice(0, 2).map((entry) => (
        <button
          key={entry.label}
          type="button"
          className="agent-context-action"
          onClick={() => dispatch(entry.action)}
        >
          {entry.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
    </div>
  )
}
