'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import {
  WorkTypographyLegend,
  WorkTypographyPreview,
} from '@/components/portfolio/work-typography-options/WorkTypographyPreview'
import {
  WORK_TYPOGRAPHY_OPTIONS,
  type WorkTypographyId,
} from '@/lib/portfolio/work-typography-options-data'

export function WorkTypographyOptionsPageClient() {
  const [selectedId, setSelectedId] = useState<WorkTypographyId>('playful-current')
  const selected =
    WORK_TYPOGRAPHY_OPTIONS.find((option) => option.id === selectedId) ??
    WORK_TYPOGRAPHY_OPTIONS[0]

  return (
    <BentoWorkspaceShell
      title="Work card typography"
      description="Four font pairings to separate company, role, and subtitle on experience cards."
    >
      <section className="work-type-opt-page">
        <div className="work-type-opt-hero">
          <div>
            <p className="work-type-opt-eyebrow">Selected · {selected.name}</p>
            <h2 className="work-type-opt-title font-serif-display">{selected.description}</h2>
            <p className="work-type-opt-meta">Best for: {selected.bestFor}</p>
            <WorkTypographyLegend option={selected} />
          </div>
          <WorkTypographyPreview option={selected} />
        </div>

        <div className="work-type-opt-grid">
          {WORK_TYPOGRAPHY_OPTIONS.map((option) => {
            const isActive = option.id === selectedId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={cn('work-type-opt-option', isActive && 'work-type-opt-option--active')}
              >
                <div className="work-type-opt-option-head">
                  <span className="work-type-opt-option-name">{option.name}</span>
                  <span className="work-type-opt-option-best">{option.bestFor}</span>
                </div>
                <p className="work-type-opt-option-desc">{option.description}</p>
                <WorkTypographyPreview option={option} compact />
              </button>
            )
          })}
        </div>

        <p className="work-type-opt-footer">
          Pick a favorite and I can apply it to the live work cards.{' '}
          <Link href="/" className="work-type-opt-link">
            Back to home →
          </Link>
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
