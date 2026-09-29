import fs from 'node:fs'
import path from 'node:path'

/** One favorite tool, parsed from content/tools.md. */
export interface Tool {
  name: string
  url?: string
  /** Path to the product's official app icon under /icons/tools/ */
  icon?: string
  label?: string
  what?: string
  how?: string
  metric?: string
}

export interface Tools {
  title: string
  intro?: string
  hint?: string
  items: Tool[]
  labels: typeof TOOLS_LABELS
}

/** Small UI labels for the tool cards; the tools themselves live in content/tools.md. */
export const TOOLS_LABELS = {
  what: 'What it is',
  how: 'How I use it',
  metric: 'Result',
  wiki: 'Read on Wikipedia',
  site: 'Visit the site',
} as const

const FIELDS = ['url', 'icon', 'label', 'what', 'how', 'metric'] as const

/**
 * Reads content/tools.md: `# Title`, then the first plain line is the intro and the second the hint.
 * Each `## Name` starts a tool; `- key: value` lines under it fill url, icon, label, what, how and metric.
 * Empty values are dropped, so an empty `metric:` never renders.
 */
export function getTools(): Tools {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'tools.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  let title = 'favorite tools'
  let intro: string | undefined
  let hint: string | undefined
  const items: Tool[] = []
  let cur: Tool | undefined
  for (const line of body.split(/\r?\n/)) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('## ')) items.push((cur = { name: t.slice(3).trim() }))
    else if (t.startsWith('# ')) title = t.slice(2).trim()
    else if (t.startsWith('- ') && cur) {
      const m = t.slice(2).match(/^(\w+):\s*(.*)$/)
      const key = m?.[1] as (typeof FIELDS)[number] | undefined
      if (m && key && FIELDS.includes(key) && m[2].trim()) cur[key] = m[2].trim()
    } else if (!cur && !intro) intro = t
    else if (!cur && !hint) hint = t
  }
  return { title, intro, hint, items, labels: TOOLS_LABELS }
}
