'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { LandingExperience } from '@/lib/portfolio/landing-data'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { getExperienceVideoMeta, getExperienceMediaAspect } from '@/lib/portfolio/experience-videos-data'
import { SectionLabel } from './SectionLabel'
import { PillTag } from './PillTag'
import { ArrowButton } from './ArrowButton'
import { ReflectionLink } from './ReflectionLink'

const LOGO_LETTERS: Partial<Record<WorkId, string>> = {
  western: 'W',
  'hack-western': 'H',
  'ivey-product': 'P',
}

function ExperienceCardMedia({
  workId,
  alt,
  featured,
}: {
  workId: WorkId
  alt: string
  featured?: boolean
}) {
  const meta = getExperienceVideoMeta(workId)
  const wide = meta.logoFit === 'wide'
  const mediaAspect = getExperienceMediaAspect(workId)

  if (meta.video) {
    return (
      <div
        className={cn(
          'landing-exp-card__media landing-exp-card__media--video',
          featured && 'landing-exp-card__media--featured'
        )}
        style={{ '--exp-media-aspect': mediaAspect } as React.CSSProperties}
      >
        <video
          src={meta.video}
          className="landing-exp-card__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'landing-exp-card__media landing-exp-card__media--logo',
        featured && 'landing-exp-card__media--featured'
      )}
      style={{ '--exp-media-aspect': mediaAspect } as React.CSSProperties}
    >
      {meta.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.logo}
          alt={alt}
          className={cn(
            'landing-exp-card__logo',
            wide ? 'landing-exp-card__logo--wide' : 'landing-exp-card__logo--mark'
          )}
          draggable={false}
        />
      ) : (
        <span className="landing-exp-card__logo-letter" aria-hidden>
          {LOGO_LETTERS[workId] ?? meta.title.charAt(0)}
        </span>
      )}
    </div>
  )
}

export function ExperienceCard({
  experience,
  cellRef,
}: {
  experience: LandingExperience
  cellRef?: (el: HTMLDivElement | null) => void
}) {
  const {
    id,
    company,
    role,
    previousRole,
    dates,
    category,
    subtitle,
    tags,
    reflectionTitle,
    reflectionHref,
    href,
    cardTheme,
    featured,
    imageAlt,
    gridColumn,
    gridRow,
  } = experience

  return (
    <article
      ref={cellRef}
      className={cn(
        'landing-exp-card',
        `landing-exp-card--${cardTheme}`,
        featured && 'landing-exp-card--featured',
        href && 'landing-exp-card--interactive'
      )}
      data-landing-tile={id}
      style={{ gridColumn, gridRow }}
    >
      <div className="landing-exp-card__inner">
        <div className="landing-exp-card__header">
          <SectionLabel className="landing-exp-card__category">{category}</SectionLabel>
          {href ? (
            <Link href={href} className="landing-exp-card__arrow-link">
              <ArrowButton label={`View ${company} experience`} />
            </Link>
          ) : (
            <ArrowButton label={`${company} experience`} />
          )}
        </div>

        <ExperienceCardMedia workId={id} alt={imageAlt} featured={featured} />

        <div className="landing-exp-card__body">
          <p className="landing-exp-card__company">{company}</p>
          <h3 className="landing-exp-card__role">{role}</h3>
          {previousRole && (
            <p className="landing-exp-card__previous-role">{previousRole}</p>
          )}
          <p className="landing-exp-card__subtitle">{subtitle}</p>
          <p className="landing-exp-card__dates">{dates}</p>

          <ul className="landing-exp-card__tags" aria-label="Key skills">
            {tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <PillTag label={tag} variant="card" />
              </li>
            ))}
          </ul>

          <ReflectionLink href={reflectionHref} title={reflectionTitle} />
        </div>
      </div>
    </article>
  )
}
