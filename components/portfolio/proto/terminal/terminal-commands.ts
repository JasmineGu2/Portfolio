import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { RESUME_HREF } from '@/lib/portfolio/resume'
import { CHAPTER_ORDER, TERMINAL_HEADLINE, TERMINAL_ORIGIN, getChapter } from '@/lib/portfolio/terminal-stories'

/**
 * The hero terminal's command engine. Pure: `runCommand` turns a line of input into output data, and the window
 * decides how to draw it. Everything printed comes from existing site data, never from new prose.
 */

export type OutputLine =
  | { kind: 'text'; text: string }
  | { kind: 'muted'; text: string }
  | { kind: 'error'; text: string }
  | { kind: 'row'; cols: [string, string, string] }
  | { kind: 'link'; text: string; href?: string; scrollTo?: string }

export interface CommandResult {
  lines: OutputLine[]
  clear?: boolean
  scrollTo?: string
}

export const COMMAND_NAMES = ['help', 'ls', 'whoami', 'cat', 'open', 'contact', 'clear'] as const

/** Commands the boot sequence types out on first paint. */
export const BOOT_COMMANDS = ['whoami', 'ls experience/'] as const

/** Clickable suggestions shown under the prompt. */
export const SUGGESTIONS = ['help', 'ls', 'cat autodesk', 'whoami', 'contact'] as const

const chapterAnchor = (id: WorkId) => `ch-${id}`

/** Accepts an id (`hack-western`) or a company name with the punctuation removed (`hackwestern`, `laurelspace`). */
export function resolveRole(token: string): WorkId | null {
  const clean = token.toLowerCase().replace(/\/$/, '').replace(/[^a-z0-9-]/g, '')
  const squash = (s: string) => s.replace(/[^a-z0-9]/g, '')
  for (const id of CHAPTER_ORDER) {
    if (id === clean || squash(id) === squash(clean)) return id
  }
  for (const id of CHAPTER_ORDER) {
    if (squash(EXPERIENCE_CARDS[id].company.toLowerCase()) === squash(clean)) return id
  }
  // `autodesk` alone is the PM role (first match above); a unique prefix also works (`tes` -> tesla).
  const prefixed = CHAPTER_ORDER.filter((id) => squash(id).startsWith(squash(clean)))
  return clean.length >= 3 && prefixed.length === 1 ? prefixed[0] : null
}

function listRoles(): OutputLine[] {
  return CHAPTER_ORDER.map((id) => {
    const card = EXPERIENCE_CARDS[id]
    return { kind: 'row', cols: [`${id}/`, card.period, card.role] } as OutputLine
  })
}

function catRole(id: WorkId): OutputLine[] {
  const card = EXPERIENCE_CARDS[id]
  const chapter = getChapter(id)
  return [
    { kind: 'text', text: `${card.company}, ${card.role}` },
    { kind: 'muted', text: card.period },
    { kind: 'text', text: card.subtitle },
    { kind: 'muted', text: card.description },
    { kind: 'muted', text: `tags: ${card.tags.map((t) => t.label).join(', ')}` },
    ...(chapter?.status === 'draft'
      ? [{ kind: 'muted', text: '// the chapter below is a DRAFT, not yet reviewed' } as OutputLine]
      : []),
    { kind: 'link', text: `open ${id}  ↓ read the full chapter`, scrollTo: chapterAnchor(id) },
  ]
}

export function runCommand(input: string): CommandResult {
  const [name = '', ...rest] = input.trim().split(/\s+/)
  const arg = rest.join(' ')

  switch (name.toLowerCase()) {
    case '':
      return { lines: [] }

    case 'help':
      return {
        lines: [
          { kind: 'row', cols: ['help', '', 'list commands'] },
          { kind: 'row', cols: ['ls', '', 'list experience/'] },
          { kind: 'row', cols: ['whoami', '', 'who this is'] },
          { kind: 'row', cols: ['cat <role|about>', '', 'summary of a role, or where I started'] },
          { kind: 'row', cols: ['open <role>', '', 'jump to its chapter'] },
          { kind: 'row', cols: ['contact', '', 'how to reach me'] },
          { kind: 'row', cols: ['clear', '', 'clear the screen'] },
        ],
      }

    case 'ls':
      return { lines: listRoles() }

    case 'whoami':
      return {
        lines: [
          { kind: 'text', text: 'jasmine gu' },
          { kind: 'muted', text: TERMINAL_HEADLINE },
        ],
      }

    case 'cat': {
      if (!arg) return { lines: [{ kind: 'error', text: 'cat: missing file. try: cat autodesk' }] }
      if (/^(about|about\.md)$/i.test(arg)) {
        return {
          lines: [
            { kind: 'text', text: TERMINAL_ORIGIN.headline },
            { kind: 'muted', text: TERMINAL_ORIGIN.lead },
          ],
        }
      }
      const id = resolveRole(arg)
      if (!id) return { lines: [{ kind: 'error', text: `cat: ${arg}: no such file. try: ls` }] }
      return { lines: catRole(id) }
    }

    case 'open': {
      const id = resolveRole(arg)
      if (!id) return { lines: [{ kind: 'error', text: `open: ${arg || '(nothing)'}: no such chapter. try: ls` }] }
      return {
        lines: [{ kind: 'muted', text: `opening experience/${id}/story.md ↓` }],
        scrollTo: chapterAnchor(id),
      }
    }

    case 'contact':
      return {
        lines: [
          { kind: 'link', text: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
          { kind: 'link', text: 'linkedin', href: SITE_CONTACT.linkedin },
          { kind: 'link', text: 'github', href: SITE_CONTACT.github },
          { kind: 'link', text: 'résumé (pdf)', href: RESUME_HREF },
        ],
      }

    case 'clear':
      return { lines: [], clear: true }

    default:
      return { lines: [{ kind: 'error', text: `command not found: ${name}. try: help` }] }
  }
}

/** Tab completion: command names first, then role ids after `cat` / `open`. Returns the input unchanged if nothing fits. */
export function complete(input: string): string {
  const parts = input.split(/\s+/)
  if (parts.length <= 1) {
    const hits = COMMAND_NAMES.filter((c) => c.startsWith(parts[0].toLowerCase()))
    return hits.length === 1 ? `${hits[0]} ` : input
  }
  const [cmd, partial] = [parts[0].toLowerCase(), parts.slice(1).join(' ').toLowerCase()]
  if (cmd !== 'cat' && cmd !== 'open') return input
  const hits = CHAPTER_ORDER.filter((id) => id.startsWith(partial))
  return hits.length === 1 ? `${cmd} ${hits[0]}` : input
}
