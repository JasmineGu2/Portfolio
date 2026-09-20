'use client'

import { useEffect, useRef, useState } from 'react'
import { AgentIntro } from './AgentIntro'
import { AgentAnswerCard } from './AgentAnswerCard'
import { AgentLoadingBeat } from './AgentLoadingBeat'
import { AgentThinkingTrace } from './AgentThinkingTrace'
import { AgentStreamingAnswer } from './AgentStreamingAnswer'
import { AgentPromptBar } from './AgentPromptBar'
import { FollowUpChips } from './FollowUpChips'
import { UserQuestion } from './UserQuestion'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentMessage } from '@/lib/portfolio/agent/types'
import { cn } from '@/lib/utils'
import type { useAskAgent } from './useAskAgent'

type AskAgentState = ReturnType<typeof useAskAgent>

type TimelineEntry =
  | { kind: 'categoryPicker'; id: string }
  | { kind: 'categoryQuestions'; id: string; categoryId: string }
  | { kind: 'message'; id: string; message: AgentMessage }

type MessagePhase = 'loading' | 'trace' | 'streaming' | 'done'

function newTurnId(): string {
  return `turn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

/**
 * Ask Jasmine, chip-only (spec §4) plus a free-text composer. Opens with the 4
 * question categories; each answer reveals through a phase sequence (loading
 * beat → retrieval trace → streamed summary → full answer card) that mirrors
 * an AI-chat product's choreography over what is still a synchronous, curated
 * lookup — see `specs/07-ask-Jasmine-Guided Portfolio.md` for why that's now
 * a deliberate override rather than the original "no LLM theater" guidance.
 */
export function AskAgentContent({
  agent,
  variant = 'sidebar',
}: {
  agent: AskAgentState
  variant?: 'sidebar' | 'hero'
}) {
  const { messages, hasMessages, threadRef, askIntent, askFreeText } = agent

  const [timeline, setTimeline] = useState<TimelineEntry[]>([
    { kind: 'categoryPicker', id: 'cp-0' },
  ])
  const [phases, setPhases] = useState<Record<string, MessagePhase>>({})
  const syncedCount = useRef(0)

  function advance(id: string, next: MessagePhase) {
    setPhases((current) => ({ ...current, [id]: next }))
  }

  // A cleared conversation (agent.startNewChat) resets `messages` to `[]`; mirror
  // that here so a stale thread from before "New conversation" doesn't linger.
  useEffect(() => {
    if (messages.length > 0) return
    syncedCount.current = 0
    setTimeline([{ kind: 'categoryPicker', id: 'cp-0' }])
    setPhases({})
  }, [messages])

  useEffect(() => {
    if (messages.length <= syncedCount.current) return
    const additions = messages.slice(syncedCount.current)
    syncedCount.current = messages.length

    setTimeline((current) => [
      ...current,
      ...additions.map((message) => ({ kind: 'message' as const, id: message.id, message })),
    ])

    const newAnswerIds = additions
      .filter(
        (m): m is Extract<AgentMessage, { role: 'assistant'; kind: 'answer' }> =>
          m.role === 'assistant' && m.kind === 'answer'
      )
      .map((m) => m.id)
    if (newAnswerIds.length > 0) {
      setPhases((current) => {
        const next = { ...current }
        for (const id of newAnswerIds) next[id] = 'loading'
        return next
      })
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

  const anyInFlight = Object.values(phases).some((p) => p !== 'done')

  return (
    <div className={cn('ask-agent-content', `ask-agent-content--${variant}`)}>
      <div className="agent-thread" ref={threadRef}>
        {!hasMessages && <AgentIntro variant={variant} />}

        <ul className="agent-messages">
          {timeline.map((entry) => (
            <li key={entry.id} className="agent-message">
              {entry.kind === 'categoryPicker' && (
                <div className="agent-bubble agent-bubble--assistant">
                  <p className="agent-categories__heading font-analogue">Pick a category</p>
                  <div className="agent-category__questions">
                    {QUESTION_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className="agent-question-chip agent-question-chip--category"
                        onClick={() => revealCategory(category.id)}
                        data-cuelume-hover
                        data-cuelume-press
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
                    <div className="agent-bubble agent-bubble--assistant">
                      <p className="agent-categories__heading font-analogue">
                        Here&rsquo;s what you can ask about {category.label}
                      </p>
                      <div className="agent-category__questions">
                        {category.intents.map((intent) => (
                          <button
                            key={intent}
                            type="button"
                            className="agent-question-chip"
                            onClick={() => askIntent(intent)}
                            data-cuelume-hover
                            data-cuelume-press
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
                ) : entry.message.kind === 'fallback' ? (
                  <div className="agent-answer">
                    <div className="agent-bubble agent-bubble--assistant">
                      <p className="agent-answer__summary">
                        I don&rsquo;t have that in Jasmine&rsquo;s portfolio yet.
                      </p>
                    </div>
                    <FollowUpChips
                      intents={entry.message.followUps}
                      onPick={askIntent}
                      label="Try one of these"
                    />
                  </div>
                ) : (
                  (() => {
                    const phase = phases[entry.message.id] ?? 'loading'
                    const { answer } = entry.message
                    if (phase === 'loading') {
                      return (
                        <AgentLoadingBeat onDone={() => advance(entry.message.id, 'trace')} />
                      )
                    }
                    if (phase === 'trace') {
                      return (
                        <AgentThinkingTrace
                          question={answer.question}
                          references={answer.references}
                          onSettled={() => advance(entry.message.id, 'streaming')}
                        />
                      )
                    }
                    if (phase === 'streaming') {
                      return (
                        <AgentStreamingAnswer
                          summary={answer.summary}
                          citation={answer.references[0]}
                          onDone={() => advance(entry.message.id, 'done')}
                        />
                      )
                    }
                    return (
                      <AgentAnswerCard
                        answer={answer}
                        onFollowUp={askIntent}
                        onExploreMore={browseMore}
                      />
                    )
                  })()
                ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="agent-panel__footer-bar">
        <button
          type="button"
          className="agent-ask-more"
          onClick={browseMore}
          data-cuelume-hover
          data-cuelume-press
        >
          Explore another category
          <span aria-hidden> →</span>
        </button>
        <AgentPromptBar
          onAskIntent={askIntent}
          onAskFreeText={askFreeText}
          onPickCategory={revealCategory}
          disabled={anyInFlight}
        />
      </div>
    </div>
  )
}
