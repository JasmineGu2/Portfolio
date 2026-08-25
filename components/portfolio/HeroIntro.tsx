'use client'

import { useRef } from 'react'
import { HeroBentoPanel } from './HeroBentoPanel'

export function HeroIntro() {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  return (
    <section className="hero-canvas workflow-canvas">
      <div className="workflow-canvas-inner">
        <div className="hero-bento-wrap">
          <HeroBentoPanel cellRefs={cellRefs} />
        </div>
      </div>
    </section>
  )
}
