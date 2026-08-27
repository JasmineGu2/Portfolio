import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import {
  EXPERIENCE_ITEMS,
  getPortfolioItem,
  type PortfolioItem,
} from '@/lib/portfolio/portfolio-data'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { CAPABILITY_MODULES } from '@/lib/portfolio/capabilities'
import { AGENT_IDENTITY } from '@/lib/portfolio/abstraction-engine-data'
import { buildAutodeskFactSheet } from '@/lib/portfolio/autodesk-facts'
import {
  findRecruiterAnswer,
  RECRUITER_QUESTIONS,
} from '@/lib/portfolio/recruiter-qa'

export type QueryMode = 'explain' | 'compare' | 'trace' | 'show'

export interface AgentReference {
  id: string
  label: string
  href: string
}

export interface AgentResponse {
  answer: string
  references: AgentReference[]
  relatedPath?: string
  followUps: string[]
  highlightIds: string[]
  traceIds?: string[]
  /** Questions offered as buttons inside the bubble, used by the chip branches. */
  options?: string[]
}

export interface AskContextOption {
  id: string
  label: string
  group: 'work' | 'project' | 'topic' | 'about'
}

export type ExperiencePickerGroup = 'work' | 'topic' | 'about'

export interface ExperiencePickerItem {
  id: string
  label: string
  subtitle?: string
  group: ExperiencePickerGroup
}

/**
 * ASK_JASMINE_SYSTEM_PROMPT
 * ---------------------------------------------------------------------
 * Persona and grounding instructions for "Ask Jasmine."
 *
 * There is currently no LLM call anywhere in this codebase, `resolveAskResponse`
 * below answers visitors with hand-written copy that is meant to follow these
 * same voice rules, and the UI (references, highlightIds, traceIds, routing to
 * /architecture) depends on that function's structured output, not free text.
 *
 * If a real model call is ever wired up (e.g. a new `app/api/ask` route calling
 * an LLM), send this string as the `system` prompt, and keep `resolveAskResponse`'s
 * structured fields, or an equivalent tool-call schema, so the navigation
 * features keep working. It's assembled from the same data files that drive the
 * rest of the site (EXPERIENCE_CARDS, CAPABILITY_MODULES, AGENT_IDENTITY) so it
 * can't drift out of sync with what's actually on the page.
 */
export function buildAskJasmineSystemPrompt(): string {
  const roles = (Object.keys(EXPERIENCE_CARDS) as WorkId[])
    .filter((id) => id !== 'western')
    .map((id) => {
      const card = EXPERIENCE_CARDS[id]
      return `- ${card.company}, ${card.role} (${card.period}): ${card.description}`
    })
    .join('\n')

  const capabilities = CAPABILITY_MODULES.map(
    (cap) => `- ${cap.title}: ${cap.description} (evidence: ${cap.evidence.join(', ')})`
  ).join('\n')

  return `You are Jasmine Gu, answering questions on your own portfolio site. Speak directly to the visitor, whether a recruiter, hiring manager, or fellow engineer, in first person ("I", never "Jasmine" or "the portfolio").

VOICE
- Confident and specific. Never generic chatbot filler ("Great question!", "I'd be happy to help!").
- Talk like an engineer who became a PM: name the actual system, tool, or tradeoff, not just a job title.
- Short, direct sentences. Skip buzzwords unless they're literally what you used (MCP, DynamoDB, Spring Boot).
- You're allowed opinions about your own path: why you moved from engineering to product, what surprised you, what you'd do differently.
- Never invent facts, dates, companies, or achievements beyond what's listed below. If you don't know, say so plainly and redirect to something you can actually answer.

WHO YOU ARE
${AGENT_IDENTITY.name}, based in ${AGENT_IDENTITY.location}. Dual degree in Computer Science and Business at Western University and Ivey Business School (2022–2027). Path: ${AGENT_IDENTITY.background}.

WORK HISTORY (most recent first)
${roles}

CAPABILITIES YOU DRAW ON
${capabilities}

AUTODESK / ADP STUDIO IN DETAIL
This is the deepest-documented role. Answer from these facts and don't extrapolate past them.
${buildAutodeskFactSheet()}

WHEN YOU DON'T KNOW
If a question falls outside this grounding, say so plainly in first person and point the visitor at something you can answer, like Tesla, Autodesk, the move into product, or how the experiences connect. Don't fabricate specifics to fill the gap.`
}

export const ASK_JASMINE_SYSTEM_PROMPT = buildAskJasmineSystemPrompt()

export const EXPERIENCE_PICKER_GROUPS: { id: ExperiencePickerGroup; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'topic', label: 'Topics' },
  { id: 'about', label: 'About' },
]

const TOPIC_PICKER_ITEMS: ExperiencePickerItem[] = [
  { id: 'engineering', label: 'Engineering', group: 'topic' },
  { id: 'product', label: 'Product', group: 'topic' },
  { id: 'ai', label: 'AI', group: 'topic' },
  { id: 'projects', label: 'Projects', group: 'topic' },
]

const ABOUT_PICKER_ITEMS: ExperiencePickerItem[] = [
  { id: 'architecture', label: 'Journey', group: 'about' },
  { id: 'tools', label: 'Tools I Use', group: 'about' },
]

export function getExperiencePickerItems(): ExperiencePickerItem[] {
  const workItems: ExperiencePickerItem[] = EXPERIENCE_ITEMS.map((item) => ({
    id: item.id,
    label: item.title,
    subtitle: item.role ?? item.subtitle,
    group: 'work',
  }))
  return [...workItems, ...TOPIC_PICKER_ITEMS, ...ABOUT_PICKER_ITEMS]
}

export function filterExperiencePickerGroups(
  query: string
): Record<ExperiencePickerGroup, ExperiencePickerItem[]> {
  const q = query.toLowerCase().trim()
  const items = getExperiencePickerItems()
  const filtered = q
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.subtitle?.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      )
    : items

  return {
    work: filtered.filter((item) => item.group === 'work'),
    topic: filtered.filter((item) => item.group === 'topic'),
    about: filtered.filter((item) => item.group === 'about'),
  }
}

export const INITIAL_CONTEXT_CHIPS: AskContextOption[] = [
  { id: 'engineering', label: 'Engineering', group: 'topic' },
  { id: 'product', label: 'Product', group: 'topic' },
  { id: 'ai', label: 'AI', group: 'topic' },
  { id: 'stealth-startup', label: 'Startup', group: 'work' },
  { id: 'projects', label: 'Projects', group: 'topic' },
]

export const CONTEXT_PICKER_OPTIONS: AskContextOption[] = [
  { id: 'autodesk', label: 'Autodesk, Product', group: 'work' },
  { id: 'autodesk-eng', label: 'Autodesk, SWE', group: 'work' },
  { id: 'tesla', label: 'Tesla', group: 'work' },
  { id: 'intuit', label: 'Intuit', group: 'work' },
  { id: 'stealth-startup', label: 'Stealth Startup', group: 'work' },
  { id: 'omers', label: 'ServiceNow / OMERS', group: 'work' },
  { id: 'metaverse', label: 'Metaverse Group', group: 'work' },
  { id: 'hack-western', label: 'Hack Western', group: 'work' },
  { id: 'engineering', label: 'Engineering', group: 'topic' },
  { id: 'product', label: 'Product', group: 'topic' },
  { id: 'ai', label: 'AI', group: 'topic' },
  { id: 'projects', label: 'Projects', group: 'topic' },
  { id: 'architecture', label: 'Journey', group: 'about' },
  { id: 'tools', label: 'Tools I Use', group: 'about' },
]

/** Rotating example questions for the Work home chat hero typewriter. */
export const HERO_EXAMPLE_QUESTIONS: readonly string[] = [
  'Why did you move from engineering to product?',
  'What did you actually build at Tesla?',
  'How technical are you as a PM?',
  'What is your approach to AI products?',
  'How do your experiences connect?',
  'What have you built zero to one?',
]

export const AUTOCOMPLETE_QUESTIONS: string[] = [
  'Why did you move from engineering to product?',
  'Why are you interested in AI?',
  'Why did you work across so many layers?',
  'What did you actually build at Tesla?',
  'What was the hardest problem at Tesla?',
  'What did Tesla teach you about systems?',
  'How did Tesla lead to Autodesk?',
  'What are you building at Autodesk?',
  'How technical are you as a PM?',
  'What is your approach to AI products?',
  'What have you built from zero to one?',
  "What's your most technical experience?",
  'Show me your infrastructure work.',
  'Trace how you moved from frontend to product.',
  'How do your experiences connect?',
  'What did you learn at Intuit?',
  'What distributed systems work did you do?',
]

const TRACE_FRONTEND_TO_PRODUCT: WorkId[] = ['intuit', 'tesla', 'autodesk-eng', 'autodesk']

const TECHNICAL_IDS: WorkId[] = ['tesla', 'autodesk-eng', 'intuit']

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

function refFromItem(item: PortfolioItem): AgentReference {
  return { id: item.id, label: item.title, href: item.href }
}

function refsFromIds(ids: string[]): AgentReference[] {
  const refs = ids
    .map((id) => getPortfolioItem(id))
    .filter((item): item is PortfolioItem => item !== undefined)
    .map(refFromItem)

  // Both Autodesk roles carry the same company name, so an answer citing both would
  // render two chips reading "Autodesk". Fall back to the picker label, which
  // already distinguishes them, but only for the labels that actually collide.
  const seen = new Map<string, number>()
  refs.forEach((ref) => seen.set(ref.label, (seen.get(ref.label) ?? 0) + 1))

  return refs.map((ref) =>
    (seen.get(ref.label) ?? 0) > 1 ? { ...ref, label: contextLabel(ref.id) } : ref
  )
}

function itemSummary(id: WorkId): string {
  const item = getPortfolioItem(id)
  return item?.description ?? ''
}

const PAGE_SUGGESTIONS: Record<string, string[]> = {
  '/': [
    'Why did you move from engineering to product?',
    'What did Tesla teach you?',
    'How technical are you as a PM?',
  ],
  '/architecture': [
    'How do experiences connect?',
    'Trace frontend → product',
    'What is the abstraction engine?',
  ],
  '/projects': [
    'What have you built zero to one?',
    'What is your most technical project?',
    'How do projects relate to your work?',
  ],
  '/tesla': [
    'What did you actually build?',
    'Why was this an infrastructure problem?',
    'What came next after Tesla?',
  ],
}

export function getPageSuggestions(pathname: string): string[] {
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '')
    if (slug === 'autodesk-eng') {
      return [
        'What distributed systems work did you do?',
        'How did this influence PM thinking?',
        'What did you learn about platforms?',
      ]
    }
    if (slug === 'tesla') {
      return [
        'What did you actually build at Tesla?',
        'Why was this an infrastructure problem?',
        'How did Tesla lead to Autodesk?',
      ]
    }
    return [
      'What did you learn here?',
      'How does this connect to other work?',
      'What skills did this unlock?',
    ]
  }
  return PAGE_SUGGESTIONS[pathname] ?? PAGE_SUGGESTIONS['/']
}

export function getContextualSuggestions(contextIds: string[], pathname?: string): string[] {
  if (contextIds.length === 0 && pathname) {
    return getPageSuggestions(pathname)
  }

  if (contextIds.includes('tesla')) {
    return [
      'What did you actually build at Tesla?',
      'Why was this an infrastructure problem?',
      'What did you learn at Tesla?',
      'How did this lead to Autodesk?',
    ]
  }
  if (contextIds.includes('autodesk')) {
    return [
      'Why did you move into product?',
      'What is your approach to AI products?',
      'How technical are you as a PM?',
      'How do you evaluate AI features?',
    ]
  }
  if (contextIds.includes('autodesk-eng')) {
    return [
      'What distributed systems work did you do?',
      'What did you learn about platforms?',
      'How did engineering influence your PM work?',
    ]
  }
  if (contextIds.includes('engineering')) {
    return [
      'What did Tesla teach you about systems?',
      "What's your most technical experience?",
      'Show me your infrastructure work.',
    ]
  }
  if (contextIds.includes('product')) {
    return [
      'Why did you move from engineering to product?',
      'How technical are you as a PM?',
      'What AI products are you working on?',
    ]
  }
  return AUTOCOMPLETE_QUESTIONS.slice(0, 4)
}

export function getAutocompleteMatches(query: string, contextIds: string[], pathname?: string): string[] {
  const q = normalize(query)
  if (!q) return getContextualSuggestions(contextIds, pathname).slice(0, 5)

  const pool = [
    ...new Set([
      ...getContextualSuggestions(contextIds, pathname),
      ...RECRUITER_QUESTIONS,
      ...AUTOCOMPLETE_QUESTIONS,
    ]),
  ]
  return pool.filter((question) => normalize(question).includes(q)).slice(0, 5)
}

/** Shown for freely-typed questions, there's no real language model behind this yet, only
 *  keyword-matched answers wired to the topic chips, so guessing at arbitrary text would
 *  either misfire or silently redirect the page. Typed questions get this instead. */
export const WORK_IN_PROGRESS_RESPONSE: AgentResponse = {
  answer:
    "I don't have that one written up yet. Pick a topic below and I'll show you what I can answer.",
  references: [],
  followUps: [],
  highlightIds: [],
}

export function resolveAskResponse(
  query: string,
  mode: QueryMode,
  contextIds: string[]
): AgentResponse {
  const q = normalize(query)
  const hasContext = (id: string) => contextIds.includes(id)

  // Curated recruiter Q&A first. These are exact matches on the chip questions,
  // so they always beat the keyword heuristics below, which are deliberately
  // broad and would otherwise swallow a specific question with a vague answer.
  const curated = findRecruiterAnswer(query)
  if (curated) {
    const refIds = curated.refIds ?? []
    return {
      answer: curated.answer,
      references: refsFromIds(refIds),
      followUps: curated.followUps ?? [],
      highlightIds: refIds,
    }
  }

  if (mode === 'trace' || q.includes('trace') || q.includes('progression') || q.includes('path')) {
    return {
      answer:
        'The through-line runs from interfaces toward product decisions. Each step added a wider lens, not a departure from building.',
      references: refsFromIds(TRACE_FRONTEND_TO_PRODUCT),
      relatedPath: 'INTERFACE → SYSTEM → PLATFORM → PRODUCT',
      followUps: [
        'What stayed technical after moving into PM?',
        'What did Tesla change about how you think?',
        'Show me the Work tiles for this path.',
      ],
      highlightIds: [...TRACE_FRONTEND_TO_PRODUCT],
      traceIds: [...TRACE_FRONTEND_TO_PRODUCT],
    }
  }

  if (
    mode === 'show' ||
    q.includes('show me') ||
    q.includes('most technical') ||
    q.includes('infrastructure')
  ) {
    const ids = q.includes('infrastructure')
      ? ['tesla', 'autodesk-eng']
      : q.includes('ai')
        ? ['autodesk']
        : TECHNICAL_IDS
    return {
      answer:
        'The most systems-heavy stretches of my work: factory ML tooling at Tesla, distributed platform services at Autodesk, and production interfaces backed by real infrastructure rather than mocked data.',
      references: refsFromIds(ids),
      relatedPath: 'INTERFACE → SYSTEM → PLATFORM',
      followUps: [
        'Compare Tesla and Autodesk SWE.',
        'Why did Tesla feel like a systems problem?',
        'Trace how you moved toward product.',
      ],
      highlightIds: ids,
    }
  }

  if (mode === 'compare' || (hasContext('tesla') && hasContext('autodesk-eng')) || q.includes('compare')) {
    return {
      answer:
        'Tesla pulled me beneath the interface into ML video infrastructure and production systems. Autodesk SWE went deeper into distributed services, API reliability, and platform dependencies. Both expanded technical depth; Tesla sharpened systems thinking under a user-facing surface, while Autodesk SWE sharpened platform thinking.',
      references: refsFromIds(['tesla', 'autodesk-eng']),
      followUps: [
        'How did this lead to product?',
        'What did you build at each?',
        'Trace the full career path.',
      ],
      highlightIds: ['tesla', 'autodesk-eng'],
    }
  }

  if (q.includes('why') && (q.includes('product') || q.includes('pm') || q.includes('engineering'))) {
    return {
      answer:
        'I moved toward product after repeatedly hitting questions the interface alone could not answer: what the system should enable, what to prioritize, and what tradeoffs mattered. Tesla and Autodesk SWE made the underlying systems legible; product became the layer where those systems meet direction.',
      references: refsFromIds(['intuit', 'tesla', 'autodesk-eng', 'autodesk']),
      relatedPath: 'INTERFACE → SYSTEM → PLATFORM → PRODUCT',
      followUps: [
        'How technical are you as a PM?',
        'What AI products are you working on?',
        'Trace the full transition.',
      ],
      highlightIds: ['tesla', 'autodesk-eng', 'autodesk'],
      traceIds: TRACE_FRONTEND_TO_PRODUCT,
    }
  }

  if (q.includes('tesla') || hasContext('tesla')) {
    return {
      answer: itemSummary('tesla'),
      references: refsFromIds(['tesla']),
      relatedPath: 'INTERFACE → SYSTEM',
      followUps: [
        'Why was this an infrastructure problem?',
        'How did Tesla lead to Autodesk?',
        'Compare Tesla and Autodesk SWE.',
      ],
      highlightIds: ['tesla'],
    }
  }

  const mentionsAutodeskEng =
    q.includes('swe') ||
    q.includes('engineer') ||
    q.includes('fusion') ||
    q.includes('librar') ||
    q.includes('backend') ||
    q.includes('microservice')

  // Current role first: my Autodesk PM internship (May 2026–present) is what "Autodesk" means
  // by default. Only route to the earlier SWE internship when the question is explicitly technical.
  if (q.includes('autodesk') && !mentionsAutodeskEng && !hasContext('autodesk-eng')) {
    return {
      answer: itemSummary('autodesk'),
      references: refsFromIds(['autodesk']),
      relatedPath: 'PRODUCT',
      followUps: [
        'How technical are you as a PM?',
        'What is your approach to AI products?',
        'How did engineering influence this role?',
      ],
      highlightIds: ['autodesk'],
    }
  }

  if (q.includes('autodesk') || hasContext('autodesk-eng')) {
    return {
      answer: itemSummary('autodesk-eng'),
      references: refsFromIds(['autodesk-eng']),
      relatedPath: 'PLATFORM',
      followUps: [
        'What distributed systems work did you do?',
        'How did this influence product thinking?',
        'Compare with Tesla.',
      ],
      highlightIds: ['autodesk-eng'],
    }
  }

  if (q.includes('intuit') || hasContext('intuit')) {
    return {
      answer:
        'Intuit was my first time doing frontend work inside a system I did not build. TurboTax.com already had a large component library, theming rules, and animation conventions, and my job was to build onboarding UI that fit inside them cleanly. I learned how much of real engineering is integration: matching an existing design system and wiring REST APIs other teams owned, not just shipping a new component in isolation.',
      references: refsFromIds(['intuit']),
      relatedPath: 'INTERFACE',
      followUps: ['What did you learn about design systems?', 'Trace how you moved toward systems work.'],
      highlightIds: ['intuit'],
    }
  }

  if (q.includes('ai') || hasContext('ai')) {
    return {
      answer:
        'My approach to AI products starts with trust, not novelty. At Autodesk I own AI-assisted query experiences for a governed data platform, which means any LLM-assisted workflow has to work with the trust and metadata teams, not around them. I judge an AI feature the way I judge any product bet: does it save real time, is the output legible enough that a user can catch it when it is wrong, and does MCP-style tool use feel like a normal part of exploring data instead of a black box.',
      references: refsFromIds(['autodesk']),
      followUps: [
        'How do you evaluate AI features?',
        'What is MCP in your work?',
        'Show me related projects.',
      ],
      highlightIds: ['autodesk'],
    }
  }

  if (q.includes('technical') || q.includes('how technical')) {
    return {
      answer:
        'Still very technical as a PM. I came from frontend and systems work, spent time on ML factory tooling and distributed platform services, and now work on AI-assisted data products where understanding the system underneath the feature is the job.',
      references: refsFromIds(['tesla', 'autodesk-eng', 'autodesk']),
      followUps: ['Show me your most technical work.', 'What languages have you used?', 'Trace my engineering path.'],
      highlightIds: ['tesla', 'autodesk-eng'],
    }
  }

  if (q.includes('connect') || q.includes('architecture') || q.includes('abstraction')) {
    return {
      answer:
        'Each experience trained a different capability. Automation taught leverage, interfaces taught user empathy, systems work taught dependencies, platform work taught scale, and product work taught direction. The Journey page maps how they connect.',
      references: [{ id: 'architecture', label: 'Journey', href: '/architecture' }],
      followUps: [
        'Trace how you moved from frontend to product.',
        'What capabilities did Tesla train?',
        'Show me your most technical work.',
      ],
      highlightIds: EXPERIENCE_ITEMS.slice(0, 4).map((item) => item.id),
    }
  }

  if (
    q.includes('zero') ||
    q.includes('startup') ||
    q.includes('project') ||
    q.includes('side project') ||
    hasContext('stealth-startup')
  ) {
    return {
      answer:
        'Most of my zero-to-one work is LaurelSpace, a childcare CRM where I owned product and engineering end to end: payments, email automation, the database, and the go-to-market plan. Outside of full-time roles I keep building smaller things fast: TLDW summarized and classified YouTube videos, BrewMates helped students start networking conversations, and I led the six-person team that built the Hack Western hacker portal for 400+ participants. Different sizes, same instinct: build the real thing to answer the question instead of debating it.',
      references: refsFromIds(['stealth-startup', 'tldw', 'brewmates', 'hackwestern-web-developer']),
      relatedPath: 'ZERO → ONE',
      followUps: [
        'How did startup work shape your product thinking?',
        'What did you build at Hack Western?',
        'What is your most technical project?',
      ],
      highlightIds: ['stealth-startup'],
    }
  }

  return {
    answer:
      "I don't have a specific answer for that yet. Try asking about Tesla, Autodesk, the move into product, or tracing how the experiences connect.",
    references: refsFromIds(['tesla', 'autodesk']),
    followUps: [
      'Why did you move from engineering to product?',
      'What did Tesla teach you about systems?',
      'Trace how you moved from frontend to product.',
    ],
    highlightIds: [],
  }
}

export function contextLabel(id: string): string {
  const option = CONTEXT_PICKER_OPTIONS.find((entry) => entry.id === id)
  if (option) return option.label
  const item = getPortfolioItem(id)
  return item?.title ?? id
}

export function progressiveChips(selectedIds: string[]): AskContextOption[] {
  if (selectedIds.includes('tesla')) {
    return [
      { id: 'tesla', label: 'What I Built', group: 'topic' },
      { id: 'tesla', label: 'What I Learned', group: 'topic' },
      { id: 'autodesk-eng', label: 'What Came Next', group: 'work' },
    ]
  }
  if (selectedIds.includes('engineering')) {
    return [
      { id: 'tesla', label: 'Tesla', group: 'work' },
      { id: 'autodesk-eng', label: 'Autodesk SWE', group: 'work' },
      { id: 'intuit', label: 'Intuit', group: 'work' },
      { id: 'projects', label: 'Projects', group: 'topic' },
    ]
  }
  return INITIAL_CONTEXT_CHIPS
}
