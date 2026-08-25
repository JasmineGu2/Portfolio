'use client'

import { useState } from 'react'
import { ArrowUp, Briefcase, Cpu, Layers, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { HERO_EXAMPLE_QUESTIONS, type AgentResponse } from '@/lib/portfolio/ask-agent'
import { cn } from '@/lib/utils'
import { AnimatedQuestionPlaceholder } from './AnimatedQuestionPlaceholder'
import { type useAskAgent } from './useAskAgent'
import { useTypewriterCycle } from './useTypewriterCycle'

type AskAgentState = ReturnType<typeof useAskAgent>

export type StarterChip = {
  id: string
  label: string
  icon: LucideIcon
  query: string
}

export const STARTER_CHIPS: StarterChip[] = [
  { id: 'tesla', label: 'Tesla', icon: Cpu, query: 'What did you actually build at Tesla?' },
  { id: 'product', label: 'Product', icon: Briefcase, query: 'Why did you move from engineering to product?' },
  { id: 'engineering', label: 'Engineering', icon: Wrench, query: "What's your most technical experience?" },
  { id: 'ai', label: 'AI', icon: Sparkles, query: 'What is your approach to AI products?' },
  { id: 'projects', label: 'Projects', icon: Layers, query: 'What have you built zero to one?' },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: Layers,
    query: 'How do your experiences connect?',
  },
  { id: 'autodesk', label: 'Autodesk', icon: Briefcase, query: 'What are you building at Autodesk?' },
  { id: 'intuit', label: 'Intuit', icon: Briefcase, query: 'What did you learn at Intuit?' },
]

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
    suggestions,
    autocomplete,
    submitQuery,
    resizeTextarea,
  } = agent

  const isHero = variant === 'hero'
  const isFloating = variant === 'floating'

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
                  <AssistantMessage response={message.response} />
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
        />

        {!hasMessages && !isFloating && (
          <div className="agent-panel__chip-grid">
            {STARTER_CHIPS.map((chip) => {
              const Icon = chip.icon
              return (
                <button
                  key={chip.id}
                  type="button"
                  className="agent-topic-chip"
                  onClick={() => submitQuery(chip.query, true)}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-55" aria-hidden />
                  {chip.label}
                </button>
              )
            })}
          </div>
        )}

        {!hasMessages && isFloating && (
          <div className="agent-panel__chip-grid agent-panel__chip-grid--compact">
            {STARTER_CHIPS.slice(0, 4).map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="agent-topic-chip agent-topic-chip--compact"
                onClick={() => submitQuery(chip.query, true)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {hasMessages && suggestions.length > 0 && (
          <div className="agent-panel__chip-grid agent-panel__chip-grid--compact">
            {suggestions.slice(0, 4).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="agent-topic-chip agent-topic-chip--compact"
                onClick={() => submitQuery(suggestion, true)}
              >
                {suggestion.length > 36 ? `${suggestion.slice(0, 36)}…` : suggestion}
              </button>
            ))}
          </div>
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
}) {
  const [inputFocused, setInputFocused] = useState(false)
  const showTypewriter = animatedPlaceholder && !compact && !query.trim() && !inputFocused
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
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              if (activeAutocomplete >= 0 && autocomplete[activeAutocomplete]) {
                onSubmit(autocomplete[activeAutocomplete], true)
              } else {
                onSubmit(query)
              }
            }
          }}
        />
      </div>

      <div className="agent-composer-card__footer">
        <button
          type="button"
          className="agent-composer-card__send"
          onClick={() => onSubmit(query)}
          disabled={!query.trim()}
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      {query && autocomplete.length > 0 && (
        <ul className="agent-autocomplete" role="listbox">
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
                onClick={() => onSubmit(item, true)}
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

function AssistantMessage({ response }: { response: AgentResponse }) {
  return (
    <div className="agent-message__assistant">
      <p className="agent-message__text">{response.answer}</p>

      {response.relatedPath && <p className="agent-message__path">{response.relatedPath}</p>}
    </div>
  )
}
