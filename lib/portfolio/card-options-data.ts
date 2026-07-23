import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'

export type WorkCardStyleId =
  | 'current-compact'
  | 'logo-hero-top'
  | 'split-panel'
  | 'watermark'
  | 'photo-banner'
  | 'medallion'
  | 'editorial-stack'
  | 'brand-stripe'
  | 'inset-frame'
  | 'magazine-cover'
  | 'logo-zoom-center'
  | 'logo-crop-hero'
  | 'logo-stack-tight'
  | 'logo-float-minimal'
  | 'logo-badge-center'
  | 'logo-poster'

export interface WorkCardSample {
  id: string
  title: string
  subtitle: string
  period: string
  chip: string
  color: string
  logo?: string
  logoLetter?: string
}

export interface WorkCardStyleOption {
  id: WorkCardStyleId
  name: string
  description: string
  bestFor: string
}

export const WORK_CARD_SAMPLES: WorkCardSample[] = [
  {
    id: 'tesla',
    title: 'Tesla',
    subtitle: 'Frontend & Infra Engineer',
    period: 'Summer 2025',
    chip: 'SWE Intern',
    color: '#f472b6',
    logo: COMPANY_LOGOS.tesla,
  },
  {
    id: 'intuit',
    title: 'Intuit',
    subtitle: 'Software Engineer Intern',
    period: 'Summer 2024',
    chip: 'SWE Intern',
    color: '#2dd4bf',
    logo: COMPANY_LOGOS.intuit,
  },
  {
    id: 'omers',
    title: 'OMERS',
    subtitle: 'Solutions Engineer',
    period: 'Summer 2023',
    chip: 'Solutions Eng',
    color: '#a78bfa',
    logo: COMPANY_LOGOS.omers,
  },
  {
    id: 'western',
    title: 'Western / Ivey',
    subtitle: 'CS + Business Dual Degree',
    period: '2022 – 2027',
    chip: 'CS + Business',
    color: '#4F2683',
    logo: COMPANY_LOGOS.western,
  },
]

export const WORK_CARD_STYLE_OPTIONS: WorkCardStyleOption[] = [
  {
    id: 'current-compact',
    name: '01 · Current compact',
    description: 'Small logo beside text — what the site uses today.',
    bestFor: 'Dense bento grids with many tiles',
  },
  {
    id: 'logo-hero-top',
    name: '02 · Logo hero top',
    description: 'Large logo zone fills the top half of the card.',
    bestFor: 'Brand-forward work tiles on canvas',
  },
  {
    id: 'split-panel',
    name: '03 · Split panel',
    description: 'Logo/image panel on the left, copy stacked on the right.',
    bestFor: 'Readable titles with strong logo presence',
  },
  {
    id: 'watermark',
    name: '04 · Watermark',
    description: 'Oversized faded logo behind foreground text.',
    bestFor: 'Editorial cards without feeling crowded',
  },
  {
    id: 'photo-banner',
    name: '05 · Photo banner',
    description: 'Full-width logo band across the top — gallery-style.',
    bestFor: 'Matching gallery moment tiles',
  },
  {
    id: 'medallion',
    name: '06 · Medallion',
    description: 'Large circular logo mark centered above copy.',
    bestFor: 'Clean, badge-like experience nodes',
  },
  {
    id: 'editorial-stack',
    name: '07 · Editorial stack',
    description: 'Wide logo block, then title, chip, and period stacked.',
    bestFor: 'Magazine / case-study previews',
  },
  {
    id: 'brand-stripe',
    name: '08 · Brand stripe',
    description: 'Accent color header strip plus prominent logo below.',
    bestFor: 'Color-coded workflow rails',
  },
  {
    id: 'inset-frame',
    name: '09 · Inset frame',
    description: 'Large inset logo frame with soft border and inner padding.',
    bestFor: 'Premium card feel on dot canvas',
  },
  {
    id: 'magazine-cover',
    name: '10 · Magazine cover',
    description: 'Logo dominates ~60% height; caption bar at bottom.',
    bestFor: 'Maximum logo visibility',
  },
  {
    id: 'logo-zoom-center',
    name: '11 · Logo zoom center',
    description: 'Oversized logo centered on the card — no tinted box or watermark.',
    bestFor: 'Clean, logo-first tiles on the home canvas',
  },
  {
    id: 'logo-crop-hero',
    name: '12 · Logo crop hero',
    description: 'Logo scaled up and cropped at the edges for a bold poster feel.',
    bestFor: 'High-impact brand marks in compact grids',
  },
  {
    id: 'logo-stack-tight',
    name: '13 · Logo stack tight',
    description: 'Chip on top, giant logo in the middle, copy in a slim footer.',
    bestFor: 'Dense bento with maximum logo size',
  },
  {
    id: 'logo-float-minimal',
    name: '14 · Logo float minimal',
    description: 'Logo floats in open whitespace with metadata tucked below.',
    bestFor: 'Light, airy cards on dotted canvas',
  },
  {
    id: 'logo-badge-center',
    name: '15 · Logo badge center',
    description: 'Circular logo badge as the focal point — no surrounding frame.',
    bestFor: 'App-icon style experience nodes',
  },
  {
    id: 'logo-poster',
    name: '16 · Logo poster',
    description: 'Logo fills most of the card height; title sits in a thin strip below.',
    bestFor: 'Gallery-like work tiles with brand dominance',
  },
]

export function cardStyleVars(color: string): Record<string, string> {
  return {
    '--card-accent': color,
    '--card-soft': `color-mix(in srgb, ${color} 14%, #ffffff)`,
    '--card-border': `color-mix(in srgb, ${color} 28%, transparent)`,
  }
}
