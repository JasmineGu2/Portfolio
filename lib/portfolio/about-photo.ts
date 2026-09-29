import fs from 'node:fs'
import path from 'node:path'

export interface AboutPhoto {
  photo: string
  alt: string
  caption?: string
}

/** Reads content/about-photo.md: `- photo:`, `- alt:` and an optional `- caption:` line. */
export function getAboutPhoto(): AboutPhoto {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'about-photo.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  const f: Record<string, string> = {}
  for (const line of body.split(/\r?\n/)) {
    const m = line.trim().match(/^-\s*(photo|alt|caption):\s*(.*)$/)
    if (m && m[2].trim()) f[m[1]] = m[2].trim()
  }
  return { photo: f.photo ?? '', alt: f.alt ?? '', caption: f.caption }
}
