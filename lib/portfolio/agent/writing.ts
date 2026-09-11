/**
 * Ask Jasmine — writing collection.
 *
 * Writing is meant to be first-class portfolio evidence (spec §14): "There's a
 * piece in the Gallery that gets at this better than a résumé bullet does."
 *
 * The portfolio has no essays or notes published yet, so `WRITING_ENTRIES` is
 * empty. `retrieval.ts` skips any `Reference` of type "writing" that does not
 * resolve here, and the "Read next" layer falls back to case studies, the
 * Journey page, and the Gallery. When real pieces exist, add them below — the
 * type and the resolvers already handle them, no other change needed.
 */

import type { Theme } from './types'

export interface WritingEntry {
  id: string
  title: string
  href: string
  /** One or two sentences on what the piece is about. */
  blurb: string
  /** Guide-voice line on why it's worth reading here (spec §8, §14). */
  why: string
  themes: Theme[]
  relatedIds: string[]
  status: 'published' | 'draft'
  publishedAt?: string
}

export const WRITING_ENTRIES: WritingEntry[] = []

export function getWritingEntry(id: string): WritingEntry | undefined {
  return WRITING_ENTRIES.find((entry) => entry.id === id && entry.status === 'published')
}

export function writingByTheme(theme: Theme): WritingEntry[] {
  return WRITING_ENTRIES.filter(
    (entry) => entry.status === 'published' && entry.themes.includes(theme)
  )
}

export const HAS_WRITING = WRITING_ENTRIES.some((entry) => entry.status === 'published')
