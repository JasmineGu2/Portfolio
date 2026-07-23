import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import type { RoleTrack } from '@/lib/portfolio/bento-workflows/layouts'

export type ExperienceTagAccent = 'coral' | 'lavender' | 'supporting'

export interface ExperienceCardTag {
  label: string
  accent: ExperienceTagAccent
}

export interface ExperienceCardContent {
  company: string
  role: string
  roleNote?: string
  subtitle: string
  period: string
  category: string
  track: RoleTrack
  tags: [ExperienceCardTag, ExperienceCardTag, ExperienceCardTag]
  expandedTags: string[]
  description: string
}

export const EXPERIENCE_CARDS: Record<WorkId, ExperienceCardContent> = {
  autodesk: {
    company: 'Autodesk',
    role: 'Technical Platform Product Manager Intern',
    subtitle:
      'Building governed, AI-assisted query experiences for Autodesk’s data platform',
    period: 'May 2026 — Present',
    category: 'Data Products',
    track: 'product',
    tags: [
      { label: 'Product Strategy', accent: 'coral' },
      { label: 'Data Governance', accent: 'coral' },
      { label: 'AI Workflows', accent: 'lavender' },
    ],
    expandedTags: [
      'SQL Experience',
      'User Research',
      'UX Prototyping',
      'LLM Evaluation',
      'MCP',
    ],
    description:
      'Owned product strategy and execution for Autodesk Data Portal Studio, a governed SQL and data-exploration platform. Led query-experience redesigns, AI-assisted workflows, user research, prototyping, and cross-functional alignment across engineering, trust, metadata, and AI teams.',
  },
  'autodesk-eng': {
    company: 'Autodesk',
    role: 'Full-Stack Engineering Intern',
    subtitle: 'Building distributed asset-library services for Autodesk Fusion',
    period: 'Jan — May 2026',
    category: 'Platform Engineering',
    track: 'engineering',
    tags: [
      { label: 'Microservices', accent: 'lavender' },
      { label: 'Java', accent: 'lavender' },
      { label: 'API Reliability', accent: 'lavender' },
    ],
    expandedTags: ['Spring Boot', 'DynamoDB', 'Redis', 'REST APIs', 'Search Infrastructure'],
    description:
      'Built backend-focused features for Autodesk’s Libraries Platform, helping Fusion users and internal teams store, search, organize, and reuse shared design assets. Developed workflows across microservices and improved search, pagination, validation, and API reliability.',
  },
  tesla: {
    company: 'Tesla',
    role: 'Frontend and Infrastructure Engineering Intern',
    subtitle: 'Turning factory-camera inference into actionable operator workflows',
    period: 'Summer 2025',
    category: 'ML Systems',
    track: 'engineering',
    tags: [
      { label: 'ML Visualization', accent: 'lavender' },
      { label: 'React', accent: 'lavender' },
      { label: 'Video Infrastructure', accent: 'lavender' },
    ],
    expandedTags: [
      'Bounding Boxes',
      'Anomaly Detection',
      'TypeScript',
      'Frontend Performance',
      'API Architecture',
    ],
    description:
      'Built operator-facing software for factory ML systems, including labeling, anomaly detection, and threat-visualization workflows. Developed scalable video infrastructure and interactive interfaces for displaying inference results from factory cameras.',
  },
  intuit: {
    company: 'Intuit',
    role: 'Frontend Engineer Intern',
    subtitle: 'Building delightful onboarding experiences for TurboTax.com',
    period: 'Summer 2024',
    category: 'Consumer Fintech',
    track: 'engineering',
    tags: [
      { label: 'Onboarding UX', accent: 'lavender' },
      { label: 'Design Systems', accent: 'lavender' },
      { label: 'React', accent: 'lavender' },
    ],
    expandedTags: ['TypeScript', 'REST APIs', 'UI Animation', 'Component Libraries', 'Theming'],
    description:
      'Developed reusable UI components, animations, tables, and themed experiences for TurboTax USA. Worked within a large-scale component system and integrated frontend experiences with REST APIs.',
  },
  omers: {
    company: 'OMERS',
    role: 'Solutions Engineer, ServiceNow',
    subtitle:
      'Digitizing enterprise workflows and internal service experiences with ServiceNow',
    period: 'Summer 2023',
    category: 'Enterprise Automation',
    track: 'engineering',
    tags: [
      { label: 'ServiceNow', accent: 'lavender' },
      { label: 'Workflow Automation', accent: 'supporting' },
      { label: 'Enterprise Systems', accent: 'supporting' },
    ],
    expandedTags: [
      'Enterprise Systems',
      'UAT',
      'Stakeholder Discovery',
      'Process Design',
      'QA',
    ],
    description:
      'Designed and delivered ServiceNow workflows, intake forms, notifications, and process automations for internal business teams. Conducted requirements analysis, QA, and user-acceptance testing with technical and non-technical stakeholders.',
  },
  metaverse: {
    company: 'Metaverse Group',
    role: 'Developer and Data Analyst Intern',
    subtitle: 'Automating B2B prospecting and improving outreach performance',
    period: '2022 — 2023',
    category: 'Growth Automation',
    track: 'engineering',
    tags: [
      { label: 'Python', accent: 'lavender' },
      { label: 'Growth Automation', accent: 'lavender' },
      { label: 'Data Analysis', accent: 'supporting' },
    ],
    expandedTags: ['Selenium', 'Web Scraping', 'Lead Generation', 'Email Analytics'],
    description:
      'Built a Python and Selenium outreach pipeline that generated more than 900 leads, expanded B2B outreach, reduced email bounce rates, and improved campaign performance.',
  },
  'stealth-startup': {
    company: 'LaurelSpace',
    role: 'Product Manager and Engineer Intern',
    subtitle: 'Taking a childcare operations platform from customer discovery to MVP',
    period: 'Pre-seed',
    category: '0→1 Product',
    track: 'product',
    tags: [
      { label: 'Product Strategy', accent: 'coral' },
      { label: 'Full-Stack Development', accent: 'lavender' },
      { label: 'GTM Strategy', accent: 'coral' },
    ],
    expandedTags: [
      'PostgreSQL',
      'Stripe API',
      'User Research',
      'A/B Testing',
      'Product Roadmapping',
    ],
    description:
      'Led product and engineering for a childcare CRM MVP, shipping payments, email automation, database infrastructure, and administrative workflows. Defined the roadmap, customer personas, MVP capabilities, success metrics, and go-to-market strategy through user research and competitive analysis.',
  },
  'hack-western': {
    company: 'Hack Western',
    role: 'Product and Engineering Lead',
    subtitle: 'Leading a six-person engineering team building the platform experience for 400+ hackers',
    period: '2023 — Present',
    category: 'Product Leadership',
    track: 'education',
    tags: [
      { label: 'Product Vision', accent: 'coral' },
      { label: 'Engineering Leadership', accent: 'supporting' },
      { label: 'Platform Development', accent: 'lavender' },
    ],
    expandedTags: [
      'Full-Stack Engineering',
      'Cross-Functional Leadership',
      'Roadmapping',
      'Developer Experience',
      'Event Technology',
    ],
    description:
      'Designed and developed the full-stack hacker portal supporting more than 400 participants, then progressed into leading a team of six engineers. Own product vision, technical direction, and delivery while collaborating across design, operations, sponsorship, and event leadership.',
  },
  'ivey-product': {
    company: 'IPS Fellowship',
    role: 'Product Bootcamp Lead',
    subtitle: 'Designing and leading a 10-week hands-on product management bootcamp',
    period: '2023 — 2024',
    category: 'Product Education',
    track: 'education',
    tags: [
      { label: 'Curriculum Design', accent: 'supporting' },
      { label: 'Product Building', accent: 'coral' },
      { label: 'Mentorship', accent: 'supporting' },
    ],
    expandedTags: [
      'Product Management',
      'Workshop Facilitation',
      'Community Building',
      'Career Development',
      'Program Leadership',
    ],
    description:
      'Designed and led an intensive 10-week product management bootcamp focused on hands-on learning. Helped participants build side projects, gain practical product experience, learn from product mentors, and connect with peers preparing for their first product role.',
  },
  western: {
    company: 'Western / Ivey',
    role: 'CS + Business Dual Degree',
    subtitle: 'Building technical and product foundations across computer science and business',
    period: '2022 — 2027',
    category: 'Education',
    track: 'education',
    tags: [
      { label: 'Computer Science', accent: 'lavender' },
      { label: 'Business', accent: 'supporting' },
      { label: 'Product Strategy', accent: 'coral' },
    ],
    expandedTags: ['Ivey HBA', 'Software Engineering', 'Operations'],
    description:
      'Dual degree in Computer Science and Business at Western University and Ivey Business School — building the technical and product foundation for everything that followed.',
  },
}

export const CORE_BRAND = {
  purple: '#1A0089',
  coral: '#FF5E32',
  yellow: '#FCF893',
  cream: '#FAF8F4',
  ink: '#1A0089',
} as const

export function experienceTagColor(accent: ExperienceTagAccent): string {
  if (accent === 'coral') return CORE_BRAND.coral
  if (accent === 'lavender') return CORE_BRAND.purple
  return CORE_BRAND.purple
}
