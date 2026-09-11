'use client'

import { useEffect, useRef, useState } from 'react'
import { useAskAgentState } from '@/components/portfolio/agent/useAskAgent'
import { AgentIntro } from '@/components/portfolio/agent/AgentIntro'
import { AgentAnswerCard } from '@/components/portfolio/agent/AgentAnswerCard'
import { UserQuestion } from '@/components/portfolio/agent/UserQuestion'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentMessage } from '@/lib/portfolio/agent/types'

type TimelineEntry =
  | { kind: 'categoryPicker'; id: string }
  | { kind: 'categoryQuestions'; id: string; categoryId: string }
  | { kind: 'message'; id: string; message: AgentMessage }

function newTurnId(): string {
  return `turn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

/**
 * Opens with only the 4 category chips. Picking one inserts a new thread turn
 * revealing that category's questions, chat-native instead of a wall of chips.
 */
export function ThreadRevealVariant() {
  const agent = useAskAgentState({ variant: 'sidebar' })
  const { messages, askIntent } = agent

  const [timeline, setTimeline] = useState<TimelineEntry[]>([
    { kind: 'categoryPicker', id: 'cp-0' },
  ])
  const syncedCount = useRef(0)

  useEffect(() => {
    if (messages.length > syncedCount.current) {
      const additions = messages
        .slice(syncedCount.current)
        .map((message) => ({ kind: 'message' as const, id: message.id, message }))
      syncedCount.current = messages.length
      setTimeline((current) => [...current, ...additions])
    }
  }, [messages])

  function revealCategory(categoryId: string) {
    setTimeline((current) => [
      ...current,
      { kind: 'categoryQuestions', id: newTurnId(), categoryId },
    ])
  }

  function browseMore() {
    setTimeline((current) => [...current, { kind: 'categoryPicker', id: newTurnId() }])
  }

  return (
    <div className="ajr-frame">
      <div className="ajr-scroll">
        <AgentIntro variant="sidebar" />

        <ul className="ajr-timeline">
          {timeline.map((entry) => (
            <li key={entry.id} className="ajr-turn">
              {entry.kind === 'categoryPicker' && (
                <div className="ajr-category-picker">
                  <p className="agent-categories__heading font-analogue">Pick a category</p>
                  <div className="ajr-category-row">
                    {QUESTION_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className="agent-question-chip ajr-category-chip"
                        onClick={() => revealCategory(category.id)}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {entry.kind === 'categoryQuestions' &&
                (() => {
                  const category = QUESTION_CATEGORIES.find((c) => c.id === entry.categoryId)
                  if (!category) return null
                  return (
                    <div className="ajr-category-questions">
                      <p className="ajr-reveal-note font-analogue">
                        Here&rsquo;s what you can ask about {category.label}
                      </p>
                      <div className="agent-category__questions">
                        {category.intents.map((intent) => (
                          <button
                            key={intent}
                            type="button"
                            className="agent-question-chip"
                            onClick={() => askIntent(intent)}
                          >
                            {INTENT_QUESTIONS[intent]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })()}

              {entry.kind === 'message' &&
                (entry.message.role === 'user' ? (
                  <UserQuestion label={entry.message.label} />
                ) : (
                  <AgentAnswerCard
                    answer={entry.message.answer}
                    onFollowUp={askIntent}
                    onExploreMore={browseMore}
                  />
                ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="agent-panel__footer-bar">
        <button type="button" className="agent-ask-more" onClick={browseMore}>
          Explore another category
          <span aria-hidden> →</span>
        </button>
      </div>
    </div>
  )
}
