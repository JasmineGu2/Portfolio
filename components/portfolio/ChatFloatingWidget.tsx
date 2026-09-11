'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageSquare, Minus, Plus, X } from 'lucide-react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { isAgentPanelRoute } from '@/lib/portfolio/workspace-nav'
import { AskAgentContent } from './agent/AskAgentContent'
import { useAskAgent } from './agent/useAskAgent'
import { cn } from '@/lib/utils'

const CHAT_HERO_SENTINEL_SELECTOR = '.chat-hero-sentinel'

/**
 * Universal entry to Ask Jasmine (spec §2). On routes that carry the side panel
 * the trigger just opens that shared panel; on the home page (no side panel) it
 * opens its own dialog. Either way it drives the one shared conversation.
 */
export function ChatFloatingWidget() {
  const pathname = usePathname()
  const agent = useAskAgent({ variant: 'hero' })
  const { agentOpen, setAgentOpen } = usePortfolioState()
  const usesSidePanel = isAgentPanelRoute(pathname)

  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = document.querySelector(CHAT_HERO_SENTINEL_SELECTOR)
    if (!sentinel) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = !entry.isIntersecting
        setVisible(scrolledPast)
        if (!scrolledPast) setExpanded(false)
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (usesSidePanel) setExpanded(false)
  }, [usesSidePanel])

  useEffect(() => {
    if (!expanded) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded])

  const collapse = useCallback(() => setExpanded(false), [])

  const openConversation = useCallback(() => {
    if (usesSidePanel) setAgentOpen(true)
    else setExpanded(true)
  }, [usesSidePanel, setAgentOpen])

  if (!visible) return null
  // Side panel is already open — its own controls take over.
  if (usesSidePanel && agentOpen) return null

  const showDialog = expanded && !usesSidePanel

  return (
    <div
      className={cn('chat-float-widget', showDialog && 'chat-float-widget--expanded')}
      aria-live="polite"
    >
      {showDialog && (
        <button
          type="button"
          className="chat-float-widget__backdrop"
          onClick={collapse}
          aria-label="Close Ask Jasmine"
        />
      )}

      {showDialog ? (
        <div
          ref={panelRef}
          className="chat-float-widget__panel"
          role="dialog"
          aria-label="Ask Jasmine"
        >
          <header className="chat-float-widget__header">
            <p className="chat-float-widget__title font-analogue">Ask Jasmine</p>
            <div className="chat-float-widget__actions">
              {agent.hasMessages && (
                <button
                  type="button"
                  className="agent-panel__icon-btn"
                  onClick={agent.startNewChat}
                  aria-label="New conversation"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
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
          onClick={openConversation}
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
