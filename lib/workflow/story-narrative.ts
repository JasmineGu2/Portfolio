import { COMPANY_LOGOS } from './company-logos'
import { RESUME_HREF } from '@/lib/portfolio/resume'

/** Shared career narrative, sourced from resume + Miro board */
export interface StoryStep {
  id: string
  company: string
  role: string
  period: string
  /** Oval / tag line, what you actually did */
  tag: string
  logo?: string
  accent: string
  story: string
  outcome?: string
  /** Longer label shown inside the workflow box (Miro-style) */
  flowLabel?: string
  /** Two-line card: role on top, company · period below */
  flowRole?: string
  flowSubtitle?: string
  links?: { label: string; href: string; external?: boolean }[]
}

export const STORY_HEADLINE = 'My work is translation.'
export const STORY_SUBLINE =
  'I move between users, product, engineering, and operations, turning ambiguous problems into shipped workflows.'

export const STORY_STEPS: StoryStep[] = [
  {
    id: 'education',
    company: 'Western / Ivey',
    role: 'CS + Business Dual Degree',
    period: '2022 – 2027',
    tag: 'Code + commercial thinking',
    flowRole: 'CS + Business Dual Degree',
    flowSubtitle: 'Western / Ivey · 2022 – 2027',
    accent: '#ff6d5a',
    story:
      'Bachelor\'s dual degree in Computer Science and Business at Western University / Ivey Business School. Graduating Spring 2027.',
  },
  {
    id: 'metaverse',
    company: 'Metaverse Group',
    role: 'Developer & Data Analyst',
    period: '2022 – 2023',
    tag: 'B2B marketing · Web3',
    flowRole: 'Developer & Data Analyst',
    flowSubtitle: 'Metaverse Group · 2022 – 2023',
    logo: COMPANY_LOGOS.metaverse,
    accent: '#ff6d5a',
    story:
      'Python + Selenium outreach bot → 900+ leads, 500% outreach increase. First proof that code drives revenue.',
    outcome: 'Software ↔ business value',
  },
  {
    id: 'omers',
    company: 'OMERS',
    role: 'Solutions Engineer (ServiceNow)',
    period: 'Summer 2023',
    tag: 'Enterprise IT · Change mgmt',
    flowRole: 'Solutions Engineer Intern',
    flowSubtitle: 'OMERS · Summer 2023',
    logo: COMPANY_LOGOS.omers,
    accent: '#ff6d5a',
    story:
      'Designed UX and built 8+ automation solutions: intake forms, notifications, process flows. 60–70% faster processes.',
    outcome: 'Stakeholders → system requirements',
    links: [{ label: 'Case study', href: '/omers' }],
  },
  {
    id: 'laurelspace',
    company: 'Stealth Startup',
    role: 'Full-Stack Engineer / PM Intern',
    period: 'Fall 2023',
    tag: 'Pre-seed · Full-stack product',
    flowRole: 'Full-Stack Engineer / PM Intern',
    flowSubtitle: 'Stealth Startup · Fall 2023',
    accent: '#ff6d5a',
    story:
      'Pre-seed stealth startup building a CRM for childcare providers. Auth, PostgreSQL, Django, payments. Full product ownership.',
    outcome: 'Full-stack shipping',
  },
  {
    id: 'intuit',
    company: 'Intuit',
    role: 'Frontend Engineer Intern',
    period: 'Summer 2024',
    tag: 'TurboTax top-of-funnel UX',
    flowRole: 'Software Engineer Intern',
    flowSubtitle: 'Intuit · Summer 2024',
    logo: COMPANY_LOGOS.intuit,
    accent: '#ff6d5a',
    story:
      '10+ React/TS components for TurboTax. Theming across 4 pages + API integrations → 35% engagement lift.',
    outcome: 'Product engineering at scale',
    links: [{ label: 'Case study', href: '/intuit' }],
  },
  {
    id: 'ivey',
    company: 'Ivey Business School',
    role: 'Data & AI Analyst (Research)',
    period: 'Spring 2025',
    tag: 'Multilingual AI pipelines',
    flowRole: 'Data & AI Analyst',
    flowSubtitle: 'Ivey Research · Spring 2025',
    accent: '#ff6d5a',
    story:
      'AI-powered translation & classification for research datasets. 400% less manual work, 30% precision gain.',
    outcome: 'AI as repeatable workflow',
  },
  {
    id: 'tesla',
    company: 'Tesla',
    role: 'Frontend & Infra Engineer',
    period: 'Summer 2025',
    tag: 'ML observability platform',
    flowRole: 'Software Engineer Intern',
    flowSubtitle: 'Tesla · Summer 2025',
    logo: COMPANY_LOGOS.tesla,
    accent: '#ff6d5a',
    story:
      'Operator-facing ML software: React UI, video infra, bounding boxes. ~40% faster time-to-insight for ops teams.',
    outcome: 'Users + ML + operations',
    links: [{ label: 'Case study', href: '/tesla' }],
  },
  {
    id: 'autodesk-eng',
    company: 'Autodesk',
    role: 'Full-Stack Engineering Intern',
    period: 'Jan – May 2026',
    tag: 'Fusion libraries · API testing',
    flowRole: 'Full-Stack Engineer Intern',
    flowSubtitle: 'Autodesk · Jan – May 2026',
    accent: '#ff6d5a',
    story:
      'Asset library platform across microservices. Java/Spring, DynamoDB, Redis. 40+ Pact tests → 35% fewer regressions.',
    outcome: 'Build the platform right',
    logo: COMPANY_LOGOS.autodeskIcon,
  },
  {
    id: 'autodesk-pm',
    company: 'Autodesk',
    role: 'Technical Platform PM Intern',
    period: 'May 2026 – Present',
    tag: 'Data products · AI features',
    flowRole: 'Platform PM Intern',
    flowSubtitle: 'Autodesk · May 2026 – Present',
    accent: '#ff6d5a',
    story:
      'Owned ADP Studio query platform. 40% adoption lift, 3× workspace. Roadmap for AI schema assist, MCP integration.',
    outcome: 'Shape platform direction',
    logo: COMPANY_LOGOS.autodesk,
  },
]

export const STORY_ZONES = [
  {
    id: 'foundation',
    step: 1,
    title: 'Learn the seams',
    subtitle: 'Code + business foundations',
    color: '#7c6ee6',
    nodeIds: ['education', 'metaverse'],
  },
  {
    id: 'translate',
    step: 2,
    title: 'Translate needs',
    subtitle: 'Enterprise & full-stack',
    color: '#4D90D8',
    nodeIds: ['omers', 'laurelspace'],
  },
  {
    id: 'scale',
    step: 3,
    title: 'Scale & intelligence',
    subtitle: 'Product, AI, operations',
    color: '#FFA27C',
    nodeIds: ['intuit', 'ivey', 'tesla'],
  },
  {
    id: 'platform',
    step: 4,
    title: 'Orchestrate platforms',
    subtitle: 'Build it + shape it',
    color: '#0696D7',
    nodeIds: ['autodesk-eng', 'autodesk-pm'],
  },
] as const

export const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:jgu.hba2027@ivey.ca' },
  { label: 'Résumé', href: RESUME_HREF, external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jasminegu', external: true },
]
