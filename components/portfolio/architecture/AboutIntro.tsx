import { MapPin, GraduationCap } from 'lucide-react'
import { ARCHITECTURE_NARRATIVE } from '@/lib/portfolio/site-copy'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'

const CURRENTLY = [
  <>
    product managing at <strong className="font-semibold">Autodesk</strong>
  </>,
  <>
    leading engineering for <strong className="font-semibold">Hack Western</strong>
  </>,
  <>
    finishing a dual degree at <strong className="font-semibold">Western / Ivey</strong>
  </>,
]

export function AboutIntro() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-[32px] font-bold leading-none text-[var(--pf-ink)] sm:text-[40px]">
          hi, i&apos;m <span style={{ color: '#4D90D8' }}>j</span>
          <span className="opacity-40">_</span>
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-[var(--pf-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            Toronto
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.75} />
            B.S. Computer Science &amp; Business, Western / Ivey
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[15px] leading-7 text-[var(--pf-ink)]">
        <p>
          i&apos;m a multidisciplinary{' '}
          <span className="font-semibold" style={{ color: '#4D90D8' }}>
            product manager
          </span>{' '}
          and{' '}
          <span className="font-semibold" style={{ color: '#8B7BC7' }}>
            engineer
          </span>{' '}
          from Toronto who is motivated by building AI-powered products that bridge users,
          engineering, and operations.
        </p>
        <p className="text-[var(--pf-muted)]">{ARCHITECTURE_NARRATIVE.lead}</p>
      </div>

      <a
        href={`mailto:${SITE_CONTACT.email}`}
        className="inline-flex w-fit items-center gap-2 font-mono text-sm text-[var(--pf-ink)] hover:underline"
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#4D90D8' }} aria-hidden />
        interested in collaborating? let&apos;s chat!
      </a>

      <div>
        <h3 className="font-mono text-lg font-semibold text-[var(--pf-ink)]">
          currently<span style={{ color: '#4D90D8' }}>()</span>;
        </h3>
        <ul className="mt-3 flex flex-col">
          {CURRENTLY.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 border-t border-[var(--pf-card-border)] py-2 font-mono text-sm text-[var(--pf-ink)] first:border-t-0"
            >
              <span style={{ color: '#4D90D8' }}>&gt;_</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
