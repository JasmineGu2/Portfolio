import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'

export interface WorkExperiencePageContent {
  id: WorkId
  summary: string
  highlights: string[]
  skills: string[]
}

function pageFromCard(id: WorkId): WorkExperiencePageContent {
  const card = EXPERIENCE_CARDS[id]
  return {
    id,
    summary: card.description,
    highlights: [card.subtitle, card.role, card.period],
    skills: [...card.tags.map((tag) => tag.label), ...card.expandedTags],
  }
}

export const WORK_EXPERIENCE_PAGES: Record<WorkId, WorkExperiencePageContent> = Object.fromEntries(
  (Object.keys(EXPERIENCE_CARDS) as WorkId[]).map((id) => [id, pageFromCard(id)])
) as Record<WorkId, WorkExperiencePageContent>

export function isWorkExperienceSlug(slug: string): slug is WorkId {
  return slug in WORK_EXPERIENCE_PAGES
}

export function workExperienceHref(id: WorkId): string {
  return `/work/${id}`
}
