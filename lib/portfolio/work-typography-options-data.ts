export type WorkTypographyId =
  | 'playful-current'
  | 'editorial-serif'
  | 'mono-contrast'
  | 'soft-hierarchy'

export interface WorkTypographyOption {
  id: WorkTypographyId
  name: string
  description: string
  bestFor: string
  company: {
    fontFamily: string
    fontWeight: number
    fontStyle?: 'normal' | 'italic'
    letterSpacing?: string
    textTransform?: 'none' | 'uppercase'
    className?: string
  }
  role: {
    fontFamily: string
    fontWeight: number
    fontStyle?: 'normal' | 'italic'
    className?: string
  }
  subtitle: {
    fontFamily: string
    fontWeight: number
    fontStyle?: 'normal' | 'italic'
    className?: string
  }
}

export const WORK_TYPOGRAPHY_SAMPLE = {
  company: 'Autodesk',
  role: 'Technical Platform Product Manager Intern',
  subtitle:
    'Building governed, AI-assisted query experiences for Autodesk’s data platform',
  period: 'May 2026 — Present',
} as const

export const WORK_TYPOGRAPHY_OPTIONS: WorkTypographyOption[] = [
  {
    id: 'playful-current',
    name: '01 · Playful current',
    description: 'Fredoka company label, Inter role, italic Inter subtitle — matches today’s cards.',
    bestFor: 'Keeping the existing bento personality',
    company: { fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600 },
    role: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 },
    subtitle: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: 500,
      fontStyle: 'italic',
    },
  },
  {
    id: 'editorial-serif',
    name: '02 · Editorial serif',
    description: 'Small caps Inter company, Fraunces role, regular Inter subtitle.',
    bestFor: 'Clear editorial hierarchy without losing polish',
    company: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      className: 'work-type-opt-company--caps',
    },
    role: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 },
    subtitle: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
  {
    id: 'mono-contrast',
    name: '03 · Mono contrast',
    description: 'JetBrains Mono company, Fredoka role, Fraunces subtitle.',
    bestFor: 'Strong separation between org, title, and story',
    company: {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontWeight: 500,
      className: 'work-type-opt-company--mono',
    },
    role: { fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600 },
    subtitle: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
  {
    id: 'soft-hierarchy',
    name: '04 · Soft hierarchy',
    description: 'Fraunces company, semibold Inter role, muted Inter subtitle.',
    bestFor: 'Calm, recruiter-friendly scanning',
    company: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600 },
    role: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 },
    subtitle: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: 400,
      fontStyle: 'normal',
      className: 'work-type-opt-subtitle--muted',
    },
  },
]
