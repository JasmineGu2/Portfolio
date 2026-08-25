'use client'

import { useCallback, type ReactNode } from 'react'
import { CapabilityLayerStack } from './CapabilityLayerStack'
import { HeroIntroCopy } from './HeroIntroCopy'
import { CAPABILITY_LAYERS } from '@/lib/portfolio/capability-layers-data'
import {
  PORTFOLIO_DEFAULT_SCHEME,
  type ColorSchemeId,
} from '@/lib/portfolio/bento-workflows/color-schemes'
import { HeroWorkspaceNav } from './bento-workflows/HeroWorkspaceNav'

function HeroBentoCell({
  id,
  className,
  cellRefs,
  children,
}: {
  id: string
  className?: string
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  children: React.ReactNode
}) {
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) cellRefs.current.set(id, el)
      else cellRefs.current.delete(id)
    },
    [id, cellRefs]
  )

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  )
}

export function HeroBentoPanel({
  cellRefs,
  colorScheme = PORTFOLIO_DEFAULT_SCHEME,
  showWorkspaceNav = false,
  showWorkspaceControls = true,
  introHeadline,
  introSub,
}: {
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  colorScheme?: ColorSchemeId
  showWorkspaceNav?: boolean
  showWorkspaceControls?: boolean
  introHeadline?: ReactNode
  introSub?: string
}) {
  return (
    <div className="hero-bento-grid hero-bento-grid--editorial hero-bento-grid--compact">
      {showWorkspaceNav && (
        <HeroBentoCell
          id="hero-nav"
          cellRefs={cellRefs}
          className="hero-bento-cell hero-bento-cell--nav"
        >
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block hero-bento-block--nav">
            <HeroWorkspaceNav showWorkspaceControls={showWorkspaceControls} />
          </div>
        </HeroBentoCell>
      )}

      <HeroBentoCell
        id="hero-intro"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--intro"
      >
        <div className="bento-tile bento-tile--editorial hero-bento-block">
          <span className="hero-bento-port hero-bento-port--right" aria-hidden />
          <HeroIntroCopy headline={introHeadline} sub={introSub} />
        </div>
      </HeroBentoCell>

      <HeroBentoCell
        id="hero-pills"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--pills"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
          <span className="hero-bento-port hero-bento-port--left" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label bw-card-label--section font-analogue">Core Strengths</p>
          <ul className="sr-only">
            {CAPABILITY_LAYERS.map((layer) => (
              <li key={layer.id}>
                {layer.label}: {layer.capabilities.join(', ')}
              </li>
            ))}
          </ul>
          <div className="hero-bento-capability-stack">
            <CapabilityLayerStack />
          </div>
        </div>
      </HeroBentoCell>

    </div>
  )
}
