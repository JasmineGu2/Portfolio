import { caseStudies, technicalProjects } from '@/lib/projects-data'
import type { ColorSchemeId } from '@/lib/portfolio/bento-workflows/color-schemes'
import { getSchemeTokens } from '@/lib/portfolio/bento-workflows/scheme-tokens'
import {
  schemeAccentFromColor,
  type WorkAccent,
} from '@/lib/portfolio/bento-workflows/work-accents'

/** @deprecated Use ProjectTrack */
export type ProjectKind = 'pm' | 'technical'

export type ProjectTrack = 'product' | 'technical' | 'other'

export interface ProjectTileSpec {
  id: string
  track: ProjectTrack
  col: string
  row: string
  tag: string
  title: string
  subtitle: string
  href: string
  imageSrc: string
  imageAlt: string
  external: boolean
}

export const PROJECTS_INTRO = {
  title: 'Case studies and builds',
  lead: 'Product case studies from Ivey and technical projects from hackathons, internships, and side builds — all in one workflow.',
}

function normalizeSrc(src: string): string {
  return src.startsWith('/') ? src : `/${src}`
}

function inferProductTrack(study: (typeof caseStudies)[number]): ProjectTrack {
  const category = study.category?.toLowerCase() ?? ''
  if (category.includes('product') || category.includes('design')) return 'product'
  if (category.includes('automation') || category.includes('vba')) return 'other'
  return 'product'
}

function buildPmTiles(): ProjectTileSpec[] {
  const studies = caseStudies.filter((item) => item.title && item.image)

  return studies.map((study) => {
    const href = study.link || '#'
    return {
      id: study.id,
      track: inferProductTrack(study),
      col: '1',
      row: '1',
      tag: inferProductTrack(study) === 'other' ? 'Other' : 'Product',
      title: study.title,
      subtitle: study.description || '',
      href,
      imageSrc: normalizeSrc(study.image!.src),
      imageAlt: study.image!.alt,
      external: href.startsWith('http'),
    }
  })
}

function buildTechnicalTiles(): ProjectTileSpec[] {
  const hackwestern = technicalProjects.find(
    (project) =>
      project.id === 'hackwestern-web-developer' ||
      project.title.toLowerCase().includes('hackwestern')
  )
  const others = technicalProjects.filter(
    (project) =>
      project.id !== 'hackwestern-web-developer' &&
      !project.title.toLowerCase().includes('hackwestern')
  )

  const ordered = [...(hackwestern ? [hackwestern] : []), ...others]

  return ordered.map((project) => {
    const href = project.demo || project.github || '#'
    return {
      id: project.id,
      track: 'technical',
      col: '1',
      row: '1',
      tag: 'Technical',
      title: project.title,
      subtitle: project.description || '',
      href,
      imageSrc: normalizeSrc(project.image?.src ?? '/projects/technical/website.png'),
      imageAlt: project.image?.alt ?? project.title,
      external: href.startsWith('http') || href !== '#',
    }
  })
}

const PLACEMENTS: Record<string, { col: string; row: string }> = {
  ubereats: { col: '1 / span 8', row: '1' },
  'hackwestern-web-developer': { col: '9 / span 4', row: '1' },
  'rbc-leap': { col: '1 / span 5', row: '2' },
  tldw: { col: '6 / span 7', row: '2' },
  'compass-food-bank': { col: '1 / span 4', row: '3' },
  brewmates: { col: '5 / span 4', row: '3' },
  'email-scraping-bot': { col: '9 / span 4', row: '3' },
  'personal-website': { col: '1 / span 7', row: '4' },
  fellowship: { col: '8 / span 5', row: '4' },
}

function withPlacements(tiles: ProjectTileSpec[]): ProjectTileSpec[] {
  return tiles.map((tile, index) => ({
    ...tile,
    ...(PLACEMENTS[tile.id] ?? {
      col: String((index % 4) + 1),
      row: String(Math.floor(index / 4) + 1),
    }),
  }))
}

export const PM_PROJECT_TILES = buildPmTiles()
export const TECHNICAL_PROJECT_TILES = buildTechnicalTiles()
export const ALL_PROJECT_TILES = withPlacements([...PM_PROJECT_TILES, ...TECHNICAL_PROJECT_TILES])

export function resolveProjectTrackColor(track: ProjectTrack, schemeId: ColorSchemeId): string {
  const tokens = getSchemeTokens(schemeId)
  const buckets = tokens.duoBuckets
  if (!buckets) {
    if (track === 'product') return tokens.workA
    if (track === 'technical') return tokens.workB
    return tokens.softBg
  }
  if (track === 'product') return buckets.warm
  if (track === 'technical') return buckets.cool
  return buckets.neutral
}

export function resolveProjectAccent(
  track: ProjectTrack,
  schemeId: ColorSchemeId,
  tag: string
): WorkAccent {
  return schemeAccentFromColor(resolveProjectTrackColor(track, schemeId), tag)
}

/** @deprecated */
export function projectsForKind(kind: ProjectKind): ProjectTileSpec[] {
  return kind === 'pm' ? PM_PROJECT_TILES : TECHNICAL_PROJECT_TILES
}
