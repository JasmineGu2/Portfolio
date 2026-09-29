import fs from 'node:fs'
import path from 'node:path'

/** One tool she built, parsed from content/tools-created.md. */
export interface CreatedTool {
  title: string
  problem?: string
  tool?: string
  /** An unlabeled line, used by work-in-progress entries. */
  desc?: string
  builtWith: string[]
  /** Optional picture that pops up over the title on hover, focus or tap. */
  image?: { src: string; alt: string }
}

export interface ToolsCreated {
  title: string
  sub?: string
  items: CreatedTool[]
  /** Heading of the work-in-progress group, as written in the markdown. */
  wipTitle?: string
  wip: CreatedTool[]
  /** Field labels, taken from the markdown keys so they read exactly as she wrote them. */
  labels: { problem: string; tool: string; builtWith: string }
}

/**
 * Reads content/tools-created.md: the first `# Title` is the card title and the first plain line the subtitle.
 * Each `## Title` starts a tool; `Problem:`, `Tool:` and `Built with:` lines fill it (Built with is comma-separated),
 * and a plain line becomes its description. A later `# Heading` (e.g. "Work in progress") starts the WIP group.
 */
export function getToolsCreated(): ToolsCreated {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'tools-created.md'), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<!--[\s\S]*?-->/g, '')
  const out: ToolsCreated = {
    title: '',
    items: [],
    wip: [],
    labels: { problem: 'Problem', tool: 'Tool', builtWith: 'Built with' },
  }
  let cur: CreatedTool | undefined
  let inWip = false
  for (const line of body.split(/\r?\n/)) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('## ')) {
      cur = { title: t.slice(3).trim(), builtWith: [] }
      ;(inWip ? out.wip : out.items).push(cur)
    } else if (t.startsWith('# ')) {
      if (!out.title) out.title = t.slice(2).trim()
      else {
        inWip = true
        out.wipTitle = t.slice(2).trim()
        cur = undefined
      }
    } else if (!cur) {
      if (!out.sub) out.sub = t
    } else {
      const m = t.match(/^(Problem|Tool|Built with|Image alt|Image):\s*(.*)$/i)
      const key = m?.[1].toLowerCase()
      const val = m?.[2].trim() ?? ''
      if (key === 'image') cur.image = { src: val, alt: cur.image?.alt ?? '' }
      else if (key === 'image alt') cur.image = { src: cur.image?.src ?? '', alt: val }
      else if (key === 'problem') (cur.problem = val), (out.labels.problem = m![1])
      else if (key === 'tool') (cur.tool = val), (out.labels.tool = m![1])
      else if (key === 'built with') {
        cur.builtWith = val.split(',').map((s) => s.trim()).filter(Boolean)
        out.labels.builtWith = m![1]
      } else cur.desc = cur.desc ? `${cur.desc} ${t}` : t
    }
  }
  // an image line with no path (or an alt with no image) is dropped
  for (const it of [...out.items, ...out.wip]) if (it.image && !it.image.src) delete it.image
  return out
}
