import fs from 'node:fs'
import path from 'node:path'

/** One footer quote, parsed from content/Quotes about engineering.md. `code` quotes render monospace. */
export interface Quote {
  text: string
  code?: boolean
}

/**
 * Transcriptions of images she embedded in the note, keyed by file name.
 * "Pasted image 20260929042356.png" (repo root) is a screenshot of this code snippet;
 * the footer shows it as a code-style quote instead of the image.
 */
const EMBEDS: Record<string, string> = {
  'Pasted image 20260929042356.png': 'if (life.gives("bugs")):\n    debug()\nelse:\n    keep_coding()',
}

/** Light cleanup only: capital first letter, a few missing apostrophes, a typo'd capital, double spaces. */
function tidy(line: string): string {
  const t = line
    .replace(/\s{2,}/g, ' ')
    .replace(/\bisnt\b/g, "isn't")
    .replace(/\bits\b/g, "it's")
    .replace(/\bYOu\b/g, 'You')
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/**
 * Reads content/Quotes about engineering.md: every non-empty line is a quote.
 * An `![[file]]` embed becomes a code quote when its transcription is in EMBEDS; other embeds are skipped.
 */
export function getQuotes(): Quote[] {
  let raw: string
  try {
    raw = fs.readFileSync(path.join(process.cwd(), 'content', 'Quotes about engineering.md'), 'utf8')
  } catch {
    return []
  }
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  const out: Quote[] = []
  for (const line of body.split(/\r?\n/)) {
    const t = line.trim()
    if (!t) continue
    const embed = t.match(/^!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]$/)
    if (embed) {
      const code = EMBEDS[embed[1].trim()]
      if (code) out.push({ text: code, code: true })
      continue
    }
    out.push({ text: tidy(t) })
  }
  return out
}
