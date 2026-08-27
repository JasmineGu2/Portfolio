'use client'

import Link from 'next/link'
import { FlowerIcon } from '../FlowerIcon'
import { BentoFormatShell } from './BentoFormatShell'
import { FORMAT_INTRO, FORMAT_VALUES, FORMAT_WORK } from '@/lib/portfolio/bento-formats-data'

export function MagazineBentoFormat() {
  return (
    <BentoFormatShell
      formatId="magazine"
      title="Magazine editorial"
      description="Serif-forward hero, oversized feature tiles, and asymmetric spans. Like a spread, not a dashboard."
    >
      <article className="bf-magazine">
        <section className="bf-magazine-hero">
          <p className="bento-eyebrow mb-4">Product / Software · Portfolio</p>
          <p className="bf-magazine-serif">
            Jasm
            <span className="relative inline-block">
              i
              <FlowerIcon className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 pointer-events-none" />
            </span>
            ne Gu is a product-minded builder with the{' '}
            <em className="text-[var(--pf-green)] not-italic">experience</em> and{' '}
            <em className="text-[var(--pf-blue)] not-italic">versatility</em> to translate between
            users, engineering, and operations in{' '}
            <em className="text-[var(--pf-magenta)] not-italic">dynamic environments.</em>
          </p>
          <p className="bf-magazine-lede">{FORMAT_INTRO.subline}</p>
        </section>

        <div className="bf-magazine-grid">
          <div className="bf-magazine-cell bf-magazine-cell--feature">
            <FeatureTile work={FORMAT_WORK.find((w) => w.id === 'autodesk')!} />
          </div>
          <div className="bf-magazine-cell">
            <FeatureTile work={FORMAT_WORK.find((w) => w.id === 'tesla')!} compact />
          </div>
          <div className="bf-magazine-cell bf-magazine-cell--pull">
            <div className="bf-tile bf-tile--accent bf-magazine-pull">
              <p className="bento-eyebrow mb-3">Pull quote</p>
              <p className="bf-magazine-quote">&ldquo;{FORMAT_INTRO.headline}&rdquo;</p>
            </div>
          </div>

          {FORMAT_VALUES.slice(0, 3).map((v) => (
            <div key={v.id} className="bf-magazine-cell">
              <div className="bf-tile bf-tile--light h-full">
                <div className="bento-icon-ring mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.icon} alt="" className="w-7 h-7 object-contain" />
                </div>
                <p className="bento-label">{v.label}</p>
                <p className="bento-caption mt-1">{v.description}</p>
              </div>
            </div>
          ))}

          {FORMAT_WORK.filter((w) => ['intuit', 'omers', 'metaverse'].includes(w.id)).map((w) => (
            <div key={w.id} className="bf-magazine-cell">
              <FeatureTile work={w} compact />
            </div>
          ))}

          <div className="bf-magazine-cell bf-magazine-cell--footer">
            <div className="bf-tile bf-tile--dark bf-magazine-footer">
              <p className="bento-label text-lg">{FORMAT_WORK[0].title}</p>
              <p className="bento-caption mt-1 opacity-80">{FORMAT_WORK[0].subtitle}</p>
              <p className="bento-period mt-2">{FORMAT_WORK[0].period}</p>
            </div>
          </div>
        </div>
      </article>
    </BentoFormatShell>
  )
}

function FeatureTile({
  work,
  compact,
}: {
  work: (typeof FORMAT_WORK)[number]
  compact?: boolean
}) {
  const inner = (
    <>
      {work.logo && (
        <div className={`bento-logo-wrap ${compact ? '' : 'bento-logo-wrap--hero'} mb-4`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.logo}
            alt=""
            className={compact ? 'w-10 h-10 object-contain' : 'w-16 h-16 md:w-20 md:h-20 object-contain'}
          />
        </div>
      )}
      <p className={`bento-label ${compact ? '' : 'text-xl md:text-2xl'}`}>{work.title}</p>
      <p className="bento-caption mt-1">{work.subtitle}</p>
      {work.period && <p className="bento-period mt-2">{work.period}</p>}
    </>
  )

  const cls = `bf-tile bf-tile--light h-full flex flex-col ${work.href ? 'bf-tile--clickable' : ''}`

  if (work.href) {
    return <Link href={work.href} className={cls}>{inner}</Link>
  }
  return <div className={cls}>{inner}</div>
}
