'use client'

import { useRef } from 'react'
import { HeroBentoPanel } from './HeroBentoPanel'
import { WorkflowConnectors } from './WorkflowConnectors'
import { HERO_BENTO_EDGES } from '@/lib/portfolio/workflow-connectors'

export function HeroIntro() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  return (
    <section className="hero-canvas workflow-canvas">
      <div className="workflow-canvas-inner">
        <div ref={wrapRef} className="hero-bento-wrap">
          <WorkflowConnectors
            wrapRef={wrapRef}
            cellRefs={cellRefs}
            edges={HERO_BENTO_EDGES}
            className="hero-bento-connectors"
          />
          <HeroBentoPanel cellRefs={cellRefs} />
        </div>
      </div>
    </section>
  )
}
