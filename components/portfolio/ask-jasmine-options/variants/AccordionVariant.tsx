'use client'

import { useState } from 'react'
import { useAskAgentState } from '@/components/portfolio/agent/useAskAgent'
import { AgentIntro } from '@/components/portfolio/agent/AgentIntro'
import { AgentAnswerCard } from '@/components/portfolio/agent/AgentAnswerCard'
import { UserQuestion } from '@/components/portfolio/agent/UserQuestion'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import { cn } from '@/lib/utils'

/**
 * A persistent row of 4 category chips stays docked at the top. Clicking one
 * expands its questions inline underneath, collapsing whichever was open.
 */
export function AccordionVariant() {
  const agent = useAskAgentState({ variant: 'sidebar' })
  const { messages, hasMessages, askIntent } = agent
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)

  function toggleCategory(id: string) {
    setOpenCategoryId((current) => (current === id ? null : id))
  }

  return (
    <div className="ajc-frame">
      <div className="ajc-rail">
        {QUESTION_CATEGORIES.map((category) => {
          const isOpen = openCategoryId === category.id
          return (
            <div key={category.id} className={cn('ajc-category', isOpen && 'ajc-category--open')}>
              <button
                type="button"
                className="agent-question-chip ajc-category-chip"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isOpen}
              >
                {category.label}
                <span className="ajc-caret" aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="agent-category__questions ajc-questions">
                  {category.intents.map((intent) => (
                    <button
                      key={intent}
                      type="button"
                      className="agent-question-chip"
                      onClick={() => {
                        askIntent(intent)
                        setOpenCategoryId(null)
                      }}
                    >
                      {INTENT_QUESTIONS[intent]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="ajc-scroll">
        {!hasMessages ? (
          <AgentIntro variant="sidebar" />
        ) : (
          <ul className="agent-messages">
            {messages.map((message) => (
              <li key={message.id} className="agent-message">
                {message.role === 'user' ? (
                  <UserQuestion label={message.label} />
                ) : (
                  <AgentAnswerCard
                    answer={message.answer}
                    onFollowUp={askIntent}
                    onExploreMore={() => setOpenCategoryId(QUESTION_CATEGORIES[0]?.id ?? null)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
