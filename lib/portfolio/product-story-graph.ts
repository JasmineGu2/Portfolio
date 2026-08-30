import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'
import { RESUME_HREF } from '@/lib/portfolio/resume'
import { workExperienceHref } from '@/lib/portfolio/work-experience-content'
import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import {
  STORY_HEADLINE,
  STORY_SUBLINE,
  STORY_ZONES,
} from '@/lib/workflow/story-narrative'

/** Which chronological chain this node belongs to */
export type StoryTrack = 'highlight' | 'shared' | 'engineering' | 'business' | 'merge'

export type ProductStoryNodeKind = 'start' | 'experience' | 'merge' | 'end'

export interface ProductStoryNode {
  id: string
  kind: ProductStoryNodeKind
  track: StoryTrack
  /** Short label above the card (e.g. Build, Translate) */
  typeLabel: string
  company: string
  role: string
  period: string
  /** One-line highlight on the card */
  tag: string
  logo?: string
  logoLetter?: string
  x: number
  y: number
  accent: string
  story: string
  outcome?: string
  href?: string
  links?: { label: string; href: string; external?: boolean }[]
  /** Chronological index for axis labels */
  order: number
}

export interface ProductStoryEdge {
  id: string
  from: string
  to: string
  pill?: string
  track: StoryTrack | 'cross'
  dashed?: boolean
}

export const STORY_NODE_W = 128
export const STORY_NODE_H = 58
export const STORY_TYPE_H = 14

export const PRODUCT_STORY_META = {
  title: 'Product Story',
  headline: STORY_HEADLINE,
  subtitle: STORY_SUBLINE,
  width: 1280,
  height: 460,
  engRailY: 96,
  busRailY: 348,
  bridgeY: 222,
}

const ENG_Y = PRODUCT_STORY_META.engRailY
const BUS_Y = PRODUCT_STORY_META.busRailY
const MID_Y = PRODUCT_STORY_META.bridgeY

function expNode(
  partial: Omit<ProductStoryNode, 'kind'> & { kind?: ProductStoryNodeKind }
): ProductStoryNode {
  return { kind: 'experience', ...partial }
}

/** Chronological left → right. Metaverse sits on the bridge between both chains. */
export const PRODUCT_STORY_NODES: ProductStoryNode[] = [
  {
    id: 'story',
    kind: 'start',
    track: 'highlight',
    typeLabel: 'Highlights',
    company: 'Product Story',
    role: STORY_HEADLINE,
    period: '2022 → 2026',
    tag: STORY_SUBLINE,
    x: 32,
    y: MID_Y,
    accent: '#7c6ee6',
    story: STORY_SUBLINE,
    order: 0,
  },
  {
    id: 'education',
    kind: 'experience',
    track: 'shared',
    typeLabel: 'Foundation',
    company: 'Western / Ivey',
    role: 'CS + Business Dual Degree',
    period: '2022 – 2027',
    tag: 'Code + commercial thinking',
    logoLetter: 'W',
    x: 176,
    y: MID_Y,
    accent: '#ff6d5a',
    story:
      'Dual degree in Computer Science and Business, learning to speak both engineering and business.',
    href: workExperienceHref('western'),
    order: 1,
  },
  expNode({
    id: 'metaverse',
    track: 'shared',
    typeLabel: 'Bridge',
    company: 'Metaverse Group',
    role: 'Developer & Data Analyst',
    period: '2022 – 2023',
    tag: 'Code that moved business',
    logo: COMPANY_LOGOS.metaverse,
    x: 320,
    y: MID_Y,
    accent: '#EC896F',
    story: 'Python outreach automation → 900+ leads. First proof that software drives revenue.',
    outcome: 'Software ↔ business value',
    href: workExperienceHref('metaverse'),
    order: 2,
  }),
  expNode({
    id: 'stealth',
    track: 'engineering',
    typeLabel: 'Build',
    company: 'Stealth Startup',
    role: 'Full-Stack Engineer / PM',
    period: 'Fall 2023',
    tag: 'Zero to one product',
    logoLetter: '?',
    x: 464,
    y: ENG_Y,
    accent: '#fde047',
    story: 'Pre-seed CRM for childcare: auth, PostgreSQL, Django, payments. Full product ownership.',
    outcome: 'Ship end-to-end',
    order: 3,
  }),
  expNode({
    id: 'omers',
    track: 'business',
    typeLabel: 'Translate',
    company: 'OMERS',
    role: 'Solutions Engineer',
    period: 'Summer 2023',
    tag: 'Stakeholders → workflows',
    logo: COMPANY_LOGOS.omers,
    x: 464,
    y: BUS_Y,
    accent: '#a78bfa',
    story: 'ServiceNow intake, notifications, requirements, QA. 60–70% faster enterprise processes.',
    outcome: 'Needs → system requirements',
    href: workExperienceHref('omers'),
    links: [{ label: 'Case study', href: '/omers' }],
    order: 3,
  }),
  expNode({
    id: 'intuit',
    track: 'engineering',
    typeLabel: 'Scale',
    company: 'Intuit',
    role: 'Frontend Engineer Intern',
    period: 'Summer 2024',
    tag: '35% engagement ↑',
    logo: COMPANY_LOGOS.intuit,
    x: 608,
    y: ENG_Y,
    accent: '#2dd4bf',
    story: '10+ React/TS components for TurboTax. Theming + API integrations at product scale.',
    outcome: 'Product engineering',
    href: workExperienceHref('intuit'),
    links: [{ label: 'Case study', href: '/intuit' }],
    order: 4,
  }),
  expNode({
    id: 'ivey',
    track: 'business',
    typeLabel: 'Intelligence',
    company: 'Ivey Research',
    role: 'Data & AI Analyst',
    period: 'Spring 2025',
    tag: '400% less manual work',
    logoLetter: 'I',
    x: 608,
    y: BUS_Y,
    accent: '#38bdf8',
    story: 'AI translation & classification pipelines for research datasets. 30% precision gain.',
    outcome: 'AI as repeatable workflow',
    href: workExperienceHref('ivey-product'),
    order: 4,
  }),
  expNode({
    id: 'tesla',
    track: 'engineering',
    typeLabel: 'Operations',
    company: 'Tesla',
    role: 'Frontend & Infra Engineer',
    period: 'Summer 2025',
    tag: '40% faster insight',
    logo: COMPANY_LOGOS.tesla,
    x: 752,
    y: ENG_Y,
    accent: '#f472b6',
    story: 'Operator-facing ML software: React UI, video infra, bounding boxes for ops teams.',
    outcome: 'Users + ML + operations',
    href: workExperienceHref('tesla'),
    links: [{ label: 'Case study', href: '/tesla' }],
    order: 5,
  }),
  expNode({
    id: 'autodesk-eng',
    track: 'engineering',
    typeLabel: 'Platform',
    company: 'Autodesk',
    role: 'Full-Stack Engineer Intern',
    period: 'Jan – May 2026',
    tag: 'Build the platform',
    logo: COMPANY_LOGOS.autodeskIcon,
    x: 896,
    y: ENG_Y,
    accent: '#60a5fa',
    story: 'Asset library platform across microservices. 40+ Pact tests → 35% fewer regressions.',
    outcome: 'Build it right',
    href: workExperienceHref('autodesk-eng'),
    order: 6,
  }),
  expNode({
    id: 'autodesk-pm',
    track: 'business',
    typeLabel: 'Orchestrate',
    company: 'Autodesk',
    role: 'Platform PM Intern',
    period: 'May 2026 – Present',
    tag: 'Shape the roadmap',
    logo: COMPANY_LOGOS.autodesk,
    x: 896,
    y: BUS_Y,
    accent: '#fb923c',
    story: 'Owned ADP Studio query platform. 60% adoption lift, 3× workspace. AI schema assist roadmap.',
    outcome: 'Shape platform direction',
    href: workExperienceHref('autodesk'),
    order: 6,
  }),
  {
    id: 'platform',
    kind: 'merge',
    track: 'merge',
    typeLabel: 'Converge',
    company: 'Translation',
    role: 'Build it + shape it',
    period: 'Today',
    tag: 'Technical translator across seams',
    x: 1040,
    y: MID_Y,
    accent: '#7c6ee6',
    story:
      'Engineering depth and business translation converge. I orchestrate handoffs between users, product, engineering, and ops.',
    order: 7,
    links: [
      { label: 'Résumé', href: RESUME_HREF, external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jasmine-gu-b2aa65201', external: true },
    ],
  },
]

/** Edges tell the story in chronological order on each rail, merging at Autodesk / platform. */
export const PRODUCT_STORY_EDGES: ProductStoryEdge[] = [
  { id: 'e-story-edu', from: 'story', to: 'education', pill: 'Start', track: 'highlight' },
  { id: 'e-edu-meta', from: 'education', to: 'metaverse', pill: 'Learn', track: 'shared' },
  { id: 'e-meta-stealth', from: 'metaverse', to: 'stealth', pill: 'Build', track: 'engineering' },
  { id: 'e-meta-omers', from: 'metaverse', to: 'omers', pill: 'Translate', track: 'business' },
  { id: 'e-stealth-intuit', from: 'stealth', to: 'intuit', track: 'engineering' },
  { id: 'e-omers-ivey', from: 'omers', to: 'ivey', track: 'business' },
  { id: 'e-intuit-tesla', from: 'intuit', to: 'tesla', pill: 'Scale', track: 'engineering' },
  { id: 'e-ivey-adskpm', from: 'ivey', to: 'autodesk-pm', track: 'business' },
  { id: 'e-tesla-adskeng', from: 'tesla', to: 'autodesk-eng', pill: 'Platform', track: 'engineering' },
  {
    id: 'e-adskeng-adskpm',
    from: 'autodesk-eng',
    to: 'autodesk-pm',
    pill: 'Same company',
    track: 'cross',
    dashed: true,
  },
  { id: 'e-adskeng-platform', from: 'autodesk-eng', to: 'platform', track: 'engineering' },
  { id: 'e-adskpm-platform', from: 'autodesk-pm', to: 'platform', track: 'business' },
]

export const PRODUCT_STORY_EXECUTION_ORDER = [
  'story',
  'education',
  'metaverse',
  'stealth',
  'omers',
  'intuit',
  'ivey',
  'tesla',
  'autodesk-eng',
  'autodesk-pm',
  'platform',
]

export { STORY_ZONES }

export function getProductStoryNode(id: string): ProductStoryNode | undefined {
  return PRODUCT_STORY_NODES.find((n) => n.id === id)
}

export function getStoryNodePort(
  x: number,
  y: number,
  side: 'top' | 'bottom' | 'left' | 'right'
): { x: number; y: number } {
  const boxTop = y + STORY_TYPE_H
  const cx = x + STORY_NODE_W / 2
  const cy = boxTop + STORY_NODE_H / 2
  switch (side) {
    case 'top':
      return { x: cx, y: boxTop }
    case 'bottom':
      return { x: cx, y: boxTop + STORY_NODE_H }
    case 'left':
      return { x: x, y: cy }
    case 'right':
      return { x: x + STORY_NODE_W, y: cy }
  }
}

export const WORK_ID_BY_STORY_NODE: Partial<Record<string, WorkId>> = {
  education: 'western',
  metaverse: 'metaverse',
  stealth: 'hack-western',
  omers: 'omers',
  intuit: 'intuit',
  ivey: 'ivey-product',
  tesla: 'tesla',
  'autodesk-eng': 'autodesk-eng',
  'autodesk-pm': 'autodesk',
}
