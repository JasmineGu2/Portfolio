/**
 * Ask Jasmine — shared contract for the guided portfolio agent.
 *
 * There is NO language model behind this experience, by design (see
 * `specs/07-ask-Jasmine-Guided Portfolio.md`). A visitor picks a question, it
 * maps to one of 14 `AgentIntent`s, and `resolveIntent` (in `retrieval.ts`)
 * assembles a curated answer from `answers.ts` plus ranked evidence pulled from
 * the existing portfolio data. The agent speaks as a guide describing Jasmine in
 * the third person ("She built…"), never as Jasmine herself.
 */

// ── Intents (spec §4) ────────────────────────────────────────────────────────

export type AgentIntent =
  | 'engineering_type'
  | 'engineering_teams'
  | 'ai_experience'
  | 'things_built'
  | 'products'
  | 'product_ownership'
  | 'technical_pm'
  | 'workplaces'
  | 'collaborators'
  | 'working_style'
  | 'values'
  | 'beliefs'
  | 'impact'
  | 'future_building'

export const AGENT_INTENTS: AgentIntent[] = [
  'engineering_type',
  'engineering_teams',
  'ai_experience',
  'things_built',
  'products',
  'product_ownership',
  'technical_pm',
  'workplaces',
  'collaborators',
  'working_style',
  'values',
  'beliefs',
  'impact',
  'future_building',
]

// ── Relationships (spec §6) ──────────────────────────────────────────────────

export type Relationship =
  | 'worked_on'
  | 'worked_with'
  | 'built'
  | 'owned'
  | 'influenced'
  | 'demonstrates'
  | 'elaborates'
  | 'relates_to'
  | 'continues'
  | 'contrasts_with'

// ── Writing themes (spec §14) ────────────────────────────────────────────────

export type Theme =
  | 'values'
  | 'ai'
  | 'creativity'
  | 'product-thinking'
  | 'engineering'
  | 'ambition'
  | 'collaboration'
  | 'technology'
  | 'philosophy'

export const THEME_LABELS: Record<Theme, string> = {
  values: 'Values',
  ai: 'AI',
  creativity: 'Creativity',
  'product-thinking': 'Product thinking',
  engineering: 'Engineering',
  ambition: 'Ambition',
  collaboration: 'Collaboration',
  technology: 'Technology',
  philosophy: 'Philosophy',
}

// ── References (spec §8) ─────────────────────────────────────────────────────

export type ReferenceType = 'experience' | 'project' | 'writing' | 'gallery' | 'architecture'

export interface Reference {
  type: ReferenceType
  id: string
  /** Why this piece is worth looking at, in guide voice. Required by design (spec §8). */
  reason: string
}

/** A `Reference` after `retrieval.ts` has resolved it against real portfolio data. */
export interface ResolvedReference extends Reference {
  title: string
  href: string
  /** Display label for the kind badge, e.g. "Experience", "The Journey". */
  kindLabel: string
  external?: boolean
  /** True when this id is already in the conversation's `exploredIds`. */
  seen?: boolean
}

// ── Actions (spec §10) ──────────────────────────────────────────────────────

export type AgentAction =
  | { type: 'navigate'; href: string }
  | { type: 'scroll'; targetId: string }
  | { type: 'highlight'; targetId: string }
  | { type: 'openWriting'; id: string }
  | { type: 'openExperience'; id: string }
  | { type: 'trace'; nodeIds: string[] }

// ── Curated answers (spec §8) ───────────────────────────────────────────────

export interface AgentAnswer {
  intent: AgentIntent
  /** 2–4 sentences, third person, human voice (spec §15). Never invents facts (spec §16). */
  summary: string
  references: Reference[]
  readNext?: Reference[]
  followUps?: AgentIntent[]
  actions?: AgentAction[]
}

/** What `resolveIntent` returns to the UI, after ranking + resolution. */
export interface ResolvedAnswer {
  intent: AgentIntent
  question: string
  summary: string
  references: ResolvedReference[]
  readNext: ResolvedReference[]
  followUps: AgentIntent[]
  actions: AgentAction[]
  /** Set when every piece of grounded evidence has already been explored (spec §18). */
  deadEnd: boolean
}

// ── Conversation state (spec §11) ───────────────────────────────────────────

export type ContextPage =
  | 'home'
  | 'projects'
  | 'architecture'
  | 'gallery'
  | 'tesla'
  | 'autodesk'
  | 'work'

export interface AgentContext {
  page: ContextPage
  experience?: string
  project?: string
}

export type AgentMessage =
  | { id: string; role: 'user'; intent: AgentIntent; label: string }
  | { id: string; role: 'user'; intent: null; label: string }
  | { id: string; role: 'assistant'; kind: 'answer'; answer: ResolvedAnswer }
  | { id: string; role: 'assistant'; kind: 'fallback'; query: string; followUps: AgentIntent[] }

/** Passed to `resolveIntent` so ranking can favour fresh evidence (spec §17). */
export interface AgentConversationState {
  exploredIds: string[]
  askedIntents: AgentIntent[]
}
