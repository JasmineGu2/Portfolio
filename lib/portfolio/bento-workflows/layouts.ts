import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'
import { HERO_BENTO_EDGES, type WorkflowEdge } from '@/lib/portfolio/workflow-connectors'
import { workExperienceHref } from '@/lib/portfolio/work-experience-content'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import {
  EXPERIENCE_LAYOUT_SPECS,
  WORK_ORDER,
  type CanvasWorkId,
  type WorkId,
  type TilePlacement,
} from './experience-layouts'

export type { TilePlacement }

export type BentoTileVariant = 'dark' | 'light' | 'muted' | 'accent'

export type RoleTrack = 'engineering' | 'product' | 'education'

export interface WorkflowTileBase {
  id: string
  col: string
  row: string
  variant: BentoTileVariant
}

export interface WorkflowWorkTile extends WorkflowTileBase {
  kind: 'work'
  title: string
  role: string
  roleNote?: string
  subtitle: string
  period?: string
  category: string
  logo?: string
  href?: string
  track: RoleTrack
}

export type WorkflowTile = WorkflowWorkTile

export interface WorkflowLayoutConfig {
  slug: string
  title: string
  description: string
  tag: string
  gridClass: string
  zoneLabel: string
  tiles: WorkflowTile[]
  edges: WorkflowEdge[]
  careerEntry?: WorkId
}

const WORK_VARIANT: Record<WorkId, BentoTileVariant> = {
  western: 'dark',
  'hack-western': 'accent',
  metaverse: 'muted',
  omers: 'light',
  intuit: 'muted',
  tesla: 'light',
  'autodesk-eng': 'muted',
  autodesk: 'dark',
  'ivey-product': 'light',
  'stealth-startup': 'accent',
}

const WORK_LOGOS: Partial<Record<WorkId, string>> = {
  western: COMPANY_LOGOS.western,
  'hack-western': COMPANY_LOGOS.hackWestern,
  metaverse: COMPANY_LOGOS.metaverse,
  omers: COMPANY_LOGOS.omers,
  intuit: COMPANY_LOGOS.intuit,
  tesla: COMPANY_LOGOS.tesla,
  'autodesk-eng': COMPANY_LOGOS.autodeskIcon,
  autodesk: COMPANY_LOGOS.autodesk,
  'ivey-product': COMPANY_LOGOS.iveyProduct,
  'stealth-startup': COMPANY_LOGOS.stealthStartup,
}

function buildWorkTile(id: WorkId): Omit<WorkflowWorkTile, 'col' | 'row'> {
  const card = EXPERIENCE_CARDS[id]
  return {
    kind: 'work',
    id,
    title: card.company,
    role: card.role,
    roleNote: card.roleNote,
    subtitle: card.subtitle,
    period: card.period,
    category: card.category,
    logo: WORK_LOGOS[id],
    variant: WORK_VARIANT[id],
    track: card.track,
    href: workExperienceHref(id),
  }
}

const WORK: Record<WorkId, Omit<WorkflowWorkTile, 'col' | 'row'>> = Object.fromEntries(
  (Object.keys(EXPERIENCE_CARDS) as WorkId[]).map((id) => [id, buildWorkTile(id)])
) as Record<WorkId, Omit<WorkflowWorkTile, 'col' | 'row'>>

function place(defs: Record<string, TilePlacement>, ...ids: CanvasWorkId[]): WorkflowTile[] {
  return ids.map((id) => {
    const p = defs[id as string]
    if (!p) throw new Error(`Missing placement for ${id}`)
    const work = WORK[id]
    if (!work) throw new Error(`Unknown tile ${id}`)
    return { ...work, ...p }
  })
}

function layoutTiles(
  workDefs: Record<CanvasWorkId, TilePlacement>,
  workIds: readonly CanvasWorkId[] = WORK_ORDER
): WorkflowTile[] {
  return place(workDefs, ...workIds)
}

export const WORKFLOW_BENTO_LAYOUTS: WorkflowLayoutConfig[] = EXPERIENCE_LAYOUT_SPECS.map(
  (spec) => ({
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    tag: spec.tag,
    gridClass: spec.gridClass,
    zoneLabel: 'Experience',
    careerEntry: spec.careerEntry,
    tiles: layoutTiles(spec.work),
    edges: spec.edges ?? [],
  })
)

export function getWorkflowLayout(slug: string): WorkflowLayoutConfig | undefined {
  return WORKFLOW_BENTO_LAYOUTS.find((l) => l.slug === slug)
}

export function getWorkflowLayoutEdges(layout: WorkflowLayoutConfig): WorkflowEdge[] {
  const entry = layout.careerEntry ?? WORK_ORDER[0]
  return [
    ...HERO_BENTO_EDGES,
    { from: 'hero-intro', to: entry, primary: true },
    { from: 'hero-pills', to: entry, primary: true },
    ...layout.edges,
  ]
}

export function getWorkTileById(id: WorkId): Omit<WorkflowWorkTile, 'col' | 'row'> {
  return WORK[id]
}
