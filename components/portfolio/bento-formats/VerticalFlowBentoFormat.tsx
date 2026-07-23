'use client'

import Link from 'next/link'
import { BentoFormatShell } from './BentoFormatShell'
import { FORMAT_INTRO, FORMAT_VALUES, FORMAT_WORK } from '@/lib/portfolio/bento-formats-data'

const STRIP_ITEMS = [
  { kind: 'intro' as const, ...FORMAT_INTRO },
  ...FORMAT_WORK.map((w) => ({ kind: 'work' as const, ...w })),
  ...FORMAT_VALUES.map((v) => ({ kind: 'value' as const, ...v })),
]

export function VerticalFlowBentoFormat() {
  return (
    <BentoFormatShell
      formatId="vertical"
      title="Vertical flow strips"
      description="Full-width horizontal bento bars stacked on a dot canvas — timeline rail on the left."
    >
      <div className="bf-vertical-wrap">
        <div className="bf-vertical-rail" aria-hidden>
          {STRIP_ITEMS.map((_, i) => (
            <span key={i} className="bf-vertical-dot" />
          ))}
        </div>

        <ol className="bf-vertical-list">
          {STRIP_ITEMS.map((item, i) => (
            <li key={item.kind === 'intro' ? 'intro' : item.id} className="bf-vertical-item">
              <span className="bf-vertical-step">{String(i + 1).padStart(2, '0')}</span>
              <StripCard item={item} />
            </li>
          ))}
        </ol>
      </div>
    </BentoFormatShell>
  )
}

function StripCard({
  item,
}: {
  item:
    | { kind: 'intro'; headline: string; serif: string; subline: string }
    | ({ kind: 'work' } & (typeof FORMAT_WORK)[number])
    | ({ kind: 'value' } & (typeof FORMAT_VALUES)[number])
}) {
  if (item.kind === 'intro') {
    return (
      <div className="bf-strip bf-strip--intro">
        <div>
          <p className="bento-eyebrow mb-2">Start</p>
          <p className="bf-strip-title font-serif-display text-xl md:text-2xl leading-snug">
            {item.serif}
          </p>
          <p className="bf-strip-sub mt-3">{item.subline}</p>
        </div>
      </div>
    )
  }

  if (item.kind === 'work') {
    const inner = (
      <div className="bf-strip bf-strip--work">
        {item.logo ? (
          <div className="bento-logo-wrap shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.logo} alt="" className="w-11 h-11 object-contain" />
          </div>
        ) : (
          <div className="bento-logo-wrap shrink-0">
            <span className="font-playful font-bold text-xl">W</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="bf-strip-title">{item.title}</p>
          <p className="bf-strip-sub">{item.subtitle}</p>
        </div>
        {item.period && <p className="bf-strip-period shrink-0">{item.period}</p>}
      </div>
    )

    if (item.href) {
      return (
        <Link href={item.href} className="bf-strip-link">
          {inner}
        </Link>
      )
    }
    return inner
  }

  return (
    <div className="bf-strip bf-strip--value">
      <div className="bento-icon-ring shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="bf-strip-title">{item.label}</p>
        <p className="bf-strip-sub">{item.description}</p>
      </div>
      <span className="bf-strip-tag">Skill</span>
    </div>
  )
}
