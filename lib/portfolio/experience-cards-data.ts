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
    period: 'May 2026 to present',
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
      'Owned product strategy and execution for Autodesk Data Portal Studio, a governed SQL and data-exploration platform. Led query-experience redesigns and AI-assisted workflows, ran user research and prototyping, and kept the engineering, trust, metadata, and AI teams aligned.',
  },
  'autodesk-eng': {
    company: 'Autodesk',
    role: 'Full-Stack Engineering Intern',
    subtitle: 'Building distributed asset-library services for Autodesk Fusion',
    period: 'Jan to May 2026',
    category: 'Platform Engineering',
    track: 'engineering',
    tags: [
      { label: 'Microservices', accent: 'lavender' },
      { label: 'Java', accent: 'lavender' },
      { label: 'API Reliability', accent: 'lavender' },
    ],
    expandedTags: ['Spring Boot', 'DynamoDB', 'Redis', 'REST APIs', 'Search Infrastructure'],
    description:
      'Built backend features for Autodesk’s Libraries Platform, where Fusion users and internal teams store, search, organize, and reuse shared design assets. Developed workflows across microservices and improved search, pagination, validation, and API reliability.',
  },
  tesla: {
    company: 'Tesla',
    role: 'Frontend and Infrastructure Engineering Intern',
    subtitle: 'Turning factory-camera inference into workflows operators can act on',
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
      'Built operator-facing software for factory ML systems, including labeling, anomaly detection, and threat-visualization workflows. Also built scalable video infrastructure and interactive interfaces that show inference results from factory cameras.',
  },
  intuit: {
    company: 'Intuit',
    role: 'Frontend Engineer Intern',
    subtitle: 'Building onboarding experiences for TurboTax.com',
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
      'Built reusable UI components, animations, tables, and themed experiences for TurboTax USA. Worked within a large component system and integrated the frontend with REST APIs.',
  },
  omers: {
    company: 'OMERS',
    role: 'Solutions Engineer, ServiceNow',
    subtitle:
      'Digitizing enterprise workflows and internal services with ServiceNow',
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
      'Designed and delivered ServiceNow workflows, intake forms, notifications, and process automations for internal business teams. Ran requirements analysis, QA, and user acceptance testing with technical and non-technical stakeholders.',
  },
  metaverse: {
    company: 'Metaverse Group',
    role: 'Developer and Data Analyst Intern',
    subtitle: 'Automating B2B prospecting and improving outreach performance',
    period: '2022 to 2023',
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
      'Led product and engineering for a childcare CRM MVP and shipped payments, email automation, database infrastructure, and administrative workflows. Defined the roadmap, customer personas, MVP capabilities, success metrics, and go-to-market strategy through user research and competitive analysis.',
  },
  'hack-western': {
    company: 'Hack Western',
    role: 'Product and Engineering Lead',
    subtitle: 'Leading an 8-person dev team behind Hack Western, serving 300+ students',
    period: '2023 to present',
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
      'Designed and developed the full-stack hacker portal for 300+ students, then moved into leading a dev team of 8. Own product vision, technical direction, and delivery, working with design, operations, sponsorship, and event leadership.',
  },
  'ivey-product': {
    company: 'IPS Fellowship',
    role: 'Product Fellowship Lead',
    subtitle: 'Led the Product Fellowship for 2 years and hosted 28 product educationals',
    period: '2 years',
    category: 'Product Education',
    track: 'education',
    tags: [
      { label: 'Program Leadership', accent: 'supporting' },
      { label: 'Product Management', accent: 'coral' },
      { label: 'Mentorship', accent: 'supporting' },
    ],
    expandedTags: ['Workshop Facilitation', 'Community Building', 'Career Development'],
    description:
      'Led my school’s Product Fellowship for 2 years. Hosted 28 product educationals and helped students develop PM skills.',
  },
  western: {
    company: 'Western / Ivey',
    role: 'CS + Business Dual Degree',
    subtitle: 'Studying computer science and business side by side',
    period: '2022 to 2027',
    category: 'Education',
    track: 'education',
    tags: [
      { label: 'Computer Science', accent: 'lavender' },
      { label: 'Business', accent: 'supporting' },
      { label: 'Product Strategy', accent: 'coral' },
    ],
    expandedTags: ['Ivey HBA', 'Software Engineering', 'Operations'],
    description:
      'Dual degree in Computer Science and Business at Western University and Ivey Business School.',
  },
}

export const CORE_BRAND = {
  gold: '#E8C547',
  goldDeep: '#C9A020',
  goldSoft: '#F5E6A8',
  cream: '#FAF8F4',
  ink: '#1A1410',
} as const

export function experienceTagColor(accent: ExperienceTagAccent): string {
  if (accent === 'supporting') return CORE_BRAND.ink
  return CORE_BRAND.gold
}
