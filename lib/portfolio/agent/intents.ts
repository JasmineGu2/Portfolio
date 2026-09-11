/**
 * Ask Jasmine — the question model.
 *
 * Visitors never type a free-form question (spec §4). Every visible question is
 * a chip that carries an `AgentIntent` directly, so there is no NLP or keyword
 * matching anywhere. `getIntentForQuestion` is a convenience lookup for tests
 * and any future caller that has a question string rather than an intent.
 */

import type {
  AbstractionLevel,
  PortfolioCategory,
} from '@/lib/portfolio/portfolio-data'
import type { AgentIntent, Relationship, Theme } from './types'
import { AGENT_INTENTS } from './types'

// ── Visible questions (exact text, spec §3) ─────────────────────────────────

export const INTENT_QUESTIONS: Record<AgentIntent, string> = {
  engineering_type: 'What kind of engineering has she done?',
  engineering_teams: 'What teams has she worked on?',
  ai_experience: 'Has she worked with AI?',
  things_built: 'What has she built?',
  products: 'What products has she worked on?',
  product_ownership: 'Has she actually owned product?',
  technical_pm: 'How technical is she as a PM?',
  workplaces: 'Where has she worked?',
  collaborators: 'Who has she worked with?',
  working_style: 'What is she like to work with?',
  values: 'What does she care about?',
  beliefs: 'What does she believe?',
  impact: 'What kind of impact does she want to have?',
  future_building: 'What does she want to build next?',
}

// ── Opening categories (spec §3) ────────────────────────────────────────────

export interface QuestionCategory {
  id: string
  label: string
  intents: AgentIntent[]
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: 'engineering',
    label: 'Engineering',
    intents: ['engineering_type', 'engineering_teams', 'ai_experience', 'things_built'],
  },
  {
    id: 'product',
    label: 'Product',
    intents: ['products', 'product_ownership', 'technical_pm'],
  },
  {
    id: 'people-places',
    label: 'People & Places',
    intents: ['workplaces', 'collaborators', 'working_style'],
  },
  {
    id: 'values-ambitions',
    label: 'Core Values & Ambitions',
    intents: ['values', 'beliefs', 'impact', 'future_building'],
  },
]

// ── Retrieval configuration ────────────────────────────────────────────────

export interface RetrievalConfig {
  /** Portfolio item ids that anchor retrieval and graph expansion. */
  seedIds: string[]
  categories?: PortfolioCategory[]
  abstractionLevels?: AbstractionLevel[]
  followRelationships?: Relationship[]
  /** Writing themes to prefer when picking a "Read next" entry. */
  themes?: Theme[]
  capabilityIds?: string[]
  /** Ranking should weight the current page heavily for this intent (spec §9). */
  contextHeavy?: boolean
}

export const INTENT_RETRIEVAL: Record<AgentIntent, RetrievalConfig> = {
  engineering_type: {
    seedIds: ['tesla', 'autodesk-eng', 'intuit'],
    categories: ['engineering', 'systems'],
    abstractionLevels: ['interface', 'system', 'platform', 'automation'],
    followRelationships: ['elaborates', 'demonstrates', 'influenced'],
    themes: ['engineering', 'technology'],
    capabilityIds: ['build', 'scale'],
    contextHeavy: true,
  },
  engineering_teams: {
    seedIds: ['autodesk-eng', 'tesla', 'autodesk'],
    categories: ['engineering'],
    followRelationships: ['worked_with', 'relates_to'],
    themes: ['collaboration', 'engineering'],
  },
  ai_experience: {
    seedIds: ['autodesk', 'tldw', 'brewmates'],
    categories: ['ai'],
    followRelationships: ['demonstrates', 'elaborates', 'relates_to'],
    themes: ['ai', 'technology'],
    capabilityIds: ['experiment', 'decide'],
  },
  things_built: {
    seedIds: ['stealth-startup', 'tesla', 'autodesk-eng', 'hack-western', 'tldw'],
    followRelationships: ['built', 'demonstrates', 'relates_to'],
    themes: ['engineering', 'product-thinking'],
    capabilityIds: ['build', 'experiment'],
    contextHeavy: true,
  },
  products: {
    seedIds: ['autodesk', 'stealth-startup', 'hack-western'],
    categories: ['product'],
    abstractionLevels: ['product', 'zero-to-one'],
    followRelationships: ['owned', 'built', 'relates_to'],
    themes: ['product-thinking'],
  },
  product_ownership: {
    seedIds: ['autodesk', 'stealth-startup'],
    categories: ['product', 'startup'],
    followRelationships: ['owned', 'demonstrates', 'continues'],
    themes: ['product-thinking', 'ambition'],
  },
  technical_pm: {
    seedIds: ['autodesk', 'autodesk-eng', 'tesla'],
    followRelationships: ['influenced', 'continues', 'elaborates'],
    themes: ['product-thinking', 'engineering'],
    capabilityIds: ['build', 'decide', 'connect'],
    contextHeavy: true,
  },
  workplaces: {
    seedIds: [
      'autodesk',
      'tesla',
      'autodesk-eng',
      'intuit',
      'omers',
      'metaverse',
      'stealth-startup',
    ],
    followRelationships: ['continues', 'influenced', 'relates_to'],
  },
  collaborators: {
    seedIds: ['autodesk', 'hack-western', 'ivey-product'],
    followRelationships: ['worked_with', 'relates_to'],
    themes: ['collaboration'],
  },
  working_style: {
    seedIds: ['autodesk', 'stealth-startup', 'hack-western'],
    followRelationships: ['demonstrates', 'relates_to'],
    themes: ['philosophy', 'product-thinking'],
    capabilityIds: ['understand', 'experiment'],
  },
  values: {
    seedIds: ['autodesk', 'omers', 'tesla'],
    followRelationships: ['demonstrates', 'elaborates'],
    themes: ['values', 'philosophy'],
    capabilityIds: ['understand'],
  },
  beliefs: {
    seedIds: ['autodesk'],
    followRelationships: ['elaborates', 'demonstrates', 'relates_to'],
    themes: ['ai', 'philosophy', 'technology', 'values'],
  },
  impact: {
    seedIds: ['autodesk', 'ivey-product'],
    followRelationships: ['demonstrates', 'continues'],
    themes: ['ambition', 'values'],
  },
  future_building: {
    seedIds: ['autodesk'],
    followRelationships: ['continues', 'relates_to'],
    themes: ['ambition', 'ai'],
  },
}

// ── Legacy shim ────────────────────────────────────────────────────────────

const QUESTION_TO_INTENT = new Map(
  (Object.entries(INTENT_QUESTIONS) as [AgentIntent, string][]).map(([intent, q]) => [
    normalize(q),
    intent,
  ])
)

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Exact (normalized) question-string → intent lookup. */
export function getIntentForQuestion(text: string): AgentIntent | undefined {
  return QUESTION_TO_INTENT.get(normalize(text))
}

export function isAgentIntent(value: string): value is AgentIntent {
  return (AGENT_INTENTS as string[]).includes(value)
}
