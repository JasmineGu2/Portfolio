'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  Briefcase,
  Cpu,
  Layers,
  Route,
  Sparkles,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { HERO_EXAMPLE_QUESTIONS, type AgentResponse } from '@/lib/portfolio/ask-agent'
import {
  findRecruiterAnswer,
  RECRUITER_TOPICS,
  type RecruiterTopic,
} from '@/lib/portfolio/recruiter-qa'
import { cn } from '@/lib/utils'
import { AnimatedQuestionPlaceholder } from './AnimatedQuestionPlaceholder'
import { type useAskAgent } from './useAskAgent'
import { useTypewriterCycle } from './useTypewriterCycle'

type AskAgentState = ReturnType<typeof useAskAgent>

const TOPIC_ICONS: Record<RecruiterTopic['icon'], LucideIcon> = {
  briefcase: Briefcase,
  wrench: Wrench,
  sparkles: Sparkles,
  layers: Layers,
  cpu: Cpu,
  user: User,
  route: Route,
}

/** The chip row: short label per topic, same set the site opened with. */
function TopicChips({ onOpen, limit }: { onOpen: (id: string) => void; limit?: number }) {
  const topics = limit ? RECRUITER_TOPICS.slice(0, limit) : RECRUITER_TOPICS
  return (
    <div className="agent-panel__chip-grid">
      {topics.map((topic) => {
        const Icon = TOPIC_ICONS[topic.icon]
        return (
          <button
            key={topic.id}
            type="button"
            className="agent-topic-chip"
            onClick={() => onOpen(topic.id)}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-55" aria-hidden />
            {topic.label}
          </button>
        )
      })}
    </div>
  )
}

export function AskAgentContent({
  agent,
  variant = 'sidebar',
  heroSlot,
}: {
  agent: AskAgentState
  variant?: 'sidebar' | 'hero' | 'floating'
  heroSlot?: React.ReactNode
}) {
  const {
    query,
    setQuery,
    messages,
    hasMessages,
    activeAutocomplete,
    setActiveAutocomplete,
    inputRef,
    threadRef,
    autocomplete,
    submitQuery,
    openTopic,
    resizeTextarea,
  } = agent

  const isHero = variant === 'hero'
  const isFloating = variant === 'floating'

  /** Chips and popup picks land in the composer so you can edit before sending. */
  function fillComposer(question: string) {
    setQuery(question)
    setActiveAutocomplete(-1)
    const input = inputRef.current
    if (!input) return
    input.focus({ preventScroll: true })
    // Caret to the end, and grow the box to fit what we just dropped in.
    window.requestAnimationFrame(() => {
      input.setSelectionRange(question.length, question.length)
      resizeTextarea(input)
    })
  }

  return (
    <div
      className={cn(
        'ask-agent-content',
        isHero && 'ask-agent-content--hero',
        isFloating && 'ask-agent-content--floating'
      )}
    >
      {hasMessages && (
        <div className="agent-panel__thread" ref={threadRef}>
          <ul className="agent-messages">
            {messages.map((message) => (
              <li
                key={message.id}
                className={cn(
                  'agent-message',
                  message.role === 'user' ? 'agent-message--user' : 'agent-message--assistant'
                )}
              >
                {message.role === 'user' ? (
                  <p className="agent-message__text">{message.text}</p>
                ) : (
                  <AssistantMessage response={message.response} onAsk={submitQuery} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={cn('agent-panel__center', !hasMessages && 'agent-panel__center--hero')}>
        {!hasMessages && heroSlot}

        <ComposerCard
          query={query}
          autocomplete={autocomplete}
          activeAutocomplete={activeAutocomplete}
          inputRef={inputRef}
          compact={hasMessages}
          animatedPlaceholder={isHero && !hasMessages}
          onQueryChange={(value) => {
            setQuery(value)
            setActiveAutocomplete(-1)
          }}
          onInputResize={resizeTextarea}
          onSubmit={submitQuery}
          onPickSuggestion={fillComposer}
        />

        {!hasMessages && (
          <TopicChips onOpen={openTopic} limit={isFloating ? 4 : undefined} />
        )}

        {hasMessages && !isFloating && (
          <p className="agent-panel__footnote">
            Grounded in portfolio data · ⌘K to {isHero ? 'focus' : 'toggle'}
          </p>
        )}
      </div>
    </div>
  )
}

function ComposerCard({
  query,
  autocomplete,
  activeAutocomplete,
  inputRef,
  compact = false,
  animatedPlaceholder = false,
  onQueryChange,
  onInputResize,
  onSubmit,
  onPickSuggestion,
}: {
  query: string
  autocomplete: string[]
  activeAutocomplete: number
  inputRef: React.RefObject<HTMLTextAreaElement>
  compact?: boolean
  animatedPlaceholder?: boolean
  onQueryChange: (value: string) => void
  onInputResize: (el: HTMLTextAreaElement) => void
  onSubmit: (text: string, viaChip?: boolean) => void
  onPickSuggestion: (question: string) => void
}) {
  const [inputFocused, setInputFocused] = useState(false)
  const [popupDismissed, setPopupDismissed] = useState(false)
  const [sendNotice, setSendNotice] = useState(false)
  const noticeTimer = useRef<number | null>(null)
  const showTypewriter = animatedPlaceholder && !compact && !query.trim() && !inputFocused

  // A question is sendable once it matches something written. Typing a near-miss
  // leaves the button off rather than sending it into the fallback notice.
  const canSend = Boolean(findRecruiterAnswer(query))
  const showPopup =
    inputFocused && !popupDismissed && !canSend && query.trim().length > 0 && autocomplete.length > 0

  // Free-form send is switched off until there's a model behind it. Rather than a
  // dead button, show a short-lived explanation of why nothing happened.
  function refuseSend() {
    setSendNotice(true)
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setSendNotice(false), 4000)
  }

  useEffect(
    () => () => {
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    },
    []
  )
  const { displayText, reducedMotion } = useTypewriterCycle(
    HERO_EXAMPLE_QUESTIONS,
    showTypewriter
  )

  const staticPlaceholder = compact
    ? 'Reply to Jasmine…'
    : 'Ask about my work, experience, or how things connect…'

  return (
    <div className={cn('agent-composer-card', compact && 'agent-composer-card--compact')}>
      <label htmlFor="agent-query" className="sr-only">
        Message Jasmine
      </label>
      <div className="agent-composer-card__input-wrap">
        {showTypewriter && (
          <AnimatedQuestionPlaceholder text={displayText} showCursor={!reducedMotion} />
        )}
        <textarea
          ref={inputRef}
          id="agent-query"
          className="agent-composer-card__input"
          rows={compact ? 1 : 3}
          placeholder={showTypewriter ? ' ' : staticPlaceholder}
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value)
            onInputResize(event.target)
            setPopupDismissed(false)
          }}
          onFocus={() => setInputFocused(true)}
          // Delayed so a click on a popup row lands before the popup unmounts.
          onBlur={() => window.setTimeout(() => setInputFocused(false), 120)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && showPopup) {
              event.preventDefault()
              setPopupDismissed(true)
              return
            }
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              // Highlighted row wins: load it into the composer, same as clicking it.
              if (showPopup && activeAutocomplete >= 0 && autocomplete[activeAutocomplete]) {
                onPickSuggestion(autocomplete[activeAutocomplete])
                return
              }
              if (canSend) {
                onSubmit(query)
              } else {
                refuseSend()
              }
            }
          }}
        />
      </div>

      <div className="agent-composer-card__footer">
        {sendNotice && (
          <div className="agent-send-notice" id="agent-send-notice" role="status">
            <strong>No answer written for that one yet.</strong> Start typing and pick a suggested
            question, or tap one below.
          </div>
        )}
        <button
          type="button"
          className={cn(
            'agent-composer-card__send',
            !canSend && 'agent-composer-card__send--disabled'
          )}
          onClick={() => (canSend ? onSubmit(query) : refuseSend())}
          aria-label={canSend ? 'Send message' : 'Send message (no written answer yet)'}
          aria-describedby={sendNotice ? 'agent-send-notice' : undefined}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      {showPopup && (
        <ul className="agent-autocomplete" role="listbox" aria-label="Suggested questions">
          <li className="agent-autocomplete__hint" aria-hidden>
            Questions I have answers for
          </li>
          {autocomplete.map((item, index) => (
            <li key={item}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeAutocomplete}
                className={cn(
                  'agent-autocomplete__item',
                  index === activeAutocomplete && 'agent-autocomplete__item--active'
                )}
                // Mouse-down beats the textarea blur, so the pick isn't lost.
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onPickSuggestion(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AssistantMessage({
  response,
  onAsk,
}: {
  response: AgentResponse
  onAsk: (question: string, viaChip?: boolean) => void
}) {
  // Options come from a chip branch, follow-ups from an answer. Same affordance either way.
  const choices = response.options ?? response.followUps

  return (
    <div className="agent-message__assistant">
      <div className="agent-message__avatar" aria-hidden>
        JG
      </div>

      <div className="agent-message__body">
        <p className="agent-message__author font-analogue">Jasmine</p>

        <div className="agent-message__bubble">
          <p className="agent-message__text">{response.answer}</p>
          {response.relatedPath && <p className="agent-message__path">{response.relatedPath}</p>}
        </div>

        {response.references.length > 0 && (
          <ul className="agent-message__refs">
            {response.references.map((ref) => (
              <li key={ref.id}>
                <a className="agent-message__ref" href={ref.href}>
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {choices.length > 0 && (
          <div className="agent-message__choices">
            {choices.map((choice) => (
              <button
                key={choice}
                type="button"
                className="agent-message__choice"
                onClick={() => onAsk(choice, true)}
              >
                {choice}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
