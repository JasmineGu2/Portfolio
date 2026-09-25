import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import {
  EXPERIENCE_LAYOUT_SPECS,
  WORK_ORDER,
  type CanvasWorkId,
  type WorkId,
} from '@/lib/portfolio/bento-workflows/experience-layouts'
import { caseStudies, technicalProjects } from '@/lib/projects-data'
import { getExperienceVideoMeta } from '@/lib/portfolio/experience-videos-data'
import { WORK_ACCENTS } from '@/lib/portfolio/bento-workflows/work-accents'

/** Home-page work tabs. `education` roles (Hack Western, the Product Fellowship, school) sit under "people": leadership and community. */
export type WorkGroup = 'engineering' | 'product' | 'people'

export interface ShowcaseItem {
  id: string
  eyebrow: string
  name: string
  description: string
  /** One-line role summary shown under a work tile's name (the card's `subtitle`); tiles fall back to `description`. */
  subtitle?: string
  /** Skill chips shown under a work tile (the card's three `tags`). */
  tags?: string[]
  /** Languages and tools used in an engineering role; they become the hover tag on its tile. */
  languages?: string[]
  /** When the role happened, shown beside the company name in the tile's caption row. */
  period?: string
  image: string
  imageAlt: string
  video?: string
  /** Text for the tag beside the custom cursor while hovering this item's media (see `SiteCursor`). */
  cursorLabel?: string
  /** Which home-page work tab this entry sits under. */
  group?: WorkGroup
  /** Work entries use a company logo/wordmark image — fit it instead of cropping it like a photo. */
  logoStyle?: boolean
  /** Work entries render on this brand-color gradient tile instead of a flat background. */
  gradient?: string
  href?: string
  /** `grid-column`/`grid-row` values (desktop only) — mirrors the original home bento mosaic's sizing. */
  gridColumn?: string
  gridRow?: string
}

/** First sentence only — the full multi-sentence version stays on the deep-dive case study pages. */
function shortDescription(description: string): string {
  const [first] = description.split(/(?<=[.!?])\s+/)
  return first ?? description
}

/** The original home bento canvas's tile placements — reused so the borderless redesign keeps the same sizing/layout. */
const HOME_LAYOUT = EXPERIENCE_LAYOUT_SPECS.find((spec) => spec.slug === 'home-wireframe')!

/** `western` predates the home mosaic and has no placement there — give it a reasonable default span. */
function homePlacement(id: WorkId): { col?: string; row?: string } {
  const placement = HOME_LAYOUT.work[id as CanvasWorkId]
  if (placement) return { col: placement.col, row: placement.row }
  return { col: 'span 5' }
}

/**
 * Cover art in `public/work/` doesn't key 1:1 to `WorkId`, so map the exceptions. The `-cover` files are square
 * crops made from the originals (the IPS poster cut out of an Instagram screenshot, the Ivey wordmark padded to a
 * square) so the tile can show them edge to edge like the videos.
 */
const WORK_IMAGE_OVERRIDES: Partial<Record<WorkId, string>> = {
  'autodesk-eng': '/work/autodesk.png',
  'ivey-product': '/work/ivey-product-cover.jpg',
  western: '/work/western-ivey-cover.png',
}

function workImage(id: WorkId): string {
  return WORK_IMAGE_OVERRIDES[id] ?? `/work/${id}.png`
}

const DISPLAY_ORDER: WorkId[] = [...WORK_ORDER, 'western']

/**
 * Cursor tag per work entry, drawn from each role's category/tags/subtitle in `EXPERIENCE_CARDS`.
 * Typed as a full Record so adding a new `WorkId` without a label fails to compile.
 */
const CURSOR_LABELS: Record<WorkId, string> = {
  autodesk: 'Product strategy',
  'autodesk-eng': 'Distributed backend services',
  tesla: 'Factory ML interfaces',
  intuit: 'B2C frontend experiences',
  omers: 'Enterprise workflow automation',
  metaverse: 'B2B growth automation',
  'stealth-startup': '0→1 product',
  'hack-western': 'Product leadership',
  'ivey-product': 'Product education',
  western: 'CS + business degree',
}

/** Languages and tools used in each engineering role (from her resume list). Their tiles show these in the hover tag. */
const LANGUAGES: Partial<Record<WorkId, string[]>> = {
  'autodesk-eng': ['Java', 'C++', 'React', 'JavaScript'],
  tesla: ['React', 'TypeScript', 'Node.js'],
  intuit: ['React', 'TypeScript', 'Node.js'],
  omers: ['ServiceNow'],
  metaverse: ['Python', 'Selenium'],
}

export const WORK_SHOWCASE: ShowcaseItem[] = DISPLAY_ORDER.map((id) => {
  const card = EXPERIENCE_CARDS[id]
  const placement = homePlacement(id)
  const accent = WORK_ACCENTS[id]
  return {
    id,
    eyebrow: `Work - ${card.company}`,
    name: card.company,
    description: shortDescription(card.description),
    subtitle: card.subtitle,
    tags: card.tags.map((tag) => tag.label),
    period: card.period,
    image: workImage(id),
    imageAlt: card.company,
    video: getExperienceVideoMeta(id).video,
    languages: LANGUAGES[id],
    cursorLabel: LANGUAGES[id]?.join(' · ') ?? CURSOR_LABELS[id],
    group: card.track === 'education' ? 'people' : card.track,
    logoStyle: true,
    gradient: `linear-gradient(135deg, ${accent.color}, ${accent.colorEnd ?? accent.color})`,
    href: `/work/${id}`,
    gridColumn: placement.col,
    gridRow: placement.row,
  }
})

function normalizeSrc(src: string): string {
  return src.startsWith('/') ? src : `/${src}`
}

const SIDE_PROJECTS_FROM_BUILDS: ShowcaseItem[] = technicalProjects
  .filter((project) => project.id !== 'hackwestern-web-developer')
  .map((project) => ({
    id: project.id,
    eyebrow: 'Side project',
    name: project.title,
    description: project.description,
    image: normalizeSrc(project.image?.src ?? '/projects/technical/website.png'),
    imageAlt: project.image?.alt ?? project.title,
    href: project.demo && project.demo !== '#' ? project.demo : project.github,
    gridColumn: 'span 6',
  }))

const SIDE_PROJECTS_FROM_CASE_STUDIES: ShowcaseItem[] = caseStudies.map((study) => ({
  id: study.id,
  eyebrow: 'Case study',
  name: study.title,
  description: study.description,
  image: normalizeSrc(study.image!.src),
  imageAlt: study.image!.alt,
  href: study.link,
  gridColumn: 'span 6',
}))

export const SIDE_PROJECT_SHOWCASE: ShowcaseItem[] = [
  ...SIDE_PROJECTS_FROM_BUILDS,
  ...SIDE_PROJECTS_FROM_CASE_STUDIES,
]

export const ALL_SHOWCASE_ITEMS: ShowcaseItem[] = [...WORK_SHOWCASE, ...SIDE_PROJECT_SHOWCASE]
