'use client'

import { useCallback, type ReactNode } from 'react'
import Link from 'next/link'
import { Monitor, Rocket, Sparkles } from 'lucide-react'
import { FlowerIcon } from './FlowerIcon'
import { ResumeLink } from './ResumeLink'
import { SchemeTag } from './bento-workflows/SchemeTag'
import { HERO_STRENGTHS } from '@/lib/portfolio/pill-data'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'
import {
  DEFAULT_COLOR_SCHEME,
  type ColorSchemeId,
} from '@/lib/portfolio/bento-workflows/color-schemes'
import { CORE_BRAND, experienceTagColor } from '@/lib/portfolio/experience-cards-data'
import { HeroWorkspaceNav } from './bento-workflows/HeroWorkspaceNav'

function HeroPillIcon({ type }: { type: NonNullable<(typeof HERO_STRENGTHS)[number]['icon']> }) {
  const cls = 'w-3 h-3 shrink-0'
  if (type === 'monitor') return <Monitor className={cls} strokeWidth={2} aria-hidden />
  if (type === 'rocket') return <Rocket className={cls} strokeWidth={2} aria-hidden />
  return <Sparkles className={cls} strokeWidth={2} aria-hidden />
}

function HeroBentoCell({
  id,
  className,
  cellRefs,
  children,
}: {
  id: string
  className?: string
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  children: React.ReactNode
}) {
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) cellRefs.current.set(id, el)
      else cellRefs.current.delete(id)
    },
    [id, cellRefs]
  )

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  )
}

export function HeroBentoPanel({
  cellRefs,
  colorScheme = DEFAULT_COLOR_SCHEME,
  showWorkspaceNav = false,
  showWorkspaceControls = true,
  introHeadline,
  introSub,
}: {
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  colorScheme?: ColorSchemeId
  showWorkspaceNav?: boolean
  showWorkspaceControls?: boolean
  introHeadline?: ReactNode
  introSub?: string
}) {
  return (
    <div className="hero-bento-grid hero-bento-grid--editorial hero-bento-grid--compact">
      {showWorkspaceNav && (
        <HeroBentoCell
          id="hero-nav"
          cellRefs={cellRefs}
          className="hero-bento-cell hero-bento-cell--nav"
        >
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block hero-bento-block--nav">
            <HeroWorkspaceNav showWorkspaceControls={showWorkspaceControls} />
          </div>
        </HeroBentoCell>
      )}

      <HeroBentoCell
        id="hero-intro"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--intro"
      >
        <div className="bento-tile bento-tile--editorial hero-bento-block">
          <span className="hero-bento-port hero-bento-port--right" aria-hidden />
          {introHeadline ? (
            <p className="hero-editorial-headline font-serif-display">{introHeadline}</p>
          ) : (
            <p className="hero-editorial-headline font-serif-display">
              Jasm
              <span className="relative inline-block">
                i
                <FlowerIcon className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" />
              </span>
              ne Gu is a{' '}
              <em className="hero-em hero-em--accent">product-minded builder</em> with the{' '}
              <em className="hero-em hero-em--accent">experience and versatility</em> to translate
              between users, engineering, and operations.
            </p>
          )}

          <p className="hero-editorial-sub mt-6 md:mt-7">
            {introSub ??
              'Product manager and engineer building thoughtful, AI-powered products—from consumer experiences at TurboTax to enterprise data platforms at Autodesk.'}
          </p>
        </div>
      </HeroBentoCell>

      <HeroBentoCell
        id="hero-pills"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--pills"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
          <span className="hero-bento-port hero-bento-port--left" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label bw-card-label--section">Core Strengths</p>
          <ul className="bw-tag-grid">
            {HERO_STRENGTHS.map((pill) => (
              <li key={pill.label}>
                <SchemeTag
                  label={pill.label}
                  color={experienceTagColor(
                    pill.variant === 'supporting'
                      ? 'supporting'
                      : pill.accent === 'coral'
                        ? 'coral'
                        : 'lavender'
                  )}
                  size="sm"
                  variant={pill.variant === 'supporting' ? 'supporting' : 'primary'}
                  icon={pill.icon ? <HeroPillIcon type={pill.icon} /> : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </HeroBentoCell>

      <HeroBentoCell
        id="hero-actions"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--actions"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block hero-bento-block--actions">
          <span className="hero-bento-port hero-bento-port--top" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <div className="hero-bento-actions-row">
            <div className="hero-bento-actions-left">
              <span className="hero-bento-monogram" aria-hidden>
                JG
              </span>
              <div>
                <p className="hero-bento-actions-name">Jasmine Gu</p>
                <p className="hero-bento-actions-role">Product Manager + Engineer</p>
              </div>
            </div>

            <div className="hero-bento-contact-meta">
              <span>Western / Ivey · CS + Business</span>
              <span aria-hidden>·</span>
              <span>Grad 2027</span>
              <span aria-hidden>·</span>
              <span>{SITE_CONTACT.email}</span>
              <span aria-hidden>·</span>
              <Link
                href={SITE_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors"
              >
                LinkedIn
              </Link>
              <span aria-hidden>·</span>
              <ResumeLink className="underline underline-offset-2 transition-colors">
                Résumé
              </ResumeLink>
            </div>
          </div>
        </div>
      </HeroBentoCell>
    </div>
  )
}
