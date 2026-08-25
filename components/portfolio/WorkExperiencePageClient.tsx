'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BentoWorkspaceShell } from './bento-workflows/BentoWorkspaceShell'
import { useBentoWorkspace } from './bento-workflows/BentoWorkspaceContext'
import { SchemeTag } from './bento-workflows/SchemeTag'
import { getWorkTileById } from '@/lib/portfolio/bento-workflows/layouts'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { WORK_EXPERIENCE_PAGES } from '@/lib/portfolio/work-experience-content'
import {
  resolveWorkAccent,
  getSchemePaletteColor,
} from '@/lib/portfolio/bento-workflows/work-accents'

export function WorkExperiencePageClient({ slug }: { slug: WorkId }) {
  const { colorScheme } = useBentoWorkspace()
  const tile = getWorkTileById(slug)
  const content = WORK_EXPERIENCE_PAGES[slug]
  const accent = resolveWorkAccent(slug, colorScheme)

  return (
    <BentoWorkspaceShell title="Experience" description={tile.subtitle}>
      <div className="bw-content-panel">
        <Link href="/" className="bw-content-back">
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to workspace
        </Link>

        <header className="bw-content-header">
          <div className="flex flex-wrap items-start gap-3">
            {tile.logo ? (
              <div className="bw-exp-logo-plain">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tile.logo} alt="" className="w-14 h-14 object-contain" />
              </div>
            ) : (
              <div className="bento-logo-wrap bw-exp-logo">
                <span className="font-playful font-bold text-2xl">{tile.title.charAt(0)}</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <SchemeTag
                label={tile.category.toUpperCase()}
                color={accent.color}
                size="sm"
                variant="category"
              />
              <h1 className="bw-content-title font-serif-display mt-2">{tile.title}</h1>
              <p className="bw-content-role">{tile.role}</p>
              {tile.roleNote && <p className="bw-content-role-note">{tile.roleNote}</p>}
              <p className="bw-content-sub">{tile.subtitle}</p>
              {tile.period && <p className="bw-content-meta font-analogue">{tile.period}</p>}
            </div>
          </div>
        </header>

        <section className="bw-content-section">
          <p className="bw-content-lead">{content.summary}</p>
        </section>

        <section className="bw-content-section">
          <h2 className="bw-content-heading font-analogue">Highlights</h2>
          <ul className="bw-content-list">
            {content.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="bw-content-section">
          <h2 className="bw-content-heading font-analogue">Skills & themes</h2>
          <div className="flex flex-wrap gap-2">
            {content.skills.map((skill, index) => (
              <SchemeTag
                key={skill}
                label={skill}
                color={getSchemePaletteColor(colorScheme, index + 1)}
                size="sm"
              />
            ))}
          </div>
        </section>
      </div>
    </BentoWorkspaceShell>
  )
}
