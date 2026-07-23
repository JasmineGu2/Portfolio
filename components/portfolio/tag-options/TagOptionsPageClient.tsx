'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import {
  TagStyleHeroMock,
  TagStyleRow,
  TagStyleTileMock,
} from '@/components/portfolio/tag-options/TagStylePreview'
import {
  TAG_OPTION_SAMPLES,
  TAG_STYLE_OPTIONS,
  type TagStyleId,
} from '@/lib/portfolio/tag-options-data'

export function TagOptionsPageClient() {
  const [selectedId, setSelectedId] = useState<TagStyleId>('filled-current')
  const selected =
    TAG_STYLE_OPTIONS.find((option) => option.id === selectedId) ?? TAG_STYLE_OPTIONS[0]

  return (
    <BentoWorkspaceShell
      title="Tag styling"
      description="Ten alternatives to the current filled scheme tags. Click a card to preview it large above."
    >
      <section className="tag-opt-page">
        <div className="tag-opt-hero-panel">
          <div className="tag-opt-hero-copy">
            <p className="tag-opt-hero-eyebrow">Selected · {selected.name}</p>
            <h2 className="tag-opt-hero-title font-serif-display">{selected.description}</h2>
            <p className="tag-opt-hero-meta">Best for: {selected.bestFor}</p>
          </div>
          <div className="tag-opt-hero-preview">
            <TagStyleHeroMock styleId={selectedId} />
            <TagStyleTileMock styleId={selectedId} />
          </div>
        </div>

        <div className="tag-opt-grid">
          {TAG_STYLE_OPTIONS.map((option) => {
            const isActive = option.id === selectedId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={cn('tag-opt-card', isActive && 'tag-opt-card--active')}
              >
                <div className="tag-opt-card-head">
                  <span className="tag-opt-card-name">{option.name}</span>
                  <span className="tag-opt-card-best">{option.bestFor}</span>
                </div>
                <p className="tag-opt-card-desc">{option.description}</p>
                <TagStyleRow styleId={option.id} samples={TAG_OPTION_SAMPLES.slice(0, 4)} size="sm" />
              </button>
            )
          })}
        </div>

        <p className="tag-opt-footer-note">
          Pick a favorite and I can swap the live site from{' '}
          <code className="tag-opt-code">SchemeTag</code> to that style.{' '}
          <Link href="/" className="tag-opt-link">
            Back to home →
          </Link>
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
