'use client'

import { Suspense, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { play } from 'cuelume'
import { CapabilityLayerStack } from './CapabilityLayerStack'
import { HeroIntroCopy } from './HeroIntroCopy'
import { CAPABILITY_LAYERS } from '@/lib/portfolio/capability-layers-data'
import { AskAgentContent } from './agent/AskAgentContent'
import { useAskAgent } from './agent/useAskAgent'
import { cn } from '@/lib/utils'

function useIsNarrowViewport(breakpointPx: number) {
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpointPx}px)`)
    const update = () => setIsNarrow(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [breakpointPx])

  return isNarrow
}

/**
 * Ask Jasmine, embedded as the main chat interface in the homepage hero
 * (spec §2's "main experience"). The floating side panel (AgentSidePanel)
 * remains the secondary entry point on other pages — `isAgentPanelRoute`
 * already excludes `/`, so the two never overlap.
 *
 * Starts as a compact card inline in the hero. The first interaction (a chip
 * click, or focusing the composer) expands it into a centered modal — same
 * `useAskAgent` instance throughout, so the conversation carries over rather
 * than resetting. Closing the modal returns to the compact card without
 * losing the thread; interacting again reopens it.
 */
function ChatHeroSectionInner() {
  const agent = useAskAgent({ variant: 'hero' })
  const isNarrow = useIsNarrowViewport(640)
  const [expanded, setExpanded] = useState(false)

  function expand() {
    setExpanded((current) => {
      if (!current) play('bloom')
      return true
    })
  }

  function collapse() {
    setExpanded((current) => {
      if (current) play('whisper')
      return false
    })
  }

  useEffect(() => {
    if (!expanded) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') collapse()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [expanded])

  return (
    <section className="chat-hero" aria-label="Ask Jasmine">
      <div className="chat-hero__card bento-tile bento-tile--editorial">
        <header className="chat-hero__header">
          <div className="chat-hero__editorial">
            <div className="chat-hero__intro">
              <HeroIntroCopy showSub={false} />
            </div>

            <div className="chat-hero__strengths">
              <ul className="sr-only">
                {CAPABILITY_LAYERS.map((layer) => (
                  <li key={layer.id}>
                    {layer.label}: {layer.capabilities.join(', ')}
                  </li>
                ))}
              </ul>
              <CapabilityLayerStack size={isNarrow ? 'default' : 'large'} />
            </div>
          </div>
        </header>

        {expanded && (
          <button
            type="button"
            className="chat-hero__backdrop"
            aria-label="Close chat"
            onClick={collapse}
          />
        )}

        <div
          className={cn(
            'chat-hero__ask',
            agent.hasMessages && 'chat-hero__ask--active',
            expanded && 'chat-hero__ask--modal'
          )}
          onClickCapture={expand}
          onFocusCapture={expand}
          role={expanded ? 'dialog' : undefined}
          aria-modal={expanded || undefined}
          aria-label={expanded ? 'Ask Jasmine' : undefined}
        >
          {expanded && (
            <button
              type="button"
              className="chat-hero__ask-close"
              aria-label="Close chat"
              onClick={collapse}
              data-cuelume-hover
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
          <AskAgentContent agent={agent} variant="hero" />
        </div>
      </div>
    </section>
  )
}

export function ChatHeroSection() {
  return (
    <Suspense fallback={<div className="chat-hero chat-hero--loading" aria-hidden />}>
      <ChatHeroSectionInner />
    </Suspense>
  )
}
