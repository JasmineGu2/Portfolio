/**
 * Public case study copy for the Autodesk / ADP Studio internship.
 *
 * Source of truth for the prose is `public/case-studies/autodesk/Autodesk.md`.
 * Source of truth for facts (including ones not published) is
 * `lib/portfolio/autodesk-facts.ts`, which also grounds the Ask Jasmine agent.
 * Change those first, then reflect the change here.
 *
 */

export interface AutodeskCaseStudySection {
  id: string
  label: string
}

export const AUTODESK_CASE_STUDY_SECTIONS: AutodeskCaseStudySection[] = [
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'overview', label: 'Overview' },
  { id: 'data-portal', label: 'The Data Portal' },
  { id: 'transition', label: 'The Transition' },
  { id: 'my-role', label: 'My Role' },
  { id: 'ambiguity', label: 'Ambiguity' },
  { id: 'exporting', label: 'The Exporting Decision' },
  { id: 'ai-first', label: 'Winning in an AI-First World' },
  { id: 'avengers', label: 'From Vision to Avengers' },
  { id: 'future', label: 'The Future of Product' },
]

export const AUTODESK_HERO_META = {
  kicker: 'Autodesk · ADP Studio · 2026',
  title: 'Owning Product Strategy for a Governed SQL Platform',
  role: 'Technical Platform Product Manager Intern',
  timeline: 'May 2026 – Present',
  team: ['Engineering', 'PMs', 'Trust', 'Metadata Management', 'AI'],
  skills: [
    'Product Strategy',
    'Data Governance',
    'AI Workflows',
    'UX Prototyping',
    'LLM Evaluation',
    'MCP',
  ],
} as const

export const AUTODESK_TRANSITION_ROWS = [
  {
    label: 'Why it existed',
    detail:
      'PopSQL, the SQL editor a lot of data teams had standardized on, was acquired and sunset. Shutdown was September 1, 2026, with migration recommended to start that June. ADP Studio was the replacement.',
  },
  {
    label: 'My timing',
    detail: 'I joined in May, the month before the migration window opened.',
  },
  {
    label: 'The job',
    detail:
      'A migration, not a zero-to-one. Analysts already had a tool that worked for them, with a deadline on it.',
  },
  {
    label: 'The catch',
    detail:
      'The deadline made moving mandatory. It did not make moving to us mandatory, so I spent the internship on adoption rather than features.',
  },
  {
    label: 'Mentorship',
    detail:
      'Very little. My manager left for a 7-week sabbatical two weeks in, the previous PM was hard to reach, and my director had not worked closely with the product.',
  },
] as const

export const AUTODESK_ROLE_ROWS = [
  {
    label: 'Role',
    detail:
      'Solo PM on an enterprise data platform. No dedicated designer, no consistent manager for most of the internship.',
  },
  {
    label: 'Team',
    detail:
      'Engineering team based in India. All collaboration remote-first, across a full time-zone gap.',
  },
  {
    label: 'Transition',
    detail:
      'My manager led the product for 2 weeks, then left for a 7-week sabbatical. The previous PM was senior, busy, and largely uninvolved. My director hadn’t worked closely with the product either. No one person held full context.',
  },
  {
    label: 'Scope',
    detail:
      '380+ users, spanning data analysts, engineering, Trust, Metadata Management, and AI teams.',
  },
  {
    label: 'Tenure',
    detail:
      '3rd product/frontend internship, 2nd at Autodesk, 6th internship overall across startups and big tech. The frontend work was Intuit and Tesla; my first Autodesk internship was full-stack.',
  },
] as const

export const AUTODESK_PORTAL_COMPONENTS = [
  {
    label: 'AMP',
    detail:
      'The AI/ML model portal: project and model registration, data management, notebook and IDE integration, experiment tracking, training, storage, deployment.',
  },
  {
    label: 'Access Management',
    detail: 'Requesting access to ADP data for yourself, a team, or a service account.',
  },
  { label: 'Batch Ingestion', detail: 'Secure, reliable data ingestion and publishing.' },
  { label: 'Batch Processing', detail: 'Scheduled batch tasks over large datasets.' },
  { label: 'Stream Processing', detail: 'Real-time ingestion and processing.' },
  { label: 'Pipeline Observability', detail: 'Pipeline monitoring, insight, and faster resolution.' },
  { label: 'Cost Dashboard', detail: 'Usage and cost broken out by tenant.' },
  {
    label: 'Content Authoring',
    detail: 'Authoring content for in-product messaging, including Personalized Insights.',
  },
] as const

export const AUTODESK_INVESTMENT_REASONS = [
  'Interoperability was the actual goal. Real analysis crosses tools, teams, and organizations, so the value of a governed entry point comes from how well it connects to the rest of the stack, not from how much of it we could replace.',
  'AI is only as good as the data it can reach, which makes interoperability infrastructure rather than a feature.',
  'Data capabilities had grown fast across a lot of teams and left real architectural fragmentation behind. Leadership aligned the org structure to reduce it.',
  'There was no internal consensus on where the space was headed, so I read outward: Snowflake on agentic development, Databricks on handling data at scale.',
]

export const AUTODESK_AUDIENCES = [
  {
    title: 'My customers',
    detail:
      'Software engineers, business analysts, and data analysts. Never one persona, and no two teams used ADP Studio the same way.',
  },
  {
    title: 'Engineering',
    detail:
      'Needed specs and direction clear enough to build against with no in-person overlap and a full time-zone gap.',
  },
  {
    title: 'Trust, Metadata Management, and AI teams',
    detail:
      'Needed security, access control, and governance built in from the start of a decision, not layered on after.',
  },
] as const

export const AUTODESK_AMBIGUITY_TYPES = [
  {
    title: 'Technical',
    detail: 'What the system should do, and how it should be built.',
    actions: [
      'Leaned on three years of engineering, including a lot of hours with AI coding tools, so technical decisions felt workable instead of stuck.',
      'Did the research to actually learn the stack, and used AI to quiz me on it until I could hold my own.',
      'Started with a micro feature, took it to users, then built it rather than writing it up.',
    ],
  },
  {
    title: 'Product direction',
    detail:
      'Leadership, the previous PM, engineering, and users all had different answers, with no source of truth to settle it.',
    actions: [
      'Inherited direction as one long document with 30+ requests in it, and no context for which mattered or why.',
      'Read up on how Snowflake and Databricks were framing their own data strategy, instead of waiting for internal agreement.',
      'Ran 12+ structured interviews so I had my own signal rather than whoever was reachable.',
    ],
  },
  {
    title: 'Process',
    detail:
      'Nobody had defined how specs got written, how feedback got collected, or where AI fit into either. My manager left two weeks in, so nobody was going to teach me either.',
    actions: [
      'Built my own AI stack to onboard myself: a OneDrive plugin to mass-search every document into my AI brain, then the same across Confluence and Slack, so past decisions were answerable.',
      'Connected Claude, Obsidian, Cursor, and Jira MCP into one system with voice interaction, which cut my process overhead by an estimated 35%.',
      'Treated managing up as its own project, since the cadence and context-sharing above me was undefined.',
      'We moved from Sprints into Kanban, so work shipped when it was actually ready.',
    ],
  },
] as const

export const AUTODESK_EXPORT_FOR = [
  'Analysts needed volumes the tool could not serve, and without export their teams stayed on the tools they already had.',
  'Export was the single biggest blocker to adoption, so blocking it cost us the migration we were built for.',
  'Refusing export does not keep data inside. It moves the copying somewhere nobody can see it.',
  'Some analysis genuinely happens outside the warehouse, in a notebook or a model or a spreadsheet.',
]

export const AUTODESK_EXPORT_AGAINST = [
  'Once data leaves a governed system, the risk of loss is real and permanent.',
  'An exported file carries no access controls, no audit trail, and no expiry.',
  'Security and Legal had obligations that did not bend to one team being inconvenienced.',
  'Large exports have a cost and a scale problem of their own.',
]

export const AUTODESK_EXPORT_DECISION = [
  {
    title: 'Neither yes nor no',
    body: 'Allowing export wholesale gave up the governance the platform existed for. Banning it gave up adoption. Both answers lost something we could not afford to lose, which is usually the sign the question is framed wrong.',
  },
  {
    title: 'Gate it by classification',
    body: 'The mechanism was a data-classification system: sensitivity decides what can leave and under what controls, instead of one rule applied to every table. Low-sensitivity data moves freely, sensitive data carries the controls with it, and the decision is a property of the data rather than of who is asking.',
  },
  {
    title: 'Then set the limits from real usage',
    body: 'I re-engaged Security, Legal, and the Metadata Management team directly to re-derive why the thresholds were where they were, and rebuilt the plan around the volumes analysts actually needed rather than the ones we had assumed. The classification answer is only useful if the numbers attached to it match the work.',
  },
] as const

export const AUTODESK_AI_FIRST_BLOCKS = [
  {
    title: 'The problem',
    body: 'It is trivially easy now to send someone a very long prototype. That is the trap. A prototype shows one path working; it does not define the edge cases, the states, the data contract, or the decision behind any of it. Team tagging was the example that taught me: tag a query with a team, share it in a folder, and it turned into weeks of engineering questions about search across team folders, whether team folders look different from personal ones, and how any of it touches metadata. A demo answered none of those.',
  },
  {
    title: 'Spec Mode',
    body: 'So I built a spec styler. It runs the working prototype alongside what the spec would have contained: the user story, the product details, the feedback already collected. The prototype carries the demo and the spec carries the decisions, in one artifact, so engineering could act instead of guess. Being specific mattered more than producing more output.',
  },
] as const

export const AUTODESK_AVENGERS_BEATS = [
  {
    title: 'The vision',
    body: 'What it would mean to work with SQL differently in an AI-native world, not a chat box bolted onto a query editor, but a real rethink of the query engine strategy. Built around a directional hypothesis for where data work was heading a year out, rather than just reacting to the roadmap already in front of the team.',
  },
  {
    title: 'The team',
    body: 'In the second half of my internship, that vision resonated enough with engineering that I got moved onto a cross-functional team, internally nicknamed “Avengers.” It spanned 6 engineering teams and several other PMs, each building one piece of a shared direction instead of five separate roadmaps. I kept leading query engine strategy on ADP Studio itself the whole time too.',
  },
  {
    title: 'What it pulled together',
    body: 'Capabilities that had been sitting in separate teams, AI for the ML pipeline, product health and observability, and Metadata Management’s data catalog, combined into one agentic-first experience.',
  },
  {
    title: 'What carried over',
    body: 'Spec Mode, the same specific-over-long, prototype-as-spec discipline that shipped team tagging, became the working method across this much bigger, more cross-functional effort.',
  },
] as const

export const AUTODESK_FUTURE_BLOCKS = [
  {
    title: 'Stickiness',
    body: 'It’s rarely about a missing feature. It’s the cost of leaving what already works: the switching cost of tools people already know, and the real cost of migrating data and workflows over. Any product trying to unseat a Snowflake or a DBeaver is competing with familiarity first, not capability. The cheap wins I found: usability changes made directly in Figma, and using Claude Code to prototype and vision faster on the changes that mattered most.',
  },
  {
    title: 'User trust',
    body: 'It’s earned slowly and lost fast, and that gets more true, not less, as AI takes on more of the workflow. Users will forgive a slow feature. They won’t forgive a confidently wrong one, which is part of what the AI chatbot launch taught me directly. Trustworthy AI recommendations have to be grounded in real data, not just model confidence, if you want to win against AI bias.',
  },
  {
    title: 'Security',
    body: 'It can’t be an afterthought layered onto a platform product. It has to be something a platform PM is optimizing for from the start, even when that means saying no to what a team is asking for this week. That’s a harder position to hold as a young PM than it sounds, because the ask in front of you is always louder than the principle behind saying no to it.',
  },
  {
    title: 'MCPs & agentic behavior',
    body: 'They’re changing what “using a tool” even means. When an agent can act directly on structured, permissioned data instead of a person clicking through a UI, the product surface shifts from screens to APIs and access boundaries. I think the platforms that win that shift won’t be the ones with the most features. They’ll be the ones whose data was trustworthy enough to hand to an agent in the first place.',
  },
] as const

export const AUTODESK_OUTCOMES = [
  '380+ users, 60% increase in internal adoption, ~50% improvement in usability',
  '7+ redesigned workflows with clearer information architecture, and a 3x expansion of usable workspace',
  '~30% faster AI-assisted data workflows across schema assistance, query discovery, autocomplete, and MCP integrations',
  '12+ user interviews, partnering with Engineering, Trust, Metadata Management, and AI teams on product vision, roadmap, and governance principles',
  'led UX strategy, feature ideation, and prototyping, including on an AI chatbot feature: dogfooding 12+ prototypes, catching 20+ issues before engineering implementation, and cutting concept-to-validation time by ~40%',
  'created a 12-component scalable design system to support accurate prototyping',
  'built a benchmarking framework for MCP- and LLM-powered features across 20+ representative workflows, establishing thresholds for accuracy, latency, task completion, and trustworthiness',
  'led a 6-team, multi-PM cross-functional effort that became Autodesk’s agentic data strategy',
  'reduced my own process overhead by ~35% with an AI-enabled PM workflow built on Claude, Obsidian, and Jira MCP',
] as const
