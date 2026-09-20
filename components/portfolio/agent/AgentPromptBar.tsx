'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { play } from 'cuelume'
import { QUESTION_CATEGORIES, INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import type { AgentIntent } from '@/lib/portfolio/agent/types'

type Row = { key: string; label: string }

/**
 * The composer. Typing `/` browses the 4 question categories (mirrors the
 * chip-picker already in the thread); typing anything else filters the 14
 * known questions. Enter on a non-matching free-text query calls
 * `onAskFreeText` — the one path this repo's retrieval doesn't already cover
 * with a chip, kept honest via the spec §18 "no dead end" fallback.
 */
export function AgentPromptBar({
  onAskIntent,
  onAskFreeText,
  onPickCategory,
  disabled = false,
}: {
  onAskIntent: (intent: AgentIntent) => void
  onAskFreeText: (text: string) => void
  onPickCategory: (categoryId: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')
  const [active, setActive] = useState(0)
  const [engaged, setEngaged] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [highlight, setHighlight] = useState<{ top: number; height: number } | null>(null)

  const trimmed = value.trim()
  const isCategoryMenu = trimmed.startsWith('/')
  const rows: Row[] = isCategoryMenu
    ? QUESTION_CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(trimmed.slice(1).trim().toLowerCase())
      ).map((c) => ({ key: c.id, label: c.label }))
    : trimmed.length > 0
      ? (Object.entries(INTENT_QUESTIONS) as [AgentIntent, string][])
          .filter(([, question]) => question.toLowerCase().includes(trimmed.toLowerCase()))
          .slice(0, 6)
          .map(([intent, question]) => ({ key: intent, label: question }))
      : []
  const menuOpen = trimmed.length > 0
  const menuVisible = menuOpen && rows.length > 0
  const wasMenuVisible = useRef(false)

  useEffect(() => {
    setActive(0)
    setEngaged(false)
  }, [value])

  // "menus and secondary buttons" — cuelume's own documented use for `scan`.
  useEffect(() => {
    if (menuVisible && !wasMenuVisible.current) play('scan')
    wasMenuVisible.current = menuVisible
  }, [menuVisible])

  useLayoutEffect(() => {
    const target = rowRefs.current[active]
    if (target) setHighlight({ top: target.offsetTop, height: target.offsetHeight })
  }, [active, rows.length, value])

  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 28), 100)}px`
  }, [value])

  function pick(row: Row) {
    if (isCategoryMenu) onPickCategory(row.key)
    else onAskIntent(row.key as AgentIntent)
    setValue('')
    textareaRef.current?.focus()
  }

  function submit() {
    if (!trimmed || disabled) return
    if (rows.length > 0) {
      pick(rows[active])
      return
    }
    if (!isCategoryMenu) onAskFreeText(trimmed)
    setValue('')
  }

  return (
    <div className="agent-prompt-bar" data-agent-prompt-bar>
      {menuOpen && rows.length > 0 && (
        <div
          role="listbox"
          onMouseLeave={() => setEngaged(false)}
          className="agent-prompt-bar__menu"
        >
          <span
            aria-hidden
            className="agent-prompt-bar__highlight"
            style={{
              top: highlight?.top ?? 0,
              height: highlight?.height ?? 0,
              opacity: highlight && engaged ? 1 : 0,
            }}
          />
          {rows.map((row, i) => (
            <button
              key={row.key}
              type="button"
              role="option"
              aria-selected={i === active}
              ref={(el) => {
                rowRefs.current[i] = el
              }}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => {
                setActive(i)
                setEngaged(true)
              }}
              onClick={() => pick(row)}
              className="agent-prompt-bar__row"
              data-cuelume-hover
              data-cuelume-press
            >
              {row.label}
            </button>
          ))}
        </div>
      )}
      {menuOpen && rows.length === 0 && !isCategoryMenu && (
        <div className="agent-prompt-bar__menu agent-prompt-bar__menu--empty">
          <span>Press Enter — that&rsquo;s not one of her chip questions, but I&rsquo;ll let you know what I have</span>
        </div>
      )}

      <div className="agent-prompt-bar__row-shell">
        <textarea
          ref={textareaRef}
          rows={1}
          role="combobox"
          aria-expanded={menuOpen && rows.length > 0}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (menuOpen && rows.length > 0) {
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault()
                setEngaged(true)
                setActive((c) => (c + (e.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length)
                return
              }
              if (e.key === 'Tab') {
                e.preventDefault()
                pick(rows[active])
                return
              }
            }
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={disabled ? 'One thing at a time…' : 'Ask anything, or type / to browse'}
          aria-label="Ask Jasmine"
          className="agent-prompt-bar__input"
        />
        <button
          type="button"
          aria-label="Send"
          disabled={disabled || !trimmed}
          onClick={submit}
          className="agent-prompt-bar__send"
          data-cuelume-press="pulse"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
