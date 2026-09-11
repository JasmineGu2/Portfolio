'use client'

import { Suspense, useEffect, useState } from 'react'
import { CapabilityLayerStack } from './CapabilityLayerStack'
import { HeroIntroCopy } from './HeroIntroCopy'
import { CAPABILITY_LAYERS } from '@/lib/portfolio/capability-layers-data'

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
 * Ask Jasmine is paused for now (not ready to ship) — see AgentSidePanel /
 * AskAgentContent for the intact feature. This just renders the hero intro
 * and capability stack, given more room now that the chat isn't below it.
 */
function ChatHeroSectionInner() {
  const isNarrow = useIsNarrowViewport(640)

  return (
    <section className="chat-hero" aria-label="Hero">
      <div className="chat-hero__card bento-tile bento-tile--editorial">
        <header className="chat-hero__header">
          <div className="chat-hero__editorial">
            <div className="chat-hero__intro">
              <HeroIntroCopy showSub />
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
