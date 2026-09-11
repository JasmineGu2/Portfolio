'use client'

import { useState } from 'react'
import { useAskAgentState } from '@/components/portfolio/agent/useAskAgent'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentIntent, ResolvedAnswer } from '@/lib/portfolio/agent/types'
import { cn } from '@/lib/utils'

const CATEGORY_COMMANDS: Record<string, string> = {
  engineering: '/engineering',
  product: '/product',
  'people-places': '/people',
  'values-ambitions': '/values',
}

function TerminalAnswer({
  answer,
  onFollowUp,
}: {
  answer: ResolvedAnswer
  onFollowUp: (intent: AgentIntent) => void
}) {
  return (
    <div className="ajt-output">
      <p className="ajt-output-summary">{answer.summary}</p>

      {answer.references.length > 0 && (
        <div className="ajt-output-block">
          <p className="ajt-output-label">## related</p>
          {answer.references.map((reference) => (
            <p key={`${reference.type}-${reference.id}`} className="ajt-output-line">
              [{reference.kindLabel.toLowerCase()}] {reference.title} — {reference.reason}
            </p>
          ))}
        </div>
      )}

      {answer.followUps.length > 0 && (
        <div className="ajt-output-block">
          <p className="ajt-output-label">## keep going</p>
          <div className="ajt-menu">
            {answer.followUps.slice(0, 3).map((intent, index) => (
              <button
                key={intent}
                type="button"
                className="ajt-menu-item"
                onClick={() => onFollowUp(intent)}
              >
                <span className="ajt-menu-num">{String(index + 1).padStart(2, '0')}</span>
                {INTENT_QUESTIONS[intent]}
              </button>
            ))}
          </div>
        </div>
      )}

      {answer.deadEnd && (
        <p className="ajt-output-dim"># that&rsquo;s most of what&rsquo;s grounded on this topic</p>
      )}
    </div>
  )
}

/**
 * Monospace, command-log styling: categories read like slash-commands,
 * questions are a numbered menu, answers print as indented output blocks.
 */
export function TerminalVariant() {
  const agent = useAskAgentState({ variant: 'sidebar' })
  const { messages, askIntent } = agent
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)

  return (
    <div className="ajt-frame">
      <div className="ajt-scroll">
        <p className="ajt-boot">Ask Jasmine — no LLM, retrieval only. Pick a command.</p>

        <div className="ajt-commands">
          {QUESTION_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={cn(
                'ajt-command',
                openCategoryId === category.id && 'ajt-command--active'
              )}
              onClick={() =>
                setOpenCategoryId((current) => (current === category.id ? null : category.id))
              }
            >
              {CATEGORY_COMMANDS[category.id] ?? `/${category.id}`}
            </button>
          ))}
        </div>

        {openCategoryId && (
          <div className="ajt-menu">
            {QUESTION_CATEGORIES.find((category) => category.id === openCategoryId)?.intents.map(
              (intent, index) => (
                <button
                  key={intent}
                  type="button"
                  className="ajt-menu-item"
                  onClick={() => {
                    askIntent(intent)
                    setOpenCategoryId(null)
                  }}
                >
                  <span className="ajt-menu-num">{String(index + 1).padStart(2, '0')}</span>
                  {INTENT_QUESTIONS[intent]}
                </button>
              )
            )}
          </div>
        )}

        {messages.length > 0 && (
          <div className="ajt-log">
            {messages.map((message) =>
              message.role === 'user' ? (
                <p key={message.id} className="ajt-prompt">
                  <span className="ajt-prompt-marker">$</span> {message.label}
                </p>
              ) : (
                <TerminalAnswer key={message.id} answer={message.answer} onFollowUp={askIntent} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
