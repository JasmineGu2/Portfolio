import type { AbstractionLevel } from '@/lib/portfolio/portfolio-data'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { CAPABILITY_MODULES } from '@/lib/portfolio/capabilities'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'

export interface AgentIdentity {
  name: string
  location: string
  education: string
  currentMode: string
  background: string
  defaultLoop: string
  status: string
}

export interface AgentStateCard {
  role: string
  abstraction: string
  task: string
  input: string
}

export interface AbstractionStage {
  id: AbstractionLevel
  level: string
  label: string
  question: string
  experienceIds: WorkId[]
  unlocked: { keyword: string; meaning: string }
  agentState: AgentStateCard
}

export interface ExperienceInput {
  id: WorkId
  signal: string
  entered: string[]
  learned: string
}

export interface ToolCategory {
  id: string
  label: string
  tools: string[]
}

export interface MemoryModule {
  id: string
  title: string
  description: string
  items: string[]
  placeholder?: boolean
}

export interface OutputType {
  id: string
  title: string
  description: string
  examples: string[]
}

export const AGENT_IDENTITY: AgentIdentity = {
  name: 'Jasmine Gu',
  location: 'Toronto, Canada',
  education: 'Computer Science × Business',
  currentMode: 'Product + AI',
  background: 'Engineering → Systems → Platform → Product',
  defaultLoop: 'Build → Learn → Zoom Out',
  status: 'ONLINE',
}

export const JASMINE_AGENT = {
  title: 'Jasmine',
  type: 'GENERALIST AGENT',
  description:
    'A product-minded engineer who likes understanding complex systems, finding the real problem, and building something to test it.',
  statusTags: ['PRODUCT', 'ENGINEERING', 'AI', 'SYSTEMS'],
}

export const ABSTRACTION_STAGES: AbstractionStage[] = [
  {
    id: 'automation',
    level: 'LEVEL 00',
    label: 'AUTOMATION',
    question: 'Can I make this easier?',
    experienceIds: ['metaverse', 'omers'],
    unlocked: {
      keyword: 'LEVERAGE',
      meaning: 'Software can turn repetitive work into a system.',
    },
    agentState: {
      role: 'Builder',
      abstraction: 'Task',
      task: 'Remove friction',
      input: '"Can I automate this?"',
    },
  },
  {
    id: 'zero-to-one',
    level: 'LEVEL 01',
    label: 'ZERO → ONE',
    question: 'What do you build when nothing is defined yet?',
    experienceIds: ['stealth-startup'],
    unlocked: {
      keyword: 'AMBIGUITY',
      meaning: 'When there is no blueprint, product and engineering decisions happen together.',
    },
    agentState: {
      role: 'Builder + Product',
      abstraction: 'Feature + Product',
      task: 'Turn ambiguity into something testable',
      input: '"What should exist first?"',
    },
  },
  {
    id: 'interface',
    level: 'LEVEL 02',
    label: 'INTERFACE',
    question: 'How does a system become understandable to a person?',
    experienceIds: ['intuit'],
    unlocked: {
      keyword: 'USER',
      meaning: 'The system eventually becomes something a person has to understand.',
    },
    agentState: {
      role: 'Frontend Builder',
      abstraction: 'Interface',
      task: 'Make the system usable',
      input: '"What does the user actually experience?"',
    },
  },
  {
    id: 'system',
    level: 'LEVEL 03',
    label: 'SYSTEM',
    question: 'What has to happen underneath the interface?',
    experienceIds: ['tesla'],
    unlocked: {
      keyword: 'DEPENDENCIES',
      meaning: 'Great interfaces are often systems problems underneath.',
    },
    agentState: {
      role: 'Systems Builder',
      abstraction: 'System',
      task: 'Trace what makes the interface work',
      input: '"What\'s underneath this?"',
    },
  },
  {
    id: 'platform',
    level: 'LEVEL 04',
    label: 'PLATFORM',
    question: 'What happens when many systems depend on the same foundation?',
    experienceIds: ['autodesk-eng'],
    unlocked: {
      keyword: 'SCALE',
      meaning: 'A product is not a page. It is a network of dependencies.',
    },
    agentState: {
      role: 'Platform Engineer',
      abstraction: 'Platform',
      task: 'Make shared systems reliable',
      input: '"What else depends on this?"',
    },
  },
  {
    id: 'product',
    level: 'LEVEL 05',
    label: 'PRODUCT',
    question: 'What should the system actually enable?',
    experienceIds: ['autodesk'],
    unlocked: {
      keyword: 'DIRECTION',
      meaning:
        'Once I understood how systems were built, I became interested in shaping what they should make possible.',
    },
    agentState: {
      role: 'Technical Product Builder',
      abstraction: 'Product / Platform',
      task: 'Shape what the system should enable',
      input: '"What should we actually build?"',
    },
  },
]

export const EXPERIENCE_INPUTS: ExperienceInput[] = [
  {
    id: 'metaverse',
    signal: 'AUTOMATION',
    entered: [
      'repetitive manual workflows',
      'Python automation',
      'data collection',
      'outreach systems',
    ],
    learned: 'Software can turn a repetitive process into a system.',
  },
  {
    id: 'omers',
    signal: 'USERS',
    entered: [
      'workflow automation',
      'requirements',
      'UAT',
      'non-technical stakeholders',
      'enterprise systems',
    ],
    learned:
      'Solving the technical problem means very little if you misunderstand the human one.',
  },
  {
    id: 'intuit',
    signal: 'INTERFACE',
    entered: ['frontend engineering', 'UI components', 'design systems', 'APIs', 'testing'],
    learned: 'Systems eventually become something a person has to understand and use.',
  },
  {
    id: 'tesla',
    signal: 'SYSTEMS',
    entered: [
      'ML factory software',
      'video infrastructure',
      'APIs',
      'inference data',
      'performance',
      'production UI',
    ],
    learned: 'A good interface is often an infrastructure problem underneath.',
  },
  {
    id: 'autodesk-eng',
    signal: 'INFRASTRUCTURE',
    entered: [
      'distributed systems',
      'Java services',
      'DynamoDB',
      'Redis',
      'contract testing',
      'async workflows',
    ],
    learned:
      'A product is not a page. It is a network of services, contracts, data, teams, and decisions.',
  },
  {
    id: 'autodesk',
    signal: 'PRODUCT',
    entered: [
      'platform strategy',
      'AI-assisted workflows',
      'user interviews',
      'prototyping',
      'MCP',
      'roadmap decisions',
    ],
    learned:
      'Once I understood how systems were built, I became interested in deciding which systems should exist.',
  },
]

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'product',
    label: 'Product',
    tools: [
      'Strategy',
      'Roadmapping',
      'User Research',
      'Prioritization',
      'Metrics',
      'Product Discovery',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    tools: [
      'React',
      'TypeScript',
      'Java',
      'Python',
      'REST APIs',
      'Distributed Systems',
      'DynamoDB',
      'Redis',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    tools: [
      'LLM Prototyping',
      'MCP',
      'AI Workflows',
      'Evaluations',
      'Prompt Systems',
      'Agent Prototyping',
    ],
  },
  {
    id: 'design',
    label: 'Design',
    tools: [
      'Figma',
      'Prototyping',
      'Information Architecture',
      'Design Systems',
      'Interaction Design',
    ],
  },
  {
    id: 'business',
    label: 'Business',
    tools: [
      'Market Thinking',
      'Stakeholder Communication',
      'Systems Thinking',
      'Business Models',
    ],
  },
]

export const PERSONAL_TOOLS = [
  'Claude',
  'ChatGPT',
  'Notion',
  'Obsidian',
  'Wispr Flow',
  'Figma',
  'GitHub',
  'MCP',
]

export const MEMORY_MODULES: MemoryModule[] = [
  {
    id: 'long-term',
    title: 'Long-term Memory',
    description: 'Experiences and communities that changed how I think.',
    items: ['CONTENT_REQUIRED: communities, mentors, leadership, hackathons'],
    placeholder: true,
  },
  {
    id: 'working',
    title: 'Working Memory',
    description: 'Things currently occupying my brain.',
    items: [
      'CONTENT_REQUIRED: current side project',
      'CONTENT_REQUIRED: current AI experiment',
      'CONTENT_REQUIRED: current rabbit hole',
    ],
    placeholder: true,
  },
  {
    id: 'context',
    title: 'Context Window',
    description: 'A few things that help explain how I operate.',
    items: [
      'learns by building',
      'likes ambiguous problems',
      'likes understanding systems',
      'highly curious',
      'technical + people-oriented',
      'prototypes early',
      'asks a lot of questions',
    ],
  },
]

export const OUTPUT_TYPES: OutputType[] = [
  {
    id: 'products',
    title: 'Products',
    description: 'Things people use.',
    examples: ['ADP Studio workflows', 'Autodesk Libraries features', 'Tesla factory tooling', 'Intuit UI'],
  },
  {
    id: 'systems',
    title: 'Systems',
    description: 'Infrastructure that enables other work.',
    examples: [
      'distributed library workflows',
      'ML video infrastructure',
      'APIs',
      'data systems',
    ],
  },
  {
    id: 'decisions',
    title: 'Decisions',
    description: 'Product direction and prioritization.',
    examples: ['roadmap decisions', 'AI workflow strategy', 'platform requirements'],
  },
  {
    id: 'experiments',
    title: 'Experiments',
    description: 'Things built to learn.',
    examples: ['prototypes', 'AI agents', 'personal projects'],
  },
  {
    id: 'communities',
    title: 'Communities',
    description: 'Things created or improved with other people.',
    examples: ['CONTENT_REQUIRED: from community data'],
  },
]

export const RUNTIME_LOOP_STEPS = [
  'NOTICE',
  'UNDERSTAND',
  'BUILD',
  'PUT IT IN FRONT OF PEOPLE',
  'LEARN',
  'ZOOM OUT',
] as const

export const FINAL_STACK = [
  { label: 'PRODUCT', question: 'What should exist?' },
  { label: 'PLATFORM', question: 'What should others be able to build on?' },
  { label: 'SYSTEM', question: 'What makes it work reliably?' },
  { label: 'INTERFACE', question: 'How does someone experience it?' },
  { label: 'ZERO → ONE', question: 'How do you make something real from ambiguity?' },
  { label: 'AUTOMATION', question: 'Can software remove friction?' },
] as const

/** Simplified 5-column view for the experience × abstraction level matrix. */
export type MatrixLevel = 'automate' | 'user' | 'system' | 'scale' | 'direction'

export interface ExperienceLevelRow {
  id: WorkId
  label: string
  levels: MatrixLevel[]
  href: string
}

export const MATRIX_LEVELS: { id: MatrixLevel; label: string; blurb: string }[] = [
  {
    id: 'automate',
    label: 'Automate',
    blurb: 'Taking repetitive work and turning it into a script or a tool.',
  },
  {
    id: 'user',
    label: 'User',
    blurb: 'Deciding how one person actually moves through the product.',
  },
  {
    id: 'system',
    label: 'System',
    blurb: 'Making the thing hold up once real usage hits it.',
  },
  {
    id: 'scale',
    label: 'Scale',
    blurb: 'Keeping it working as the userbase and the team grow.',
  },
  {
    id: 'direction',
    label: 'Direction',
    blurb: 'Choosing what should exist next, and being able to say why.',
  },
]

export const EXPERIENCE_LEVEL_MATRIX: ExperienceLevelRow[] = [
  {
    id: 'metaverse',
    label: 'Metaverse',
    levels: ['automate'],
    href: getExperienceHref('metaverse'),
  },
  {
    id: 'stealth-startup',
    label: 'Pre-Seed Stealth Startup',
    levels: ['automate', 'user'],
    href: getExperienceHref('stealth-startup'),
  },
  {
    id: 'intuit',
    label: 'Intuit',
    levels: ['system'],
    href: getExperienceHref('intuit'),
  },
  {
    id: 'tesla',
    label: 'Tesla',
    levels: ['system', 'scale'],
    href: getExperienceHref('tesla'),
  },
  {
    id: 'autodesk-eng',
    label: 'Autodesk SWE',
    levels: ['scale', 'direction'],
    href: getExperienceHref('autodesk-eng'),
  },
  {
    id: 'autodesk',
    label: 'Autodesk PM',
    levels: ['scale', 'direction'],
    href: getExperienceHref('autodesk'),
  },
]

function getExperienceHref(id: WorkId): string {
  return id === 'tesla' ? '/tesla' : `/work/${id}`
}

export function getExperienceForStage(id: WorkId) {
  const card = EXPERIENCE_CARDS[id]
  return {
    id,
    title: card.company,
    role: card.role,
    summary: card.subtitle,
    href: id === 'tesla' ? '/tesla' : `/work/${id}`,
  }
}

export function getExperienceInput(id: WorkId) {
  const card = EXPERIENCE_CARDS[id]
  const input = EXPERIENCE_INPUTS.find((entry) => entry.id === id)
  return {
    ...input!,
    title: card.company,
    href: id === 'tesla' ? '/tesla' : `/work/${id}`,
  }
}

/* ── Continuous architecture flow (Abstraction Engine diagram) ── */

export type ArchitectureNodeType =
  | 'experience'
  | 'concept'
  | 'question'
  | 'agent'
  | 'output'
  | 'tool'

export type ArchitectureFlowStageId =
  | AbstractionLevel
  | 'inputs'
  | 'zoom-narrative'
  | 'runtime'
  | 'tools'
  | 'memory'
  | 'outputs'
  | 'loop'
  | 'payoff'

export type ArchitectureStageId = ArchitectureFlowStageId

export interface FlowStageMeta {
  id: ArchitectureFlowStageId
  level: string
  label: string
  question?: string
}

export const NARRATIVE_FLOW_STAGES: FlowStageMeta[] = [
  {
    id: 'zoom-narrative',
    level: 'ZOOM',
    label: 'Keep Zooming Out',
    question: 'Every experience became an input. I kept zooming out.',
  },
  {
    id: 'runtime',
    level: 'RUNTIME',
    label: 'Jasmine Runtime',
    question: 'Different experiences trained different parts of how I work.',
  },
  {
    id: 'tools',
    level: 'TOOLS',
    label: 'Tool Registry',
    question: 'Tools I reach for depending on the problem.',
  },
  {
    id: 'memory',
    level: 'MEMORY',
    label: 'Memory',
    question: 'The things shaping the system that do not fit neatly on a résumé.',
  },
  {
    id: 'outputs',
    level: 'OUTPUTS',
    label: 'Outputs',
    question: 'What this system produces.',
  },
  {
    id: 'loop',
    level: 'LOOP',
    label: 'Runtime Loop',
    question: 'The project changes. The loop usually does not.',
  },
  {
    id: 'payoff',
    level: 'PAYOFF',
    label: 'Full Stack',
    question: "I didn't leave the earlier layers behind.",
  },
]

export type ArchitecturePort = 'top' | 'bottom' | 'left' | 'right'

export interface ArchitectureNode {
  id: string
  type: ArchitectureNodeType
  label: string
  stage: ArchitectureStageId
  /** Horizontal position within flow canvas (0–100%). */
  x: number
  /** Vertical progression within flow canvas (0–100%). */
  y: number
  metadata?: Record<string, string>
  experienceId?: WorkId
  ports?: Partial<Record<ArchitecturePort, boolean>>
}

export type ArchitectureRelationship =
  | 'taught'
  | 'uses'
  | 'unlocked'
  | 'depends-on'
  | 'led-to'

export interface ArchitectureEdge {
  id: string
  from: string
  to: string
  relationship: ArchitectureRelationship
  /** Stage index (0–5) when this edge begins drawing. */
  revealStage: number
  fromPort?: ArchitecturePort
  toPort?: ArchitecturePort
}

export const ARCHITECTURE_RELATIONSHIP_LABELS: Record<ArchitectureRelationship, string> = {
  taught: 'TAUGHT',
  uses: 'USED IN',
  unlocked: 'UNLOCKED',
  'depends-on': 'DEPENDS ON',
  'led-to': 'LED TO',
}

export const ARCHITECTURE_STAGE_ORDER: ArchitectureStageId[] = [
  'automation',
  'zero-to-one',
  'interface',
  'system',
  'platform',
  'product',
  'zoom-narrative',
  'runtime',
  'tools',
  'memory',
  'outputs',
  'loop',
  'payoff',
]

export const ARCHITECTURE_FLOW_PAYOFF = {
  headline: "I didn't leave the earlier layers behind.",
  lead: 'I learned to operate across more of the system.',
}

/** Core abstraction-level nodes (stages 0–5), spine only, no concept fan-out. */
const ARCHITECTURE_CORE_NODES: ArchitectureNode[] = [
  // ── Stage 0: Automation ──
  {
    id: 'q-automation',
    type: 'question',
    label: 'Can I make this easier?',
    stage: 'automation',
    x: 18,
    y: 2,
    ports: { bottom: true },
  },
  {
    id: 'exp-metaverse',
    type: 'experience',
    label: 'Metaverse',
    stage: 'automation',
    x: 28,
    y: 6,
    experienceId: 'metaverse',
    metadata: { evidence: 'Python automation · outreach systems' },
    ports: { top: true, right: true, bottom: true },
  },
  {
    id: 'exp-omers',
    type: 'experience',
    label: 'OMERS',
    stage: 'automation',
    x: 68,
    y: 6,
    experienceId: 'omers',
    metadata: { evidence: 'Workflow automation · UAT · stakeholders' },
    ports: { top: true, left: true, bottom: true },
  },
  {
    id: 'out-leverage',
    type: 'output',
    label: 'LEVERAGE',
    stage: 'automation',
    x: 48,
    y: 9,
    metadata: { meaning: 'Software can turn repetitive work into a system.' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'agent-automation',
    type: 'agent',
    label: 'Builder',
    stage: 'automation',
    x: 78,
    y: 9,
    metadata: {
      ROLE: 'Builder',
      TASK: 'Remove friction',
      SCOPE: 'Task',
      INPUT: '"Can I automate this?"',
    },
    ports: { left: true, bottom: true },
  },

  // ── Stage 1: Zero → One ──
  {
    id: 'q-zero',
    type: 'question',
    label: 'What do you build when nothing is defined yet?',
    stage: 'zero-to-one',
    x: 72,
    y: 13,
    ports: { bottom: true },
  },
  {
    id: 'exp-laurel',
    type: 'experience',
    label: 'LaurelSpace',
    stage: 'zero-to-one',
    x: 38,
    y: 16,
    experienceId: 'stealth-startup',
    metadata: { evidence: '0→1 product · ambiguity · full-stack' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'out-ambiguity',
    type: 'output',
    label: 'AMBIGUITY',
    stage: 'zero-to-one',
    x: 22,
    y: 18,
    metadata: {
      meaning: 'When there is no blueprint, product and engineering decisions happen together.',
    },
    ports: { top: true, right: true, bottom: true },
  },
  {
    id: 'agent-zero',
    type: 'agent',
    label: 'Builder + Product',
    stage: 'zero-to-one',
    x: 78,
    y: 18,
    metadata: {
      ROLE: 'Builder + Product',
      TASK: 'Turn ambiguity into something testable',
      SCOPE: 'Feature + Product',
      INPUT: '"What should exist first?"',
    },
    ports: { left: true, bottom: true },
  },

  // ── Stage 2: Interface ──
  {
    id: 'q-interface',
    type: 'question',
    label: 'How does a system become understandable to a person?',
    stage: 'interface',
    x: 16,
    y: 22,
    ports: { bottom: true },
  },
  {
    id: 'exp-intuit',
    type: 'experience',
    label: 'Intuit',
    stage: 'interface',
    x: 48,
    y: 25,
    experienceId: 'intuit',
    metadata: { evidence: 'Design systems · UI components · APIs' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'out-user',
    type: 'output',
    label: 'USER',
    stage: 'interface',
    x: 72,
    y: 25,
    metadata: { meaning: 'The system eventually becomes something a person has to understand.' },
    ports: { left: true, bottom: true },
  },
  {
    id: 'agent-interface',
    type: 'agent',
    label: 'Frontend Builder',
    stage: 'interface',
    x: 82,
    y: 27,
    metadata: {
      ROLE: 'Frontend Builder',
      TASK: 'Make the system usable',
      SCOPE: 'Interface',
      INPUT: '"What does the user actually experience?"',
    },
    ports: { left: true, bottom: true },
  },

  // ── Stage 3: System ──
  {
    id: 'q-system',
    type: 'question',
    label: 'What has to happen underneath the interface?',
    stage: 'system',
    x: 78,
    y: 31,
    ports: { bottom: true },
  },
  {
    id: 'exp-tesla',
    type: 'experience',
    label: 'Tesla',
    stage: 'system',
    x: 50,
    y: 34,
    experienceId: 'tesla',
    metadata: { evidence: 'ML factory · video infra · inference UI' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'out-deps',
    type: 'output',
    label: 'DEPENDENCIES',
    stage: 'system',
    x: 48,
    y: 37,
    metadata: { meaning: 'Great interfaces are often systems problems underneath.' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'agent-system',
    type: 'agent',
    label: 'Systems Builder',
    stage: 'system',
    x: 76,
    y: 37,
    metadata: {
      ROLE: 'Systems Builder',
      TASK: 'Trace what makes the interface work',
      SCOPE: 'System',
      INPUT: '"What\'s underneath this?"',
    },
    ports: { left: true, bottom: true },
  },

  // ── Stage 4: Platform ──
  {
    id: 'q-platform',
    type: 'question',
    label: 'What happens when many systems depend on the same foundation?',
    stage: 'platform',
    x: 18,
    y: 41,
    ports: { bottom: true },
  },
  {
    id: 'exp-autodesk-eng',
    type: 'experience',
    label: 'Autodesk SWE',
    stage: 'platform',
    x: 50,
    y: 44,
    experienceId: 'autodesk-eng',
    metadata: { evidence: 'Distributed services · DynamoDB · contracts' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'out-scale',
    type: 'output',
    label: 'SCALE',
    stage: 'platform',
    x: 24,
    y: 47,
    metadata: { meaning: 'A product is not a page. It is a network of dependencies.' },
    ports: { top: true, bottom: true },
  },
  {
    id: 'agent-platform',
    type: 'agent',
    label: 'Platform Engineer',
    stage: 'platform',
    x: 76,
    y: 47,
    metadata: {
      ROLE: 'Platform Engineer',
      TASK: 'Make shared systems reliable',
      SCOPE: 'Platform',
      INPUT: '"What else depends on this?"',
    },
    ports: { left: true, bottom: true },
  },

  // ── Stage 5: Product ──
  {
    id: 'q-product',
    type: 'question',
    label: 'What should the system actually enable?',
    stage: 'product',
    x: 50,
    y: 51,
    ports: { bottom: true },
  },
  {
    id: 'exp-autodesk-pm',
    type: 'experience',
    label: 'Autodesk PM',
    stage: 'product',
    x: 35,
    y: 54,
    experienceId: 'autodesk',
    metadata: { evidence: 'Platform strategy · AI workflows · roadmap' },
    ports: { top: true, right: true, bottom: true },
  },
  {
    id: 'out-direction',
    type: 'output',
    label: 'DIRECTION',
    stage: 'product',
    x: 62,
    y: 54,
    metadata: {
      meaning:
        'Once I understood how systems were built, I became interested in shaping what they should make possible.',
    },
    ports: { top: true, left: true, bottom: true },
  },
  {
    id: 'agent-product',
    type: 'agent',
    label: 'Technical Product Builder',
    stage: 'product',
    x: 50,
    y: 57,
    metadata: {
      ROLE: 'Technical Product Builder',
      TASK: 'Shape what the system should enable',
      SCOPE: 'Product / Platform',
      INPUT: '"What should we actually build?"',
    },
    ports: { top: true, bottom: true },
  },
]

const RUNTIME_CAPABILITY_IDS = ['understand', 'build', 'decide'] as const

const OUTPUT_ARTIFACT_IDS = ['products', 'systems', 'decisions'] as const

/** Narrative continuation, floating satellites after the abstraction spine. */
function buildExtendedArchitectureNodes(): ArchitectureNode[] {
  const nodes: ArchitectureNode[] = []

  nodes.push({
    id: 'q-zoom',
    type: 'question',
    label: 'I kept zooming out.',
    stage: 'zoom-narrative',
    x: 50,
    y: 62,
    metadata: {
      desc: 'Every experience became an input. Each layer made me curious about the next.',
    },
    ports: { top: true, bottom: true },
  })

  nodes.push({
    id: 'agent-jasmine',
    type: 'agent',
    label: JASMINE_AGENT.title,
    stage: 'runtime',
    x: 50,
    y: 68,
    metadata: {
      ROLE: JASMINE_AGENT.type,
      TASK: JASMINE_AGENT.description,
      SCOPE: JASMINE_AGENT.statusTags.join(' · '),
      INPUT: 'Experiences · tools · memory',
    },
    ports: { top: true, bottom: true, left: true, right: true },
  })

  RUNTIME_CAPABILITY_IDS.forEach((capId, i) => {
    const cap = CAPABILITY_MODULES.find((entry) => entry.id === capId)
    if (!cap) return
    nodes.push({
      id: `cap-${cap.id}`,
      type: 'concept',
      label: cap.title,
      stage: 'runtime',
      x: 18 + i * 28,
      y: 72 + (i % 2) * 1.2,
      metadata: {
        desc: cap.description,
        status: cap.status,
        variant: 'capability',
      },
    })
  })

  nodes.push({
    id: 'tool-registry',
    type: 'tool',
    label: 'Tool Registry',
    stage: 'tools',
    x: 84,
    y: 74,
    metadata: {
      tools: [
        ...TOOL_CATEGORIES.map(
          (cat) => `${cat.label}: ${cat.tools.slice(0, 4).join(', ')}`
        ),
        `Daily: ${PERSONAL_TOOLS.slice(0, 6).join(', ')}`,
      ].join(' · '),
    },
  })

  nodes.push({
    id: 'mem-cluster',
    type: 'concept',
    label: 'Memory',
    stage: 'memory',
    x: 16,
    y: 78,
    metadata: {
      desc: MEMORY_MODULES.map((mod) => mod.title).join(' · '),
      items: MEMORY_MODULES.flatMap((mod) =>
        mod.items.filter((item) => !item.startsWith('CONTENT_REQUIRED'))
      )
        .slice(0, 6)
        .join(' · '),
      variant: 'memory',
    },
  })

  OUTPUT_ARTIFACT_IDS.forEach((outputId, i) => {
    const output = OUTPUT_TYPES.find((entry) => entry.id === outputId)
    if (!output) return
    nodes.push({
      id: `artifact-${output.id}`,
      type: 'output',
      label: output.title,
      stage: 'outputs',
      x: 22 + i * 24,
      y: 86 + (i % 2) * 1.2,
      metadata: {
        meaning: output.description,
        examples: output.examples
          .filter((ex) => !ex.startsWith('CONTENT_REQUIRED'))
          .slice(0, 3)
          .join(' · '),
        variant: 'artifact',
      },
    })
  })

  RUNTIME_LOOP_STEPS.forEach((step, i) => {
    nodes.push({
      id: `loop-${step.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'concept',
      label: step,
      stage: 'loop',
      x: 8 + i * 14,
      y: 91 + (i % 2) * 0.6,
      metadata: { variant: 'loop' },
    })
  })

  nodes.push({
    id: 'payoff-headline',
    type: 'question',
    label: ARCHITECTURE_FLOW_PAYOFF.headline,
    stage: 'payoff',
    x: 50,
    y: 96,
    metadata: {
      desc: FINAL_STACK.map((layer) => layer.label).join(' · '),
    },
    ports: { top: true, bottom: true },
  })

  nodes.push({
    id: 'payoff-lead',
    type: 'concept',
    label: ARCHITECTURE_FLOW_PAYOFF.lead,
    stage: 'payoff',
    x: 50,
    y: 98,
    metadata: { variant: 'payoff' },
  })

  return nodes
}

/** Nodes accumulate across stages, nothing resets between bands. */
export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  ...ARCHITECTURE_CORE_NODES,
  ...buildExtendedArchitectureNodes(),
]

const ARCHITECTURE_CORE_EDGES: ArchitectureEdge[] = [
  // Automation
  { id: 'e-q-metaverse', from: 'q-automation', to: 'exp-metaverse', relationship: 'taught', revealStage: 0, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-q-omers', from: 'q-automation', to: 'exp-omers', relationship: 'taught', revealStage: 0, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-metaverse-leverage', from: 'exp-metaverse', to: 'out-leverage', relationship: 'unlocked', revealStage: 0, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-omers-leverage', from: 'exp-omers', to: 'out-leverage', relationship: 'unlocked', revealStage: 0, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-leverage-agent0', from: 'out-leverage', to: 'agent-automation', relationship: 'led-to', revealStage: 0, fromPort: 'right', toPort: 'left' },

  // Zero → One
  { id: 'e-agent0-laurel', from: 'agent-automation', to: 'exp-laurel', relationship: 'led-to', revealStage: 1, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-laurel-ambiguity', from: 'exp-laurel', to: 'out-ambiguity', relationship: 'unlocked', revealStage: 1, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-ambiguity-agent1', from: 'out-ambiguity', to: 'agent-zero', relationship: 'led-to', revealStage: 1, fromPort: 'right', toPort: 'left' },

  // Interface
  { id: 'e-agent1-intuit', from: 'agent-zero', to: 'exp-intuit', relationship: 'led-to', revealStage: 2, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-intuit-user', from: 'exp-intuit', to: 'out-user', relationship: 'unlocked', revealStage: 2, fromPort: 'right', toPort: 'left' },
  { id: 'e-user-agent2', from: 'out-user', to: 'agent-interface', relationship: 'led-to', revealStage: 2, fromPort: 'right', toPort: 'left' },

  // System
  { id: 'e-agent2-tesla', from: 'agent-interface', to: 'exp-tesla', relationship: 'led-to', revealStage: 3, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-tesla-deps', from: 'exp-tesla', to: 'out-deps', relationship: 'unlocked', revealStage: 3, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-deps-agent3', from: 'out-deps', to: 'agent-system', relationship: 'led-to', revealStage: 3, fromPort: 'right', toPort: 'left' },

  // Platform
  { id: 'e-agent3-autodesk', from: 'agent-system', to: 'exp-autodesk-eng', relationship: 'led-to', revealStage: 4, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-autodesk-scale', from: 'exp-autodesk-eng', to: 'out-scale', relationship: 'unlocked', revealStage: 4, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-scale-agent4', from: 'out-scale', to: 'agent-platform', relationship: 'led-to', revealStage: 4, fromPort: 'right', toPort: 'left' },

  // Product
  { id: 'e-agent4-pm', from: 'agent-platform', to: 'exp-autodesk-pm', relationship: 'led-to', revealStage: 5, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-pm-direction', from: 'exp-autodesk-pm', to: 'out-direction', relationship: 'unlocked', revealStage: 5, fromPort: 'right', toPort: 'left' },
  { id: 'e-direction-agent5', from: 'out-direction', to: 'agent-product', relationship: 'led-to', revealStage: 5, fromPort: 'bottom', toPort: 'top' },
  { id: 'e-q-product', from: 'q-product', to: 'exp-autodesk-pm', relationship: 'taught', revealStage: 5, fromPort: 'bottom', toPort: 'top' },
]

function buildExtendedArchitectureEdges(): ArchitectureEdge[] {
  return [
    {
      id: 'e-product-zoom',
      from: 'agent-product',
      to: 'q-zoom',
      relationship: 'led-to',
      revealStage: 6,
      fromPort: 'bottom',
      toPort: 'top',
    },
    {
      id: 'e-zoom-jasmine',
      from: 'q-zoom',
      to: 'agent-jasmine',
      relationship: 'led-to',
      revealStage: 7,
      fromPort: 'bottom',
      toPort: 'top',
    },
    {
      id: 'e-jasmine-memory',
      from: 'agent-jasmine',
      to: 'mem-cluster',
      relationship: 'uses',
      revealStage: 9,
      fromPort: 'left',
      toPort: 'right',
    },
    {
      id: 'e-jasmine-products',
      from: 'agent-jasmine',
      to: 'artifact-products',
      relationship: 'led-to',
      revealStage: 10,
      fromPort: 'right',
      toPort: 'left',
    },
    {
      id: 'e-payoff-lead',
      from: 'payoff-headline',
      to: 'payoff-lead',
      relationship: 'led-to',
      revealStage: 12,
      fromPort: 'bottom',
      toPort: 'top',
    },
  ]
}

export const ARCHITECTURE_EDGES: ArchitectureEdge[] = [
  ...ARCHITECTURE_CORE_EDGES,
  ...buildExtendedArchitectureEdges(),
]

export function getArchitectureStageIndex(stageId: ArchitectureStageId): number {
  return ARCHITECTURE_STAGE_ORDER.indexOf(stageId)
}

export function getNodesForStage(stageId: ArchitectureStageId): ArchitectureNode[] {
  return ARCHITECTURE_NODES.filter((node) => node.stage === stageId)
}

export function getStageMeta(stageId: ArchitectureStageId): FlowStageMeta | undefined {
  const abstraction = ABSTRACTION_STAGES.find((stage) => stage.id === stageId)
  if (abstraction) {
    return {
      id: abstraction.id,
      level: abstraction.level,
      label: abstraction.label,
      question: abstraction.question,
    }
  }
  return NARRATIVE_FLOW_STAGES.find((stage) => stage.id === stageId)
}
