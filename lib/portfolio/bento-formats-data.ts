import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'

export type FormatId = 'compact' | 'magazine' | 'keycap' | 'vertical'

export interface FormatMeta {
  id: FormatId
  title: string
  description: string
  tag: string
}

export const BENTO_FORMATS: FormatMeta[] = [
  {
    id: 'compact',
    title: 'Compact mosaic',
    description: 'Tight classic bento grid — dense tiles, flat cream background, no connectors.',
    tag: 'Dense grid',
  },
  {
    id: 'magazine',
    title: 'Magazine editorial',
    description: 'Large serif hero, asymmetric spans, and generous whitespace — editorial, not workflow.',
    tag: 'Editorial',
  },
  {
    id: 'keycap',
    title: 'Keycap playground',
    description: 'Neobrutalist keycap tiles with bold borders, offset shadows, and playful color blocks.',
    tag: 'OVERFLOW-style',
  },
  {
    id: 'vertical',
    title: 'Vertical flow strips',
    description: 'Full-width horizontal bento bars on a dot canvas with a left-rail timeline connector.',
    tag: 'Timeline',
  },
]

export interface FormatWorkItem {
  id: string
  title: string
  subtitle: string
  period?: string
  logo?: string
  href?: string
}

export interface FormatValueItem {
  id: string
  label: string
  description: string
  icon: string
}

export const FORMAT_INTRO = {
  headline: 'My work is translation.',
  serif:
    'Jasmine Gu is a product-minded builder with the experience and versatility to translate between users, engineering, and operations in dynamic environments.',
  subline:
    'Product Manager and Engineer building thoughtful, AI-powered products — from TurboTax UX to data platforms at Autodesk.',
}

export const FORMAT_WORK: FormatWorkItem[] = [
  {
    id: 'western',
    title: 'Western / Ivey',
    subtitle: 'CS + Business Dual Degree',
    period: '2022 – 2027',
  },
  {
    id: 'metaverse',
    title: 'Metaverse Group',
    subtitle: 'Developer & Data Analyst',
    period: '2022 – 2023',
    logo: COMPANY_LOGOS.metaverse,
  },
  {
    id: 'omers',
    title: 'OMERS',
    subtitle: 'Solutions Engineer',
    period: 'Summer 2023',
    logo: COMPANY_LOGOS.omers,
    href: '/omers',
  },
  {
    id: 'intuit',
    title: 'Intuit',
    subtitle: 'Software Engineer Intern',
    period: 'Summer 2024',
    logo: COMPANY_LOGOS.intuit,
    href: '/intuit',
  },
  {
    id: 'tesla',
    title: 'Tesla',
    subtitle: 'Software Engineer Intern',
    period: 'Summer 2025',
    logo: COMPANY_LOGOS.tesla,
    href: '/tesla',
  },
  {
    id: 'autodesk-eng',
    title: 'Autodesk',
    subtitle: 'Full Stack Engineer · Fusion Libraries',
    period: 'Jan – May 2026',
    logo: COMPANY_LOGOS.autodeskIcon,
  },
  {
    id: 'autodesk',
    title: 'Autodesk',
    subtitle: 'Platform PM Intern · Data Products',
    period: 'May 2026 – Present',
    logo: COMPANY_LOGOS.autodesk,
  },
]

export const FORMAT_VALUES: FormatValueItem[] = [
  {
    id: 'ux',
    label: 'Delightful UX',
    description: 'Interfaces people actually want to use',
    icon: '/icons/design.svg',
  },
  {
    id: 'ai',
    label: 'AI-powered products',
    description: 'Thoughtful, not gimmicky',
    icon: '/icons/machine-learning.svg',
  },
  {
    id: 'data',
    label: 'Data platforms',
    description: 'Governed, usable, scalable',
    icon: '/icons/data.svg',
  },
  {
    id: 'ship',
    label: 'Ship it',
    description: 'Zero-to-one & at scale',
    icon: '/icons/agile.svg',
  },
  {
    id: 'research',
    label: 'User research',
    description: 'Talk to people first',
    icon: '/icons/research.svg',
  },
  {
    id: 'product',
    label: 'Product thinking',
    description: 'Strategy + execution',
    icon: '/icons/product.svg',
  },
]

/** Keycap tone per tile id */
export const KEYCAP_TONES: Record<string, string> = {
  intro: 'bf-keycap--orange-sky',
  western: 'bf-keycap--lavender-pink',
  metaverse: 'bf-keycap--mint-teal',
  omers: 'bf-keycap--yellow-green',
  intuit: 'bf-keycap--peach-coral',
  tesla: 'bf-keycap--blue-indigo',
  autodesk: 'bf-keycap--pink-orange',
  ux: 'bf-keycap--sky-lavender',
  ai: 'bf-keycap--mint-teal',
  data: 'bf-keycap--cream',
  ship: 'bf-keycap--yellow-green',
  research: 'bf-keycap--lavender-pink',
  product: 'bf-keycap--peach-coral',
}
