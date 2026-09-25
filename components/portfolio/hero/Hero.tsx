import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { SIDE_PROJECT_SHOWCASE, WORK_SHOWCASE } from '@/lib/portfolio/showcase-data'
import { WorkTabs } from '@/components/portfolio/hero/WorkTabs'
import { SocialLinks } from '@/components/portfolio/hero/SocialLinks'
import { ACCENT_ORANGE } from '@/lib/portfolio/brand'
import {
  HERO_HEADLINE,
  HERO_HIGHLIGHTS,
  HERO_HIGHLIGHTS_LEAD,
  WHATS_NEXT,
} from '@/lib/portfolio/hero-copy'

// Color scheme "stolen" per request: accent orange from anikamantri.com,
// body text color from leerob.com. Scoped to the hero only, not the global tokens.
const ACCENT = ACCENT_ORANGE
const INK = '#282828'

const SOCIALS = [
  { href: `mailto:${SITE_CONTACT.email}`, label: 'Email', iconType: 'mail' as const },
  { href: SITE_CONTACT.linkedin, label: 'LinkedIn', iconType: 'linkedin' as const },
  { href: SITE_CONTACT.github, label: 'GitHub', iconType: 'github' as const },
]

function ArrowList({ lead, note, items }: { lead: string; note?: string; items: readonly string[] }) {
  return (
    <div style={{ color: INK }}>
      <p className="mb-4 text-base sm:text-lg font-semibold">{lead}</p>
      {note && (
        <p className="-mt-1 mb-3 font-mono text-xs uppercase tracking-[0.14em]" style={{ opacity: 0.55 }}>
          {note}
        </p>
      )}
      <ul className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed" style={{ opacity: 0.75 }}>
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Home: who I am and what's next on top (two columns), then the work as big tiles under plain tabs.
 * The tile grid is 80% of the screen wide. "Ask me anything" is a button in the hero that opens a side panel.
 */
export function Hero() {
  return (
    <div className="flex flex-col gap-10 py-1 sm:gap-12">
      <div className="grid grid-cols-1 gap-7 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div className="flex flex-col gap-4 sm:gap-6 p-8 sm:p-10 rounded-xl" style={{ backgroundColor: '#ffe98a', boxShadow: '0 10px 28px rgba(0,0,0,0.1)' }}>
          <div>
            <h1
              className="font-mono text-[56px] font-bold lowercase leading-tight sm:text-[72px] mb-4"
              style={{ color: '#2b2b2b' }}
            >
              jasmine gu
            </h1>
          </div>
          <p className="max-w-[40rem] text-2xl sm:text-3xl leading-relaxed font-semibold" style={{ color: '#2b2b2b' }}>
            {HERO_HEADLINE}
          </p>
          <p className="text-sm sm:text-base leading-7 font-medium" style={{ color: '#2b2b2b', opacity: 0.8 }}>
            Currently 5th year of <span className="font-bold">CS honors and Business @ Western University</span>
            <br />
            Previously SWE @ <span className="font-bold">Autodesk, Tesla, and Intuit</span>; Platform PM @ <span className="font-bold">Autodesk</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <SocialLinks links={SOCIALS} />
          </div>

          <div
            className="mt-1 max-w-md border-t border-dotted pt-3"
            style={{ borderColor: 'rgba(40,40,40,0.35)', color: INK }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ opacity: 0.75 }}>
              {WHATS_NEXT.title}
            </p>
            <div className="flex items-baseline gap-3 text-[15px] leading-6">
              <span
                className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-xs font-bold uppercase"
                style={{ borderColor: ACCENT, color: 'var(--pf-brand-orange-ink)' }}
              >
                {WHATS_NEXT.when}
              </span>
              <span>{WHATS_NEXT.text}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:pt-2">
          <ArrowList lead={HERO_HIGHLIGHTS_LEAD} items={HERO_HIGHLIGHTS} />
        </div>
      </div>

      <div className="pf-work-bleed">
        <WorkTabs work={WORK_SHOWCASE} side={SIDE_PROJECT_SHOWCASE} />
      </div>
    </div>
  )
}
