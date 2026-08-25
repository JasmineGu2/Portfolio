'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { isAgentPanelRoute } from '@/lib/portfolio/workspace-nav'
import { cn } from '@/lib/utils'
import { AskAgentContent } from './AskAgentContent'
import { useAskAgent } from './useAskAgent'

function AgentSidePanelInner() {
  const pathname = usePathname()
  const { agentOpen, setAgentOpen } = usePortfolioState()
  const agent = useAskAgent({ variant: 'sidebar' })

  if (!isAgentPanelRoute(pathname)) return null

  return (
    <div className={cn('agent-slot', agentOpen && 'agent-slot--open')}>
      {!agentOpen && (
        <button
          type="button"
          className="agent-tab"
          onClick={() => {
            setAgentOpen(true)
          }}
          aria-label="Open Ask Jasmine"
        >
          <PanelLeftOpen className="h-4 w-4" aria-hidden />
          <span>Ask</span>
        </button>
      )}

      {agentOpen && (
        <button
          type="button"
          className="agent-panel-backdrop"
          onClick={agent.close}
          aria-label="Close Ask panel"
        />
      )}

      <aside
        className={cn('agent-panel', agentOpen && 'agent-panel--open')}
        aria-hidden={!agentOpen}
        aria-label="Ask Jasmine"
      >
        <header className="agent-panel__header">
          <div className="agent-panel__header-actions">
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
              onClick={agent.close}
              aria-label="Close panel"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          className={cn('agent-panel__body', !agent.hasMessages && 'agent-panel__body--empty')}
        >
          <AskAgentContent
            agent={agent}
            variant="sidebar"
            heroSlot={
              !agent.hasMessages ? (
                <div className="agent-panel__hero">
                  <p className="agent-panel__hero-sub">
                    Ask about my work, experience, or how things connect.
                  </p>
                </div>
              ) : null
            }
          />
        </div>
      </aside>
    </div>
  )
}

export function AgentSidePanel() {
  return (
    <Suspense fallback={null}>
      <AgentSidePanelInner />
    </Suspense>
  )
}
