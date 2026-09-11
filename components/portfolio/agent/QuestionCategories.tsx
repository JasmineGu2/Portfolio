'use client'

import { useMemo } from 'react'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentIntent } from '@/lib/portfolio/agent/types'
import { cn } from '@/lib/utils'

/**
 * The four opening categories and their questions (spec §3). `priority` (from
 * the current page's `CONTEXT_INTENT_PRIORITY`) floats the most relevant group
 * to the top and reorders questions within each group — it never hides anything
 * (spec §9: context influences ranking, not content).
 */
export function QuestionCategories({
  onPick,
  priority = [],
  exploredIntents = [],
  heading,
}: {
  onPick: (intent: AgentIntent) => void
  priority?: AgentIntent[]
  exploredIntents?: AgentIntent[]
  heading?: string
}) {
  const explored = useMemo(() => new Set(exploredIntents), [exploredIntents])
  const priorityRank = useMemo(() => {
    const map = new Map<AgentIntent, number>()
    priority.forEach((intent, index) => map.set(intent, index))
    return map
  }, [priority])

  const categories = useMemo(() => {
    const rankOf = (intents: AgentIntent[]) =>
      Math.min(...intents.map((i) => priorityRank.get(i) ?? Number.POSITIVE_INFINITY))

    return [...QUESTION_CATEGORIES]
      .map((category) => ({
        ...category,
        rank: rankOf(category.intents),
        intents: [...category.intents].sort(
          (a, b) =>
            (priorityRank.get(a) ?? Number.POSITIVE_INFINITY) -
            (priorityRank.get(b) ?? Number.POSITIVE_INFINITY)
        ),
      }))
      .sort((a, b) => a.rank - b.rank)
  }, [priorityRank])

  return (
    <div className="agent-categories">
      {heading && <p className="agent-categories__heading font-analogue">{heading}</p>}
      {categories.map((category) => (
        <div
          key={category.id}
          className={cn(
            'agent-category',
            Number.isFinite(category.rank) && category.rank === 0 && 'agent-category--priority'
          )}
        >
          <p className="agent-category__label font-analogue">{category.label}</p>
          <div className="agent-category__questions">
            {category.intents.map((intent) => (
              <button
                key={intent}
                type="button"
                className={cn(
                  'agent-question-chip',
                  explored.has(intent) && 'agent-question-chip--seen'
                )}
                onClick={() => onPick(intent)}
              >
                {INTENT_QUESTIONS[intent]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
