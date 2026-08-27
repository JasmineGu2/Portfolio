// ============================================================================
// WORKFLOW DATA, Edit all portfolio content here
// ============================================================================

import type {
  WorkflowNodeData,
  WorkflowEdge,
  SwitchBranch,
  ExperienceExecution,
  ProjectExecution,
  SkillGroup,
  AutodeskBranch,
} from './types'

// --- Hero copy (edit in HeroSection or here) ---
export const HERO_COPY = {
  headline: 'My work is translation.',
  subheadline:
    'I build at the boundary between users, products, and technical systems.',
  supporting:
    'I am most useful where product, engineering, and operations collide. I turn ambiguous real-world problems into workflows, products, and reliable technical systems.',
  primaryCta: 'Run workflow',
  secondaryCta: 'View experience',
}

// --- Main workflow nodes ---
export const MAIN_WORKFLOW_NODES: WorkflowNodeData[] = [
  {
    id: 'trigger',
    type: 'trigger',
    categoryLabel: 'Webhook / Trigger',
    title: 'New problem received',
    description:
      'Ambiguous requirements. Real users. Business constraints. Technical complexity.',
    inputTags: [
      'user need',
      'operational friction',
      'business goal',
      'technical constraint',
    ],
    color: 'coral',
    icon: 'zap',
    details: {
      input: 'An ambiguous real-world problem with competing constraints.',
      process: 'Receive and frame the problem for the multi-agent system.',
      output: 'Problem queued for contextual analysis.',
      translation: 'Raw ambiguity → structured problem intake.',
      unlocked: 'Shared starting point for all agents.',
      tools: ['Stakeholder intake', 'Problem framing', 'Constraint mapping'],
    },
  },
  {
    id: 'context',
    type: 'agent',
    agentType: 'context',
    categoryLabel: 'Agent',
    title: 'Context Agent',
    subtitle: 'Understands the environment before proposing a solution.',
    description:
      'I begin by understanding why the system exists, who depends on it, and where the friction actually lives.',
    input: 'Ambiguous problem',
    output: 'Shared problem definition',
    responsibilities: [
      'learn the business context',
      'identify constraints',
      'understand the domain',
      'surface hidden dependencies',
      'define the real problem',
    ],
    experienceRefs: ['Metaverse Group', 'OMERS', 'Ivey Business School'],
    color: 'coral',
    icon: 'compass',
    details: {
      input: 'Ambiguous problem with unclear scope and hidden dependencies.',
      process:
        'Map business context, constraints, domain knowledge, and the real problem definition.',
      output: 'Shared problem definition the whole team can align on.',
      translation: 'Business ambiguity → shared problem definition.',
      unlocked: 'Foundation for user-centered and product decisions.',
      tools: ['Domain research', 'Stakeholder interviews', 'Constraint analysis'],
    },
  },
  {
    id: 'user',
    type: 'agent',
    agentType: 'user',
    categoryLabel: 'Agent',
    title: 'User Agent',
    subtitle: 'Represents the people who must use the system.',
    description:
      'I translate real user behavior into product requirements, interfaces, and workflows.',
    input: 'Shared problem definition',
    output: 'User-centered workflow',
    responsibilities: [
      'map user journeys',
      'identify pain points',
      'understand workflows',
      'reduce cognitive load',
      'make technical outputs usable',
    ],
    experienceRefs: ['OMERS', 'Intuit', 'Tesla', 'LaurelSpace'],
    color: 'peach',
    icon: 'users',
    details: {
      input: 'Shared problem definition grounded in business context.',
      process:
        'Map journeys, identify pain points, and design workflows that reduce cognitive load.',
      output: 'User-centered workflow with clear requirements.',
      translation: 'Problem definition → human-centered workflow.',
      unlocked: 'Product priorities grounded in real user behavior.',
      tools: ['Journey mapping', 'Usability review', 'Workflow design'],
    },
  },
  {
    id: 'product',
    type: 'agent',
    agentType: 'product',
    categoryLabel: 'Agent',
    title: 'Product Agent',
    subtitle:
      'Turns ambiguity into priorities, requirements, and a clear path forward.',
    description:
      'I turn broad needs into a product model that teams can build, test, and improve.',
    input: 'User-centered workflow',
    output: 'Product plan and system requirements',
    responsibilities: [
      'define product outcomes',
      'structure requirements',
      'prioritize scope',
      'align stakeholders',
      'connect user value to system capabilities',
      'shape platform direction',
    ],
    experienceRefs: [
      'OMERS',
      'Intuit',
      'Tesla',
      'Autodesk Platform Product Management',
    ],
    color: 'peach',
    icon: 'layout',
    details: {
      input: 'User-centered workflow with validated needs.',
      process:
        'Define outcomes, structure requirements, prioritize scope, and align stakeholders.',
      output: 'Product plan and system requirements ready for engineering.',
      translation: 'User needs → product decisions and system requirements.',
      unlocked: 'Clear build path with aligned stakeholder expectations.',
      tools: ['Requirements writing', 'Prioritization', 'Stakeholder alignment'],
    },
  },
  {
    id: 'engineering',
    type: 'agent',
    agentType: 'engineering',
    categoryLabel: 'Agent',
    title: 'Engineering Agent',
    subtitle:
      'Builds the system across frontend, backend, APIs, data, and infrastructure.',
    description:
      'I build the technical system behind the workflow, not just the interface in front of it.',
    input: 'Product plan and system requirements',
    output: 'Working product and technical system',
    responsibilities: [
      'frontend systems',
      'backend services',
      'APIs',
      'databases',
      'distributed systems',
      'testing',
      'performance',
      'security',
      'reliability',
    ],
    experienceRefs: [
      'LaurelSpace',
      'Intuit',
      'Tesla',
      'Autodesk Full-Stack Engineering',
    ],
    color: 'blue',
    icon: 'code',
    details: {
      input: 'Product plan and system requirements.',
      process:
        'Build across frontend, backend, APIs, data, and infrastructure with testing and reliability.',
      output: 'Working product and technical system.',
      translation: 'Product intent → technical architecture and working software.',
      unlocked: 'Deployable system ready for operational integration.',
      tools: ['React', 'TypeScript', 'Python', 'C++', 'PostgreSQL', 'REST APIs'],
    },
  },
  {
    id: 'operations',
    type: 'agent',
    agentType: 'operations',
    categoryLabel: 'Agent',
    title: 'Operations Agent',
    subtitle: 'Connects the system to the environment where it must actually work.',
    description:
      'I make sure the product works in context, not just in isolation.',
    input: 'Working product and technical system',
    output: 'Operationally useful system',
    responsibilities: [
      'production workflows',
      'stakeholder coordination',
      'rollout and adoption',
      'monitoring',
      'governance',
      'operational decision-making',
      'real-world constraints',
      'cross-team execution',
    ],
    experienceRefs: [
      'OMERS',
      'Tesla',
      'Autodesk Data Products',
      'Metaverse Group',
    ],
    color: 'sand',
    icon: 'settings',
    details: {
      input: 'Working product and technical system.',
      process:
        'Connect to production workflows, coordinate rollout, monitor, and govern adoption.',
      output: 'Operationally useful system that works in real context.',
      translation: 'Working software → operational value.',
      unlocked: 'System that delivers measurable outcomes in production.',
      tools: ['Rollout planning', 'Monitoring', 'Cross-team coordination'],
    },
  },
  {
    id: 'switch',
    type: 'switch',
    categoryLabel: 'Switch / Router',
    title: 'What does the system need next?',
    description: 'Route the problem based on what the system needs next.',
    color: 'sand',
    icon: 'git-branch',
  },
  {
    id: 'merge',
    type: 'merge',
    categoryLabel: 'Merge',
    title: 'Merge perspectives',
    description:
      'The strongest solutions do not come from optimizing one layer. They come from understanding how every layer affects the others.',
    body: 'user understanding · product judgment · technical execution · operational awareness · intelligence · reliability · cross-functional alignment',
    input: 'Multiple specialization paths',
    output: 'End-to-end systems perspective',
    color: 'sand',
    icon: 'merge',
    details: {
      input:
        'Outputs from experience, intelligence, reliability, and delivery paths.',
      process: 'Synthesize perspectives across all specialization layers.',
      output: 'End-to-end systems perspective.',
      translation: 'Specialized outputs → unified systems view.',
      unlocked: 'Holistic solution ready for orchestration.',
      tools: ['Systems thinking', 'Tradeoff analysis', 'Cross-layer synthesis'],
    },
  },
  {
    id: 'orchestrator',
    type: 'orchestrator',
    categoryLabel: 'Orchestrator',
    title: 'Systems Orchestrator',
    subtitle: 'Product-minded engineer and technical translator',
    description: 'Jasmine Gu',
    body: 'I connect the agents. I understand the user. I structure the product. I build the technical system. I align the people around it. I make the workflow useful, scalable, and reliable.',
    coreStatement: 'My work is translation.',
    supportingStatement:
      'I am most useful where product, engineering, and operations collide.',
    connectedLabels: ['Users', 'Products', 'Technical Systems', 'Operations'],
    color: 'blue',
    icon: 'orchestrator',
    details: {
      input: 'End-to-end systems perspective from merged agents.',
      process:
        'Orchestrate handoffs, dependencies, and tradeoffs between every function.',
      output: 'Coherent system that works for users and teams.',
      translation: 'Disconnected functions → orchestrated workflow.',
      unlocked: 'Reliable outcomes across the full stack.',
      tools: [
        'Cross-functional leadership',
        'Technical translation',
        'Systems orchestration',
      ],
    },
  },
  {
    id: 'output',
    type: 'output',
    categoryLabel: 'Output / Response',
    title: 'Workflow completed',
    description: 'A product people can use and a system teams can trust.',
    color: 'coral',
    icon: 'check-circle',
    secondaryOutputs: [
      'ambiguity translated into action',
      'user needs translated into workflows',
      'product intent translated into systems',
      'technical complexity translated into shared understanding',
      'operational problems translated into measurable outcomes',
    ],
    targetRoles: [
      'Forward Deployed Engineer',
      'Technical Product Manager',
      'Platform Product Manager',
      'Product-Minded Software Engineer',
    ],
    finalLine: 'I work best across the seams.',
    buttons: [
      { label: 'View résumé', href: '#execution-history' },
      { label: 'View selected work', href: '#selected-projects' },
      { label: 'Contact me', href: '#contact' },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/jasminegu',
        external: true,
      },
    ],
    details: {
      input: 'Orchestrated multi-agent workflow.',
      process: 'Deliver usable product and trustworthy system.',
      output: 'A product people can use and a system teams can trust.',
      translation: 'Complexity → clarity, action, and reliability.',
      unlocked: 'Capability to tackle the next ambiguous problem.',
      tools: ['End-to-end delivery', 'Cross-functional alignment'],
    },
  },
]

// --- Main workflow edges (connector labels) ---
export const MAIN_WORKFLOW_EDGES: WorkflowEdge[] = [
  {
    id: 'e-trigger-context',
    from: 'trigger',
    to: 'context',
    label: 'Start by understanding the system.',
  },
  {
    id: 'e-context-user',
    from: 'context',
    to: 'user',
    label: 'Translate context into human needs.',
  },
  {
    id: 'e-user-product',
    from: 'user',
    to: 'product',
    label: 'Translate user needs into product decisions.',
  },
  {
    id: 'e-product-engineering',
    from: 'product',
    to: 'engineering',
    label: 'Translate product intent into technical architecture.',
  },
  {
    id: 'e-engineering-operations',
    from: 'engineering',
    to: 'operations',
    label: 'Translate working software into operational value.',
  },
  {
    id: 'e-operations-switch',
    from: 'operations',
    to: 'switch',
    label: 'Route the problem based on what the system needs next.',
  },
  {
    id: 'e-merge-orchestrator',
    from: 'merge',
    to: 'orchestrator',
    label: 'Orchestrate the whole workflow.',
  },
  {
    id: 'e-orchestrator-output',
    from: 'orchestrator',
    to: 'output',
    label: 'Return useful outcome.',
  },
]

// --- Switch branches ---
export const SWITCH_BRANCHES: SwitchBranch[] = [
  {
    id: 'experience',
    agentType: 'experience',
    title: 'Experience Agent',
    focus: [
      'interface clarity',
      'design systems',
      'onboarding',
      'usability',
      'engagement',
      'accessibility',
    ],
    experienceRefs: ['Intuit', 'Tesla', 'OMERS'],
    output: 'A product people can understand and adopt',
    color: 'peach',
  },
  {
    id: 'intelligence',
    agentType: 'intelligence',
    title: 'Intelligence Agent',
    focus: [
      'data pipelines',
      'LLM workflows',
      'classification',
      'translation',
      'ML outputs',
      'visualizations',
      'decision support',
    ],
    experienceRefs: ['Ivey AI Research', 'Tesla', 'Autodesk Data Products'],
    output: 'Data transformed into useful decisions',
    color: 'powder',
  },
  {
    id: 'reliability',
    agentType: 'reliability',
    title: 'Reliability Agent',
    focus: [
      'service contracts',
      'distributed systems',
      'testing',
      'platform architecture',
      'integration safety',
      'scalability',
      'security',
    ],
    experienceRefs: [
      'Autodesk Fusion Libraries and Asset Platform',
      'Tesla',
    ],
    output: 'A system teams can trust',
    color: 'blue',
  },
  {
    id: 'delivery',
    agentType: 'delivery',
    title: 'Delivery Agent',
    focus: [
      'stakeholder communication',
      'technical specifications',
      'design reviews',
      'agile delivery',
      'prioritization',
      'cross-team coordination',
      'product and engineering alignment',
    ],
    experienceRefs: ['OMERS', 'Tesla', 'Autodesk Platform Product Management'],
    output: 'A team aligned around execution',
    color: 'sand',
  },
]

// --- Execution sequence for animation ---
export const EXECUTION_SEQUENCE: string[] = [
  'trigger',
  'context',
  'user',
  'product',
  'engineering',
  'operations',
  'switch',
  'experience',
  'intelligence',
  'reliability',
  'delivery',
  'merge',
  'orchestrator',
  'output',
]

// --- Experience executions ---
export const EXPERIENCE_EXECUTIONS: ExperienceExecution[] = [
  {
    id: 'metaverse',
    company: 'Metaverse Group',
    problemReceived: 'Manual and inefficient B2B outreach.',
    agentsActivated: ['context', 'operations', 'engineering'],
    workflowBuilt:
      'Python and Selenium automation for lead generation and outreach.',
    resultProduced:
      'Hundreds of leads, improved outreach capacity, stronger campaign performance.',
    capabilityUnlocked:
      'Understanding how software connects directly to business value.',
  },
  {
    id: 'omers',
    company: 'OMERS',
    problemReceived:
      'Complex enterprise workflows and nontechnical stakeholder needs.',
    agentsActivated: ['context', 'user', 'product', 'delivery'],
    workflowBuilt:
      'ServiceNow intake forms, notifications, process flows, requirements sessions, QA, and UAT.',
    resultProduced: 'More efficient and usable enterprise workflows.',
    capabilityUnlocked:
      'Translating stakeholder needs into product and system requirements.',
  },
  {
    id: 'laurelspace',
    company: 'LaurelSpace',
    problemReceived: 'Administrative complexity for childcare providers.',
    agentsActivated: ['user', 'product', 'engineering', 'operations'],
    workflowBuilt:
      'Authentication, PostgreSQL, Django, APIs, payments, email automation, and CRM functionality.',
    resultProduced: 'An end-to-end operational product.',
    capabilityUnlocked:
      'Full-stack ownership across complete product workflows.',
  },
  {
    id: 'intuit',
    company: 'Intuit',
    problemReceived:
      'Complex tax workflows that needed to feel clear and intuitive.',
    agentsActivated: ['user', 'product', 'experience', 'engineering'],
    workflowBuilt:
      'Reusable React and TypeScript components, API integrations, theming, testing, and performance improvements.',
    resultProduced:
      'A more consistent, engaging, and reliable TurboTax experience.',
    capabilityUnlocked: 'Product engineering and user experience at scale.',
  },
  {
    id: 'ivey',
    company: 'Ivey AI Research',
    problemReceived: 'Manual multilingual data translation and classification.',
    agentsActivated: ['context', 'intelligence', 'engineering'],
    workflowBuilt:
      'Python data pipelines integrating LLM outputs, prompt systems, classification, and translation.',
    resultProduced: 'Reduced manual work and improved model precision.',
    capabilityUnlocked: 'Turning AI capabilities into repeatable workflows.',
  },
  {
    id: 'tesla',
    company: 'Tesla',
    problemReceived:
      'Factory camera and ML inference data that operators could not easily use.',
    agentsActivated: [
      'user',
      'product',
      'engineering',
      'intelligence',
      'operations',
      'delivery',
    ],
    workflowBuilt:
      'React interfaces, video infrastructure, APIs, visualizations, ML workflows, testing, security safeguards, and cross-team delivery.',
    resultProduced:
      'Faster time-to-insight and more usable operational intelligence.',
    capabilityUnlocked:
      'Building at the intersection of users, ML systems, infrastructure, and real-world operations.',
  },
  {
    id: 'autodesk-eng',
    company: 'Autodesk Engineering',
    problemReceived:
      'Distributed services needed more reliable cross-platform communication.',
    agentsActivated: ['engineering', 'reliability', 'product'],
    role: 'Full-Stack Engineer Intern',
    area: 'Fusion Libraries and Asset Platform',
    workflowBuilt:
      'C++ service integration and contract testing across distributed systems.',
    resultProduced:
      'Stronger API reliability and fewer integration failures.',
    capabilityUnlocked:
      'Understanding the technical foundations beneath platform products.',
  },
  {
    id: 'autodesk-pm',
    company: 'Autodesk Product Management',
    problemReceived:
      'Complex data products required clear direction across pipelines, governance, security, and AI-enabled capabilities.',
    agentsActivated: [
      'product',
      'operations',
      'delivery',
      'intelligence',
      'reliability',
    ],
    role: 'Platform Product Manager Intern',
    area: 'Data Products',
    workflowBuilt:
      'Platform product strategy, stakeholder alignment, data workflow definition, governance, security, and AI capability planning.',
    resultProduced:
      'A clearer path between platform capabilities, engineering execution, and product value.',
    capabilityUnlocked:
      'Operating on both sides of a platform: shaping what should be built and understanding how it is built.',
  },
]

// --- Selected project executions ---
export const PROJECT_EXECUTIONS: ProjectExecution[] = [
  {
    id: 'tesla-factory',
    title: 'Turning factory camera data into operational insight',
    input: 'Raw video and ML inference data',
    agents: ['intelligence', 'engineering', 'user', 'operations'],
    output: 'Faster operator decisions',
  },
  {
    id: 'autodesk-services',
    title: 'Strengthening communication across distributed services',
    input: 'Fragile service integrations',
    agents: ['engineering', 'reliability'],
    output: 'Safer cross-platform communication',
  },
  {
    id: 'ivey-ai',
    title: 'Automating multilingual research workflows',
    input: 'Manual classification and translation',
    agents: ['intelligence', 'engineering'],
    output: 'Repeatable AI-assisted data workflows',
  },
  {
    id: 'omers-enterprise',
    title: 'Turning stakeholder needs into enterprise automation',
    input: 'Manual internal processes',
    agents: ['context', 'product', 'delivery'],
    output: 'More efficient enterprise workflows',
  },
]

// --- Skills library ---
export const SKILLS_LIBRARY: SkillGroup[] = [
  {
    id: 'user-product',
    agentLabel: 'User & Product',
    color: 'peach',
    skills: [
      'user journeys',
      'requirements',
      'stakeholder discovery',
      'prioritization',
      'product strategy',
      'design reviews',
    ],
  },
  {
    id: 'engineering',
    agentLabel: 'Engineering',
    color: 'blue',
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'C++',
      'Python',
      'Django',
      'Node.js',
      'REST APIs',
      'PostgreSQL',
    ],
  },
  {
    id: 'data-intelligence',
    agentLabel: 'Data & Intelligence',
    color: 'powder',
    skills: [
      'data pipelines',
      'pandas',
      'NumPy',
      'SQL',
      'LLM workflows',
      'prompt engineering',
      'ML visualization',
    ],
  },
  {
    id: 'reliability-delivery',
    agentLabel: 'Reliability & Delivery',
    color: 'sand',
    skills: [
      'contract testing',
      'unit testing',
      'security validation',
      'performance optimization',
      'governance',
      'Agile delivery',
      'Jira',
      'cross-functional alignment',
    ],
  },
]

// --- Autodesk dual-path workflow ---
export const AUTODESK_BRANCHES: AutodeskBranch[] = [
  {
    id: 'engineering',
    title: 'Build the platform',
    role: 'Full-Stack Engineer Intern',
    area: 'Fusion Libraries and Asset Platform',
    questions: [
      'How do services communicate?',
      'How do we test boundaries?',
      'How do we reduce integration risk?',
      'How do we improve reliability?',
    ],
    color: 'blue',
  },
  {
    id: 'product',
    title: 'Shape the platform',
    role: 'Platform Product Manager Intern',
    area: 'Data Products',
    questions: [
      'What should the platform enable?',
      'Who is the platform serving?',
      'How should data move?',
      'How do governance, security, and AI fit together?',
      'How do teams align around platform direction?',
    ],
    color: 'peach',
  },
]

export const AUTODESK_MERGE_MESSAGE =
  'Build the right platform, and build it right.'

// --- About section ---
export const ABOUT_COPY = {
  title: 'About the orchestrator',
  body: 'I study Computer Science and Business, which shapes how I approach technical work. I care about why a system should exist, who must use it, how it should be built, and what must happen for it to work reliably in the real world.',
  closing:
    'I do not see business, product, and engineering as separate boxes. I see them as connected nodes in the same workflow.',
  statement: 'My work is translation.',
}

// --- Contact section ---
export const CONTACT_COPY = {
  title: 'Start a new workflow',
  body: 'Have a difficult product, platform, or operational problem? Let\u2019s connect the right people, decisions, and systems.',
  status:
    'Available for conversations about Forward Deployed Engineering, Technical Product Management, Platform Product Management, and product-minded engineering roles.',
  buttons: [
    { label: 'Email Jasmine', href: 'mailto:jasmine@example.com' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jasminegu',
      external: true,
    },
    { label: 'View résumé', href: '#execution-history' },
  ],
}

// --- Site metadata ---
export const SITE_CONFIG = {
  name: 'Jasmine Gu',
  tagline: 'Product-minded engineer and technical translator',
  email: 'jasmine@example.com', // UPDATE: your email
  linkedin: 'https://linkedin.com/in/jasminegu', // UPDATE: your LinkedIn
}
