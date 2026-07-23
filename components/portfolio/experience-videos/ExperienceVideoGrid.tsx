'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SchemeTag } from '@/components/portfolio/bento-workflows/SchemeTag'
import { useBentoWorkspace } from '@/components/portfolio/bento-workflows/BentoWorkspaceContext'
import { resolveWorkAccent } from '@/lib/portfolio/bento-workflows/work-accents'
import {
  getExperienceVideoMeta,
  getExperienceMediaAspect,
  type ExperienceVideoStyleId,
} from '@/lib/portfolio/experience-videos-data'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'

function ExperienceVideoTile({
  id,
  styleId,
  featured = false,
}: {
  id: WorkId
  styleId: ExperienceVideoStyleId
  featured?: boolean
}) {
  const { colorScheme } = useBentoWorkspace()
  const meta = getExperienceVideoMeta(id)
  const accent = resolveWorkAccent(id, colorScheme)
  const mediaAspect = getExperienceMediaAspect(id)
  const mediaStyle = { '--exp-media-aspect': mediaAspect } as React.CSSProperties

  const inner = (
    <>
      <div
        className={cn(
          'exp-vid-media',
          meta.video ? 'exp-vid-media--video' : 'exp-vid-media--logo',
          featured && 'exp-vid-media--featured'
        )}
        style={mediaStyle}
      >
        {meta.video ? (
          <video
            src={meta.video}
            className="exp-vid-player"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="exp-vid-logo-fallback">
            {meta.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.logo}
                alt=""
                className={cn(
                  'exp-vid-logo',
                  meta.logoFit === 'wide' && 'exp-vid-logo--wide'
                )}
                draggable={false}
              />
            ) : (
              <span className="exp-vid-logo-letter font-playful font-bold">
                {meta.title.charAt(0)}
              </span>
            )}
          </div>
        )}
        <span className="exp-vid-arrow" aria-hidden>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="exp-vid-copy">
        <SchemeTag label={accent.chip} color={accent.color} size="sm" />
        <p className="exp-vid-title">{meta.title}</p>
        <p className="exp-vid-sub">{meta.subtitle}</p>
        {meta.period && <p className="exp-vid-period">{meta.period}</p>}
      </div>
    </>
  )

  const className = cn(
    'exp-vid-tile group',
    featured && 'exp-vid-tile--featured',
    styleId === 'square-mosaic' && 'exp-vid-tile--mosaic'
  )

  return (
    <Link href={meta.href} className={className}>
      {inner}
    </Link>
  )
}

export function ExperienceVideoGrid({
  ids,
  styleId,
}: {
  ids: readonly WorkId[]
  styleId: ExperienceVideoStyleId
}) {
  return (
    <div
      className={cn(
        'exp-vid-grid',
        styleId === 'square-featured' && 'exp-vid-grid--featured',
        styleId === 'square-mosaic' && 'exp-vid-grid--mosaic'
      )}
    >
      {ids.map((id, index) => (
        <ExperienceVideoTile
          key={id}
          id={id}
          styleId={styleId}
          featured={styleId === 'square-featured' && index === 0}
        />
      ))}
    </div>
  )
}

export function ExperienceVideoPreview({
  id,
  styleId,
  featured = false,
}: {
  id: WorkId
  styleId: ExperienceVideoStyleId
  featured?: boolean
}) {
  return (
    <div className="exp-vid-preview-wrap">
      <ExperienceVideoTile id={id} styleId={styleId} featured={featured} />
    </div>
  )
}
