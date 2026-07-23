'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { GalleryHeroPanel } from './GalleryHeroPanel'
import { SchemeTag } from './bento-workflows/SchemeTag'
import type { ColorSchemeId } from '@/lib/portfolio/bento-workflows/color-schemes'
import {
  getSchemePaletteColor,
  schemeAccentFromColor,
  workTileThemeStyleVars,
} from '@/lib/portfolio/bento-workflows/work-accents'
import {
  encodeGallerySrc,
  galleryForKind,
  galleryPaletteIndex,
  galleryZoneLabel,
  type GalleryKind,
  type GalleryTileSpec,
} from '@/lib/portfolio/gallery-data'

function GalleryCell({
  tile,
  expanded,
  children,
}: {
  tile: GalleryTileSpec
  expanded?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn('bento-cell bw-cell', expanded && 'bw-cell--gallery-expanded')}
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

function GalleryTile({
  tile,
  colorScheme,
  kind,
  expanded,
  onToggleExpand,
}: {
  tile: GalleryTileSpec
  colorScheme: ColorSchemeId
  kind: GalleryKind
  expanded?: boolean
  onToggleExpand?: () => void
}) {
  const paletteIndex = galleryPaletteIndex(tile.id, kind)
  const color = getSchemePaletteColor(colorScheme, paletteIndex)
  const accent = schemeAccentFromColor(color, tile.tag)
  const accentStyle = workTileThemeStyleVars(accent) as CSSProperties

  const isWide = tile.col.includes('span 2') || tile.col.includes('span 3')
  const isTall = tile.row.includes('span 2')
  const isFeatured = isWide && isTall
  const isPhoto = tile.kind === 'photo'

  if (isPhoto && tile.imageSrc) {
    return (
      <div
        className={cn(
          'bento-tile bento-tile--work-exp bento-tile--work-exp--themed bento-tile--gallery-photo flex flex-col h-full',
          accent.textOn === 'dark' && 'bento-tile--work-exp--dark-text',
          isFeatured && 'bento-tile--featured',
          !isFeatured && (isTall || isWide) && 'bento-tile--wide',
          expanded && 'bento-tile--gallery-photo--expanded'
        )}
        style={accentStyle}
      >
        <div className="flex items-start justify-between gap-1">
          <SchemeTag label={accent.chip} color={accent.color} size="sm" className="bw-exp-chip" />
        </div>

        <button
          type="button"
          className="bw-gallery-photo-frame bw-exp-logo mt-0.5 flex-1 min-h-0"
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse photo: ${tile.title}` : `Expand photo: ${tile.title}`}
          onClick={onToggleExpand}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeGallerySrc(tile.imageSrc)}
            alt={tile.alt ?? tile.title}
            loading="lazy"
            decoding="async"
            className="bw-gallery-photo-frame__img"
          />
        </button>

        <div className="mt-auto pt-1 shrink-0">
          <p
            className={cn(
              'bento-label leading-tight',
              isFeatured ? 'text-xs md:text-sm' : 'text-[0.68rem]'
            )}
          >
            {tile.title}
          </p>
          <p className="bento-caption mt-0.5 text-[0.58rem] leading-snug">{tile.subtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bento-tile bento-tile--work-exp bento-tile--work-exp--themed flex flex-col h-full ${
        accent.textOn === 'dark' ? 'bento-tile--work-exp--dark-text' : ''
      } ${isFeatured ? 'bento-tile--featured' : isTall || isWide ? 'bento-tile--wide' : ''}`}
      style={accentStyle}
    >
      <div className="flex items-start justify-between gap-1.5">
        <SchemeTag label={accent.chip} color={accent.color} size="sm" className="bw-exp-chip" />
      </div>

      <div className="flex items-start gap-2 mt-1.5">
        <div className={`bento-logo-wrap bw-exp-logo ${isFeatured ? 'bento-logo-wrap--hero' : ''}`}>
          <span className={`font-playful font-bold ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
            {tile.initial}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <p
          className={`bento-label ${
            isFeatured ? 'text-base md:text-lg' : isWide ? 'text-sm md:text-base' : 'text-sm'
          }`}
        >
          {tile.title}
        </p>
        <p className="bento-caption mt-0.5">{tile.subtitle}</p>
      </div>
    </div>
  )
}

export function GalleryBentoGrid({
  colorScheme,
  activeKind,
  onActiveKindChange,
}: {
  colorScheme: ColorSchemeId
  activeKind: GalleryKind
  onActiveKindChange: (kind: GalleryKind) => void
}) {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const setWrapRef = useCallback((el: HTMLDivElement | null) => {
    if (el) cellRefs.current.set('gallery-hero-wrap', el)
  }, [])

  const tiles = galleryForKind(activeKind)
  const zoneLabel = galleryZoneLabel(activeKind)
  const [expandedPhotoId, setExpandedPhotoId] = useState<string | null>(null)

  useEffect(() => {
    setExpandedPhotoId(null)
  }, [activeKind])

  const togglePhotoExpand = useCallback((tileId: string) => {
    setExpandedPhotoId((current) => (current === tileId ? null : tileId))
  }, [])

  return (
    <div
      ref={setWrapRef}
      className="bento-workflow-wrap bw-workflow-canvas bw-workflow-canvas--unified bw-workflow-canvas--n8n bw-workflow-canvas--compact bw-workflow-canvas--gallery"
    >
      <GalleryHeroPanel
        cellRefs={cellRefs}
        colorScheme={colorScheme}
        activeKind={activeKind}
        onActiveKindChange={onActiveKindChange}
      />

      <div className="bento-career-zone">
        <p className="bw-card-label mb-2">{zoneLabel}</p>

        <div className="bento-grid bento-grid--canvas bw-grid bw-grid--gallery-mosaic">
          {tiles.map((tile) => {
            const expanded = tile.kind === 'photo' && expandedPhotoId === tile.id

            return (
              <GalleryCell key={tile.id} tile={tile} expanded={expanded}>
                <GalleryTile
                  tile={tile}
                  colorScheme={colorScheme}
                  kind={activeKind}
                  expanded={expanded}
                  onToggleExpand={
                    tile.kind === 'photo' ? () => togglePhotoExpand(tile.id) : undefined
                  }
                />
              </GalleryCell>
            )
          })}
        </div>
      </div>
    </div>
  )
}
