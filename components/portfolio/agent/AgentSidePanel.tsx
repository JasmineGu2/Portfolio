'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, X } from 'lucide-react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { EXPERIENCE_ITEMS } from '@/lib/portfolio/portfolio-data'
import { cn } from '@/lib/utils'

const DEFAULT_SUGGESTIONS = [
  'Why did you move from engineering to product?',
  'What did Tesla teach you about systems?',
  'What are you building at Autodesk?',
  'How technical are you as a PM?',
]

const ROUTE_SUGGESTIONS: Record<string, string[]> = {
  '/': DEFAULT_SUGGESTIONS,
  '/architecture': [
    'How do your experiences connect?',
    'What is the abstraction engine?',
    'Trace how you moved from frontend to product.',
    'What capabilities did Tesla train?',
  ],
  '/projects': [
    'What have you built from zero to one?',
    'Show me your most technical project.',
    'What side projects influenced your work?',
  ],
  '/tesla': [
    'What did you actually build at Tesla?',
    'Why was this an infrastructure problem?',
    'What did you learn at Tesla?',
    'How did Tesla lead to Autodesk?',
  ],
}

function suggestionsForPath(pathname: string): string[] {
  if (ROUTE_SUGGESTIONS[pathname]) return ROUTE_SUGGESTIONS[pathname]
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '')
    const item = EXPERIENCE_ITEMS.find((entry) => entry.id === slug)
    if (item?.chatbotQuestions?.length) return item.chatbotQuestions
    return [`What did you do at ${item?.title ?? 'this role'}?`, ...DEFAULT_SUGGESTIONS.slice(0, 2)]
  }
  return DEFAULT_SUGGESTIONS
}

function agentVisibleOnRoute(pathname: string): boolean {
  if (pathname === '/ask') return false
  if (pathname.startsWith('/bento-') || pathname.includes('-options')) return false
  return (
    pathname === '/' ||
    pathname === '/architecture' ||
    pathname === '/projects' ||
    pathname === '/tesla' ||
    pathname.startsWith('/work/')
  )
}

export function AgentSidePanel() {
  const pathname = usePathname()
  const { agentOpen, setAgentOpen, toggleAgent } = usePortfolioState()
  const [query, setQuery] = useState('')
  const suggestions = suggestionsForPath(pathname)

  const close = useCallback(() => setAgentOpen(false), [setAgentOpen])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && agentOpen) close()
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        toggleAgent()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [agentOpen, close, toggleAgent])

  if (!agentVisibleOnRoute(pathname)) return null

  return (
    <>
      {!agentOpen && (
        <button
          type="button"
          className="agent-fab font-analogue"
          onClick={() => setAgentOpen(true)}
          aria-label="Ask Jasmine about my work"
        >
          Ask Jasmine
        </button>
      )}

      <div
        className={cn('agent-panel-backdrop', agentOpen && 'agent-panel-backdrop--open')}
        onClick={close}
        aria-hidden={!agentOpen}
      />

      <aside
        className={cn('agent-panel', agentOpen && 'agent-panel--open')}
        aria-hidden={!agentOpen}
        aria-label="Ask Jasmine"
      >
        <header className="agent-panel__header">
          <div>
            <p className="agent-panel__eyebrow font-analogue">JASMINE AGENT</p>
            <h2 className="agent-panel__title">Ask about my work</h2>
          </div>
          <button type="button" className="agent-panel__close" onClick={close} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="agent-panel__status font-analogue">
          <span className="agent-panel__status-dot" aria-hidden />
          ONLINE
        </div>

        <p className="agent-panel__desc font-awesome-shorten">
          Ask about a project, experience, decision, skill, or part of the system.
        </p>

        <div className="agent-panel__composer">
          <label htmlFor="agent-query" className="sr-only">
            Ask a question
          </label>
          <textarea
            id="agent-query"
            className="agent-panel__input"
            rows={3}
            placeholder="What are you curious about?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="agent-panel__suggestions">
          <p className="agent-panel__suggestions-label font-analogue">Suggested</p>
          <ul className="agent-panel__suggestion-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  className="agent-panel__suggestion"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="agent-panel__footnote font-analogue">
          AI responses coming soon · grounded in portfolio data only
        </p>
      </aside>
    </>
  )
}
