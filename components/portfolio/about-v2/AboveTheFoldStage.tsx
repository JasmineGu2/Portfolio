'use client'

import { useState, useRef, useEffect } from 'react'
import { useDrag } from '@/hooks/useDrag'
import { useSound } from '@/components/portfolio/SoundProvider'

interface AboveTheFoldStageProps {
  onAskClick: () => void
}

export function AboveTheFoldStage({ onAskClick }: AboveTheFoldStageProps) {
  const sound = useSound()
  const nameCardRef = useRef<HTMLDivElement>(null)
  const explodedRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)

  const [namePos, setNamePos] = useState({ x: 0, y: 0 })
  const [explodedPos, setExplodedPos] = useState({ x: 400, y: 0 })
  const [highlightsPos, setHighlightsPos] = useState({ x: 300, y: 200 })

  // Enable dragging for each card
  useDrag(nameCardRef, {
    onDrag: (x, y) => setNamePos({ x, y }),
    constrainX: [0, 800],
    constrainY: [0, 300],
  })

  useDrag(explodedRef, {
    onDrag: (x, y) => setExplodedPos({ x, y }),
    constrainX: [300, 1100],
    constrainY: [0, 300],
  })

  useDrag(highlightsRef, {
    onDrag: (x, y) => setHighlightsPos({ x, y }),
    constrainX: [0, 900],
    constrainY: [150, 400],
  })

  return (
    <div className="above-the-fold-stage">
      {/* Name card */}
      <div
        ref={nameCardRef}
        className="stage-card name-card"
        style={{ transform: `translate(${namePos.x}px, ${namePos.y}px)` }}
      >
        <h1>Jasmine Gu</h1>
        <p className="headline">Product engineer building systems for scale</p>
        <p className="status">Currently: @ Autodesk, PM on Data Platform</p>
        <div className="socials">
          <a href="mailto:jazz.gu2004@gmail.com">Email</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
        <button className="ask-button" onClick={onAskClick}>
          ✦ Ask me anything
        </button>
      </div>

      {/* Exploded view / capability layers */}
      <div
        ref={explodedRef}
        className="stage-card exploded-card"
        style={{ transform: `translate(${explodedPos.x}px, ${explodedPos.y}px)` }}
      >
        <div className="exploded-diagram">
          <h3>Capability Layers</h3>
          <div className="layers">
            <div className="layer">Product Strategy</div>
            <div className="layer">Full-Stack Build</div>
            <div className="layer">Systems Design</div>
            <div className="layer">User Research</div>
          </div>
        </div>
      </div>

      {/* Highlights card */}
      <div
        ref={highlightsRef}
        className="stage-card highlights-card"
        style={{ transform: `translate(${highlightsPos.x}px, ${highlightsPos.y}px)` }}
      >
        <h3>Highlights</h3>
        <ul>
          <li>Built data platform serving 100+ internal teams</li>
          <li>Led frontend infrastructure at scale</li>
          <li>Organized Hack Western (300+ students)</li>
          <li>28 educational content pieces created</li>
        </ul>
        <div className="whats-next">
          <p>
            <strong>Next:</strong> Systems that enable better decision-making
          </p>
        </div>
      </div>
    </div>
  )
}
