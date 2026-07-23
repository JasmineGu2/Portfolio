'use client'

import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { HeroBentoPanel } from './HeroBentoPanel'
import { WorkflowConnectors } from './WorkflowConnectors'
import { BENTO_EDGES, BENTO_TILES, type BentoTile, type BentoTileVariant } from '@/lib/portfolio/bento-data'

const VARIANT: Record<BentoTileVariant, string> = {
  dark: 'bento-tile--dark',
  light: 'bento-tile--light',
  muted: 'bento-tile--muted',
  accent: 'bento-tile--accent',
}

function BentoCell({
  tile,
  cellRefs,
  children,
}: {
  tile: BentoTile
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
      className="bento-cell"
      style={{ gridColumn: tile.col, gridRow: tile.row }}
    >
      {children}
    </div>
  )
}

function ValueTile({ tile }: { tile: Extract<BentoTile, { kind: 'value' }> }) {
  return (
    <div className={`bento-tile ${VARIANT[tile.variant]} flex flex-col justify-between group h-full`}>
      <div className="bento-icon-ring">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tile.icon} alt="" className="w-7 h-7 object-contain" />
      </div>
      <div>
        <p className="bento-label">{tile.label}</p>
        <p className="bento-caption mt-1">{tile.description}</p>
      </div>
      <span className="bento-arrow opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
  )
}

function WorkTile({ tile }: { tile: Extract<BentoTile, { kind: 'work' }> }) {
  const isHero = tile.col.includes('span 2') && tile.row.includes('span 2')
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        {tile.logo ? (
          <div className={`bento-logo-wrap ${isHero ? 'bento-logo-wrap--hero' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tile.logo}
              alt=""
              className={isHero ? 'w-16 h-16 md:w-20 md:h-20 object-contain' : 'w-11 h-11 object-contain'}
            />
          </div>
        ) : (
          <div className={`bento-logo-wrap ${isHero ? 'bento-logo-wrap--hero' : ''}`}>
            <span className="font-playful font-bold text-2xl">W</span>
          </div>
        )}
        {tile.href && (
          <span className="bento-arrow">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        )}
      </div>
      <div className="mt-auto pt-4">
        <p className={`bento-label ${isHero ? 'text-xl md:text-2xl' : ''}`}>{tile.title}</p>
        <p className="bento-caption mt-1">{tile.subtitle}</p>
        {tile.period && <p className="bento-period mt-2">{tile.period}</p>}
      </div>
    </>
  )

  const className = `bento-tile ${VARIANT[tile.variant]} flex flex-col h-full ${
    tile.href ? 'bento-tile--clickable' : ''
  } ${isHero ? 'bento-tile--hero' : ''}`

  if (tile.href) {
    return (
      <Link href={tile.href} className={className}>
        {inner}
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}

function BentoTileView({ tile }: { tile: BentoTile }) {
  if (tile.kind === 'value') return <ValueTile tile={tile} />
  return <WorkTile tile={tile} />
}

export function BentoGrid() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  return (
    <div className="bento-page workflow-canvas">
      <div className="workflow-canvas-inner">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 md:mb-10">
          <p className="bento-preview-badge mb-0">Layout preview</p>
          <Link href="/" className="bento-link-inline text-sm">
            ← Back to main site
          </Link>
        </div>

        <div ref={wrapRef} className="bento-workflow-wrap">
          <WorkflowConnectors wrapRef={wrapRef} cellRefs={cellRefs} edges={BENTO_EDGES} />

          <HeroBentoPanel cellRefs={cellRefs} />

          <div className="bento-career-zone">
            <p className="bento-eyebrow mb-5 md:mb-6 text-[var(--pf-muted)]">Experience workflow</p>
            <div className="bento-grid bento-grid--canvas">
              {BENTO_TILES.map((tile) => (
                <BentoCell key={tile.id} tile={tile} cellRefs={cellRefs}>
                  <BentoTileView tile={tile} />
                </BentoCell>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
