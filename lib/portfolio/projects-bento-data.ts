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
  lead: 'Product case studies from Ivey and technical projects from hackathons, internships, and side builds, all in one workflow.',
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

/**
 * Tiles flow in document order at a uniform size; each grid that renders them (the
 * projects page and the Architecture explorations strip) picks its own column count
 * per breakpoint.
 *
 * This replaced a hand-placed 12-column mosaic where some cards spanned 8 columns.
 * The screenshots are `object-fit: contain` and cluster around 16:9, so a card that
 * wide left them stranded in broad empty bands on either side.
 */
function withPlacements(tiles: ProjectTileSpec[]): ProjectTileSpec[] {
  return tiles.map((tile) => ({ ...tile, col: 'auto', row: 'auto' }))
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
