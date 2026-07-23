'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import { WorkCardStyleGrid, WorkCardStylePreview } from '@/components/portfolio/card-options/WorkCardStylePreview'
import {
  WORK_CARD_SAMPLES,
  WORK_CARD_STYLE_OPTIONS,
  type WorkCardStyleId,
} from '@/lib/portfolio/card-options-data'

export function CardOptionsPageClient() {
  const [selectedId, setSelectedId] = useState<WorkCardStyleId>('logo-zoom-center')
  const selected =
    WORK_CARD_STYLE_OPTIONS.find((option) => option.id === selectedId) ??
    WORK_CARD_STYLE_OPTIONS[0]
  const heroSample = WORK_CARD_SAMPLES[0]

  return (
    <BentoWorkspaceShell
      title="Work card styling"
      description="Sixteen experience tile layouts — including logo-forward options with no tinted backgrounds. Click a card to preview it large above."
    >
      <section className="card-opt-page">
        <div className="card-opt-hero-panel">
          <div className="card-opt-hero-copy">
            <p className="card-opt-eyebrow">Selected · {selected.name}</p>
            <h2 className="card-opt-hero-title font-serif-display">{selected.description}</h2>
            <p className="card-opt-hero-meta">Best for: {selected.bestFor}</p>
          </div>
          <div className="card-opt-hero-preview">
            <WorkCardStylePreview sample={heroSample} styleId={selectedId} />
            <WorkCardStyleGrid styleId={selectedId} compact />
          </div>
        </div>

        <div className="card-opt-options-grid">
          {WORK_CARD_STYLE_OPTIONS.map((option) => {
            const isActive = option.id === selectedId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={cn('card-opt-option', isActive && 'card-opt-option--active')}
              >
                <div className="card-opt-option-head">
                  <span className="card-opt-option-name">{option.name}</span>
                  <span className="card-opt-option-best">{option.bestFor}</span>
                </div>
                <p className="card-opt-option-desc">{option.description}</p>
                <WorkCardStylePreview
                  sample={WORK_CARD_SAMPLES[1]}
                  styleId={option.id}
                  compact
                />
              </button>
            )
          })}
        </div>

        <p className="card-opt-footer-note">
          Pick a favorite and I can apply it to the live work experience tiles.{' '}
          <Link href="/tag-options" className="card-opt-link">
            Tag options →
          </Link>
          {' · '}
          <Link href="/" className="card-opt-link">
            Home →
          </Link>
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
