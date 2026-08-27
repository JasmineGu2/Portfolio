'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useCallback, useRef, type CSSProperties } from 'react'
import { HeroBentoPanel } from './HeroBentoPanel'
import { SchemeTag } from './bento-workflows/SchemeTag'
import { useBentoWorkspace } from './bento-workflows/BentoWorkspaceContext'
import {
  ALL_PROJECT_TILES,
  PROJECTS_INTRO,
  resolveProjectAccent,
  type ProjectTileSpec,
} from '@/lib/portfolio/projects-bento-data'
import { workTileThemeStyleVars } from '@/lib/portfolio/bento-workflows/work-accents'
import { cn } from '@/lib/utils'

function ProjectCell({
  tile,
  cellRefs,
  children,
}: {
  tile: ProjectTileSpec
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
      <span className="bw-port bw-port--top" aria-hidden />
      <span className="bw-port bw-port--bottom" aria-hidden />
      <span className="bw-port bw-port--left" aria-hidden />
      <span className="bw-port bw-port--right" aria-hidden />
      {children}
    </div>
  )
}

function ProjectTile({ tile }: { tile: ProjectTileSpec }) {
  const { colorScheme } = useBentoWorkspace()
  const accent = resolveProjectAccent(tile.track, colorScheme, tile.tag)
  const accentStyle = workTileThemeStyleVars(accent) as CSSProperties

  // Every tile is the same size now that the grid auto-flows, so there's no
  // featured/wide variant to branch on.
  const className = cn(
    'bento-tile bento-tile--work-exp bento-tile--work-exp--themed bento-tile--work-exp--media bento-tile--work-exp--has-video flex flex-col w-full h-auto',
    accent.textOn === 'dark' && 'bento-tile--work-exp--dark-text',
    tile.href !== '#' && 'bento-tile--clickable'
  )

  const inner = (
    <>
      <div className="flex items-start justify-between gap-1.5">
        <SchemeTag label={accent.chip} color={accent.color} size="sm" className="bw-exp-chip" />
        {tile.href !== '#' && (
          <span className="bento-arrow shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      <div className="bw-exp-media-stage bw-exp-media-stage--video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tile.imageSrc}
          alt={tile.imageAlt}
          className="bw-exp-video-player bw-project-thumb"
          draggable={false}
        />
      </div>

      <div className="bw-exp-copy bw-exp-copy--media">
        <p className="bento-label text-sm">{tile.title}</p>
        <p className="bento-caption mt-0.5">{tile.subtitle}</p>
      </div>
    </>
  )

  if (tile.external) {
    return (
      <a
        href={tile.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={accentStyle}
      >
        {inner}
      </a>
    )
  }

  if (tile.href !== '#') {
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

export function ProjectsBentoGrid() {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const { colorScheme } = useBentoWorkspace()

  return (
    <div className="bento-workflow-wrap bw-workflow-canvas bw-workflow-canvas--unified bw-workflow-canvas--n8n bw-workflow-canvas--compact">
      <HeroBentoPanel
        cellRefs={cellRefs}
        colorScheme={colorScheme}
        showWorkspaceControls={false}
        introHeadline={PROJECTS_INTRO.title}
        introSub={PROJECTS_INTRO.lead}
      />

      <div className="bento-career-zone">
        <p className="bw-card-label mb-3 md:mb-4">All projects</p>

        <div className="bento-grid bento-grid--canvas bw-grid bw-grid--projects-wireframe">
          {ALL_PROJECT_TILES.map((tile) => (
            <ProjectCell key={tile.id} tile={tile} cellRefs={cellRefs}>
              <ProjectTile tile={tile} />
            </ProjectCell>
          ))}
        </div>
      </div>
    </div>
  )
}
