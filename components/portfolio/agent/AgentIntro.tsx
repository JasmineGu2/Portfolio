'use client'

import { cn } from '@/lib/utils'

/**
 * Opening state for Ask Jasmine (spec §3). Never an empty chat box — a title, a
 * one-line invitation, and a confident (not apologetic) note that there is no
 * language model behind the answers.
 */
export function AgentIntro({
  variant = 'sidebar',
}: {
  variant?: 'sidebar' | 'hero' | 'floating'
}) {
  return (
    <div className={cn('agent-intro', `agent-intro--${variant}`)}>
      <p className="agent-intro__title font-awesome-shorten">Ask Jasmine</p>
      <p className="agent-intro__lead">
        Explore her work, projects, experiences, and the ideas behind them. Choose a question
        to start.
      </p>
      <p className="agent-disclaimer">
        <span className="agent-disclaimer__tag font-analogue">No LLM here, on purpose.</span>{' '}
        Every answer is grounded in Jasmine&rsquo;s actual portfolio and writing.
      </p>
    </div>
  )
}
