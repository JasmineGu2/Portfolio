'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import {
  ExperienceVideoGrid,
  ExperienceVideoPreview,
} from '@/components/portfolio/experience-videos/ExperienceVideoGrid'
import {
  EXPERIENCE_VIDEO_STYLE_OPTIONS,
  type ExperienceVideoStyleId,
} from '@/lib/portfolio/experience-videos-data'
import { WORK_ORDER } from '@/lib/portfolio/bento-workflows/experience-layouts'

export function ExperienceVideosPageClient() {
  const [selectedId, setSelectedId] = useState<ExperienceVideoStyleId>('square-grid')
  const selected =
    EXPERIENCE_VIDEO_STYLE_OPTIONS.find((option) => option.id === selectedId) ??
    EXPERIENCE_VIDEO_STYLE_OPTIONS[0]
  const heroId = WORK_ORDER[WORK_ORDER.length - 1]

  return (
    <BentoWorkspaceShell
      title="Experience video tiles"
      description="Animated square previews for each role. The loop clips from your previous site, with logo fallbacks where video isn’t available yet."
    >
      <section className="exp-vid-page">
        <div className="exp-vid-hero-panel">
          <div className="exp-vid-hero-copy">
            <p className="exp-vid-eyebrow">Selected · {selected.name}</p>
            <h2 className="exp-vid-hero-title font-serif-display">{selected.description}</h2>
            <p className="exp-vid-hero-meta">Best for: {selected.bestFor}</p>
          </div>
          <div className="exp-vid-hero-preview">
            <ExperienceVideoPreview
              id={heroId}
              styleId={selectedId}
              featured={selectedId === 'square-featured'}
            />
            <ExperienceVideoGrid
              ids={WORK_ORDER.slice(0, 4)}
              styleId={selectedId}
            />
          </div>
        </div>

        <div className="exp-vid-options-grid">
          {EXPERIENCE_VIDEO_STYLE_OPTIONS.map((option) => {
            const isActive = option.id === selectedId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={cn('exp-vid-option', isActive && 'exp-vid-option--active')}
              >
                <div className="exp-vid-option-head">
                  <span className="exp-vid-option-name">{option.name}</span>
                  <span className="exp-vid-option-best">{option.bestFor}</span>
                </div>
                <p className="exp-vid-option-desc">{option.description}</p>
                <ExperienceVideoGrid ids={WORK_ORDER.slice(0, 3)} styleId={option.id} />
              </button>
            )
          })}
        </div>

        <div className="exp-vid-full-grid-panel">
          <p className="exp-vid-section-label">All experiences · {selected.name}</p>
          <ExperienceVideoGrid ids={WORK_ORDER} styleId={selectedId} />
        </div>

        <p className="exp-vid-footer-note">
          Tesla, Intuit, OMERS, and Metaverse use your existing loop clips from{' '}
          <code className="exp-vid-code">public/work/</code>. Other roles show logo fallbacks until
          you add more MP4s.{' '}
          <Link href="/dev/tag-options" className="exp-vid-link">
            Tag options →
          </Link>
          {' · '}
          <Link href="/" className="exp-vid-link">
            Home →
          </Link>
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
