'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw, X } from 'lucide-react'
import { ASK_OPEN_EVENT } from '@/lib/portfolio/ask-events'
import {
  ASK_FALLBACK,
  ASK_INTRO,
  ASK_STARTERS,
  askItem,
  matchAsk,
  type AskItem,
} from '@/lib/portfolio/ask-me-data'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'

type Turn = { key: number; q: string; item?: AskItem }

/** Question links, the way the panel shows them: `↳ question`. */
function Ask({ id, onAsk }: { id: string; onAsk: (id: string) => void }) {
  const item = askItem(id)
  if (!item) return null
  return (
    <button type="button" className="ask__link" onClick={() => onAsk(id)}>
      <span aria-hidden>↳</span> {item.q}
    </button>
  )
}

/**
 * "Ask me anything": a docked side panel of questions a recruiter might ask, answered in my own words.
 * Opened from the header link or from a suggested question on the page (see `openAsk`). No language model:
 * typed text is matched to the nearest written answer, and anything else falls back to the email link.
 */
export function AskPanel() {
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([])
  const [text, setText] = useState('')
  const panelRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const count = useRef(0)

  const push = useCallback((q: string, item?: AskItem) => {
    setTurns((t) => [...t, { key: count.current++, q, item }])
  }, [])

  const askId = useCallback(
    (id: string) => {
      const item = askItem(id)
      if (item) push(item.q, item)
    },
    [push],
  )

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true)
      const id = (e as CustomEvent<{ id?: string }>).detail?.id
      if (id) askId(id)
    }
    window.addEventListener(ASK_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(ASK_OPEN_EVENT, onOpen)
  }, [askId])

  // a closed panel is out of the tab order and hidden from screen readers
  useEffect(() => {
    panelRef.current?.toggleAttribute('inert', !open)
    if (!open) return
    const focus = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 260)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(focus)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    body.scrollTo({ top: body.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [turns])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    push(value, matchAsk(value))
    setText('')
  }

  const last = turns[turns.length - 1]
  const asked = new Set(turns.map((t) => t.item?.id))

  return (
    <aside ref={panelRef} className="ask" data-open={open} aria-label="Ask me anything" aria-hidden={!open}>
      <header className="ask__head">
        <p>
          <span aria-hidden>✦</span> Ask me anything
        </p>
        <div>
          <button type="button" aria-label="Start over" onClick={() => setTurns([])}>
            <RotateCcw size={16} strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div ref={bodyRef} className="ask__body" aria-live="polite">
        <p className="ask__a">{ASK_INTRO}</p>

        {!turns.length && (
          <div className="ask__links">
            {ASK_STARTERS.map((id) => (
              <Ask key={id} id={id} onAsk={askId} />
            ))}
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.key} className="ask__turn">
            <p className="ask__q">{turn.q}</p>
            {turn.item ? (
              <div className="ask__a">
                {turn.item.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {turn.item.links && (
                  <p className="ask__out">
                    {turn.item.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
              </div>
            ) : (
              <div className="ask__a">
                <p>{ASK_FALLBACK}</p>
                <p className="ask__out">
                  <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
                </p>
              </div>
            )}
            {turn === last && (
              <div className="ask__links">
                {(turn.item ? turn.item.next : ASK_STARTERS.filter((id) => !asked.has(id)).slice(0, 3)).map((id) => (
                  <Ask key={id} id={id} onAsk={askId} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="ask__form" onSubmit={submit}>
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask me anything…"
          aria-label="Your question"
          maxLength={200}
          autoComplete="off"
        />
        <button type="submit" aria-label="Send" disabled={!text.trim()}>
          <ArrowUp size={16} strokeWidth={2} />
        </button>
      </form>
      <p className="ask__note">Typed questions are matched to the answers I wrote.</p>
    </aside>
  )
}
