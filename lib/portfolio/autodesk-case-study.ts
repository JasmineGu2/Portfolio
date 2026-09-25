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
  { id: 'the-problem', label: 'The Problem' },
  { id: 'my-role', label: 'My Role' },
  { id: 'roadmap', label: 'The Roadmap Question' },
  { id: 'platform-pm', label: 'Platform Product Management' },
  { id: 'exporting', label: 'The Exporting Decision' },
  { id: 'ai-first', label: 'Winning in an AI-First World' },
  { id: 'avengers', label: 'From Vision to Avengers' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'future', label: 'What I Learned' },
]

export const AUTODESK_HERO_META = {
  kicker: 'Autodesk · ADP Studio · 2026',
  title: 'Owning Product Strategy for a Governed SQL Platform',
  role: 'Technical Platform Product Manager Intern',
  timeline: 'May 2026 to Present',
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
  'Interoperability was the actual goal. Real analysis crosses tools, teams, and organizations, so the value of a governed entry point is in how well it connects to the rest of the stack, not in how much of it we could replace.',
  'AI is only as good as the data it can reach. That makes interoperability infrastructure, not a feature.',
  'Data capabilities had grown fast across a lot of teams and left the architecture fragmented. Leadership changed the org structure to reduce that.',
  'No one internally agreed on where the space was headed, so I read outward: Snowflake on agentic development, Databricks on handling data at scale.',
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

/** "My Role" section, unchanged. */
export const AUTODESK_ROLE_ROWS = [
  {
    label: 'Role',
    detail:
      'Solo PM on an enterprise data platform. No dedicated designer, no consistent manager for most of the internship.',
  },
  {
    label: 'Team',
    detail:
      'Engineering team based in India. All collaboration remote, across a full time-zone gap.',
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

export const AUTODESK_PROBLEM_REASONS = [
  {
    title: 'People don’t like changing tools',
    detail:
      'Users liked PopSQL, and SQL and data exploration were daily work for them. Changing a tool people use every day is hard, because so much of the experience is tied to usability, habit, and muscle memory. Even with PopSQL gone, moving to ADP Studio meant relearning workflows they already knew.',
  },
  {
    title: 'ADP Studio was an MVP',
    detail:
      'ADP Studio had been built quickly on Querybook, an open-source big-data tool originally developed by Pinterest. The core worked, but it wasn’t designed around how data analysts actually work, and it hadn’t reached feature parity with PopSQL. Because it sat on someone else’s tool, we had no design input, and the UX suffered badly for it. With my frontend background from Intuit and Tesla, I took on a redesign of the workspace and the experience.',
  },
  {
    title: 'Engineering capacity was not centered entirely on ADP Studio',
    detail:
      'My engineering team was the infrastructure team. They owned the data and AI infrastructure under the broader data portal. They had already done the heavy feature lifting for ADP Studio, and their focus had moved on. On ADP Studio, they were mostly interested in integrating Autodesk’s internal AI capabilities. So I had less engineering capacity to work with, and a bit more pushback on my ideas.',
  },
] as const

export const AUTODESK_ROADMAP_PRIORITIES = [
  'Collaboration',
  'Notebooks and automated pipelines',
  'Dashboarding',
  'AI-assisted workflows',
  'Core usability and feature parity',
] as const

export const AUTODESK_PLATFORM_PRINCIPLES = [
  { principle: 'Enterprise consistency', need: 'Expert workflows' },
  { principle: 'Governance', need: 'Flexible access' },
  { principle: 'Technical constraints', need: 'Speed' },
  { principle: 'Long-term architecture', need: 'Immediate requests' },
] as const

export const AUTODESK_EXPORT_FOR = [
  'Better user workflows and adoption, but data could leave the governed environment.',
]

export const AUTODESK_EXPORT_AGAINST = [
  'Stronger governance, but users would find workarounds, continue using other tools, or create new risks outside the platform. And they already were.',
]

export const AUTODESK_EXPORT_DECISION = [
  {
    title: 'The decision',
    body: 'We landed on a classification-based approach: low-sensitivity data, export permitted; sensitive data, extra controls. Metadata Management classified schemas and tables by sensitivity. We also ran a backfill of existing tags and built a self-serve flow for users to request export access for new, deprecated, or wrongly classified tables.',
  },
  {
    title: 'What it changed',
    body: 'It moved the question from “Which users are allowed to export?” to “What data is safe to export?” That was one of the clearest examples of what platform PM meant day to day: weighing the platform’s first principles against what users actually needed and actually did.',
  },
] as const

export const AUTODESK_VISION_STEPS = [
  'Prompt',
  'Guide the agent',
  'Run queries',
  'Explore SQL results',
  'Inspect data',
  'Create charts and visualizations',
] as const

export const AUTODESK_CHALLENGES = [
  {
    title: 'I had to build so much context',
    detail:
      'There was no single source of truth. Leadership, engineering, the previous PM, and users each held a different piece of the story, so my first job was to learn the history, the architecture, the decisions, and what users actually needed. I went through old Confluence documentation, OneDrive’s plugin on ChatGPT, and Jira epics and stories, then ran 12+ structured user interviews to put the context back together. I also read up on Snowflake and Databricks to see where the broader data space was heading, mostly around data at scale and agentic experiences. Then I built a personal context “brain” in Obsidian and Cursor, with AI to organize what I had, connect it across sources, and pull interview transcripts and research together. I kept adding to it all through the internship, so that when I left, I could turn it into 6 handoff documents that gave the next person the context I had spent months collecting.',
  },
  {
    title: 'I had to navigate technical ambiguity',
    detail:
      'As an engineer, I was already comfortable working in technical ambiguity. On ADP Studio, I had to go find the context myself. ADP Studio was built on Querybook and integrated with Snowflake, Presto/Trino, Spark, Hive, and S3. I needed enough of the architecture and the technologies under it to make informed product decisions, hold my own in architecture discussions, and know which AI features I could reliably test, benchmark, and ask for. So instead of waiting for someone to explain the system to me, I pieced it together from the existing technical documentation, Jira epics and stories, and conversations with engineers, until I could reason about the product alongside the engineering teams.',
  },
  {
    title: 'My manager left two weeks in',
    detail:
      'Two weeks into my internship, my manager left for a 7-week sabbatical. I worked closely with my skip-level, across engineering teams in India and the Bay Area, with no in-person overlap and a big time-zone gap. I had to drive product decisions on my own, set up stakeholder cadences, lead user interviews and feedback sessions, define requirements, coordinate engineering and partner teams, and take part in architecture discussions. I could only handle that much independence because I had two prior Big Tech internships as an engineer, and this was my second term at Autodesk.',
  },
  {
    title: 'Adjusting to the speed of an AI-first world',
    detail:
      'Prototyping got much faster. Product definition did not. A prototype on its own leaves implementation ambiguity and weak alignment between product and engineering. Leading the agentic chat work, I saw it directly: AI could produce a working prototype quickly, but a prototype doesn’t answer the questions engineering needs answered to implement it, and it often adds complexity from the sheer volume of features and experiences packed in. Once I understood that, I made Spec Mode: prototype, user story, product requirements, and existing feedback in one working artifact instead of separate pieces. The prototype walked the user through a step-by-step spotlight demo to show what the experience should feel like, with a Jira-like story specification in the right-hand bar.',
  },
] as const

export const AUTODESK_FUTURE_BLOCKS = [
  {
    title: 'Product stickiness is often switching cost',
    body: 'Users don’t stay with a product only because it has every feature. They stay because their workflows already work. Migration means relearning, new habits, and cost to the organization. So an adoption plan has to account for switching costs as much as for feature gaps.',
  },
  {
    title: 'Trust is a product requirement',
    body: 'Users will put up with a missing feature more easily than a wrong or unreliable result. That matters even more with AI. AI recommendations have to be grounded in data that is relevant and trustworthy.',
  },
  {
    title: 'Governance is part of the product',
    body: 'Security and governance aren’t downstream requirements. They shape architecture, workflows, permissions, and adoption. The export decision taught me that the right answer has to work for both the immediate user need and the platform at scale.',
  },
  {
    title: 'AI changes the product surface',
    body: 'Traditional software asks: “What does the user need to click?” Agentic systems ask something else: “What can the agent safely access and act on?” That turns APIs, permissions, structured data, access boundaries, and data quality into core product capabilities.',
  },
] as const

export const AUTODESK_OUTCOMES = [
  '380+ users, 60% increase in internal adoption, ~50% improvement in usability',
  '7+ redesigned workflows with clearer information architecture, and 3x more usable workspace',
  '~30% faster AI-assisted data workflows across schema assistance, query discovery, autocomplete, and MCP integrations',
  '12+ user interviews, partnering with Engineering, Trust, Metadata Management, and AI teams on product vision, roadmap, and governance principles',
  'led UX strategy, feature ideation, and prototyping, including on an AI chatbot feature: dogfooded 12+ prototypes, caught 20+ issues before engineering built them, and cut concept-to-validation time by ~40%',
  'created a scalable 12-component design system so prototypes stayed accurate',
  'built a benchmarking framework for MCP- and LLM-powered features across 20+ representative workflows, with thresholds for accuracy, latency, task completion, and trustworthiness',
  'led a 6-team, multi-PM cross-functional effort that became Autodesk’s agentic data strategy',
  'cut my own process overhead by ~35% with an AI-enabled PM workflow built on Claude, Obsidian, and Jira MCP',
] as const
