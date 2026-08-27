'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BentoFormatShell } from './BentoFormatShell'
import { FORMAT_INTRO, FORMAT_VALUES, FORMAT_WORK } from '@/lib/portfolio/bento-formats-data'

export function CompactBentoFormat() {
  return (
    <BentoFormatShell
      formatId="compact"
      title="Compact mosaic"
      description="A dense 4-column bento box: small gaps, flat background, every tile visible at once."
    >
      <div className="bf-compact-grid">
        <div className="bf-compact-cell bf-compact-cell--intro">
          <div className="bf-tile bf-tile--dark bf-compact-intro">
            <p className="bento-eyebrow text-white/60">Jasmine Gu</p>
            <h2 className="bf-compact-headline">{FORMAT_INTRO.headline}</h2>
            <p className="bf-compact-sub">{FORMAT_INTRO.subline}</p>
          </div>
        </div>

        {FORMAT_VALUES.slice(0, 2).map((v) => (
          <div key={v.id} className="bf-compact-cell">
            <div className="bf-tile bf-tile--light h-full flex flex-col justify-between">
              <div className="bento-icon-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.icon} alt="" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="bento-label text-sm">{v.label}</p>
                <p className="bento-caption text-xs mt-0.5">{v.description}</p>
              </div>
            </div>
          </div>
        ))}

        {FORMAT_WORK.filter((w) => ['tesla', 'autodesk'].includes(w.id)).map((w) => (
          <div key={w.id} className="bf-compact-cell bf-compact-cell--wide">
            <WorkCompactTile work={w} hero />
          </div>
        ))}

        {FORMAT_WORK.filter((w) => !['tesla', 'autodesk', 'western'].includes(w.id)).map((w) => (
          <div key={w.id} className="bf-compact-cell">
            <WorkCompactTile work={w} />
          </div>
        ))}

        {FORMAT_VALUES.slice(2).map((v) => (
          <div key={v.id} className="bf-compact-cell">
            <div className="bf-tile bf-tile--muted h-full flex flex-col justify-between">
              <div className="bento-icon-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.icon} alt="" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="bento-label text-sm">{v.label}</p>
                <p className="bento-caption text-xs mt-0.5">{v.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bf-compact-cell bf-compact-cell--school">
          <WorkCompactTile work={FORMAT_WORK[0]} dark />
        </div>
      </div>
    </BentoFormatShell>
  )
}

function WorkCompactTile({
  work,
  hero,
  dark,
}: {
  work: (typeof FORMAT_WORK)[number]
  hero?: boolean
  dark?: boolean
}) {
  const inner = (
    <>
      {work.logo ? (
        <div className={`bento-logo-wrap ${hero ? 'bento-logo-wrap--hero' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.logo}
            alt=""
            className={hero ? 'w-14 h-14 object-contain' : 'w-9 h-9 object-contain'}
          />
        </div>
      ) : (
        <div className="bento-logo-wrap">
          <span className="font-playful font-bold text-xl">W</span>
        </div>
      )}
      <div className="mt-auto pt-3">
        <p className={`bento-label ${hero ? 'text-lg' : 'text-sm'}`}>{work.title}</p>
        <p className="bento-caption text-xs mt-0.5">{work.subtitle}</p>
        {work.period && <p className="bento-period mt-1">{work.period}</p>}
      </div>
    </>
  )

  const cls = `bf-tile h-full flex flex-col ${dark ? 'bf-tile--dark' : hero ? 'bf-tile--light' : 'bf-tile--muted'} ${
    work.href ? 'bf-tile--clickable' : ''
  }`

  if (work.href) {
    return (
      <Link href={work.href} className={cls}>
        {inner}
      </Link>
    )
  }
  return <div className={cls}>{inner}</div>
}
