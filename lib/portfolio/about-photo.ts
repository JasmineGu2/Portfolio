import fs from 'node:fs'
import path from 'node:path'

export interface AboutPhoto {
  photo: string
  alt: string
  caption?: string
}

/**
 * Reads content/about-photo.md: one block per photo. A `photo:` line (with or without a leading `-`) starts a block;
 * the `alt:` and optional `caption:` lines after it belong to that photo. Blocks without a photo are skipped.
 */
export function getAboutPhotos(): AboutPhoto[] {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'about-photo.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  const out: AboutPhoto[] = []
  let cur: AboutPhoto | null = null
  for (const line of body.split(/\r?\n/)) {
    const m = line.trim().match(/^(?:-\s*)?(photo|alt|caption):\s*(.*)$/)
    if (!m) continue
    const [, key, value] = m
    if (key === 'photo') { cur = { photo: value.trim(), alt: '' }; out.push(cur); continue }
    if (cur && value.trim()) cur[key as 'alt' | 'caption'] = value.trim()
  }
  return out.filter((p) => p.photo)
}
