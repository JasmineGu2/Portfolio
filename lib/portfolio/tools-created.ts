import fs from 'node:fs'
import path from 'node:path'

/** One tool she built, parsed from content/tools-created.md. */
export interface CreatedTool {
  title: string
  /** One line, "to do this": the only copy the receipt shows after the title. */
  short?: string
  problem?: string
  tool?: string
  /** An unlabeled line, used by work-in-progress entries. */
  desc?: string
  builtWith: string[]
  /** Optional picture that pops up under the title when its link label is hovered, focused or tapped. */
  image?: { src: string; alt: string; label: string; width?: number; height?: number }
}

/** Pixel size of a WebP or PNG in public/ (read from its header), so the pop-up reserves the right shape before it loads. */
function imageSize(src: string): { width: number; height: number } | undefined {
  try {
    const b = fs.readFileSync(path.join(process.cwd(), 'public', src.replace(/^\//, '')))
    if (b.toString('ascii', 1, 4) === 'PNG') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
    if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return undefined
    const kind = b.toString('ascii', 12, 16)
    if (kind === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
    if (kind === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    if (kind === 'VP8L') {
      const v = b.readUInt32LE(21)
      return { width: 1 + (v & 0x3fff), height: 1 + ((v >> 14) & 0x3fff) }
    }
  } catch {}
  return undefined
}

export interface ToolsCreated {
  title: string
  sub?: string
  items: CreatedTool[]
  /** Heading of the work-in-progress group, as written in the markdown. */
  wipTitle?: string
  /** Small tag on each work-in-progress entry (the `Label:` line under that heading). */
  wipLabel?: string
  wip: CreatedTool[]
  /** Field labels, taken from the markdown keys so they read exactly as she wrote them. */
  labels: { problem: string; tool: string; builtWith: string }
}

/**
 * Reads content/tools-created.md: the first `# Title` is the card title and the first plain line the subtitle.
 * Each `## Title` starts a tool; `Short:`, `Problem:`, `Tool:` and `Built with:` lines fill it (Built with is comma-separated),
 * and a plain line becomes its description. A later `# Heading` (e.g. "Work in progress") starts the WIP group; a `Label:` line under it is the WIP tag.
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
      const lab = inWip && t.match(/^Label:\s*(.*)$/i)
      if (lab) out.wipLabel = lab[1].trim()
      else if (!out.sub) out.sub = t
    } else {
      const m = t.match(/^(Short|Problem|Tool|Built with|Image alt|Image label|Image):\s*(.*)$/i)
      const key = m?.[1].toLowerCase()
      const val = m?.[2].trim() ?? ''
      if (key === 'image' || key === 'image alt' || key === 'image label') {
        const img = (cur.image ??= { src: '', alt: '', label: '' })
        if (key === 'image') img.src = val
        else if (key === 'image alt') img.alt = val
        else img.label = val
      }
      else if (key === 'short') cur.short = val
      else if (key === 'problem') (cur.problem = val), (out.labels.problem = m![1])
      else if (key === 'tool') (cur.tool = val), (out.labels.tool = m![1])
      else if (key === 'built with') {
        cur.builtWith = val.split(',').map((s) => s.trim()).filter(Boolean)
        out.labels.builtWith = m![1]
      } else cur.desc = cur.desc ? `${cur.desc} ${t}` : t
    }
  }
  // an image line with no path (or an alt with no image) is dropped
  for (const it of [...out.items, ...out.wip]) {
    if (it.image && !it.image.src) delete it.image
    else if (it.image) {
      if (!it.image.label) it.image.label = '(See a screenshot)'
      Object.assign(it.image, imageSize(it.image.src))
    }
  }
  return out
}
