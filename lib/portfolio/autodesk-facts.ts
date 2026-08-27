/**
 * AUTODESK_FACTS
 * ---------------------------------------------------------------------
 * Single source of truth for the Autodesk / ADP Studio internship.
 *
 * Two consumers:
 *  1. `lib/portfolio/autodesk-case-study.ts`, the public case study copy, which
 *     is a *written* subset of this. Facts live here; prose lives there.
 *  2. `buildAutodeskFactSheet()` below, which renders this as grounding text for
 *     the Ask Jasmine system prompt (see `lib/portfolio/ask-agent.ts`), so the
 *     agent can answer questions about this role without anything being invented.
 *
 * Anything marked `publish: false` is deliberately kept off the public page and
 * out of the agent's grounding. Anything in `UNVERIFIED` is not stated as fact
 * anywhere, confirm before promoting it.
 */

export interface FactGroup {
  topic: string
  facts: readonly string[]
}

export const AUTODESK_BASICS = {
  company: 'Autodesk',
  product: 'ADP Studio',
  productSummary:
    'A modern SQL editor: the query and exploration interface into Autodesk’s Data Portal. Built as the internal replacement for PopSQL, which was being sunset.',
  role: 'Technical Platform Product Manager Intern',
  roleReality:
    'The PM representative for ADP Studio, de facto solo PM on an enterprise data platform, with no embedded designer and, for most of the internship, no manager above me on the product. I wore a lot of different hats.',
  timeline: 'May 2026 – Present',
  team: 'Engineering based in India; fully remote-first collaboration across a full time-zone gap.',
  users: '380+ users across data analysts, engineering, and cross-functional partner teams.',
  internshipCount:
    '6th internship overall across startups and big tech; 3rd in a product/frontend role; 2nd at Autodesk. The first Autodesk internship was full-stack, not frontend. The frontend work was Intuit and Tesla.',
  priorInternships:
    'Frontend at Intuit (designing for delight) and Tesla (designing for speed and operational trust); full-stack at Autodesk on the Libraries Platform immediately before this role.',
} as const

export const AUTODESK_FACT_GROUPS: readonly FactGroup[] = [
  {
    topic: 'The transition I joined',
    facts: [
      'PopSQL, the collaborative SQL editor a lot of data teams had standardized on, was acquired and then sunset. Full shutdown was September 1, 2026, with migration recommended to start that June.',
      'ADP Studio existed because of that shutdown. It was the internal replacement, part of the Data Portal initiative.',
      'I was not PopSQL’s PM. It was a third-party product. I came in to support the transition onto ADP Studio.',
      'I joined in May 2026, the month before the recommended migration window opened.',
      'That made the job a migration rather than a zero-to-one launch: analysts already had a working tool with a deadline on it.',
      'The deadline made moving mandatory. It did not make moving to ADP Studio mandatory. DBeaver, Hive, and direct Snowflake access all reached the same data.',
      'Very little mentorship in practice: my manager took the product over for about two weeks, then left for a seven-week sabbatical.',
      'The previous PM was senior, very busy, and hard to reach. I never worked closely with him.',
      'My director had never worked closely with the product either.',
      'Net result: a product with a hard external deadline and no single person holding full context on it.',
    ],
  },
  {
    topic: 'What ADP Studio is',
    facts: [
      'ADP Studio is the SQL editor, the query and exploration layer.',
      'The Data Portal is Autodesk’s broader data strategy: storing and processing every known data category and classification, structured and unstructured alike.',
      'Structured ingestion: RDS sources (MySQL, PostgreSQL, Oracle), non-relational databases like DynamoDB, the Workday API, and Salesforce, all orchestrated with Airflow. A defined schema makes that data consistent to query and analyze.',
      'Unstructured data: behavioral data, images, and raw text at the scale LLMs are trained on, terabytes scraped from the internet. It can’t be queried the same standard ways.',
      'Snowflake is the warehouse layer for consumption. Underneath it sits the lake itself, built on S3, Hive, and Iceberg.',
      'The point of the lake was to harness all of that data in one governed place instead of team by team, with access control, classification, and auditing built into how you reach it. Safer than the same data spread across a dozen tools, and more useful, because analysis can cross sources that never used to meet.',
      'Analysts could already reach the same tables through DBeaver, Hive, or direct Snowflake access. Being the more governed option was not by itself a reason to switch, which is why adoption was never automatic.',
    ],
  },
  {
    topic: 'The rest of the Data Portal',
    facts: [
      'AMP: Autodesk’s AI/ML model portal. project and model registration, data management, notebook and IDE integration, experiment tracking, model training, storage, and deployment.',
      'Access Management: requesting access to ADP data for yourself, your team, or service accounts.',
      'Batch Ingestion: secure, reliable, efficient data ingestion and publishing.',
      'Batch Processing: scheduled batch tasks over large datasets.',
      'Cost Dashboard: usage and cost by tenant.',
      'Pipeline Observability: pipeline monitoring, insights, and faster issue resolution.',
      'Stream Processing: real-time ingestion and processing.',
      'Content Authoring Tool: creating and submitting content for the in-product messaging (IPM) capability, including Personalized Insights.',
    ],
  },
  {
    topic: 'Why Autodesk was investing here',
    facts: [
      'Customers don’t think in products, they think in outcomes, and their workflows already span multiple tools, disciplines, and organizations.',
      'AI is only as effective as the data it can reach, which makes interoperability foundational rather than a nice-to-have.',
      'Autodesk’s data capabilities had grown fast across many teams, which created real architectural fragmentation. Leadership aligned the org structure to reduce it.',
      'Where Autodesk had no internal consensus, I formed my own view from outside reading: Snowflake’s public writing on agentic development and what makes an AI feature matter, and Databricks’ writing on harnessing data at scale.',
    ],
  },
  {
    topic: 'Stakeholders',
    facts: [
      'My customers were software engineers, business analysts, and data analysts. Never one persona: some teams needed middle tables to stage work, some needed raw access, some needed guardrails they’d never ask for by name.',
      'Engineering in India: needed specs clear enough to build against with no in-person overlap and a full time-zone gap.',
      'Trust, Metadata Management, and AI teams: needed security, access control, and governance built in from the start of a decision, not layered on after.',
      'Leadership: needed continuity through a transition nobody had planned for.',
    ],
  },
  {
    topic: 'The four types of ambiguity',
    facts: [
      'Technical: what the system should do and how to build it. The kind I resolved fastest, on three years of engineering experience and close work with AI coding tools.',
      'Organizational: who is in charge, on what cadence, in what time zone, once my manager left for seven weeks.',
      'Product direction: leadership, the previous PM, engineering, and users each had a different opinion, and no single source of truth existed. I resolved part of it by looking outward at Snowflake and Databricks instead of waiting on internal agreement.',
      'Process: nobody had defined how specs got written, how feedback got collected, or how AI tools fit into either. Most of the internship’s real work was fixing this one.',
      'Direction was inherited as one long document with 30+ requests in it, and no context for which mattered or why.',
      'My working pattern: start with a micro feature, take it to users, then prototype it in Claude rather than writing it up first.',
      'I need to wear many different hats and switch between many different products I manage. AI made me better at that multitasking and context-switching, which matters because ambiguity means not being tied to one thing. You need to be adaptable when a new task or idea shows up.',
      'Pushback spiked sharply during the transition at the end, more than I expected and more stressful than the earlier ambiguity. I answered it by writing handoff docs.',
      'Six prior internships meant I’d seen both flavors already: a startup where process didn’t exist yet, and a big company where it existed but nobody could point to it.',
    ],
  },
  {
    topic: 'The exporting decision',
    facts: [
      'Export was the single biggest blocker to adoption.',
      'The case for allowing it: analysts needed volumes the tool could not serve, so without export their teams stayed on the tools they already had; refusing export does not keep data inside, it moves the copying somewhere nobody can see; and some analysis genuinely happens outside the warehouse.',
      'The case against: once data leaves a governed system the risk of loss is real and permanent; an exported file carries no access controls, no audit trail, and no expiry; Security and Legal had real obligations; and large exports have their own cost and scale problem.',
      'Allowing export wholesale gave up the governance the platform existed for. Banning it gave up adoption. Both answers lost something we could not afford to lose.',
      'The mechanism was a data-classification system: sensitivity decides what can leave and under what controls, rather than one rule for every table. The decision becomes a property of the data instead of a property of who is asking.',
      'I re-engaged Security, Legal, and the Metadata Management team to re-derive why the thresholds sat where they did, and rebuilt the plan around the volumes analysts actually needed rather than the assumed ones.',
      'Background, for context but not for the public page: the classification decision was made two weeks before I joined, nobody handed me the reasoning, and I found the adoption impact by accident when a power user mentioned their team had gone back to their old tools.',
    ],
  },
  {
    topic: 'Building for data analysts',
    facts: [
      '“Data analyst” was never one persona.',
      'AI wasn’t always the right fix. Some of the sharpest usability wins came from a clearer table structure or a better default view, not another assistant on top.',
      'I rebuilt the feedback loop from a small set of power users into 12+ structured interviews across a wider set of teams.',
      'Early on I over-indexed on a handful of relationships instead of building breadth. It was efficient and it was a narrow slice of the problem, amplified. I should have caught it sooner.',
      'Because so few teams had switched to ADP Studio yet, finding a representative sample took deliberate effort.',
    ],
  },
  {
    topic: 'Spec Mode and working in an AI-first world',
    facts: [
      'On the “SaaS apocalypse” argument, that agents could hollow out software that is really just a UI wrapped around a workflow, I think it’s directionally true for one reason: when anyone can build fast, building stops being the bottleneck and agreement becomes it.',
      'Team tagging sounded simple: tag a query with a team, or auto-suggest one. It turned into a long engineering conversation about how search should work across team folders, whether team folders should look different from personal ones, how it touches metadata, and how a tagged query gets shared.',
      'Much of that conversation kept circling back to decisions the previous PM had made before I joined, about someone who wasn’t in the room.',
      'What moved it forward was not sending slop: being specific instead of generating more AI output to fill the gaps.',
      'I built a “spec styler” that runs a prototype demo alongside what a full spec would contain (user story, product details, feedback already collected) so the prototype could double as the spec instead of standing in for the conversation.',
      'I killed Sprints and moved the team to Kanban so work shipped at the pace it was actually ready.',
      'Onboarding came first: I used a OneDrive plugin to mass-search every document into my AI brain, then did the same across Confluence and Slack, so past decisions were queryable rather than locked in people who had left or were unreachable.',
      'I connected Claude, Obsidian, Cursor, and Jira MCP into one personal operating system, including voice-based interaction, and cut my own process overhead by roughly 35%.',
      'That system ran across both UX and engineering: prototyping and design decisions were tracked alongside build status.',
      'Managing up was its own deliberate initiative: building the cadence and context-sharing my manager’s absence had left undefined.',
      'I worked directly on an AI chatbot feature, doing UX, prototyping, and coordinating with engineering, and it shipped before its supporting infrastructure was ready. It cost user confidence faster than a slower rollout would have. Speed without accuracy doesn’t read as fast, it reads as unreliable.',
    ],
  },
  {
    topic: 'The Avengers team',
    facts: [
      'In the second half of the internship, my vision for working with SQL differently in an AI-native world, not a chat box bolted onto a query editor, resonated enough with engineering that I was moved onto a cross-functional team internally nicknamed “Avengers.”',
      'It spanned 6 engineering teams and several other PMs, each building one piece of a shared direction instead of five separate roadmaps.',
      'I kept leading query-engine strategy on ADP Studio at the same time.',
      'It pulled together capabilities that had been sitting in separate teams: AI for the ML pipeline, product health and observability, and Metadata Management’s data catalog for schema and access, all into one agentic-first experience.',
      'The spec discipline from team tagging became the working method across the larger effort.',
      'It came from a directional hypothesis about where data work was heading a year out, rather than a reaction to the roadmap already in front of the team. That anticipatory framing is what made the case for the team in the first place.',
    ],
  },
  {
    topic: 'Platform PM reflections',
    facts: [
      'Most decisions were really two decisions: the enterprise-wide, one-size-fits-most choice, and the power-user choice a one-size answer usually shortchanges. Power users often decided whether a whole team migrated or stayed on legacy tools.',
      'Having worked in corporate environments, startups, leadership roles, and across multiple tech teams, I already knew what corporate standards looked like, which made me better prepared for the ambiguity of this role than the title suggests.',
      'There was no embedded designer because it was an enterprise platform. Design isn’t something product management alone does well, and my UX background covered that gap directly.',
      'The ambiguity and the autonomy were the same condition. I was the sole representative for this product and the person setting its direction and vision, which also meant an enormous amount of onboarding before I could do that credibly.',
      'I built a 12-component scalable design system in Figma, leaning on my frontend internships: Intuit, building external-facing product surfaces, and Tesla, building internal data-heavy tools fast.',
      'I built a benchmarking framework for MCP- and LLM-powered features across 20+ representative workflows, with thresholds for accuracy, latency, task completion, and trustworthiness. It was a direct response to the chatbot trust mistake.',
      'The change-management work I led: the spec process, voice-based AI interaction, and managing up.',
    ],
  },
  {
    topic: 'What I believe about data products',
    facts: [
      'Stickiness is rarely a missing feature. It’s the cost of leaving what already works: the switching cost of familiar tools and the real cost of migrating data and workflows. Anything trying to unseat Snowflake or DBeaver competes with familiarity before capability.',
      'The cheap wins against that: usability changes made directly in Figma, and using Claude Code to prototype and vision faster.',
      'User trust is earned slowly and lost fast, and more so as AI takes over more of the workflow. Users forgive a slow feature. They don’t forgive a confidently wrong one.',
      'Trustworthy AI recommendations have to be grounded in real data, not model confidence.',
      'Security has to be a first-class product concern for a platform PM, even when it means saying no to what a team wants this week.',
      'MCPs and agentic behavior change what using a tool means. When an agent acts on permissioned, structured data instead of a person clicking through a UI, the product surface moves from screens to APIs and access boundaries. The platforms that win will be the ones whose data was trustworthy enough to hand to an agent.',
    ],
  },
]

/** Verbatim numbers. Cite these exactly; don't round or re-derive them. */
export const AUTODESK_METRICS = [
  '380+ users',
  '60% increase in internal adoption',
  '~50% improvement in usability',
  '7+ redesigned workflows launched, with clearer information architecture',
  '3x expansion of usable workspace',
  '~30% reduction in task time for AI-assisted data workflows (schema assistance, team-based query discovery, SQL autocomplete and formatting, MCP integrations)',
  '12+ user interviews with Engineering, Trust, Metadata Management, and AI teams',
  '12+ prototypes built and dogfooded in Claude and Figma',
  '20+ usability and technical issues caught before engineering implementation',
  '~40% reduction in concept-to-validation time',
  '12-component scalable design system',
  'Benchmarking framework across 20+ representative workflows',
  '6 engineering teams plus multiple PMs on the Avengers team',
  '~35% reduction in my own process overhead',
] as const

/**
 * Deliberately excluded from the public case study and from agent grounding.
 * Kept here so the omission is a recorded decision rather than an oversight.
 */
export const AUTODESK_WITHHELD = [
  {
    topic: 'Org restructuring specifics',
    reason:
      'Reporting-line and personnel details behind the fragmentation fix are not appropriate to publish. The case study states only that leadership aligned the org structure to reduce fragmentation.',
    publish: false,
  },
] as const

/**
 * Not stated as fact anywhere on the site until confirmed.
 * Resolve these and move them into AUTODESK_FACT_GROUPS.
 */
export const AUTODESK_UNVERIFIED: readonly string[] = []

/** Renders the fact base as grounding text for the Ask Jasmine system prompt. */
export function buildAutodeskFactSheet(): string {
  const basics = [
    `Product: ${AUTODESK_BASICS.product}. ${AUTODESK_BASICS.productSummary}`,
    `Role: ${AUTODESK_BASICS.role}. ${AUTODESK_BASICS.roleReality}`,
    `Timeline: ${AUTODESK_BASICS.timeline}`,
    `Team: ${AUTODESK_BASICS.team}`,
    `Scale: ${AUTODESK_BASICS.users}`,
    `Context: ${AUTODESK_BASICS.internshipCount} ${AUTODESK_BASICS.priorInternships}`,
  ].join('\n')

  const groups = AUTODESK_FACT_GROUPS.map(
    (group) => `${group.topic}:\n${group.facts.map((fact) => `- ${fact}`).join('\n')}`
  ).join('\n\n')

  const metrics = AUTODESK_METRICS.map((metric) => `- ${metric}`).join('\n')

  // Both of these sections are empty-able, so they're only emitted when populated -
  // an empty heading in a system prompt reads as an instruction with no content.
  const sections = [basics, groups, `Metrics (cite verbatim):\n${metrics}`]

  if (AUTODESK_WITHHELD.length > 0) {
    sections.push(
      `Do not discuss:\n${AUTODESK_WITHHELD.map((item) => `- ${item.topic}: ${item.reason}`).join('\n')}`
    )
  }

  if (AUTODESK_UNVERIFIED.length > 0) {
    sections.push(
      `Unconfirmed. Say you'd have to check rather than asserting these:\n${AUTODESK_UNVERIFIED.map(
        (item) => `- ${item}`
      ).join('\n')}`
    )
  }

  return sections.join('\n\n')
}
