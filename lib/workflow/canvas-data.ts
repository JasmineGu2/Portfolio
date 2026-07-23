// ============================================================================
// CAREER STORY — compact single-screen layout · edit here
// ============================================================================

import type { ExecutionState } from './types'
import { COMPANY_LOGOS } from './company-logos'
import { RESUME_HREF } from '@/lib/portfolio/resume'

export type CanvasNodeKind = 'start' | 'experience' | 'hub' | 'end' | 'branch'

export interface CanvasNode {
  id: string
  kind: CanvasNodeKind
  typeLabel: string
  label: string
  role?: string
  /** Short line on canvas (keep under ~42 chars) */
  sublabel: string
  /** Company logo under /public (omit for trigger / monogram fallback) */
  logo?: string
  x: number
  y: number
  accent: string
  year?: string
  story?: string
  outcome?: string
  unlocked?: string
  links?: { label: string; href: string; external?: boolean }[]
}

export interface CanvasEdge {
  id: string
  from: string
  to: string
  pill?: string
  dashed?: boolean
}

export const NODE_BOX = 52
export const NODE_TYPE_H = 10
export const NODE_LABEL_H = 28

/** Logical canvas — scaled to fit viewport */
export const CANVAS_META = {
  title: 'My work is translation.',
  subtitle: 'Users → product → engineering → operations',
  width: 1040,
  height: 340,
}

/**
 * LEFT → RIGHT narrative
 * Metaverse opens · fork enterprise vs full-stack · converge Intuit
 * · fork AI vs ops/ML · fork build vs shape platform · Jasmine · contact
 */
export const CANVAS_NODES: CanvasNode[] = [
  {
    id: 'start',
    kind: 'start',
    typeLabel: 'Trigger',
    label: 'Translation',
    sublabel: 'Ambiguous problem in',
    x: 16,
    y: 128,
    accent: '#22c55e',
    story:
      'I connect users, products, and technical systems—most useful where product, engineering, and operations collide.',
  },
  {
    id: 'metaverse',
    kind: 'experience',
    typeLabel: 'Build',
    label: 'Metaverse',
    role: 'Data Analyst & Engineer',
    sublabel: 'Code that moved business',
    logo: COMPANY_LOGOS.metaverse,
    x: 120,
    y: 128,
    accent: '#EC896F',
    year: '2023',
    story: 'Python outreach automation → 900+ leads. First proof that software drives revenue.',
    outcome: 'Stronger outreach and campaign performance',
    unlocked: 'Software ↔ business value',
  },
  {
    id: 'omers',
    kind: 'experience',
    typeLabel: 'Translate',
    label: 'OMERS',
    role: 'Solutions Architect',
    sublabel: 'Stakeholders → workflows',
    logo: COMPANY_LOGOS.omers,
    x: 248,
    y: 48,
    accent: '#E3B78F',
    year: '2023',
    story: 'ServiceNow intake, notifications, requirements, QA. Enterprise translation.',
    outcome: '60–70% faster internal processes',
    unlocked: 'Needs → system requirements',
    links: [{ label: 'Case study', href: '/omers' }],
  },
  {
    id: 'laurelspace',
    kind: 'experience',
    typeLabel: 'Ship',
    label: 'Stealth',
    role: 'Full-Stack / PM Intern',
    sublabel: 'Pre-seed · multiple hats',
    x: 248,
    y: 208,
    accent: '#4D90D8',
    year: '2023',
    story: 'Pre-seed stealth startup — Django, PostgreSQL, payments, CRM. End-to-end product in production.',
    outcome: 'Operational product shipped',
    unlocked: 'Full-stack ownership',
  },
  {
    id: 'intuit',
    kind: 'experience',
    typeLabel: 'Scale',
    label: 'Intuit',
    role: 'Software Engineer',
    sublabel: 'Product engineering at scale',
    logo: COMPANY_LOGOS.intuit,
    x: 376,
    y: 128,
    accent: '#FFA27C',
    year: '2024',
    story: 'TurboTax components, APIs, testing. Shadowed PMs on experiments and growth.',
    outcome: 'Clearer tax experience for millions',
    unlocked: 'Product decisions at scale',
    links: [{ label: 'Case study', href: '/intuit' }],
  },
  {
    id: 'ivey',
    kind: 'branch',
    typeLabel: 'AI',
    label: 'Ivey',
    role: 'ML Research',
    sublabel: 'LLM pipelines',
    x: 504,
    y: 48,
    accent: '#7c6ee6',
    year: '2025',
    story: 'Multilingual classification and translation pipelines with LLMs.',
    outcome: 'Less manual research work',
    unlocked: 'AI as repeatable workflow',
  },
  {
    id: 'tesla',
    kind: 'experience',
    typeLabel: 'Operate',
    label: 'Tesla',
    role: 'Software Engineer',
    sublabel: 'ML data → operators',
    logo: COMPANY_LOGOS.tesla,
    x: 504,
    y: 208,
    accent: '#4D90D8',
    year: '2025',
    story: 'Factory camera ML, video infra, dashboards for Safety teams.',
    outcome: 'Faster operator decisions',
    unlocked: 'Users + ML + operations',
    links: [{ label: 'Case study', href: '/tesla' }],
  },
  {
    id: 'autodesk-eng',
    kind: 'branch',
    typeLabel: 'Platform',
    label: 'ADSK Eng',
    role: 'Fusion Libraries',
    sublabel: 'Build it right',
    logo: COMPANY_LOGOS.autodeskIcon,
    x: 632,
    y: 48,
    accent: '#4D90D8',
    year: '2026',
    story: 'C++ services, contract testing, distributed integration.',
    outcome: 'Safer cross-platform APIs',
    unlocked: 'Technical platform depth',
  },
  {
    id: 'autodesk-pm',
    kind: 'branch',
    typeLabel: 'Platform',
    label: 'ADSK PM',
    role: 'Data Products',
    sublabel: 'Shape direction',
    logo: COMPANY_LOGOS.autodesk,
    x: 632,
    y: 208,
    accent: '#FFA27C',
    year: '2026',
    story: 'Platform strategy: pipelines, governance, security, AI capabilities.',
    outcome: 'Clearer platform roadmap',
    unlocked: 'Product ↔ engineering bridge',
  },
  {
    id: 'jasmine',
    kind: 'hub',
    typeLabel: 'Orchestrate',
    label: 'Jasmine Gu',
    role: 'Technical translator',
    sublabel: 'Across every seam',
    logo: COMPANY_LOGOS.jasmine,
    x: 760,
    y: 128,
    accent: '#7c6ee6',
    story: 'CS + Business. I orchestrate handoffs between users, product, engineering, and ops.',
  },
  {
    id: 'contact',
    kind: 'end',
    typeLabel: 'Output',
    label: 'Connect',
    sublabel: 'Start a workflow',
    logo: COMPANY_LOGOS.linkedin,
    x: 872,
    y: 128,
    accent: '#ef4444',
    links: [
      { label: 'Email', href: 'mailto:jasmine@example.com' },
      { label: 'Résumé', href: RESUME_HREF, external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/jasminegu', external: true },
    ],
  },
]

export const CANVAS_EDGES: CanvasEdge[] = [
  { id: 'e1', from: 'start', to: 'metaverse', pill: 'Begin' },
  { id: 'e2', from: 'metaverse', to: 'omers', pill: 'Enterprise' },
  { id: 'e3', from: 'metaverse', to: 'laurelspace', pill: 'Stealth' },
  { id: 'e4', from: 'omers', to: 'intuit', pill: 'Scale up' },
  { id: 'e5', from: 'laurelspace', to: 'intuit' },
  { id: 'e6', from: 'intuit', to: 'ivey', pill: 'AI', dashed: true },
  { id: 'e7', from: 'intuit', to: 'tesla', pill: 'Ops + ML' },
  { id: 'e8', from: 'ivey', to: 'tesla', dashed: true },
  { id: 'e9', from: 'tesla', to: 'autodesk-eng', pill: 'Build' },
  { id: 'e10', from: 'tesla', to: 'autodesk-pm', pill: 'Shape' },
  { id: 'e11', from: 'autodesk-eng', to: 'jasmine' },
  { id: 'e12', from: 'autodesk-pm', to: 'jasmine' },
  { id: 'e13', from: 'jasmine', to: 'contact', pill: 'Next' },
]

export const CANVAS_EXECUTION_ORDER = [
  'start',
  'metaverse',
  'omers',
  'laurelspace',
  'intuit',
  'ivey',
  'tesla',
  'autodesk-eng',
  'autodesk-pm',
  'jasmine',
  'contact',
]

export const EXECUTION_LABELS: Record<string, string> = {
  start: 'Trigger…',
  metaverse: 'Metaverse',
  omers: 'OMERS',
  laurelspace: 'Stealth',
  intuit: 'Intuit',
  ivey: 'Ivey AI',
  tesla: 'Tesla',
  'autodesk-eng': 'Autodesk Eng',
  'autodesk-pm': 'Autodesk PM',
  jasmine: 'Orchestrate',
  contact: 'Done',
}

export function getCanvasNode(id: string): CanvasNode | undefined {
  return CANVAS_NODES.find((n) => n.id === id)
}

export function getNodePort(
  x: number,
  y: number,
  side: 'top' | 'bottom' | 'left' | 'right'
): { x: number; y: number } {
  const boxTop = y + NODE_TYPE_H
  const cx = x + NODE_BOX / 2
  const cy = boxTop + NODE_BOX / 2
  switch (side) {
    case 'top':
      return { x: cx, y: boxTop }
    case 'bottom':
      return { x: cx, y: boxTop + NODE_BOX }
    case 'left':
      return { x: x, y: cy }
    case 'right':
      return { x: x + NODE_BOX, y: cy }
  }
}

export type { ExecutionState }
