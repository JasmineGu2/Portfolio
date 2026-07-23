'use client'

import {
  resolveWorkAccent,
  workTileThemeStyleVars,
  WORK_ACCENTS,
} from '@/lib/portfolio/bento-workflows/work-accents'
import type { CustomDuoSchemeId } from '@/lib/portfolio/bento-workflows/custom-duo-palettes'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'

const PREVIEW_WORK_IDS: WorkId[] = ['autodesk', 'tesla', 'omers']

function DuoWorkTilePreview({
  workId,
  schemeId,
}: {
  workId: WorkId
  schemeId: CustomDuoSchemeId
}) {
  const accent = resolveWorkAccent(workId, schemeId)
  const meta = WORK_ACCENTS[workId]

  return (
    <article
      className="duo-editor-work-tile bento-tile bento-tile--work-exp bento-tile--work-exp--themed"
      style={workTileThemeStyleVars(accent)}
    >
      <div className="bento-label">{meta.chip}</div>
      <p className="bento-caption">Sample caption for contrast check</p>
      <p className="bento-period">2024 · 4 mo</p>
    </article>
  )
}

export function DuoPalettePreview({ schemeId }: { schemeId: CustomDuoSchemeId }) {
  return (
    <div className="duo-editor-preview">
      <div className="duo-editor-preview-hero">
        <div className="hero-bento-cell hero-bento-cell--intro">
          <div className="bento-tile bento-tile--editorial hero-bento-block">
            <p className="hero-editorial-headline font-serif-display">
              Product builder with{' '}
              <em className="hero-em hero-em--green">AI</em> and{' '}
              <em className="hero-em hero-em--blue">design</em> roots.
            </p>
            <p className="hero-editorial-sub">Secondary line for contrast check.</p>
          </div>
        </div>

        <div className="hero-bento-cell hero-bento-cell--nav">
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
            <span className="bw-nav-link bw-nav-link--active">Home</span>
            <span className="bw-nav-link">Projects</span>
          </div>
        </div>

        <div className="hero-bento-cell hero-bento-cell--pills">
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
            <p className="bw-card-label">What I stand for</p>
            <span className="bw-scheme-tag">Product</span>
            <span className="bw-scheme-tag">Engineering</span>
          </div>
        </div>

        <div className="hero-bento-cell hero-bento-cell--actions">
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block hero-bento-block--actions">
            <span className="bw-cta-btn">Chat with me</span>
            <span className="text-xs">Western / Ivey · CS + Business</span>
          </div>
        </div>
      </div>

      <div className="duo-editor-preview-work">
        {PREVIEW_WORK_IDS.map((workId) => (
          <DuoWorkTilePreview key={workId} workId={workId} schemeId={schemeId} />
        ))}
      </div>
    </div>
  )
}
