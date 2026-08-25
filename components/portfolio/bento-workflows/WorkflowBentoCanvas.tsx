'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { HeroBentoPanel } from '../HeroBentoPanel'
import { ChatHeroSection } from '../ChatHeroSection'
import { BentoWorkspaceShell } from './BentoWorkspaceShell'
import { useBentoWorkspace } from './BentoWorkspaceContext'
import {
  WORKFLOW_BENTO_LAYOUTS,
  type WorkflowLayoutConfig,
  type WorkflowWorkTile,
} from '@/lib/portfolio/bento-workflows/layouts'
import type { ColorSchemeId } from '@/lib/portfolio/bento-workflows/color-schemes'
import {
  resolveWorkAccent,
  workTileThemeStyleVars,
} from '@/lib/portfolio/bento-workflows/work-accents'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { SchemeTag } from './SchemeTag'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { getExperienceVideoMeta, getExperienceMediaAspect } from '@/lib/portfolio/experience-videos-data'
import { cn } from '@/lib/utils'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'

const LOGO_LETTERS: Partial<Record<string, string>> = {
  western: 'W',
  'hack-western': 'H',
  'ivey-product': 'P',
}

function WorkflowCell({
  tile,
  cellRefs,
  children,
}: {
  tile: WorkflowWorkTile
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  children: React.ReactNode
}) {
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) cellRefs.current.set(tile.id, el)
      else cellRefs.current.delete(tile.id)
    },
    [tile.id, cellRefs]
  )

  return (
    <div
      ref={setRef}
      className="bento-cell bw-cell"
      data-bw-tile={tile.id}
      style={{ gridColumn: tile.col, gridRow: tile.row }}
    >
      {children}
    </div>
  )
}

function WorkTileMedia({
  workId,
  featured = false,
}: {
  workId: WorkId
  featured?: boolean
}) {
  const meta = getExperienceVideoMeta(workId)
  const wide = meta.logoFit === 'wide'
  const mediaAspect = getExperienceMediaAspect(workId)
  const stageStyle = { '--exp-media-aspect': mediaAspect } as React.CSSProperties

  if (meta.video) {
    return (
      <div
        className={cn(
          'bw-exp-media-stage bw-exp-media-stage--video',
          featured && 'bw-exp-media-stage--featured'
        )}
        style={stageStyle}
      >
        <video
          src={meta.video}
          className="bw-exp-video-player"
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
        'bw-exp-media-stage bw-exp-media-stage--logo',
        featured && 'bw-exp-media-stage--featured'
      )}
      style={stageStyle}
    >
      {meta.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.logo}
          alt={`${meta.title} project preview`}
          className={cn(
            'bw-exp-logo-img',
            wide
              ? 'bw-exp-logo-img--wide'
              : featured
                ? 'bw-exp-logo-img--hero'
                : 'bw-exp-logo-img--mark'
          )}
          draggable={false}
        />
      ) : (
        <span
          className={cn(
            'font-playful font-bold bw-exp-logo-letter',
            featured ? 'bw-exp-logo-letter--hero' : 'bw-exp-logo-letter--mark'
          )}
        >
          {LOGO_LETTERS[workId] ?? meta.title.charAt(0)}
        </span>
      )}
    </div>
  )
}

function WorkTile({ tile, colorScheme }: { tile: WorkflowWorkTile; colorScheme: ColorSchemeId }) {
  const { highlightedNodeIds } = usePortfolioState()
  const highlighted = highlightedNodeIds.includes(tile.id)
  const isWide = tile.col.includes('span 2') || tile.col.includes('span 3') || tile.col.includes('span 4') || tile.col.includes('span 5')
  const isTall = tile.row.includes('span 2')
  const workId = tile.id as WorkId
  const accent = resolveWorkAccent(workId, colorScheme)
  const card = EXPERIENCE_CARDS[workId]
  const hasVideo = Boolean(getExperienceVideoMeta(workId).video)
  const isFeatured = isWide && isTall && !hasVideo

  const accentStyle = workTileThemeStyleVars(accent) as React.CSSProperties

  const inner = (
    <>
      <div className="flex items-start justify-between gap-1.5">
        <SchemeTag
          label={tile.category.toUpperCase()}
          color={accent.color}
          size="sm"
          variant="category"
          className="bw-exp-chip bw-exp-category"
        />
        <div className="flex items-center gap-2 shrink-0">
          {tile.period && <span className="bento-period bento-period--top">{tile.period}</span>}
          {tile.href && (
            <span className="bento-arrow bento-arrow--plain shrink-0" aria-hidden>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      <WorkTileMedia workId={workId} featured={isFeatured} />

      <div className="bw-exp-copy bw-exp-copy--media">
        <div className="bento-eyebrow-row">
          <p className="bento-eyebrow-company">{tile.title}</p>
        </div>
        <p
          className={`bento-role mt-0.5 ${isFeatured ? 'bento-role--featured' : isWide ? 'bento-role--wide' : ''}`}
        >
          {tile.role}
        </p>
        {tile.roleNote && <p className="bento-role-note">{tile.roleNote}</p>}
        <p className="bento-subtitle mt-1">{tile.subtitle}</p>
        <ul className="bw-exp-skill-tags bw-exp-skill-tags--chip" aria-label="Key skills">
          {card.tags.map((tag) => (
            <li key={tag.label}>
              <span className="bw-exp-skill-tag bw-exp-skill-tag--chip">{tag.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  const className = cn(
    'bento-tile bento-tile--work-exp bento-tile--work-exp--themed bento-tile--work-exp--media flex flex-col w-full h-auto',
    hasVideo && 'bento-tile--work-exp--has-video',
    accent.textOn === 'dark' && 'bento-tile--work-exp--dark-text',
    tile.href && 'bento-tile--clickable',
    isFeatured && 'bento-tile--featured',
    !hasVideo && (isTall || isWide) && 'bento-tile--wide',
    highlighted && 'bento-tile--highlighted'
  )

  if (tile.href) {
    return (
      <Link href={tile.href} className={className} style={accentStyle}>
        {inner}
      </Link>
    )
  }
  return (
    <div className={className} style={accentStyle}>
      {inner}
    </div>
  )
}

export function WorkflowBentoCanvas({
  layout,
  showSwitcher = false,
  onLayoutChange,
  showWorkspaceControls = true,
  fixedColorScheme,
}: {
  layout: WorkflowLayoutConfig
  showSwitcher?: boolean
  onLayoutChange?: (slug: string) => void
  showWorkspaceControls?: boolean
  /** Locks canvas to a scheme. Omit on production Work/Projects pages — context default is portfolio-warm. */
  fixedColorScheme?: ColorSchemeId
}) {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { colorScheme, setColorScheme } = useBentoWorkspace()
  const activeColorScheme = fixedColorScheme ?? colorScheme

  useEffect(() => {
    if (fixedColorScheme) {
      setColorScheme(fixedColorScheme)
    }
  }, [fixedColorScheme, setColorScheme])

  return (
    <BentoWorkspaceShell
      layout={layout}
      showSwitcher={showSwitcher}
      onLayoutChange={onLayoutChange}
      hidePageHeader
    >
      <div className={`bento-workflow-wrap bw-workflow-canvas bw-workflow-canvas--unified bw-workflow-canvas--n8n bw-workflow-canvas--compact portfolio-content${isHomePage ? ' bw-workflow-canvas--chat-hero' : ''}`}>
        {isHomePage ? (
          <div className="chat-hero-wrap">
            <ChatHeroSection />
            <div className="chat-hero-sentinel" aria-hidden />
          </div>
        ) : (
          <HeroBentoPanel
            cellRefs={cellRefs}
            colorScheme={activeColorScheme}
            showWorkspaceControls={showWorkspaceControls}
          />
        )}

        <div className="bento-career-zone">
          <div className={`bento-grid bento-grid--canvas bw-grid ${layout.gridClass}`}>
            {layout.tiles.map((tile) => (
              <WorkflowCell key={tile.id} tile={tile} cellRefs={cellRefs}>
                <WorkTile tile={tile} colorScheme={activeColorScheme} />
              </WorkflowCell>
            ))}
          </div>
        </div>
      </div>
    </BentoWorkspaceShell>
  )
}

export function WorkflowBentoPlayground() {
  const defaultSlug =
    WORKFLOW_BENTO_LAYOUTS.find((l) => l.slug === 'hub-spoke')?.slug ??
    WORKFLOW_BENTO_LAYOUTS[0].slug
  const [slug, setSlug] = useState(defaultSlug)
  const layout = WORKFLOW_BENTO_LAYOUTS.find((l) => l.slug === slug) ?? WORKFLOW_BENTO_LAYOUTS[0]

  return <WorkflowBentoCanvas layout={layout} showSwitcher onLayoutChange={setSlug} fixedColorScheme={undefined} />
}

export function WorkflowBentoHub() {
  return (
    <BentoWorkspaceShell
      title="Layout library"
      description="Browse all 20 workflow bento formats."
    >
      <div className="bf-hub-grid">
        {WORKFLOW_BENTO_LAYOUTS.map((layout, i) => (
          <Link key={layout.slug} href={`/dev/bento-workflows/${layout.slug}`} className="bf-hub-card">
            <span className="bf-hub-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="bf-format-tag">{layout.tag}</span>
            <h2 className="bf-hub-title">{layout.title}</h2>
            <p className="bf-hub-desc">{layout.description}</p>
            <span className="bf-hub-cta">View layout →</span>
          </Link>
        ))}
      </div>
    </BentoWorkspaceShell>
  )
}
