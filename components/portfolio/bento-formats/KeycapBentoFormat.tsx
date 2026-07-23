'use client'

import Link from 'next/link'
import { BentoFormatShell } from './BentoFormatShell'
import {
  FORMAT_INTRO,
  FORMAT_VALUES,
  FORMAT_WORK,
  KEYCAP_TONES,
} from '@/lib/portfolio/bento-formats-data'

export function KeycapBentoFormat() {
  const allTiles = [
    { type: 'intro' as const, id: 'intro', label: FORMAT_INTRO.headline, sub: FORMAT_INTRO.subline },
    ...FORMAT_WORK.map((w) => ({ type: 'work' as const, ...w })),
    ...FORMAT_VALUES.map((v) => ({ type: 'value' as const, ...v })),
  ]

  return (
    <BentoFormatShell
      formatId="keycap"
      title="Keycap playground"
      description="OVERFLOW-inspired keycap blocks — thick borders, offset shadows, and saturated color fills."
    >
      <div className="bf-keycap-grid">
        {allTiles.map((tile, i) => (
          <KeycapTile key={tile.id} tile={tile} rotate={((i % 5) - 2) * 1.5} />
        ))}
      </div>
    </BentoFormatShell>
  )
}

function KeycapTile({
  tile,
  rotate,
}: {
  tile:
    | { type: 'intro'; id: string; label: string; sub: string }
    | ({ type: 'work' } & (typeof FORMAT_WORK)[number])
    | ({ type: 'value' } & (typeof FORMAT_VALUES)[number])
  rotate: number
}) {
  const tone = KEYCAP_TONES[tile.id] ?? 'bf-keycap--cream'
  const isWide = tile.type === 'intro' || tile.id === 'autodesk' || tile.id === 'tesla'

  const inner = (
    <div
      className={`bf-keycap ${tone}`}
      style={{ '--bf-rotate': `${rotate}deg` } as React.CSSProperties}
    >
      {tile.type === 'intro' && (
        <>
          <p className="bf-keycap-eyebrow">Jasmine Gu</p>
          <p className="bf-keycap-title">{tile.label}</p>
          <p className="bf-keycap-sub">{tile.sub}</p>
        </>
      )}
      {tile.type === 'work' && (
        <>
          {tile.logo ? (
            <div className="bf-keycap-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tile.logo} alt="" className="w-10 h-10 object-contain" />
            </div>
          ) : (
            <div className="bf-keycap-logo">
              <span className="font-playful font-bold text-xl">W</span>
            </div>
          )}
          <p className="bf-keycap-title">{tile.title}</p>
          <p className="bf-keycap-sub">{tile.subtitle}</p>
          {tile.period && <p className="bf-keycap-period">{tile.period}</p>}
        </>
      )}
      {tile.type === 'value' && (
        <>
          <div className="bf-keycap-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tile.icon} alt="" className="w-8 h-8 object-contain" />
          </div>
          <p className="bf-keycap-title">{tile.label}</p>
          <p className="bf-keycap-sub">{tile.description}</p>
        </>
      )}
    </div>
  )

  if (tile.type === 'work' && tile.href) {
    return (
      <Link
        href={tile.href}
        className={`bf-keycap-cell bf-keycap-cell--link ${isWide ? 'bf-keycap-cell--wide' : ''}`}
      >
        {inner}
      </Link>
    )
  }

  return <div className={`bf-keycap-cell ${isWide ? 'bf-keycap-cell--wide' : ''}`}>{inner}</div>
}
