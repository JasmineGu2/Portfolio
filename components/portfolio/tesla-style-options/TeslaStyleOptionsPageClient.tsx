'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import { TeslaStylePreview } from '@/components/portfolio/tesla-style-options/TeslaStylePreview'
import {
  OTHER_STYLE_VARIANTS,
  SPACIOUS_STYLE_VARIANTS,
  STORY_STYLE_VARIANTS,
  TESLA_STYLE_VARIANTS,
  type TeslaStyleVariant,
  type TeslaStyleVariantId,
} from '@/lib/portfolio/tesla-style-options-data'

function VariantOption({
  variant,
  isActive,
  onSelect,
}: {
  variant: TeslaStyleVariant
  isActive: boolean
  onSelect: (id: TeslaStyleVariantId) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(variant.id)}
      className={cn('tesla-style-opt-option', isActive && 'tesla-style-opt-option--active')}
    >
      <div className="tesla-style-opt-option-head">
        <span className="tesla-style-opt-option-name">{variant.name}</span>
        <span className="tesla-style-opt-option-best">{variant.bestFor}</span>
      </div>
      <p className="tesla-style-opt-option-desc">{variant.description}</p>
      <div className="tesla-style-opt-option-preview">
        <TeslaStylePreview variantId={variant.id} compact />
      </div>
    </button>
  )
}

function VariantGroup({
  title,
  description,
  variants,
  selectedId,
  onSelect,
}: {
  title: string
  description: string
  variants: TeslaStyleVariant[]
  selectedId: TeslaStyleVariantId
  onSelect: (id: TeslaStyleVariantId) => void
}) {
  return (
    <div className="tesla-style-opt-group">
      <div className="tesla-style-opt-group-head">
        <h3 className="tesla-style-opt-group-title">{title}</h3>
        <p className="tesla-style-opt-group-desc">{description}</p>
      </div>
      <div className="tesla-style-opt-grid">
        {variants.map((variant) => (
          <VariantOption
            key={variant.id}
            variant={variant}
            isActive={variant.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export function TeslaStyleOptionsPageClient() {
  const [selectedId, setSelectedId] = useState<TeslaStyleVariantId>('story-restrained')
  const selected =
    TESLA_STYLE_VARIANTS.find((variant) => variant.id === selectedId) ?? TESLA_STYLE_VARIANTS[0]

  return (
    <BentoWorkspaceShell
      title="Tesla case study styling"
      description="Story-driven layouts with restrained accents, or compare spacious and earlier directions."
    >
      <section className="tesla-style-opt-page">
        <div className="tesla-style-opt-hero">
          <div className="tesla-style-opt-hero-copy">
            <p className="tesla-style-opt-eyebrow">Selected · {selected.name}</p>
            <h2 className="tesla-style-opt-title font-serif-display">{selected.description}</h2>
            <p className="tesla-style-opt-meta">Best for: {selected.bestFor}</p>
            <p className="tesla-style-opt-note">
              Live page:{' '}
              <Link href="/tesla" className="tesla-style-opt-link">
                /tesla
              </Link>
            </p>
          </div>
          <div className="tesla-style-opt-hero-preview">
            <TeslaStylePreview variantId={selectedId} />
          </div>
        </div>

        <VariantGroup
          title="Story layout"
          description="Restrained-accent text blocks arranged as narrative chapters, questions, cards, quote, outcomes."
          variants={STORY_STYLE_VARIANTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <VariantGroup
          title="Spacious editorial family"
          description="Meta grid and serif section hooks, pick how much color comes back."
          variants={SPACIOUS_STYLE_VARIANTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <VariantGroup
          title="Other directions"
          description="Earlier layout explorations with different structure and panel treatments."
          variants={OTHER_STYLE_VARIANTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <p className="tesla-style-opt-footer">
          Pick a favorite and I can apply it to the live Tesla case study.{' '}
          <Link href="/tesla" className="tesla-style-opt-link">
            View live page →
          </Link>
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
