'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import {
  TAG_OPTION_SAMPLES,
  contrastText,
  softTint,
  type TagSample,
  type TagStyleId,
} from '@/lib/portfolio/tag-options-data'

function tagVars(color: string): CSSProperties {
  return {
    '--tag-color': color,
    '--tag-fg': contrastText(color),
    '--tag-soft': softTint(color, 18),
    '--tag-tint': softTint(color, 12),
  } as CSSProperties
}

export function TagStyleChip({
  label,
  color,
  styleId,
  size = 'md',
  className,
}: {
  label: string
  color: string
  styleId: TagStyleId
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <span
      className={cn(
        'tag-opt-chip',
        `tag-opt-chip--${styleId}`,
        size === 'sm' && 'tag-opt-chip--sm',
        className
      )}
      style={tagVars(color)}
    >
      {styleId === 'dot-lead' && <span className="tag-opt-dot" aria-hidden />}
      {styleId === 'stripe' && <span className="tag-opt-stripe" aria-hidden />}
      <span className="tag-opt-label">{label}</span>
    </span>
  )
}

export function TagStyleRow({
  styleId,
  samples = TAG_OPTION_SAMPLES,
  size = 'md',
  wrap = true,
}: {
  styleId: TagStyleId
  samples?: TagSample[]
  size?: 'sm' | 'md'
  wrap?: boolean
}) {
  return (
    <div className={cn('tag-opt-row', wrap && 'tag-opt-row--wrap')}>
      {samples.map((sample) => (
        <TagStyleChip
          key={`${styleId}-${sample.label}`}
          label={sample.label}
          color={sample.color}
          styleId={styleId}
          size={size}
        />
      ))}
    </div>
  )
}

export function TagStyleTileMock({ styleId }: { styleId: TagStyleId }) {
  return (
    <div className="tag-opt-tile-mock">
      <TagStyleRow styleId={styleId} size="sm" />
      <div className="tag-opt-tile-body">
        <div className="tag-opt-tile-logo">T</div>
        <div>
          <p className="tag-opt-tile-title">Tesla</p>
          <p className="tag-opt-tile-sub">Frontend & Infra Engineer</p>
        </div>
      </div>
    </div>
  )
}

export function TagStyleHeroMock({ styleId }: { styleId: TagStyleId }) {
  return (
    <div className="tag-opt-hero-mock">
      <p className="tag-opt-hero-kicker">Hero cluster preview</p>
      <TagStyleRow styleId={styleId} />
    </div>
  )
}
