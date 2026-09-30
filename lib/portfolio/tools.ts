import fs from 'node:fs'
import path from 'node:path'
import { getToolsCreated, type CreatedTool } from './tools-created'

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
 * Reads content/tools.md: `# Title`, then plain lines: intro and hint, or just the hint when there is one line.
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
  const pre: string[] = []
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
    } else if (!cur) pre.push(t)
  }
  // two plain lines under the title: intro, then hint; just one: it is the hint
  if (pre.length === 1) hint = pre[0]
  else [intro, hint] = pre
  return { title, intro, hint, items, labels: TOOLS_LABELS }
}

/** One row of the merged /about list: a favorite tool, a tool she built, or both (same `##` name in the two files). */
export interface Setup extends Tool {
  short?: string
  image?: CreatedTool['image']
  wip?: boolean
}

export interface Setups {
  title: string
  sub?: string
  hint?: string
  wipLabel?: string
  items: Setup[]
  labels: typeof TOOLS_LABELS
}

/**
 * The /about "tech setups" list: content/tools.md and content/tools-created.md merged into one.
 * Favorite tools with no built-tool twin come first, then the built ones (work in progress first). A favorite tool whose name
 * matches a built one is folded into it, so the row keeps its icon, link and hover card plus the short line and screenshot.
 */
export function getSetups(): Setups {
  const tools = getTools()
  const made = getToolsCreated()
  const key = (s: string) => s.trim().toLowerCase()
  const byName = new Map(tools.items.map((t) => [key(t.name), t]))
  const built: Setup[] = [
    ...made.wip.map((c) => ({ c, wip: true })),
    ...made.items.map((c) => ({ c, wip: false })),
  ].map(({ c, wip }) => {
    const twin = byName.get(key(c.title))
    byName.delete(key(c.title))
    return { ...twin, name: c.title, short: c.short ?? c.desc, image: c.image, wip }
  })
  return {
    title: made.title || tools.title,
    sub: made.sub,
    hint: tools.hint,
    wipLabel: made.wipLabel,
    items: [...tools.items.filter((t) => byName.has(key(t.name))), ...built],
    labels: TOOLS_LABELS,
  }
}
