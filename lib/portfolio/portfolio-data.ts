import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import type { RoleTrack } from '@/lib/portfolio/bento-workflows/layouts'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { ALL_PROJECT_TILES, type ProjectTrack } from '@/lib/portfolio/projects-bento-data'
import { workExperienceHref } from '@/lib/portfolio/work-experience-content'

export type AbstractionLevel =
  | 'automation'
  | 'zero-to-one'
  | 'interface'
  | 'system'
  | 'platform'
  | 'product'

export type PortfolioCategory =
  | 'product'
  | 'engineering'
  | 'ai'
  | 'systems'
  | 'design'
  | 'startup'
  | 'community'
  | 'project'
  | 'education'

export type PortfolioItemKind = 'experience' | 'project'

export type WorkFilter =
  | 'ALL'
  | 'WORK'
  | 'PROJECTS'
  | 'PRODUCT'
  | 'ENGINEERING'
  | 'AI'
  | 'SYSTEMS'

export interface PortfolioItem {
  id: string
  kind: PortfolioItemKind
  title: string
  subtitle: string
  role?: string
  period?: string
  category: string
  description: string
  tags: string[]
  href: string
  external?: boolean
  abstractionLevels: AbstractionLevel[]
  categories: PortfolioCategory[]
  capabilities: string[]
  relatedIds: string[]
  featured?: boolean
  workId?: WorkId
  track?: RoleTrack
  imageSrc?: string
  imageAlt?: string
  projectTrack?: ProjectTrack
  chatbotQuestions?: string[]
}

const EXPERIENCE_META: Record<
  WorkId,
  {
    abstractionLevels: AbstractionLevel[]
    categories: PortfolioCategory[]
    capabilities: string[]
    relatedIds: string[]
    featured?: boolean
    chatbotQuestions?: string[]
  }
> = {
  metaverse: {
    abstractionLevels: ['automation'],
    categories: ['engineering', 'startup'],
    capabilities: ['Build', 'Experiment'],
    relatedIds: ['omers'],
  },
  omers: {
    abstractionLevels: ['automation'],
    categories: ['engineering'],
    capabilities: ['Understand', 'Build', 'Connect'],
    relatedIds: ['metaverse', 'intuit'],
  },
  'stealth-startup': {
    abstractionLevels: ['zero-to-one'],
    categories: ['product', 'startup', 'engineering'],
    capabilities: ['Experiment', 'Decide', 'Build'],
    relatedIds: ['metaverse'],
  },
  intuit: {
    abstractionLevels: ['interface'],
    categories: ['engineering', 'design'],
    capabilities: ['Build', 'Connect'],
    relatedIds: ['tesla', 'omers'],
  },
  tesla: {
    abstractionLevels: ['system'],
    categories: ['engineering', 'systems'],
    capabilities: ['Build', 'Scale'],
    relatedIds: ['intuit', 'autodesk-eng'],
    featured: true,
    chatbotQuestions: [
      'What did you actually build at Tesla?',
      'Why was this an infrastructure problem?',
      'What did you learn at Tesla?',
    ],
  },
  'autodesk-eng': {
    abstractionLevels: ['platform'],
    categories: ['engineering', 'systems'],
    capabilities: ['Build', 'Scale'],
    relatedIds: ['tesla', 'autodesk'],
  },
  autodesk: {
    abstractionLevels: ['product'],
    categories: ['product', 'ai'],
    capabilities: ['Decide', 'Understand', 'Experiment'],
    relatedIds: ['autodesk-eng'],
    featured: true,
    chatbotQuestions: [
      'Why did you move into product?',
      'What is your approach to AI products?',
      'How technical are you as a PM?',
    ],
  },
  'hack-western': {
    abstractionLevels: ['zero-to-one'],
    categories: ['product', 'engineering', 'community'],
    capabilities: ['Build', 'Connect', 'Decide'],
    relatedIds: ['ivey-product'],
  },
  'ivey-product': {
    abstractionLevels: ['product'],
    categories: ['product', 'community', 'education'],
    capabilities: ['Understand', 'Connect'],
    relatedIds: ['hack-western'],
  },
  western: {
    abstractionLevels: ['automation'],
    categories: ['education'],
    capabilities: ['Connect'],
    relatedIds: [],
  },
}

function experienceHref(id: WorkId): string {
  if (id === 'tesla') return '/tesla'
  return workExperienceHref(id)
}

function buildExperienceItems(): PortfolioItem[] {
  return (Object.keys(EXPERIENCE_CARDS) as WorkId[])
    .filter((id) => id !== 'western')
    .map((id) => {
      const card = EXPERIENCE_CARDS[id]
      const meta = EXPERIENCE_META[id]
      return {
        id,
        kind: 'experience' as const,
        title: card.company,
        subtitle: card.subtitle,
        role: card.role,
        period: card.period,
        category: card.category,
        description: card.description,
        tags: card.tags.map((tag) => tag.label),
        href: experienceHref(id),
        abstractionLevels: meta.abstractionLevels,
        categories: meta.categories,
        capabilities: meta.capabilities,
        relatedIds: meta.relatedIds,
        featured: meta.featured,
        workId: id,
        track: card.track,
        chatbotQuestions: meta.chatbotQuestions,
      }
    })
}

function inferProjectCategories(track: ProjectTrack, tag: string): PortfolioCategory[] {
  if (track === 'technical') return ['project', 'engineering']
  if (track === 'other') return ['project']
  if (tag.toLowerCase().includes('design')) return ['project', 'product', 'design']
  return ['project', 'product']
}

function buildProjectItems(): PortfolioItem[] {
  return ALL_PROJECT_TILES.map((tile) => ({
    id: tile.id,
    kind: 'project' as const,
    title: tile.title,
    subtitle: tile.subtitle,
    category: tile.tag,
    description: tile.subtitle,
    tags: [tile.tag],
    href: tile.href,
    external: tile.external,
    abstractionLevels: ['zero-to-one'] as AbstractionLevel[],
    categories: inferProjectCategories(tile.track, tile.tag),
    capabilities: ['Experiment', 'Build'],
    relatedIds: [],
    imageSrc: tile.imageSrc,
    imageAlt: tile.imageAlt,
    projectTrack: tile.track,
  }))
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  ...buildExperienceItems(),
  ...buildProjectItems(),
]

export const EXPERIENCE_ITEMS = PORTFOLIO_ITEMS.filter((item) => item.kind === 'experience')
export const PROJECT_ITEMS = PORTFOLIO_ITEMS.filter((item) => item.kind === 'project')

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.id === id)
}

export function getItemsByAbstractionLevel(level: AbstractionLevel): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.abstractionLevels.includes(level))
}

export function itemMatchesFilter(item: PortfolioItem, filter: WorkFilter): boolean {
  if (filter === 'ALL') return true
  if (filter === 'WORK') return item.kind === 'experience'
  if (filter === 'PROJECTS') return item.kind === 'project'
  if (filter === 'PRODUCT') return item.categories.includes('product')
  if (filter === 'ENGINEERING') return item.categories.includes('engineering')
  if (filter === 'AI') return item.categories.includes('ai')
  if (filter === 'SYSTEMS') return item.categories.includes('systems')
  return true
}

export const WORK_FILTERS: WorkFilter[] = [
  'ALL',
  'WORK',
  'PROJECTS',
  'PRODUCT',
  'ENGINEERING',
  'AI',
  'SYSTEMS',
]

export const WORK_PAGE_INTRO = {
  title: 'Work',
  lead: 'Jobs and internships across product, engineering, and AI.',
}
