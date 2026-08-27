import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { workExperienceHref } from '@/lib/portfolio/work-experience-content'

export type CategoryType = 'product' | 'engineering' | 'leadership' | 'enterprise'

export type LandingCardTheme = 'orange' | 'purple' | 'yellow' | 'cream'

export interface LandingExperience {
  id: WorkId
  company: string
  role: string
  previousRole?: string
  dates: string
  category: string
  categoryType: CategoryType
  subtitle: string
  tags: string[]
  reflectionTitle: string
  imageAlt: string
  featured?: boolean
  href?: string
  reflectionHref: string
  cardTheme: LandingCardTheme
  gridColumn: string
  gridRow: string
}

export interface LandingStrength {
  label: string
  variant: 'primary-coral' | 'primary-lavender' | 'supporting'
}

/** Homepage core strengths, capabilities, not values */
export const LANDING_STRENGTHS: LandingStrength[] = [
  { label: 'Product Strategy', variant: 'primary-coral' },
  { label: 'AI-Powered Products', variant: 'primary-lavender' },
  { label: 'Data Products', variant: 'primary-lavender' },
  { label: 'ML & Data Visualization', variant: 'supporting' },
  { label: 'Full-Stack Shipping', variant: 'supporting' },
  { label: 'Enterprise Systems', variant: 'supporting' },
  { label: 'Product Leadership', variant: 'supporting' },
]

const LANDING_META: Record<
  WorkId,
  Omit<
    LandingExperience,
    | 'company'
    | 'role'
    | 'previousRole'
    | 'dates'
    | 'category'
    | 'subtitle'
    | 'tags'
    | 'imageAlt'
  >
> = {
  autodesk: {
    id: 'autodesk',
    categoryType: 'product',
    reflectionTitle: 'Designing for the moment before the query',
    reflectionHref: workExperienceHref('autodesk'), // TODO: /experience/autodesk-data-platform
    cardTheme: 'orange',
    featured: true,
    href: workExperienceHref('autodesk'),
    gridColumn: '1 / span 8',
    gridRow: '1',
  },
  tesla: {
    id: 'tesla',
    categoryType: 'engineering',
    reflectionTitle: 'The interface is part of the ML system',
    reflectionHref: workExperienceHref('tesla'), // TODO: /experience/tesla-ml-systems
    cardTheme: 'purple',
    href: workExperienceHref('tesla'),
    gridColumn: '9 / span 4',
    gridRow: '1',
  },
  'autodesk-eng': {
    id: 'autodesk-eng',
    categoryType: 'engineering',
    reflectionTitle: 'Why reliability is a user experience',
    reflectionHref: workExperienceHref('autodesk-eng'),
    cardTheme: 'purple',
    href: workExperienceHref('autodesk-eng'),
    gridColumn: '1 / span 5',
    gridRow: '2',
  },
  intuit: {
    id: 'intuit',
    categoryType: 'engineering',
    reflectionTitle: 'Why delight matters in high-stress products',
    reflectionHref: workExperienceHref('intuit'), // TODO: /experience/intuit-onboarding
    cardTheme: 'cream',
    href: workExperienceHref('intuit'),
    gridColumn: '6 / span 7',
    gridRow: '2',
  },
  'stealth-startup': {
    id: 'stealth-startup',
    categoryType: 'product',
    reflectionTitle: 'The hardest part of an MVP is deciding what not to build',
    reflectionHref: workExperienceHref('stealth-startup'),
    cardTheme: 'orange',
    href: workExperienceHref('stealth-startup'),
    gridColumn: '1 / span 4',
    gridRow: '3',
  },
  'hack-western': {
    id: 'hack-western',
    categoryType: 'leadership',
    reflectionTitle: 'From building the product to leading the team',
    reflectionHref: workExperienceHref('hack-western'),
    cardTheme: 'yellow',
    href: workExperienceHref('hack-western'),
    gridColumn: '5 / span 4',
    gridRow: '3',
  },
  'ivey-product': {
    id: 'ivey-product',
    categoryType: 'leadership',
    reflectionTitle: 'What teaching product management taught me about product management',
    reflectionHref: workExperienceHref('ivey-product'),
    cardTheme: 'yellow',
    href: workExperienceHref('ivey-product'),
    gridColumn: '9 / span 4',
    gridRow: '3',
  },
  omers: {
    id: 'omers',
    categoryType: 'enterprise',
    reflectionTitle: 'From enterprise workflows to AI agents',
    reflectionHref: workExperienceHref('omers'),
    cardTheme: 'cream',
    href: workExperienceHref('omers'),
    gridColumn: '1 / span 6',
    gridRow: '4',
  },
  metaverse: {
    id: 'metaverse',
    categoryType: 'enterprise',
    reflectionTitle: 'Building for outcomes, not just outputs',
    reflectionHref: workExperienceHref('metaverse'),
    cardTheme: 'cream',
    href: workExperienceHref('metaverse'),
    gridColumn: '7 / span 6',
    gridRow: '4',
  },
  western: {
    id: 'western',
    categoryType: 'leadership',
    reflectionTitle: 'Building technical and product foundations',
    reflectionHref: workExperienceHref('western'),
    cardTheme: 'cream',
    gridColumn: '1 / span 4',
    gridRow: '5',
  },
}

function cardToLanding(id: WorkId): LandingExperience {
  const card = EXPERIENCE_CARDS[id]
  const meta = LANDING_META[id]
  return {
    ...meta,
    company: card.company,
    role: card.role,
    previousRole: card.roleNote,
    dates: card.period,
    category: card.category,
    subtitle: card.subtitle,
    tags: card.tags.map((tag) => tag.label),
    imageAlt: `${card.company}, ${card.role}`,
  }
}

/** Emphasis order for the landing page experience grid */
export const LANDING_EXPERIENCE_ORDER: WorkId[] = [
  'autodesk',
  'tesla',
  'autodesk-eng',
  'intuit',
  'stealth-startup',
  'hack-western',
  'ivey-product',
  'omers',
  'metaverse',
]

export const LANDING_EXPERIENCES: LandingExperience[] = LANDING_EXPERIENCE_ORDER.map(
  cardToLanding
)

/** Connector edges between adjacent strategic roles */
export const LANDING_EXPERIENCE_EDGES = [
  { from: 'autodesk', to: 'tesla', primary: true },
  { from: 'tesla', to: 'autodesk-eng', primary: true },
  { from: 'autodesk-eng', to: 'intuit', primary: true },
  { from: 'intuit', to: 'stealth-startup', primary: false },
  { from: 'stealth-startup', to: 'hack-western', primary: false },
  { from: 'hack-western', to: 'ivey-product', primary: false },
  { from: 'ivey-product', to: 'omers', primary: false },
  { from: 'omers', to: 'metaverse', primary: false },
] as const
