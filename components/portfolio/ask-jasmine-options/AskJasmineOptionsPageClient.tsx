'use client'

import { useState } from 'react'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import { AskJasminePreview } from './AskJasminePreview'
import {
  ASK_JASMINE_VARIANTS,
  type AskJasmineVariantId,
} from '@/lib/portfolio/ask-jasmine-options-data'
import { cn } from '@/lib/utils'

export function AskJasmineOptionsPageClient() {
  const [selectedId, setSelectedId] = useState<AskJasmineVariantId>('thread-reveal')
  const selected =
    ASK_JASMINE_VARIANTS.find((variant) => variant.id === selectedId) ?? ASK_JASMINE_VARIANTS[0]

  return (
    <BentoWorkspaceShell
      title="Ask Jasmine, interaction options"
      description="Three ways to reveal the 14 questions instead of showing all of them at once. Each is fully interactive and answers with the real content."
    >
      <section className="ajo-page">
        <div className="ajo-hero-copy">
          <p className="ajo-eyebrow font-analogue">Selected · {selected.name}</p>
          <h2 className="ajo-title font-serif-display">{selected.description}</h2>
          <p className="ajo-meta">Best for: {selected.bestFor}</p>
        </div>

        <div className="ajo-hero-preview">
          <AskJasminePreview key={selectedId} variantId={selectedId} />
        </div>

        <div className="ajo-switcher-grid">
          {ASK_JASMINE_VARIANTS.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedId(variant.id)}
              className={cn('ajo-option', variant.id === selectedId && 'ajo-option--active')}
            >
              <span className="ajo-option-name">{variant.name}</span>
              <p className="ajo-option-desc">{variant.description}</p>
            </button>
          ))}
        </div>

        <p className="ajo-footer">
          Pick a favorite and I&rsquo;ll rebuild the live Ask Jasmine panel around it.
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
