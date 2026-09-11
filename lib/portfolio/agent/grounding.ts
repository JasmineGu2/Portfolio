/**
 * Ask Jasmine — grounding safeguard (spec §16).
 *
 * The agent must never point at something that isn't there. This walks every
 * curated answer, graph edge, and retrieval seed and confirms each id resolves
 * to real portfolio data. Run in dev via a guard in `AskAgentProvider` and on
 * the `/dev/agent-audit` page. There is no test runner in this project.
 */

import { getPortfolioItem } from '@/lib/portfolio/portfolio-data'
import {
  GALLERY_IMPACT_ROLES,
  GALLERY_SIDE_QUESTS,
} from '@/lib/portfolio/gallery-data'
import { AGENT_ANSWERS } from './answers'
import { INTENT_RETRIEVAL, isAgentIntent } from './intents'
import { AGENT_GRAPH_EDGES } from './knowledge-graph'
import { getWritingEntry } from './writing'
import { AGENT_INTENTS, type Reference } from './types'

const SECTION_IDS = new Set(['architecture', 'gallery', 'projects'])

function referenceResolves(ref: Reference): boolean {
  if (ref.type === 'architecture') return ref.id === 'architecture'
  if (ref.type === 'writing') return Boolean(getWritingEntry(ref.id))
  if (ref.type === 'gallery') {
    if (SECTION_IDS.has(ref.id)) return true
    return (
      GALLERY_IMPACT_ROLES.some((r) => r.id === ref.id) ||
      GALLERY_SIDE_QUESTS.some((r) => r.id === ref.id)
    )
  }
  const item = getPortfolioItem(ref.id)
  if (!item) return false
  if (ref.type === 'experience') return item.kind === 'experience'
  if (ref.type === 'project') return item.kind === 'project'
  return false
}

export function validateAgentContent(): { ok: boolean; problems: string[] } {
  const problems: string[] = []

  for (const intent of AGENT_INTENTS) {
    const answer = AGENT_ANSWERS[intent]
    if (!answer) {
      problems.push(`answers: missing entry for "${intent}"`)
      continue
    }
    if (answer.intent !== intent) {
      problems.push(`answers: "${intent}" entry has intent "${answer.intent}"`)
    }
    if (!answer.summary || answer.summary.trim().length < 40) {
      problems.push(`answers: "${intent}" summary is empty or too short`)
    }
    if (answer.references.length === 0) {
      problems.push(`answers: "${intent}" has no references`)
    }

    for (const ref of [...answer.references, ...(answer.readNext ?? [])]) {
      if (!ref.reason || ref.reason.trim().length === 0) {
        problems.push(`answers: "${intent}" reference "${ref.id}" has no reason`)
      }
      if (ref.id === 'western') {
        problems.push(`answers: "${intent}" references "western" (does not resolve via getPortfolioItem)`)
      }
      if (!referenceResolves(ref)) {
        problems.push(`answers: "${intent}" reference ${ref.type}/"${ref.id}" does not resolve`)
      }
    }

    for (const f of answer.followUps ?? []) {
      if (!isAgentIntent(f)) problems.push(`answers: "${intent}" follow-up "${f}" is not an intent`)
      if (f === intent) problems.push(`answers: "${intent}" lists itself as a follow-up`)
    }
  }

  for (const [intent, cfg] of Object.entries(INTENT_RETRIEVAL)) {
    for (const id of cfg.seedIds) {
      if (!getPortfolioItem(id)) {
        problems.push(`intents: "${intent}" seed "${id}" does not resolve`)
      }
    }
  }

  for (const edge of AGENT_GRAPH_EDGES) {
    for (const endpoint of [edge.from, edge.to]) {
      if (!getPortfolioItem(endpoint) && !getWritingEntry(endpoint)) {
        problems.push(`graph: edge endpoint "${endpoint}" does not resolve`)
      }
    }
  }

  return { ok: problems.length === 0, problems }
}
