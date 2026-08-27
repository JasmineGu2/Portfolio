import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'

export type CapabilityLayerId =
  | 'product'
  | 'software-engineering'
  | 'business'
  | 'community'

/** One real role behind a layer, what it was, where, and what it was built with. */
export interface CapabilityExperience {
  role: string
  org: string
  focus: string
  stack: string[]
}

export interface CapabilityLayer {
  id: CapabilityLayerId
  label: string
  /** Short tags, used for the sr-only summary and compact copy. */
  capabilities: string[]
  experiences: CapabilityExperience[]
  experienceRefs?: WorkId[]
}

/** Core strengths stack, top to bottom in the hero isometric graphic. */
export const CAPABILITY_LAYERS: CapabilityLayer[] = [
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    capabilities: ['Frontend', 'Backend', 'Systems', 'Infrastructure'],
    experiences: [
      {
        role: 'Frontend',
        org: 'Intuit TurboTax',
        focus: 'B2C onboarding',
        stack: ['React', 'TypeScript', 'REST APIs'],
      },
      {
        role: 'Infra + ML results',
        org: 'Tesla',
        focus: 'Factory software, data viz',
        stack: ['React', 'Python', 'Video infra'],
      },
      {
        role: 'Full-stack',
        org: 'Autodesk Fusion',
        focus: 'Library assets, microservices',
        stack: ['C++', 'Java', 'API integration'],
      },
      {
        role: 'Hackathon dev team lead',
        org: 'Hack Western',
        focus: 'Platform for 400+ hackers',
        stack: ['Next.js', 'TypeScript'],
      },
    ],
    experienceRefs: ['tesla', 'autodesk-eng', 'intuit', 'hack-western'],
  },
  {
    id: 'product',
    label: 'Product',
    capabilities: ['Discovery', 'Prioritization', 'Product Strategy', 'Execution'],
    experiences: [
      {
        role: 'Technical platform PM',
        org: 'Autodesk',
        focus: 'Governed SQL, AI query UX',
        stack: ['User research', 'LLM evaluation', 'MCP'],
      },
      {
        role: 'PM + engineer',
        org: 'LaurelSpace',
        focus: '0→1 ops platform to MVP',
        stack: ['PostgreSQL', 'Stripe API'],
      },
      {
        role: 'Product lead',
        org: 'Hack Western',
        focus: 'Vision + roadmap, 6 engineers',
        stack: ['Roadmapping', 'Design reviews'],
      },
      {
        role: 'Bootcamp lead',
        org: 'IPS Fellowship',
        focus: '10-week product curriculum',
        stack: ['Curriculum design', 'Mentorship'],
      },
    ],
    experienceRefs: ['autodesk', 'stealth-startup', 'hack-western', 'ivey-product'],
  },
  {
    id: 'business',
    label: 'Business',
    capabilities: ['Strategy', 'Markets', 'Operations', 'Incentives'],
    experiences: [
      {
        role: 'Solutions engineer',
        org: 'OMERS',
        focus: 'Enterprise service workflows',
        stack: ['ServiceNow', 'Workflow automation'],
      },
      {
        role: 'Developer + analyst',
        org: 'Metaverse Group',
        focus: 'B2B pipeline, 900+ leads',
        stack: ['Python', 'Selenium', 'Email analytics'],
      },
      {
        role: 'GTM + pricing',
        org: 'LaurelSpace',
        focus: 'Pre-seed positioning',
        stack: ['Market sizing', 'Pricing'],
      },
      {
        role: 'HBA',
        org: 'Ivey',
        focus: 'Strategy, ops, finance',
        stack: ['Strategy', 'Operations'],
      },
    ],
    experienceRefs: ['stealth-startup', 'omers', 'metaverse', 'western'],
  },
  {
    id: 'community',
    label: 'Community',
    capabilities: ['Users', 'Facilitation', 'Storytelling', 'Feedback'],
    experiences: [
      {
        role: 'Product + eng lead',
        org: 'Hack Western',
        focus: '400+ hackers, 6-person team',
        stack: ['Facilitation', 'Team leadership'],
      },
      {
        role: 'Bootcamp lead',
        org: 'IPS Fellowship',
        focus: 'Mentoring first-time PMs',
        stack: ['Workshops', 'Mentorship'],
      },
      {
        role: 'User research',
        org: 'Autodesk',
        focus: 'Interviews with data users',
        stack: ['Interviews', 'Synthesis'],
      },
    ],
    experienceRefs: ['hack-western', 'ivey-product', 'autodesk'],
  },
]

/** Flat list for sr-only accessibility in the hero cell. */
export const CAPABILITY_LAYER_A11Y_SUMMARY = CAPABILITY_LAYERS.flatMap((layer) =>
  layer.experiences.map(
    (experience) =>
      `${layer.label}: ${experience.role} at ${experience.org}: ${experience.focus} (${experience.stack.join(', ')})`
  )
)
