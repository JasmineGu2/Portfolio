'use client'

import { useMemo } from 'react'
import { X } from 'lucide-react'
import type { AgentIntent, AgentMessage } from '@/lib/portfolio/agent/types'
import { cn } from '@/lib/utils'
import { AgentIntro } from './AgentIntro'
import { QuestionCategories } from './QuestionCategories'
import { AgentAnswerCard } from './AgentAnswerCard'
import { UserQuestion } from './UserQuestion'
import type { useAskAgent } from './useAskAgent'

type AskAgentState = ReturnType<typeof useAskAgent>

/**
 * Ask Jasmine, chip-only (spec §4). Opening state shows the four question
 * categories; the conversation is a thread of question echoes and four-layer
 * answer cards, with a persistent way to pick another question. There is no
 * free-text input anywhere.
 */
export function AskAgentContent({
  agent,
  variant = 'sidebar',
}: {
  agent: AskAgentState
  variant?: 'sidebar' | 'hero' | 'floating'
}) {
  const {
    messages,
    hasMessages,
    threadRef,
    askIntent,
    priorityIntents,
    categoriesOpen,
    openCategories,
    closeCategories,
  } = agent

  const exploredIntents = useMemo<AgentIntent[]>(
    () =>
      messages
        .filter((m): m is Extract<AgentMessage, { role: 'user' }> => m.role === 'user')
        .map((m) => m.intent),
    [messages]
  )

  return (
    <div className={cn('ask-agent-content', `ask-agent-content--${variant}`)}>
      {!hasMessages ? (
        <div className="agent-opening">
          <AgentIntro variant={variant} />
          <QuestionCategories
            onPick={askIntent}
            priority={priorityIntents}
            exploredIntents={exploredIntents}
          />
        </div>
      ) : (
        <>
          <div className="agent-panel__thread" ref={threadRef}>
            <ul className="agent-messages">
              {messages.map((message) => (
                <li key={message.id} className="agent-message">
                  {message.role === 'user' ? (
                    <UserQuestion label={message.label} />
                  ) : (
                    <AgentAnswerCard
                      answer={message.answer}
                      onFollowUp={askIntent}
                      onExploreMore={openCategories}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="agent-panel__footer-bar">
            <button type="button" className="agent-ask-more" onClick={openCategories}>
              Pick a question to explore
              <span aria-hidden> →</span>
            </button>
          </div>
        </>
      )}

      {categoriesOpen && hasMessages && (
        <div className="agent-categories-sheet" role="dialog" aria-label="Ask another question">
          <div className="agent-categories-sheet__head">
            <p className="font-analogue">Ask another question</p>
            <button
              type="button"
              className="agent-panel__icon-btn"
              onClick={closeCategories}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <QuestionCategories
            onPick={askIntent}
            priority={priorityIntents}
            exploredIntents={exploredIntents}
          />
        </div>
      )}
    </div>
  )
}
