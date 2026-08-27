'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageSquare, Minus, Plus, X } from 'lucide-react'
import { AskAgentContent } from './agent/AskAgentContent'
import { useAskAgent } from './agent/useAskAgent'
import { cn } from '@/lib/utils'

const CHAT_HERO_SENTINEL_SELECTOR = '.chat-hero-sentinel'

export function ChatFloatingWidget() {
  const agent = useAskAgent({ variant: 'hero' })
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = document.querySelector(CHAT_HERO_SENTINEL_SELECTOR)

    // The home page hides the launcher until you've scrolled past the hero chat,
    // so the two don't compete. Every other page has no hero chat, so the
    // launcher is the only entry point and should be there immediately.
    if (!sentinel) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = !entry.isIntersecting
        setVisible(scrolledPast)
        if (!scrolledPast) {
          setExpanded(false)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!expanded) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setExpanded(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !panelRef.current) return
    const input = panelRef.current.querySelector<HTMLTextAreaElement>('#agent-query')
    if (input) {
      window.setTimeout(() => input.focus({ preventScroll: true }), 80)
    }
  }, [expanded])

  const collapse = useCallback(() => setExpanded(false), [])

  if (!visible) return null

  return (
    <div
      className={cn('chat-float-widget', expanded && 'chat-float-widget--expanded')}
      aria-live="polite"
    >
      {expanded && (
        <button
          type="button"
          className="chat-float-widget__backdrop"
          onClick={collapse}
          aria-label="Close Ask Jasmine"
        />
      )}

      {expanded ? (
        <div
          ref={panelRef}
          className="chat-float-widget__panel"
          role="dialog"
          aria-label="Ask Jasmine"
        >
          <header className="chat-float-widget__header">
            <p className="chat-float-widget__title font-analogue">Ask Jasmine</p>
            <div className="chat-float-widget__actions">
              <button
                type="button"
                className="agent-panel__icon-btn"
                onClick={agent.startNewChat}
                aria-label="New conversation"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="agent-panel__icon-btn"
                onClick={collapse}
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="agent-panel__icon-btn"
                onClick={collapse}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="chat-float-widget__body">
            <AskAgentContent agent={agent} variant="floating" />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="chat-float-widget__trigger"
          onClick={() => setExpanded(true)}
          aria-label="Ask Jasmine"
          aria-expanded={false}
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
          <span className="chat-float-widget__trigger-label">Ask Jasmine</span>
          {agent.hasMessages && (
            <span className="chat-float-widget__badge" aria-label="Active conversation" />
          )}
        </button>
      )}
    </div>
  )
}
