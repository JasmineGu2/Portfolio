'use client'

import { useCallback, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { ACCENT_ORANGE } from '@/lib/portfolio/brand'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { WORK_ORDER, type WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { WORK_SHOWCASE, type WorkGroup } from '@/lib/portfolio/showcase-data'
import { InspoWindow, WindowVideo, type WindowPlacement } from './InspoWindow'

/**
 * The homepage as a bento of OS-style windows. Same content as the live hero and work tiles (bio text is
 * copied from `Hero.tsx`, work data comes straight from `WORK_SHOWCASE`); only the composition changes.
 * Composition credits: 109ichiki.com, Counter Forms, The Creative Independent, Milanote, found via Inspo.
 */

type Filter = 'all' | WorkGroup

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'product', label: 'Product' },
  { id: 'people', label: 'People' },
]

const SOCIALS = [
  { href: `mailto:${SITE_CONTACT.email}`, label: 'Email', icon: Mail },
  { href: SITE_CONTACT.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: SITE_CONTACT.github, label: 'GitHub', icon: Github },
]

const NOTES = ['Product strategy', 'Systems & architecture', 'AI & ML', 'Data', 'User research']

const BUILDING = [
  'owned product strategy for Autodesk Data Portal Studio, a governed SQL and data-exploration platform',
  "built ML visualization and anomaly-detection tooling for Tesla's factory camera systems",
  'shipped onboarding UI and animations for TurboTax at Intuit',
  'automated a B2B outreach pipeline that generated 900+ leads at Metaverse Group',
]

const WORK_LIST: WorkId[] = [...WORK_ORDER, 'western']

/**
 * `western` has no row in the shared home mosaic (only `span 5`), so this page gives it the last row and
 * puts `previously.log` beside it, which keeps the bottom edge of the board square.
 */
const PLACEMENT_OVERRIDES: Partial<Record<string, WindowPlacement>> = {
  western: { col: '1 / span 5', row: '5' },
}

function spanOf(col?: string): number {
  const match = col?.match(/span\s+(\d+)/)
  return match ? Number(match[1]) : 4
}

/** Wider windows get a wider frame, so a 2-column window isn't a sliver and an 8-column one isn't a tower. */
function aspectFor(span: number): string {
  if (span >= 7) return '16 / 9'
  if (span >= 4) return '4 / 3'
  return '1 / 1'
}

export function InspoHomepage() {
  const reduceMotion = useReducedMotion()
  const desk = useRef<HTMLDivElement>(null)
  const zTop = useRef(10)
  const [filter, setFilter] = useState<Filter>('all')

  const raise = useCallback(() => {
    zTop.current += 1
    return zTop.current
  }, [])

  const deskVariants = { hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.04 } } }

  return (
    <div className="proto-inspo font-mono" style={{ '--inspo-accent': ACCENT_ORANGE } as CSSProperties}>
      <p className="inspo-crumb">
        <Link href="/proto">← proto</Link>
        <span>bento windows</span>
        <span>composition from 109ichiki · Counter Forms · The Creative Independent · Milanote, via the Inspo MCP</span>
      </p>

      <motion.div ref={desk} className="inspo-desk" variants={deskVariants} initial="hidden" animate="show">
        <div className="inspo-grid">
          <InspoWindow
            title="profile.md"
            placement={{ col: '1 / span 7', row: '1' }}
            constraintsRef={desk}
            raise={raise}
          >
            <div className="inspo-prose">
              <h1 className="inspo-wordmark">jasmine gu</h1>
              <p className="inspo-headline">
                Jasmine Gu is an engineer solving product problems with code and empathy
              </p>
              <p className="inspo-meta">
                currently @ <b>autodesk</b> and @ <b>hack western</b> engineering lead, prev. frontend @{' '}
                <b>tesla</b>
              </p>
              <div className="inspo-socials">
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
              <p>
                I&apos;m a product manager and engineer. I work on governed AI-assisted data tools at{' '}
                <span className="inspo-strong">Autodesk</span>, where I help teams query and explore data
                safely. Previously, I worked on ML visualization at <span className="inspo-strong">Tesla</span>{' '}
                and onboarding experiences at <span className="inspo-strong">Intuit&apos;s TurboTax</span>.
                I&apos;ve spent the last few years moving between engineering and product.
              </p>
              <p>
                My work is about translating between users, engineering, and operations — making sure
                what&apos;s underneath a product is as considered as what&apos;s on top. I also lead
                engineering for <span className="inspo-strong">Hack Western</span> and mentor through the{' '}
                <span className="inspo-strong">IPS Fellowship</span>&apos;s product bootcamp.
              </p>
            </div>
          </InspoWindow>

          <InspoWindow
            title="notes.txt"
            placement={{ col: '8 / span 5', row: '1' }}
            constraintsRef={desk}
            raise={raise}
          >
            <div className="inspo-prose">
              <h2 className="inspo-h">Notes</h2>
              <ul className="inspo-list inspo-list--cols">
                {NOTES.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <h2 className="inspo-h">what i&apos;ve been building:</h2>
              <ul className="inspo-list">
                {BUILDING.map((line) => (
                  <li key={line}>
                    <span aria-hidden>↳</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InspoWindow>
        </div>

        <div className="inspo-filters" role="group" aria-label="Filter work">
          <span className="inspo-filters__label">work/</span>
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="inspo-pill"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="inspo-grid">
          {WORK_SHOWCASE.map((item) => {
            const card = EXPERIENCE_CARDS[item.id as WorkId]
            const base: WindowPlacement = PLACEMENT_OVERRIDES[item.id] ?? {
              col: item.gridColumn,
              row: item.gridRow,
            }
            return (
              <InspoWindow
                key={item.id}
                title={`${item.id}.${item.video ? 'mp4' : 'png'}`}
                placement={{ ...base, aspect: aspectFor(spanOf(base.col)) }}
                href={item.href}
                cursorLabel={item.cursorLabel}
                dimmed={filter !== 'all' && item.group !== filter}
                constraintsRef={desk}
                raise={raise}
                caption={
                  <div className="inspo-win__caption">
                    <p className="inspo-cat">{card.category}</p>
                    <p className="inspo-win__name">{item.name}</p>
                    <p className="inspo-win__sub">{item.subtitle ?? item.description}</p>
                    {item.tags && (
                      <ul className="inspo-win__tags" aria-label="Key skills">
                        {item.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                }
              >
                <div className="inspo-win__media" style={{ backgroundImage: item.gradient }}>
                  {item.video ? (
                    <WindowVideo src={item.video} />
                  ) : (
                    <img className="inspo-win__logo" src={item.image} alt={item.imageAlt} />
                  )}
                </div>
              </InspoWindow>
            )
          })}

          <InspoWindow
            title="previously.log"
            placement={{ col: '6 / span 7', row: '5' }}
            constraintsRef={desk}
            raise={raise}
          >
            <div className="inspo-prose">
              <h2 className="inspo-h">previously:</h2>
              <ul className="inspo-list inspo-list--cols">
                {WORK_LIST.map((id) => {
                  const card = EXPERIENCE_CARDS[id]
                  return (
                    <li key={id}>
                      <span aria-hidden>↳</span>
                      <a href={`/work/${id}`}>
                        <span className="inspo-cat">{card.category}</span>{' '}
                        <span className="inspo-strong">{card.company}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </InspoWindow>
        </div>
      </motion.div>
    </div>
  )
}
