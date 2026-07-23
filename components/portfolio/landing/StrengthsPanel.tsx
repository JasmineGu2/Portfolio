import { LANDING_STRENGTHS } from '@/lib/portfolio/landing-data'
import { SectionLabel } from './SectionLabel'
import { PillTag } from './PillTag'

export function StrengthsPanel() {
  return (
    <aside className="landing-strengths" aria-labelledby="landing-strengths-heading">
      <SectionLabel id="landing-strengths-heading">Core Strengths</SectionLabel>
      <ul className="landing-strengths__list">
        {LANDING_STRENGTHS.map((strength) => (
          <li key={strength.label}>
            <PillTag label={strength.label} variant={strength.variant} />
          </li>
        ))}
      </ul>
    </aside>
  )
}
