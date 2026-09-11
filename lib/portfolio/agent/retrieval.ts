/**
 * Ask Jasmine — retrieval engine.
 *
 * Retrieval-first, not generation-first (spec §5). Given an intent and the
 * visitor's current page, this takes the curated answer from `answers.ts`, pulls
 * ranked evidence from the portfolio graph around it, picks a "Read next", and
 * assembles follow-up questions — never a dead end (spec §18). Pure: no React.
 */

import {
  getPortfolioItem,
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from '@/lib/portfolio/portfolio-data'
import {
  GALLERY_IMPACT_ROLES,
  GALLERY_SIDE_QUESTS,
} from '@/lib/portfolio/gallery-data'
import { AGENT_ANSWERS } from './answers'
import { CONTEXT_INTENT_PRIORITY } from './context'
import {
  INTENT_QUESTIONS,
  INTENT_RETRIEVAL,
  type RetrievalConfig,
} from './intents'
import { graphScore, isGraphConnected, neighborhood } from './knowledge-graph'
import { getWritingEntry, writingByTheme } from './writing'
import {
  AGENT_INTENTS,
  type AgentAction,
  type AgentContext,
  type AgentConversationState,
  type AgentIntent,
  type Reference,
  type ResolvedAnswer,
  type ResolvedReference,
} from './types'

const CASE_STUDY_IDS = new Set(['tesla', 'autodesk'])
const METRICS_RICH_IDS = new Set(['autodesk', 'tesla', 'autodesk-eng'])
const TRACE_INTENTS = new Set<AgentIntent>(['engineering_type', 'technical_pm', 'things_built'])

const REFERENCE_TITLE_OVERRIDES: Record<string, string> = {
  autodesk: 'Autodesk · Product',
  'autodesk-eng': 'Autodesk · Engineering',
}

const SECTION_ROUTES: Record<string, { title: string; href: string; kindLabel: string }> = {
  architecture: { title: 'The Journey', href: '/architecture', kindLabel: 'The Journey' },
  gallery: { title: 'Gallery', href: '/gallery', kindLabel: 'Gallery' },
  projects: { title: 'Explorations', href: '/projects', kindLabel: 'Explorations' },
}

// ── Reference resolution ───────────────────────────────────────────────────

function galleryRole(id: string) {
  return (
    GALLERY_IMPACT_ROLES.find((role) => role.id === id) ??
    GALLERY_SIDE_QUESTS.find((role) => role.id === id)
  )
}

export function resolveReference(
  ref: Reference,
  exploredIds: string[]
): ResolvedReference | null {
  const seen = exploredIds.includes(ref.id)

  if (ref.type === 'experience' || ref.type === 'project') {
    const item = getPortfolioItem(ref.id)
    if (!item) return null
    return {
      ...ref,
      title: REFERENCE_TITLE_OVERRIDES[item.id] ?? item.title,
      href: item.href,
      external: item.external,
      kindLabel: item.kind === 'experience' ? 'Experience' : 'Exploration',
      seen,
    }
  }

  if (ref.type === 'writing') {
    const entry = getWritingEntry(ref.id)
    if (!entry) return null
    return { ...ref, title: entry.title, href: entry.href, kindLabel: 'Writing', seen }
  }

  if (ref.type === 'architecture') {
    const section = SECTION_ROUTES.architecture
    return { ...ref, ...section, seen }
  }

  if (ref.type === 'gallery') {
    if (ref.id === 'gallery') return { ...ref, ...SECTION_ROUTES.gallery, seen }
    const role = galleryRole(ref.id)
    if (!role) return null
    return { ...ref, title: role.title, href: '/gallery', kindLabel: 'Gallery', seen }
  }

  return null
}

// ── Candidate assembly ────────────────────────────────────────────────────

function candidateItems(cfg: RetrievalConfig, ctx: AgentContext): PortfolioItem[] {
  const ids = new Set<string>(cfg.seedIds)

  for (const id of neighborhood(cfg.seedIds, cfg.followRelationships, 1)) ids.add(id)

  for (const item of PORTFOLIO_ITEMS) {
    const categoryHit = cfg.categories?.some((c) => item.categories.includes(c))
    const levelHit = cfg.abstractionLevels?.some((l) => item.abstractionLevels.includes(l))
    if (categoryHit || levelHit) ids.add(item.id)
  }

  if (ctx.experience) ids.add(ctx.experience)

  return [...ids]
    .map((id) => getPortfolioItem(id))
    .filter((item): item is PortfolioItem => item !== undefined)
}

// ── Scoring (spec §17) ────────────────────────────────────────────────────

interface ScoreInput {
  item: PortfolioItem
  curatedIds: Set<string>
  cfg: RetrievalConfig
  ctx: AgentContext
  seedIds: string[]
  askedSeedIds: Set<string>
  exploredIds: Set<string>
  chosen: PortfolioItem[]
}

function contextMatch(item: PortfolioItem, ctx: AgentContext): number {
  if (ctx.experience && item.id === ctx.experience) return 1
  if (ctx.experience && isGraphConnected(item.id, ctx.experience)) return 0.6
  if (ctx.page === 'projects' && item.kind === 'project') return 0.4
  if (
    ctx.page === 'architecture' &&
    item.abstractionLevels.some((l) => l === 'system' || l === 'platform' || l === 'product')
  ) {
    return 0.4
  }
  return 0
}

function intentMatch(item: PortfolioItem, curatedIds: Set<string>, cfg: RetrievalConfig): number {
  if (curatedIds.has(item.id)) return 1
  const categoryHit = cfg.categories?.some((c) => item.categories.includes(c))
  const levelHit = cfg.abstractionLevels?.some((l) => item.abstractionLevels.includes(l))
  return categoryHit || levelHit ? 0.5 : 0
}

function workQuality(item: PortfolioItem): number {
  if (item.kind === 'project') return 0.3
  let q = 0
  if (item.featured) q += 0.5
  if (CASE_STUDY_IDS.has(item.id)) q += 0.3
  if (METRICS_RICH_IDS.has(item.id)) q += 0.2
  return q
}

function diversityBonus(item: PortfolioItem, chosen: PortfolioItem[]): number {
  const clashes = chosen.filter(
    (c) => c.title === item.title || (c.kind === item.kind && c.kind === 'project')
  ).length
  return -0.5 * clashes
}

function score(input: ScoreInput): number {
  const { item, curatedIds, cfg, ctx, seedIds, askedSeedIds, exploredIds, chosen } = input
  const contextWeight = cfg.contextHeavy ? 7 : 5

  const convRelevance =
    !exploredIds.has(item.id) && [...askedSeedIds].some((s) => isGraphConnected(item.id, s)) ? 1 : 0

  return (
    contextWeight * contextMatch(item, ctx) +
    4 * intentMatch(item, curatedIds, cfg) +
    3 * graphScore(item.id, seedIds) +
    2 * convRelevance +
    1 * workQuality(item) +
    0.5 * diversityBonus(item, chosen) -
    4 * (exploredIds.has(item.id) ? 1 : 0)
  )
}

// ── Follow-ups (spec §18) ─────────────────────────────────────────────────

function allSeedsExplored(intent: AgentIntent, exploredIds: Set<string>): boolean {
  const seeds = INTENT_RETRIEVAL[intent].seedIds
  return seeds.length > 0 && seeds.every((id) => exploredIds.has(id))
}

export function buildFollowUps(
  intent: AgentIntent,
  ctx: AgentContext,
  state: AgentConversationState
): AgentIntent[] {
  const explored = new Set(state.exploredIds)
  const asked = new Set(state.askedIntents)
  const picked: AgentIntent[] = []
  const add = (candidate: AgentIntent) => {
    if (candidate !== intent && !picked.includes(candidate)) picked.push(candidate)
  }

  // 1. This answer's own follow-ups whose evidence isn't fully spent.
  for (const f of AGENT_ANSWERS[intent].followUps ?? []) {
    if (!allSeedsExplored(f, explored)) add(f)
  }
  // 2. Fresh threads the visitor hasn't opened yet — page priority, then any.
  if (picked.length < 3) {
    for (const f of [...CONTEXT_INTENT_PRIORITY[ctx.page], ...AGENT_INTENTS]) {
      if (picked.length >= 3) break
      if (!asked.has(f)) add(f)
    }
  }
  // 3. Last resort — repeat something rather than leave a dead end (spec §18).
  if (picked.length < 2) {
    for (const f of [...(AGENT_ANSWERS[intent].followUps ?? []), ...AGENT_INTENTS]) {
      if (picked.length >= 3) break
      add(f)
    }
  }
  return picked.slice(0, 3)
}

// ── Read next (spec §7, §14) ──────────────────────────────────────────────

function buildReadNext(
  intent: AgentIntent,
  cfg: RetrievalConfig,
  exploredIds: string[]
): ResolvedReference[] {
  const explored = new Set(exploredIds)

  const writingPicks = (cfg.themes ?? [])
    .flatMap((theme) => writingByTheme(theme))
    .filter((entry) => !explored.has(entry.id))
  const uniqueWriting = [...new Map(writingPicks.map((w) => [w.id, w])).values()].slice(0, 2)
  if (uniqueWriting.length > 0) {
    return uniqueWriting
      .map((w) =>
        resolveReference({ type: 'writing', id: w.id, reason: w.why }, exploredIds)
      )
      .filter((r): r is ResolvedReference => r !== null)
  }

  const curated = AGENT_ANSWERS[intent].readNext ?? []
  const resolved = curated
    .map((ref) => resolveReference(ref, exploredIds))
    .filter((r): r is ResolvedReference => r !== null)
  const fresh = resolved.filter((r) => !r.seen)
  return (fresh.length > 0 ? fresh : resolved).slice(0, 2)
}

// ── Main entry ────────────────────────────────────────────────────────────

export function resolveIntent(
  intent: AgentIntent,
  ctx: AgentContext,
  state: AgentConversationState
): ResolvedAnswer {
  const answer = AGENT_ANSWERS[intent]
  const cfg = INTENT_RETRIEVAL[intent]
  const exploredIds = state.exploredIds
  const exploredSet = new Set(exploredIds)

  const curatedRefs = answer.references
    .map((ref) => resolveReference(ref, exploredIds))
    .filter((r): r is ResolvedReference => r !== null)
  const curatedIds = new Set(curatedRefs.map((r) => r.id))

  const askedSeedIds = new Set(
    state.askedIntents.flatMap((i) => INTENT_RETRIEVAL[i]?.seedIds ?? [])
  )

  // Rank portfolio-item candidates, then fold in any curated non-item refs
  // (gallery roles, the Journey page) which always keep their place.
  const items = candidateItems(cfg, ctx)
  const chosen: PortfolioItem[] = []
  const rankedItems = items
    .map((item) => ({
      item,
      value: score({
        item,
        curatedIds,
        cfg,
        ctx,
        seedIds: cfg.seedIds,
        askedSeedIds,
        exploredIds: exploredSet,
        chosen,
      }),
    }))
    .sort((a, b) => b.value - a.value || itemOrder(a.item) - itemOrder(b.item))

  const itemRefs: ResolvedReference[] = []
  for (const { item } of rankedItems) {
    if (itemRefs.length >= 4) break
    const curated = curatedRefs.find((r) => r.id === item.id)
    itemRefs.push(
      curated ?? {
        type: item.kind === 'experience' ? 'experience' : 'project',
        id: item.id,
        reason: item.description,
        title: REFERENCE_TITLE_OVERRIDES[item.id] ?? item.title,
        href: item.href,
        external: item.external,
        kindLabel: item.kind === 'experience' ? 'Experience' : 'Exploration',
        seen: exploredSet.has(item.id),
      }
    )
    chosen.push(item)
  }

  const nonItemCurated = curatedRefs.filter(
    (r) => r.type === 'gallery' || r.type === 'architecture' || r.type === 'writing'
  )

  const references = [...itemRefs, ...nonItemCurated].slice(0, 4)
  const safeReferences = references.length > 0 ? references : curatedRefs

  const readNext = buildReadNext(intent, cfg, exploredIds).filter(
    (r) => !safeReferences.some((ref) => ref.id === r.id)
  )

  const followUps = buildFollowUps(intent, ctx, state)

  const actions: AgentAction[] = [...(answer.actions ?? [])]
  const primary = safeReferences[0]
  if (primary && !actions.some((a) => a.type === 'navigate' || a.type === 'openExperience')) {
    actions.push(referenceToAction(primary))
  }
  if (TRACE_INTENTS.has(intent)) {
    const traceNodes = cfg.seedIds.filter((id) => getPortfolioItem(id)?.kind === 'experience')
    if (traceNodes.length > 0) actions.push({ type: 'trace', nodeIds: traceNodes })
  }

  // Every piece of grounded evidence for this topic is something the visitor has
  // already been shown (spec §18). "Read next" sections don't count — they're
  // always more to explore, not fresh evidence for this answer.
  const deadEnd = safeReferences.length > 0 && safeReferences.every((r) => r.seen)

  return {
    intent,
    question: INTENT_QUESTIONS[intent],
    summary: answer.summary,
    references: safeReferences,
    readNext,
    followUps,
    actions,
    deadEnd,
  }
}

// ── Shared helpers ────────────────────────────────────────────────────────

const ITEM_ORDER = new Map(PORTFOLIO_ITEMS.map((item, index) => [item.id, index]))
function itemOrder(item: PortfolioItem): number {
  return ITEM_ORDER.get(item.id) ?? 999
}

export function experienceHref(id: string): string {
  if (id === 'tesla') return '/tesla'
  if (id === 'autodesk') return '/autodesk'
  return `/work/${id}`
}

/** Pure map from a resolved reference to the action a click should dispatch. */
export function referenceToAction(ref: ResolvedReference): AgentAction {
  switch (ref.type) {
    case 'experience':
      return { type: 'openExperience', id: ref.id }
    case 'writing':
      return { type: 'openWriting', id: ref.id }
    case 'project':
    case 'gallery':
    case 'architecture':
    default:
      return { type: 'navigate', href: ref.href }
  }
}
