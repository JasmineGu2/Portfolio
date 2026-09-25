import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { WORK_ORDER, type WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { AGENT_GRAPH_EDGES } from '@/lib/portfolio/agent/knowledge-graph'
import { RUNTIME_LOOP_STEPS } from '@/lib/portfolio/abstraction-engine-data'
import { ARCHITECTURE_NARRATIVE } from '@/lib/portfolio/site-copy'
import {
  AUTODESK_AUDIENCES,
  AUTODESK_CHALLENGES,
  AUTODESK_EXPORT_AGAINST,
  AUTODESK_EXPORT_DECISION,
  AUTODESK_EXPORT_FOR,
  AUTODESK_FUTURE_BLOCKS,
  AUTODESK_HERO_META,
  AUTODESK_INVESTMENT_REASONS,
  AUTODESK_PLATFORM_PRINCIPLES,
  AUTODESK_PROBLEM_REASONS,
  AUTODESK_ROADMAP_PRIORITIES,
  AUTODESK_ROLE_ROWS,
  AUTODESK_VISION_STEPS,
} from '@/lib/portfolio/autodesk-case-study'
import {
  TESLA_DESIGN_QUESTIONS,
  TESLA_HERO_META,
  TESLA_OUTCOMES,
  TESLA_OVERVIEW_STATS,
  TESLA_QUALITY_POINTS,
  TESLA_REUSE_WORKFLOW,
  TESLA_STAKEHOLDERS,
  TESLA_VIDEO_CAPABILITIES,
  TESLA_VIDEO_SUBSECTIONS,
  TESLA_WORKFLOW_CARDS,
} from '@/lib/portfolio/tesla-case-study'
import { TERMINAL_DRAFTS } from '@/lib/portfolio/terminal-drafts'

/**
 * Story data for `/proto/terminal`.
 *
 * Rule: nothing here is written from scratch. Published chapters (Autodesk PM, Tesla) import the live case-study
 * constants and only re-arrange them. The Tesla contrast lines are quoted from the case study page itself. Every
 * other role is a DRAFT (see `terminal-drafts.ts`), flagged as such wherever it is shown.
 */

export interface BeatItem {
  title: string
  text: string
}

export interface Beat {
  label: string
  paragraphs?: string[]
  items?: BeatItem[]
  bullets?: string[]
}

export type ChapterStatus = 'published' | 'draft'

export interface Chapter {
  id: WorkId
  status: ChapterStatus
  title: string
  company: string
  role: string
  period: string
  beats: Beat[]
  sources: string[]
  ledTo?: { id: WorkId; company: string; role: string; reason: string }
}

/** Snapshot of the live hero headline in `Hero.tsx`. */
export const TERMINAL_HEADLINE = 'Jasmine Gu is an engineer solving product problems with code and empathy'
export const TERMINAL_EYEBROW = 'toronto · autodesk · hack western · western / ivey'
export const TERMINAL_ORIGIN = ARCHITECTURE_NARRATIVE

/** The site's own role order (`WORK_ORDER`, then the degree); not asserted to be strictly chronological. */
export const CHAPTER_ORDER: WorkId[] = [...WORK_ORDER, 'western']

export const LOOP_STEPS: readonly string[] = RUNTIME_LOOP_STEPS

/** Impact strip. Each `value` must appear in its source constant (checked by script, see the Phase 26 log). */
export const IMPACT_STATS = [
  { value: '380+', label: 'users', note: 'Autodesk case study, outcomes' },
  { value: '60%', label: 'increase in internal adoption', note: 'Autodesk case study, outcomes' },
  { value: '~30%', label: 'faster AI-assisted data workflows', note: 'Autodesk case study, outcomes' },
  { value: '12+', label: 'user interviews', note: 'Autodesk case study, outcomes' },
  { value: '~40%', label: 'faster time-to-insight for operations teams', note: 'Tesla case study, overview' },
  { value: '10+', label: 'production UI components shipped', note: 'Tesla case study, overview' },
] as const

const AUTODESK_BEATS: Beat[] = [
  { label: 'why the company was investing', bullets: [...AUTODESK_INVESTMENT_REASONS] },
  { label: 'who I was building for', items: AUTODESK_AUDIENCES.map((a) => ({ title: a.title, text: a.detail })) },
  { label: 'the setup', items: AUTODESK_ROLE_ROWS.map((row) => ({ title: row.label, text: row.detail })) },
  { label: 'the problem', items: AUTODESK_PROBLEM_REASONS.map((r) => ({ title: r.title, text: r.detail })) },
  { label: 'the roadmap', bullets: [...AUTODESK_ROADMAP_PRIORITIES] },
  {
    label: 'the tension',
    items: AUTODESK_PLATFORM_PRINCIPLES.map((p) => ({ title: p.principle, text: `against: ${p.need}` })),
  },
  {
    label: 'the export decision',
    items: [
      { title: 'The case for', text: AUTODESK_EXPORT_FOR[0] },
      { title: 'The case against', text: AUTODESK_EXPORT_AGAINST[0] },
      ...AUTODESK_EXPORT_DECISION.map((d) => ({ title: d.title, text: d.body })),
    ],
  },
  { label: 'the vision', paragraphs: [AUTODESK_VISION_STEPS.join(' → ')] },
  { label: 'what made it hard', items: AUTODESK_CHALLENGES.map((c) => ({ title: c.title, text: c.detail })) },
  { label: 'what I took from it', items: AUTODESK_FUTURE_BLOCKS.map((b) => ({ title: b.title, text: b.body })) },
]

const TESLA_BEATS: Beat[] = [
  {
    label: 'the setup',
    items: [
      { title: 'Role', text: TESLA_HERO_META.role },
      { title: 'Timeline', text: TESLA_HERO_META.timeline },
      { title: 'Team', text: TESLA_HERO_META.team.join(', ') },
    ],
    bullets: TESLA_OVERVIEW_STATS.map((s) => s.value),
  },
  { label: 'who it was for', items: TESLA_STAKEHOLDERS.map((s) => ({ title: s.title, text: s.detail })) },
  {
    label: 'intuit, then tesla',
    // Quoted from the Tesla case study page (`TeslaCaseStudyClient.tsx`, context section).
    paragraphs: [
      'At Intuit, a subtle animation could reassure someone that they had completed a step correctly.',
      "At Tesla, preserving a modal's state during a data refresh could be more important. If a video reset, a filter disappeared, or a page remounted unexpectedly, the user might have to reconstruct an investigation.",
      'At Intuit, usability often meant clarity, confidence, and delight. At Tesla, it meant speed, reliability, continuity, and making complex operational data legible.',
    ],
  },
  { label: 'what quality meant', bullets: [...TESLA_QUALITY_POINTS] },
  { label: 'the questions I kept asking', bullets: [...TESLA_DESIGN_QUESTIONS] },
  {
    label: 'the workflow',
    paragraphs: [TESLA_REUSE_WORKFLOW],
    items: TESLA_WORKFLOW_CARDS.map((c) => ({ title: c.title, text: c.detail })),
  },
  {
    label: 'video, apis and security',
    items: TESLA_VIDEO_SUBSECTIONS.map((s) => ({ title: s.title, text: s.body })),
    bullets: [...TESLA_VIDEO_CAPABILITIES],
  },
  { label: 'outcomes', bullets: [...TESLA_OUTCOMES] },
]

function ledTo(id: WorkId): Chapter['ledTo'] {
  const edge = AGENT_GRAPH_EDGES.find(
    (e) => e.from === id && e.relationship === 'continues' && CHAPTER_ORDER.includes(e.to as WorkId)
  )
  if (!edge?.reason) return undefined
  const to = edge.to as WorkId
  return { id: to, company: EXPERIENCE_CARDS[to].company, role: EXPERIENCE_CARDS[to].role, reason: edge.reason }
}

function build(id: WorkId): Chapter {
  const card = EXPERIENCE_CARDS[id]
  const base = { id, company: card.company, role: card.role, period: card.period, ledTo: ledTo(id) }

  if (id === 'autodesk') {
    return {
      ...base,
      status: 'published',
      title: AUTODESK_HERO_META.title,
      beats: AUTODESK_BEATS,
      sources: ['lib/portfolio/autodesk-case-study.ts'],
    }
  }
  if (id === 'tesla') {
    return {
      ...base,
      status: 'published',
      title: TESLA_HERO_META.title,
      beats: TESLA_BEATS,
      sources: ['lib/portfolio/tesla-case-study.ts', 'components/portfolio/tesla/TeslaCaseStudyClient.tsx'],
    }
  }

  const draft = TERMINAL_DRAFTS[id]
  if (draft) {
    return {
      ...base,
      status: 'draft',
      title: draft.title,
      beats: draft.beats.map((b) => ({ label: b.label, paragraphs: [b.text] })),
      sources: draft.sources,
    }
  }

  // No draft yet: show only what the role's card already says.
  return {
    ...base,
    status: 'draft',
    title: card.subtitle,
    beats: [
      { label: 'summary', paragraphs: [card.description] },
      { label: 'focus', bullets: card.tags.map((t) => t.label) },
    ],
    sources: ['lib/portfolio/experience-cards-data.ts'],
  }
}

export const CHAPTERS: Chapter[] = CHAPTER_ORDER.map(build)

export function getChapter(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id)
}
