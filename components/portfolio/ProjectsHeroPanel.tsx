'use client'

import { useCallback, type MutableRefObject, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SchemeTag } from './bento-workflows/SchemeTag'
import {
  PM_PROJECT_TILES,
  PROJECTS_INTRO,
  TECHNICAL_PROJECT_TILES,
  type ProjectKind,
} from '@/lib/portfolio/projects-bento-data'
import type { ColorSchemeId } from '@/lib/portfolio/bento-workflows/color-schemes'
import { getSchemePaletteColor } from '@/lib/portfolio/bento-workflows/work-accents'

function ProjectsHeroCell({
  id,
  className,
  cellRefs,
  children,
}: {
  id: string
  className?: string
  cellRefs: MutableRefObject<Map<string, HTMLDivElement>>
  children: ReactNode
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

export function ProjectsHeroPanel({
  cellRefs,
  colorScheme,
  activeType,
  onActiveTypeChange,
}: {
  cellRefs: MutableRefObject<Map<string, HTMLDivElement>>
  colorScheme: ColorSchemeId
  activeType: ProjectKind
  onActiveTypeChange: (kind: ProjectKind) => void
}) {
  return (
    <div className="hero-bento-grid hero-bento-grid--editorial hero-bento-grid--compact">
      <ProjectsHeroCell
        id="projects-intro"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--intro"
      >
        <div className="bento-tile bento-tile--editorial hero-bento-block">
          <span className="hero-bento-port hero-bento-port--right" aria-hidden />
          <p className="hero-editorial-headline font-serif-display">{PROJECTS_INTRO.title}</p>
          <p className="hero-editorial-sub mt-6 md:mt-7">{PROJECTS_INTRO.lead}</p>
        </div>
      </ProjectsHeroCell>

      <ProjectsHeroCell
        id="projects-pm"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--pills"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
          <span className="hero-bento-port hero-bento-port--left" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label">PM case studies</p>
          <ul className="bw-tag-grid">
            {PM_PROJECT_TILES.map((project, index) => (
              <li key={project.id}>
                <SchemeTag
                  label={project.title.split(' - ')[0] ?? project.title}
                  color={getSchemePaletteColor(colorScheme, index + 1)}
                  size="sm"
                />
              </li>
            ))}
          </ul>
        </div>
      </ProjectsHeroCell>

      <ProjectsHeroCell
        id="projects-technical"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--actions"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block hero-bento-block--actions">
          <span className="hero-bento-port hero-bento-port--top" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label">Technical builds</p>
          <ul className="bw-tag-grid mb-4">
            {TECHNICAL_PROJECT_TILES.map((project, index) => (
              <li key={project.id}>
                <SchemeTag
                  label={project.title.split(' - ')[0] ?? project.title}
                  color={getSchemePaletteColor(colorScheme, index + 6)}
                  size="sm"
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                activeType === 'technical'
                  ? 'border-[var(--sch-hero-border)] bg-[var(--sch-hero)] text-[var(--sch-hero-fg)]'
                  : 'border-transparent bg-transparent text-[var(--sch-hero-sub)] hover:text-[var(--sch-hero-fg)]'
              )}
              onClick={() => onActiveTypeChange('technical')}
            >
              Technical
            </button>
            <button
              type="button"
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                activeType === 'pm'
                  ? 'border-[var(--sch-hero-border)] bg-[var(--sch-hero)] text-[var(--sch-hero-fg)]'
                  : 'border-transparent bg-transparent text-[var(--sch-hero-sub)] hover:text-[var(--sch-hero-fg)]'
              )}
              onClick={() => onActiveTypeChange('pm')}
            >
              PM case studies
            </button>
          </div>
        </div>
      </ProjectsHeroCell>
    </div>
  )
}
