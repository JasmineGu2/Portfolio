import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'
import { HERO_BENTO_EDGES, type WorkflowEdge } from '@/lib/portfolio/workflow-connectors'

export type BentoTileVariant = 'dark' | 'light' | 'muted' | 'accent'

export interface BentoWorkTile {
  kind: 'work'
  id: string
  title: string
  subtitle: string
  period?: string
  logo?: string
  href?: string
  /** CSS grid placement */
  col: string
  row: string
  variant: BentoTileVariant
}

export interface BentoValueTile {
  kind: 'value'
  id: string
  label: string
  description: string
  icon: string
  col: string
  row: string
  variant: BentoTileVariant
}

export type BentoTile = BentoWorkTile | BentoValueTile

/** Workflow connectors — hero panel + career tiles on one canvas */
export const BENTO_EDGES: WorkflowEdge[] = [
  ...HERO_BENTO_EDGES,
  { from: 'hero-pills', to: 'western', primary: true },
  { from: 'hero-intro', to: 'ux', primary: true },
  { from: 'western', to: 'metaverse', primary: true },
  { from: 'metaverse', to: 'omers', primary: true },
  { from: 'omers', to: 'intuit', primary: true },
  { from: 'intuit', to: 'tesla', primary: true },
  { from: 'tesla', to: 'autodesk-pm', primary: true },
  { from: 'ux', to: 'intuit' },
  { from: 'ai', to: 'autodesk-pm' },
  { from: 'data', to: 'autodesk-pm' },
  { from: 'research', to: 'omers' },
  { from: 'product', to: 'autodesk-pm' },
  { from: 'ship', to: 'tesla' },
]

/** Career tiles — spaced 4-column workflow grid below hero */
export const BENTO_TILES: BentoTile[] = [
  {
    kind: 'value',
    id: 'ux',
    label: 'Delightful UX',
    description: 'Interfaces people actually want to use',
    icon: '/icons/design.svg',
    col: '3 / span 2',
    row: '1',
    variant: 'light',
  },
  {
    kind: 'value',
    id: 'ai',
    label: 'AI-powered products',
    description: 'Thoughtful, not gimmicky',
    icon: '/icons/machine-learning.svg',
    col: '3',
    row: '2',
    variant: 'muted',
  },
  {
    kind: 'value',
    id: 'data',
    label: 'Data platforms',
    description: 'Governed, usable, scalable',
    icon: '/icons/data.svg',
    col: '4',
    row: '2',
    variant: 'light',
  },
  {
    kind: 'work',
    id: 'tesla',
    title: 'Tesla',
    subtitle: 'Software Engineer Intern',
    period: 'Summer 2025',
    logo: COMPANY_LOGOS.tesla,
    href: '/tesla',
    col: '1 / span 2',
    row: '3 / span 2',
    variant: 'light',
  },
  {
    kind: 'work',
    id: 'autodesk-pm',
    title: 'Autodesk',
    subtitle: 'Platform PM Intern · Data Products',
    period: '2026 – Present',
    logo: COMPANY_LOGOS.autodesk,
    col: '3 / span 2',
    row: '3 / span 2',
    variant: 'dark',
  },
  {
    kind: 'work',
    id: 'intuit',
    title: 'Intuit',
    subtitle: 'Software Engineer Intern',
    period: 'Summer 2024',
    logo: COMPANY_LOGOS.intuit,
    href: '/intuit',
    col: '1',
    row: '5',
    variant: 'muted',
  },
  {
    kind: 'work',
    id: 'omers',
    title: 'OMERS',
    subtitle: 'Solutions Engineer',
    period: 'Summer 2023',
    logo: COMPANY_LOGOS.omers,
    href: '/omers',
    col: '2',
    row: '5',
    variant: 'light',
  },
  {
    kind: 'value',
    id: 'ship',
    label: 'Ship it',
    description: 'Zero-to-one & at scale',
    icon: '/icons/agile.svg',
    col: '3',
    row: '5',
    variant: 'light',
  },
  {
    kind: 'work',
    id: 'metaverse',
    title: 'Metaverse Group',
    subtitle: 'Developer & Data Analyst',
    period: '2022 – 2023',
    logo: COMPANY_LOGOS.metaverse,
    col: '4',
    row: '5',
    variant: 'muted',
  },
  {
    kind: 'value',
    id: 'research',
    label: 'User research',
    description: 'Talk to people first',
    icon: '/icons/research.svg',
    col: '1',
    row: '6',
    variant: 'light',
  },
  {
    kind: 'work',
    id: 'western',
    title: 'Western / Ivey',
    subtitle: 'CS + Business Dual Degree',
    period: '2022 – 2027',
    col: '2 / span 2',
    row: '6',
    variant: 'dark',
  },
  {
    kind: 'value',
    id: 'product',
    label: 'Product thinking',
    description: 'Strategy + execution',
    icon: '/icons/product.svg',
    col: '4',
    row: '6',
    variant: 'accent',
  },
]
