import { Mail, Linkedin, Github } from 'lucide-react'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { WORK_ORDER, type WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { WORK_SHOWCASE } from '@/lib/portfolio/showcase-data'
import { WorkTabs } from '@/components/portfolio/hero/WorkTabs'
import { ACCENT_ORANGE } from '@/lib/portfolio/brand'

// Color scheme "stolen" per request: accent orange from anikamantri.com,
// body text color from leerob.com. Scoped to the hero only, not the global tokens.
const ACCENT = ACCENT_ORANGE
const INK = '#282828'

const SOCIALS = [
  { href: `mailto:${SITE_CONTACT.email}`, label: 'Email', icon: Mail },
  { href: SITE_CONTACT.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: SITE_CONTACT.github, label: 'GitHub', icon: Github },
]

const NOTES = ['Product strategy', 'Systems & architecture', 'AI & ML', 'Data', 'User research']

const WORK_LIST: WorkId[] = [...WORK_ORDER, 'western']

export function Hero() {
  return (
    <div className="grid grid-cols-1 gap-10 py-4 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
      <div className="flex flex-col gap-3">
        <h1
          className="font-mono text-[44px] font-bold lowercase leading-none sm:text-[56px]"
          style={{ color: ACCENT }}
        >
          jasmine gu
        </h1>
        <p className="text-2xl sm:text-3xl" style={{ color: INK }}>
          building products for users, engineering, and what&apos;s next
        </p>
        <p className="text-base" style={{ color: INK, opacity: 0.65 }}>
          currently @ <span className="font-semibold">autodesk</span> and @{' '}
          <span className="font-semibold">hack western</span> engineering lead, prev. frontend @{' '}
          <span className="font-semibold">tesla</span>
        </p>
        <div className="mb-1 mt-1 flex items-center gap-4">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              style={{ color: INK, opacity: 0.55 }}
              className="hover:opacity-100"
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </a>
          ))}
        </div>

        <p className="max-w-md text-base leading-7" style={{ color: INK }}>
          I&apos;m a product manager and engineer. I work on governed AI-assisted data tools at{' '}
          <span className="font-semibold">Autodesk</span>, where I help teams query and explore
          data safely. Previously, I worked on ML visualization at{' '}
          <span className="font-semibold">Tesla</span> and onboarding experiences at{' '}
          <span className="font-semibold">Intuit&apos;s TurboTax</span>. I&apos;ve spent the last
          few years moving between engineering and product.
        </p>
        <p className="max-w-md text-base leading-7" style={{ color: INK }}>
          My work is about translating between users, engineering, and operations — making sure
          what&apos;s underneath a product is as considered as what&apos;s on top. I also lead
          engineering for <span className="font-semibold">Hack Western</span> and mentor through
          the <span className="font-semibold">IPS Fellowship</span>&apos;s product bootcamp.
        </p>

        <div className="mt-4">
          <h2 className="mb-2 font-serif text-xl font-medium" style={{ color: INK }}>
            Notes
          </h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-base" style={{ color: INK, opacity: 0.65 }}>
            {NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-4 text-base" style={{ color: INK }}>
          <div>
            <p className="mb-1.5 font-medium">what i&apos;ve been building:</p>
            <ul className="flex flex-col gap-1.5" style={{ opacity: 0.8 }}>
              <li className="flex gap-2">
                <span aria-hidden>↳</span>
                <span>
                  owned product strategy for Autodesk Data Portal Studio, a governed SQL and
                  data-exploration platform
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden>↳</span>
                <span>
                  built ML visualization and anomaly-detection tooling for Tesla&apos;s factory
                  camera systems
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden>↳</span>
                <span>shipped onboarding UI and animations for TurboTax at Intuit</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden>↳</span>
                <span>
                  automated a B2B outreach pipeline that generated 900+ leads at Metaverse Group
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-1.5 font-medium">previously:</p>
            <ul className="flex flex-col gap-1.5" style={{ opacity: 0.8 }}>
              {WORK_LIST.map((id) => {
                const card = EXPERIENCE_CARDS[id]
                return (
                  <li key={id} className="flex gap-2">
                    <span aria-hidden>↳</span>
                    <a href={`/work/${id}`} className="hover:underline">
                      <span className="text-xs uppercase tracking-wide">{card.category}</span>{' '}
                      <span className="font-semibold">{card.company}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <WorkTabs items={WORK_SHOWCASE} />
    </div>
  )
}
