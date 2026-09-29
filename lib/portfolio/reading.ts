import fs from 'node:fs'
import path from 'node:path'

/** One thing on the shelf, parsed from content/reading.md. */
export interface ReadingItem {
  kind: string
  title: string
  byline?: string
  href?: string
}

export interface Reading {
  title: string
  items: ReadingItem[]
}

/** Small UI labels for the shelf; the list itself lives in content/reading.md. */
export const READING_LABELS = {
  open: 'Read it',
  close: 'Close book',
  prev: 'Previous book',
  next: 'Next book',
  hint: 'Drag, swipe or use the arrows. Click the middle book to open it.',
} as const

const LINK = /^\[([^\]]+)\]\(([^)]+)\)(?:,\s*(.+))?$/

/**
 * Reads content/reading.md: `## Section` headings become the item kind (Books, Articles...), and each
 * `- line` becomes an item. Lines are either `[Title](url), byline` or `Title, byline`.
 */
export function getReading(): Reading {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'reading.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '')
  let title = 'Thought pieces'
  let kind = ''
  const items: ReadingItem[] = []
  for (const line of body.split(/\r?\n/)) {
    const t = line.trim()
    if (t.startsWith('# ')) title = t.slice(2).trim()
    else if (t.startsWith('## ')) kind = t.slice(3).trim()
    else if (t.startsWith('- ')) {
      const text = t.slice(2).trim()
      const m = text.match(LINK)
      if (m) items.push({ kind, title: m[1], href: m[2], byline: m[3]?.trim() })
      else {
        const i = text.indexOf(', ')
        items.push(i > 0 ? { kind, title: text.slice(0, i), byline: text.slice(i + 2) } : { kind, title: text })
      }
    }
  }
  return { title, items }
}
