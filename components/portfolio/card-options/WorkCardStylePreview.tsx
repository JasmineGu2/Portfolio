'use client'

import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  WORK_CARD_SAMPLES,
  cardStyleVars,
  type WorkCardSample,
  type WorkCardStyleId,
} from '@/lib/portfolio/card-options-data'

const LOGO_CENTER_STYLES: WorkCardStyleId[] = [
  'logo-zoom-center',
  'logo-crop-hero',
  'logo-stack-tight',
  'logo-float-minimal',
  'logo-badge-center',
  'logo-poster',
]

const MEDIA_STYLES: WorkCardStyleId[] = [
  'logo-hero-top',
  'photo-banner',
  'medallion',
  'editorial-stack',
  'inset-frame',
  'magazine-cover',
  'brand-stripe',
]

function CardLogo({
  sample,
  size = 'md',
}: {
  sample: WorkCardSample
  size?: 'md' | 'lg' | 'xl' | 'xxl' | 'zoom' | 'badge'
}) {
  const imgClass = cn(
    'card-opt-logo-img',
    size === 'lg' && 'card-opt-logo-img--large',
    size === 'xl' && 'card-opt-logo-img--xlarge',
    size === 'xxl' && 'card-opt-logo-img--xxlarge',
    size === 'zoom' && 'card-opt-logo-img--zoom',
    size === 'badge' && 'card-opt-logo-img--badge'
  )

  const letterClass = cn(
    'card-opt-logo-letter',
    size === 'lg' && 'card-opt-logo-letter--large',
    size === 'xl' && 'card-opt-logo-letter--xlarge',
    size === 'xxl' && 'card-opt-logo-letter--xxlarge',
    size === 'zoom' && 'card-opt-logo-letter--zoom',
    size === 'badge' && 'card-opt-logo-letter--badge'
  )

  if (sample.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={sample.logo} alt="" className={imgClass} draggable={false} />
    )
  }

  return (
    <span className={letterClass}>{sample.logoLetter ?? sample.title.charAt(0)}</span>
  )
}

function logoSizeForStyle(styleId: WorkCardStyleId): 'lg' | 'xl' | 'xxl' | 'zoom' | 'badge' {
  if (styleId === 'logo-crop-hero') return 'zoom'
  if (styleId === 'logo-badge-center') return 'badge'
  if (styleId === 'logo-float-minimal') return 'xl'
  if (styleId === 'logo-poster') return 'xxl'
  return 'xl'
}

export function WorkCardStylePreview({
  sample,
  styleId,
  compact = false,
}: {
  sample: WorkCardSample
  styleId: WorkCardStyleId
  compact?: boolean
}) {
  const style = cardStyleVars(sample.color) as CSSProperties
  const isLogoCenter = LOGO_CENTER_STYLES.includes(styleId)

  return (
    <article
      className={cn(
        'card-opt-tile',
        `card-opt-tile--${styleId}`,
        compact && 'card-opt-tile--compact',
        isLogoCenter && 'card-opt-tile--logo-forward'
      )}
      style={style}
    >
      {styleId === 'brand-stripe' && <div className="card-opt-stripe" aria-hidden />}

      {styleId === 'watermark' && (
        <div className="card-opt-watermark" aria-hidden>
          <CardLogo sample={sample} size="lg" />
        </div>
      )}

      <div className="card-opt-top">
        <span className="card-opt-chip">{sample.chip}</span>
        <span className="card-opt-arrow" aria-hidden>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {styleId === 'split-panel' ? (
        <div className="card-opt-split">
          <div className="card-opt-media card-opt-media--split">
            <CardLogo sample={sample} size="lg" />
          </div>
          <div className="card-opt-copy">
            <p className="card-opt-title">{sample.title}</p>
            <p className="card-opt-sub">{sample.subtitle}</p>
            <p className="card-opt-period">{sample.period}</p>
          </div>
        </div>
      ) : isLogoCenter ? (
        <>
          {styleId === 'logo-crop-hero' ? (
            <div className="card-opt-logo-crop">
              <CardLogo sample={sample} size="zoom" />
            </div>
          ) : styleId === 'logo-badge-center' ? (
            <div className="card-opt-logo-badge">
              <CardLogo sample={sample} size="badge" />
            </div>
          ) : (
            <div className={cn('card-opt-logo-stage', `card-opt-logo-stage--${styleId}`)}>
              <CardLogo sample={sample} size={logoSizeForStyle(styleId)} />
            </div>
          )}
          <div className="card-opt-copy">
            <p className="card-opt-title">{sample.title}</p>
            <p className="card-opt-sub">{sample.subtitle}</p>
            <p className="card-opt-period">{sample.period}</p>
          </div>
        </>
      ) : (
        <>
          {MEDIA_STYLES.includes(styleId) && (
            <div
              className={cn(
                'card-opt-media',
                styleId === 'logo-hero-top' && 'card-opt-media--hero',
                styleId === 'photo-banner' && 'card-opt-media--banner',
                styleId === 'medallion' && 'card-opt-media--medallion',
                styleId === 'editorial-stack' && 'card-opt-media--stack',
                styleId === 'inset-frame' && 'card-opt-media--inset',
                styleId === 'magazine-cover' && 'card-opt-media--magazine',
                styleId === 'brand-stripe' && 'card-opt-media--stripe'
              )}
            >
              <CardLogo sample={sample} size="lg" />
            </div>
          )}

          {styleId === 'current-compact' && (
            <div className="card-opt-media card-opt-media--compact">
              <CardLogo sample={sample} />
            </div>
          )}

          {styleId === 'watermark' && (
            <div className="card-opt-media card-opt-media--compact card-opt-media--ghost">
              <CardLogo sample={sample} />
            </div>
          )}

          <div className="card-opt-copy">
            <p className="card-opt-title">{sample.title}</p>
            <p className="card-opt-sub">{sample.subtitle}</p>
            <p className="card-opt-period">{sample.period}</p>
          </div>
        </>
      )}
    </article>
  )
}

export function WorkCardStyleGrid({
  styleId,
  compact = false,
}: {
  styleId: WorkCardStyleId
  compact?: boolean
}) {
  return (
    <div className={cn('card-opt-grid-preview', compact && 'card-opt-grid-preview--compact')}>
      {WORK_CARD_SAMPLES.map((sample) => (
        <WorkCardStylePreview key={`${styleId}-${sample.id}`} sample={sample} styleId={styleId} compact={compact} />
      ))}
    </div>
  )
}
