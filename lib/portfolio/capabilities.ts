export interface CapabilityModule {
  id: string
  title: string
  description: string
  inputs: string[]
  evidence: string[]
  status: 'ACTIVE' | 'INACTIVE'
}

export const CAPABILITY_MODULES: CapabilityModule[] = [
  {
    id: 'understand',
    title: 'Understand',
    description: 'Find the real problem before deciding what to build.',
    inputs: [
      'user research',
      'requirements',
      'stakeholder conversations',
      'system constraints',
      'data',
    ],
    evidence: ['Autodesk PM', 'ServiceNow', 'Tesla'],
    status: 'ACTIVE',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Turn ambiguity into working software, prototypes, and systems.',
    inputs: ['frontend', 'APIs', 'backend systems', 'prototypes', 'automation'],
    evidence: ['Autodesk SWE', 'Tesla', 'Intuit', 'personal projects'],
    status: 'ACTIVE',
  },
  {
    id: 'connect',
    title: 'Connect',
    description: 'Connect technical systems, user needs, and business context.',
    inputs: ['engineering', 'product', 'design', 'business'],
    evidence: ['Autodesk PM', 'CS + Business degree', 'cross-functional work'],
    status: 'ACTIVE',
  },
  {
    id: 'experiment',
    title: 'Experiment',
    description: 'Build quickly to answer questions instead of debating them.',
    inputs: ['prototyping', 'AI', 'hackathons', 'side projects', 'testing'],
    evidence: ['12+ Autodesk prototypes', 'AI workflows', 'personal projects'],
    status: 'ACTIVE',
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Think beyond the immediate feature toward reliability, reuse, and systems.',
    inputs: [
      'distributed systems',
      'APIs',
      'data infrastructure',
      'caching',
      'platform thinking',
    ],
    evidence: ['Autodesk Libraries', 'Tesla ML tooling'],
    status: 'ACTIVE',
  },
  {
    id: 'decide',
    title: 'Decide',
    description: 'Turn research and constraints into product direction and priorities.',
    inputs: ['strategy', 'roadmap', 'prioritization', 'product judgment'],
    evidence: ['ADP Studio', 'AI-assisted workflows', 'platform product work'],
    status: 'ACTIVE',
  },
]

export function getCapability(id: string): CapabilityModule | undefined {
  return CAPABILITY_MODULES.find((cap) => cap.id === id)
}
