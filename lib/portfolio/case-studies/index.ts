import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { getWorkTileById } from '@/lib/portfolio/bento-workflows/layouts'
import { getExperienceMediaAspect } from '@/lib/portfolio/experience-videos-data'
import { WORK_SHOWCASE } from '@/lib/portfolio/showcase-data'
import { WORK_EXPERIENCE_PAGES } from '@/lib/portfolio/work-experience-content'
import { TESLA_HERO_META } from '@/lib/portfolio/tesla-case-study'
import { AUTODESK_HERO_META } from '@/lib/portfolio/autodesk-case-study'
import { TESLA_ARTICLE_BYLINE, TESLA_ARTICLE_SECTIONS } from './tesla-article'
import { AUTODESK_ARTICLE_BYLINE, AUTODESK_ARTICLE_SECTIONS } from './autodesk-article'
import { RESUME_ARTICLES } from './resume-articles'
import type { CaseStudy, CaseStudyMedia, CaseStudySection } from './types'

export type { CaseStudy, CaseStudyBlock, CaseStudyMedia, CaseStudySection } from './types'

/** Small UI labels used by the case-study layout. */
export const CASE_STUDY_LABELS = {
  onThisPage: 'On this page',
  tocAria: 'Sections of this case study',
  back: 'Back to home',
  backHref: '/',
  /** Shown in place of the body on roles without a full write-up yet. */
  comingSoon: 'Full write-up coming soon.',
  tagsAria: 'Skills and themes',
} as const

/** The home tile's media for a role: its looping video when there is one, else its cover image. */
function heroMediaFor(slug: WorkId): CaseStudyMedia | undefined {
  const item = WORK_SHOWCASE.find((entry) => entry.id === slug)
  if (!item) return undefined
  if (item.video) {
    const aspect = getExperienceMediaAspect(slug)
    // poster: the clip's first frame (public/work/<name>-poster.jpg), so nothing shows blank before it plays
    return { kind: 'video', src: item.video, poster: item.video.replace(/\.mp4$/, '-poster.jpg'), alt: item.imageAlt, aspect, fit: 'cover' }
  }
  // Stills skip the tile's aspect (the Ivey tile is 1024/594 but its cover is square): the frame fits the image.
  return { kind: 'image', src: item.image, alt: item.imageAlt, fit: 'contain' }
}

/** Tesla and Autodesk have full write-ups: title and eyebrow from the hero meta, prose from the article files. */
function longForm(
  slug: 'tesla' | 'autodesk',
  hero: { kicker: string; title: string },
  byline: string,
  sections: CaseStudySection[]
): CaseStudy {
  const tile = getWorkTileById(slug)
  return {
    slug,
    eyebrow: hero.kicker,
    title: hero.title,
    meta: [byline, tile.role].filter(Boolean),
    heroMedia: heroMediaFor(slug),
    sections,
  }
}

/**
 * Every other role has its card: name, role, dates, one-line subtitle and tags. Roles on the résumé also get a short
 * write-up from it (resume-articles.ts); the rest have no sections, so the page shows the "coming soon" note.
 */
function fromCard(slug: WorkId): CaseStudy {
  const tile = getWorkTileById(slug)
  const page = WORK_EXPERIENCE_PAGES[slug]
  // Roles on the résumé get a short write-up from it; its title and dates win over the card's for the meta line.
  const resume = RESUME_ARTICLES[slug]
  const meta = resume ? [resume.role, resume.period] : [tile.role, tile.roleNote, tile.period]
  return {
    slug,
    eyebrow: tile.category,
    title: tile.title,
    dek: tile.subtitle,
    meta: meta.filter((part): part is string => Boolean(part)),
    heroMedia: heroMediaFor(slug),
    tags: page.skills,
    sections: resume?.sections ?? [],
  }
}

export function getCaseStudy(slug: WorkId): CaseStudy {
  if (slug === 'tesla') return longForm('tesla', TESLA_HERO_META, TESLA_ARTICLE_BYLINE, TESLA_ARTICLE_SECTIONS)
  if (slug === 'autodesk') {
    return longForm('autodesk', AUTODESK_HERO_META, AUTODESK_ARTICLE_BYLINE, AUTODESK_ARTICLE_SECTIONS)
  }
  return fromCard(slug)
}
