import fs from 'node:fs'
import path from 'node:path'

export interface AboutIntro {
  heading: string
  paragraphs: string[]
}

/**
 * Reads content/about-intro.md: blocks split by blank lines (lines inside a block are joined with a space).
 * The first block is the heading, the rest are body paragraphs.
 */
export function getAboutIntro(): AboutIntro {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'about-intro.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  const blocks = body
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).join(' '))
    .filter(Boolean)
  return { heading: blocks[0] ?? '', paragraphs: blocks.slice(1) }
}
