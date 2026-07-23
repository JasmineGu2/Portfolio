import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { getWorkTileById } from '@/lib/portfolio/bento-workflows/layouts'
import { workExperienceHref } from '@/lib/portfolio/work-experience-content'

export type ExperienceVideoStyleId = 'square-grid' | 'square-mosaic' | 'square-featured'

export interface ExperienceVideoStyleOption {
  id: ExperienceVideoStyleId
  name: string
  description: string
  bestFor: string
}

export interface ExperienceVideoEntry {
  id: WorkId
  video?: string
  poster?: string
  logo?: string
  /** Wide wordmarks need different fit rules inside the square */
  logoFit?: 'mark' | 'wide'
  /** CSS aspect-ratio value matching source media (width / height) */
  mediaAspect?: string
}

export const EXPERIENCE_VIDEO_STYLE_OPTIONS: ExperienceVideoStyleOption[] = [
  {
    id: 'square-grid',
    name: '01 · Even squares',
    description: 'Uniform animated squares — like your previous portfolio work section.',
    bestFor: 'Clean scan of every role at a glance',
  },
  {
    id: 'square-featured',
    name: '02 · Featured lead',
    description: 'First tile spans two columns; the rest stay square.',
    bestFor: 'Highlighting your latest or strongest experience',
  },
  {
    id: 'square-mosaic',
    name: '03 · Mosaic rhythm',
    description: 'Alternating large and small squares for visual variety.',
    bestFor: 'Editorial gallery feel on the dotted canvas',
  },
]

/** Looping preview clips — order matches home canvas WORK_ORDER */
export const EXPERIENCE_VIDEO_ENTRIES: ExperienceVideoEntry[] = [
  { id: 'autodesk', video: '/work/autodesk-pm.mp4', logo: COMPANY_LOGOS.autodesk, logoFit: 'wide', mediaAspect: '16 / 9' },
  { id: 'tesla', video: '/work/teslagif.mp4', logo: COMPANY_LOGOS.tesla, logoFit: 'mark', mediaAspect: '16 / 9' },
  {
    id: 'autodesk-eng',
    video: '/work/autodesk-eng.mp4',
    logo: COMPANY_LOGOS.autodeskIcon,
    logoFit: 'wide',
    mediaAspect: '16 / 9',
  },
  { id: 'intuit', video: '/work/Intuit.mp4', logo: COMPANY_LOGOS.intuit, logoFit: 'mark', mediaAspect: '16 / 9' },
  {
    id: 'omers',
    video: '/work/ServiceNowGif.mp4',
    logo: COMPANY_LOGOS.omers,
    logoFit: 'wide',
    mediaAspect: '16 / 9',
  },
  { id: 'stealth-startup', logo: COMPANY_LOGOS.stealthStartup, logoFit: 'mark', mediaAspect: '1 / 1' },
  {
    id: 'metaverse',
    video: '/work/metaversegroup.mp4',
    logo: COMPANY_LOGOS.metaverse,
    logoFit: 'mark',
    mediaAspect: '1872 / 1080',
  },
  { id: 'hack-western', logo: COMPANY_LOGOS.hackWestern, logoFit: 'mark', mediaAspect: '1 / 1' },
  { id: 'ivey-product', logo: COMPANY_LOGOS.iveyProduct, logoFit: 'wide', mediaAspect: '1024 / 594' },
]

export function getExperienceMediaAspect(id: WorkId): string {
  const media = EXPERIENCE_VIDEO_ENTRIES.find((entry) => entry.id === id)
  return media?.mediaAspect ?? '16 / 9'
}

export function getExperienceVideoMeta(id: WorkId) {
  const tile = getWorkTileById(id)
  const media = EXPERIENCE_VIDEO_ENTRIES.find((entry) => entry.id === id)
  return {
    ...tile,
    href: tile.href ?? workExperienceHref(id),
    video: media?.video,
    poster: media?.poster,
    logo: media?.logo ?? tile.logo,
    logoFit: media?.logoFit ?? 'mark',
  }
}
