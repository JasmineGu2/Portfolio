/**
 * Curated recruiter Q&A for "Ask Jasmine."
 *
 * There is no language model behind the chat yet, `resolveAskResponse` in
 * `ask-agent.ts` keyword-matches, which is fine for broad topics but vague for
 * the specific things a recruiter actually asks. So these are exact-match pairs:
 * every question here is a chip a visitor can tap, and every answer is written
 * rather than generated.
 *
 * Grounded in the résumés and `autodesk-facts.ts`. Nothing here should state a
 * number that isn't in one of those. When the real model is wired up, this file
 * becomes few-shot examples and the tone reference rather than the whole engine.
 */

export interface RecruiterAnswer {
  question: string
  answer: string
  /** Work tile ids to surface as references and highlight on the page. */
  refIds?: string[]
  followUps?: string[]
}

export interface RecruiterTopic {
  id: string
  label: string
  /** Maps to a lucide icon in the chat UI. */
  icon: 'briefcase' | 'wrench' | 'sparkles' | 'layers' | 'cpu' | 'user' | 'route'
  /** What I say when you tap the chip, before the questions appear. */
  intro: string
  questions: string[]
}

/**
 * The chip row under the composer. Tapping a chip drops my intro line plus that
 * topic's questions into the thread, so the chat opens a branch instead of
 * answering something you didn't ask.
 */
export const RECRUITER_TOPICS: RecruiterTopic[] = [
  {
    id: 'autodesk',
    label: 'Autodesk',
    icon: 'briefcase',
    intro: 'Autodesk is where I am now, and it is the role I can go deepest on. What do you want to know?',
    questions: [
      'What did you own at Autodesk?',
      'What is ADP Studio?',
      'What was the biggest blocker to adoption?',
      'Tell me about a hard tradeoff you made.',
    ],
  },
  {
    id: 'tesla',
    label: 'Tesla',
    icon: 'cpu',
    intro: 'Tesla was the summer I stopped working on top of systems and started working inside them.',
    questions: [
      'What did you build at Tesla?',
      'Why was Tesla an infrastructure problem?',
      'What did Tesla teach you about systems?',
    ],
  },
  {
    id: 'product',
    label: 'Product',
    icon: 'briefcase',
    intro: 'I came to product from engineering, so most of these answers are about that switch.',
    questions: [
      'Why did you move from engineering to product?',
      'How technical are you as a PM?',
      'How do you handle ambiguity?',
      'How do you run user research?',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    icon: 'wrench',
    intro: 'Three engineering internships before the PM work. Pick whichever is useful.',
    questions: [
      "What's your strongest technical experience?",
      'Have you worked on distributed systems?',
      'What languages and tools do you use?',
      'Do you still write code as a PM?',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: 'sparkles',
    intro: 'I use AI daily and I ship AI features, which are two pretty different problems.',
    questions: [
      'How do you use AI in your own work?',
      'How do you evaluate an AI feature?',
      "What's your take on AI replacing software?",
      "What's a mistake you made?",
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'layers',
    intro: 'Things I built outside a job, mostly to answer a question faster than arguing about it would.',
    questions: [
      'What have you built zero to one?',
      'What is LaurelSpace?',
      'What did you build at Hack Western?',
    ],
  },
  {
    id: 'intuit',
    label: 'Intuit',
    icon: 'briefcase',
    intro: 'Intuit was my first time building inside somebody else\u2019s system, on TurboTax.',
    questions: [
      'What did you build at Intuit?',
      'What did you learn at Intuit?',
    ],
  },
  {
    id: 'journey',
    label: 'Journey',
    icon: 'route',
    intro: 'The short version: automation, interfaces, systems, platform, product. Each one added a layer.',
    questions: [
      'How do your experiences connect?',
      'Are you a PM or an engineer?',
      'What are you looking for next?',
      'When do you graduate?',
    ],
  },
]

export const RECRUITER_ANSWERS: RecruiterAnswer[] = [
  // ---------- Product ----------
  {
    question: 'What did you own at Autodesk?',
    answer:
      'Product strategy and execution for ADP Studio, the governed SQL and data-exploration layer on Autodesk’s data lake, used by 380+ analysts and engineers. I increased internal adoption 60% and usability about 50%, launched 7+ redesigned workflows with a 3x expansion of usable workspace, and led the roadmap for AI-assisted data work (schema assistance, query discovery, SQL autocomplete, MCP integrations) which cut task time roughly 30%.',
    refIds: ['autodesk'],
    followUps: [
      'How technical are you as a PM?',
      'Tell me about a hard tradeoff you made.',
      "What's a mistake you made?",
    ],
  },
  {
    question: 'How technical are you as a PM?',
    answer:
      'Technical enough to build the thing I’m asking for. I came in through engineering, frontend at Intuit and Tesla, full-stack at Autodesk, so instead of writing a spec and waiting, I prototyped in Claude and handed engineering something they could click through. That caught 20+ usability and technical issues before implementation and cut concept-to-validation time about 40%. I also built the 12-component design system the prototypes were made from, because the team had no embedded designer.',
    refIds: ['autodesk', 'autodesk-eng', 'tesla'],
    followUps: [
      'Do you still write code as a PM?',
      "What's your strongest technical experience?",
      'How do you use AI in your own work?',
    ],
  },
  {
    question: 'Tell me about a hard tradeoff you made.',
    answer:
      'Export. Two weeks before I joined, the team gated data export behind a new classification system, and nobody told me because everyone assumed it had shipped. Halfway through, a power user mentioned their team had gone back to their old tools because ADP Studio couldn’t export at the volume they needed. It was the single biggest blocker to adoption. The real question was whether a data tool should allow export at all given data-loss risk, weighed against Security and Legal, not against one team’s inconvenience. I traced the decision to its origin, re-engaged both teams, and rebuilt the plan around real export volumes. The root cause was never the decision. It was a handoff that lost the reasoning.',
    refIds: ['autodesk'],
    followUps: [
      'How do you handle ambiguity?',
      "What's a mistake you made?",
      'What did you own at Autodesk?',
    ],
  },
  {
    question: 'How do you handle ambiguity?',
    answer:
      'I separate it into four kinds, because they need different responses. Technical ambiguity I could resolve fastest, on three years of engineering. Organizational ambiguity showed up when my manager left for a seven-week sabbatical two weeks after taking the product over. Product direction was contested. Leadership, the previous PM, engineering, and users all disagreed, so I read what Snowflake and Databricks were publishing instead of waiting for internal consensus. Process was the real work: nobody had defined how specs got written or feedback got collected. Only one of the four had a playbook I already owned. The other three I had to build.',
    refIds: ['autodesk'],
    followUps: [
      'Tell me about a hard tradeoff you made.',
      'Tell me about influencing without authority.',
      'How do you run user research?',
    ],
  },

  // ---------- Engineering ----------
  {
    question: "What's your strongest technical experience?",
    answer:
      'The full-stack internship at Autodesk, on Fusion’s library platform serving 4.6M+ users. I shipped 6+ end-to-end features across multiple microservices in Java and C++ with React/TypeScript on the front, built DynamoDB and Redis-backed workflows with real query, refresh, invalidation, and caching logic, and led an API integration initiative that improved cross-service reliability 30% using Pact contract testing, with 60+ automated tests plus documentation that got adopted by 6 other engineering teams. I also fixed concurrency and locking bugs in asynchronous message-broker workflows, which is where distributed systems stop being theoretical.',
    refIds: ['autodesk-eng'],
    followUps: [
      'Have you worked on distributed systems?',
      'What did you build at Tesla?',
      'Do you still write code as a PM?',
    ],
  },
  {
    question: 'What did you build at Tesla?',
    answer:
      'Operator-facing ML factory software for labeling, anomaly detection, and threat visualization, used across factories in Shanghai, Fremont, Austin, and Berlin. The piece I owned end to end was video data infrastructure for ML inference results from factory cameras: API architecture, lazy loading, custom bounding-box overlays, and secure playback of protected footage with auth cookies, custom headers, and CORS. It cut time-to-insight about 40% for operations teams. I also shipped production React components into the design system (validated forms, charts, data tables, filters, skeleton loaders) and reduced page load 20% through pagination, memoization, and debounced inputs.',
    refIds: ['tesla'],
    followUps: [
      "What's your strongest technical experience?",
      'Have you worked on distributed systems?',
      'Are you a PM or an engineer?',
    ],
  },
  {
    question: 'Have you worked on distributed systems?',
    answer:
      'Yes, at Autodesk on the Libraries Platform. I worked across 4 repositories and 3 engineering teams split between North America, Europe, and India, on independently owned services that had to stay consistent with each other. The concrete work was contract testing across service boundaries, caching and invalidation on DynamoDB and Redis, and debugging concurrency, locking, and cross-service failures in long-running message-broker operations. Most of the difficulty wasn’t writing the code, it was coordinating a change across services nobody person owned.',
    refIds: ['autodesk-eng'],
    followUps: [
      "What's your strongest technical experience?",
      'How do you work with remote teams?',
      'What did you build at Tesla?',
    ],
  },
  {
    question: 'Do you still write code as a PM?',
    answer:
      'Yes, and it’s the main reason the PM work moved as fast as it did. I built and dogfooded 12+ prototypes in Claude and Figma rather than writing documents first, built the design system underneath them, and wired Claude, Obsidian, Cursor, and Jira MCP into one workflow that cut my own process overhead about 35%. This portfolio is the same habit. I built it.',
    refIds: ['autodesk', 'autodesk-eng'],
    followUps: [
      'How technical are you as a PM?',
      'How do you use AI in your own work?',
      'Are you a PM or an engineer?',
    ],
  },

  // ---------- AI ----------
  {
    question: 'How do you use AI in your own work?',
    answer:
      'As an operating system rather than a chat window. Claude, Obsidian, Cursor, and Jira MCP connected into one workflow, with voice interaction, to synthesize research, draft PRDs, and turn requirements into engineering tickets for sprint planning. It cut my process overhead about 35%. The second-order effect mattered more: because prototyping got cheap, I stopped writing specs that described things and started handing engineering things that already worked. I also replaced Sprints with Kanban, because AI-accelerated work kept finishing mid-sprint or blowing past the boundary.',
    refIds: ['autodesk'],
    followUps: [
      'How do you evaluate an AI feature?',
      "What's your take on AI replacing software?",
      'Do you still write code as a PM?',
    ],
  },
  {
    question: 'How do you evaluate an AI feature?',
    answer:
      'With thresholds set before launch, not vibes after. I built a benchmarking framework for MCP- and LLM-powered features across 20+ representative workflows, with quality thresholds for accuracy, latency, task completion, and trustworthiness. I built it because I’d already shipped an AI chatbot before its supporting infrastructure was ready and watched it cost user confidence. Recommendations have to be grounded in real data rather than model confidence, or the model’s bias quietly becomes the product’s.',
    refIds: ['autodesk'],
    followUps: [
      "What's a mistake you made?",
      'How do you use AI in your own work?',
      "What's your take on AI replacing software?",
    ],
  },
  {
    question: "What's your take on AI replacing software?",
    answer:
      'The "SaaS apocalypse" argument, that agents will hollow out software that was really just a UI wrapped around a workflow, is probably overstated, but it points at something real. When anyone can build fast, building stops being the bottleneck and agreement becomes it. I watched a feature as small as tagging a query with a team turn into weeks of engineering conversation. What moved it wasn’t more output, it was being specific enough that engineering could act. Longer term, when an agent acts on permissioned structured data instead of a person clicking a UI, the product surface moves from screens to APIs and access boundaries. The platforms that win will be the ones whose data was trustworthy enough to hand to an agent.',
    refIds: ['autodesk'],
    followUps: [
      'How do you evaluate an AI feature?',
      'How do you use AI in your own work?',
      'What did you own at Autodesk?',
    ],
  },

  // ---------- Judgment ----------
  {
    question: "What's a mistake you made?",
    answer:
      'I shipped an AI chatbot feature before its supporting infrastructure was ready. I did the UX, the prototyping, and the coordination with engineering, and it went out too early. It cost user confidence faster than a slower rollout would have, because speed without accuracy doesn’t read as fast, it reads as unreliable. Afterwards I built the benchmarking framework (20+ workflows, with thresholds for accuracy, latency, task completion, and trustworthiness) specifically so the next feature couldn’t ship on optimism. I’d rather have learned that on an internal tool than on customers.',
    refIds: ['autodesk'],
    followUps: [
      'How do you evaluate an AI feature?',
      'How do you run user research?',
      'Tell me about a hard tradeoff you made.',
    ],
  },
  {
    question: 'How do you run user research?',
    answer:
      'I ran 12+ structured interviews across analysts, engineering, Trust, Metadata Management, and AI teams, and used them to define the vision, roadmap, and the security, access-control, and governance principles. I’ll also say what went wrong: early on I over-indexed on a small set of power users because they were the fastest way to get any signal during the leadership transition. It was efficient and it was a narrow slice of the problem, amplified. Widening it took deliberate effort, since so few teams had migrated onto the platform that a representative sample was never going to walk through an open door.',
    refIds: ['autodesk'],
    followUps: [
      "What's a mistake you made?",
      'How do you handle ambiguity?',
      'What did you own at Autodesk?',
    ],
  },
  {
    question: 'Tell me about influencing without authority.',
    answer:
      'I had a point of view about working with SQL differently in an AI-native world, not a chat box bolted onto a query editor, built around where I thought data work would be a year out rather than the roadmap in front of us. It resonated enough with engineering that I was moved onto a cross-functional team nicknamed "Avengers": 6 engineering teams and several other PMs, each building one piece of a shared direction instead of five separate roadmaps, while I kept leading query-engine strategy on ADP Studio. A vision doesn’t count as strategy until other teams are actually building toward it, not just nodding along in a meeting.',
    refIds: ['autodesk'],
    followUps: [
      'How do you handle ambiguity?',
      'What did you own at Autodesk?',
      'How do you work with remote teams?',
    ],
  },

  // ---------- Fit ----------
  {
    question: 'Are you a PM or an engineer?',
    answer:
      'I’ve done both, in that order, and I don’t think the distinction has been useful to me. Three engineering internships (Intuit, Tesla, Autodesk full-stack) then platform PM at Autodesk. The PM work was better because I could build; the engineering work was better because I kept asking what the system was for. If you want a PM who can prototype and read a service boundary, or an engineer who can own the product decision, both are the same person.',
    refIds: ['autodesk', 'autodesk-eng', 'tesla', 'intuit'],
    followUps: [
      'What are you looking for next?',
      'How technical are you as a PM?',
      "What's your strongest technical experience?",
    ],
  },
  {
    question: 'What are you looking for next?',
    answer:
      'A platform or data product where the hard part is judgment rather than throughput, and where security, access, and trust are real constraints instead of things bolted on at the end. I’m most useful where the problem is technically deep and the direction isn’t settled yet, because that’s the situation I’ve actually worked in.',
    refIds: ['autodesk'],
    followUps: [
      'Are you a PM or an engineer?',
      'When do you graduate?',
      'What did you own at Autodesk?',
    ],
  },
  {
    question: 'When do you graduate?',
    answer:
      'I’m finishing a dual degree in Computer Science and Business at Western University and Ivey Business School, graduating in 2027. Six internships so far across startups and big tech: Autodesk twice, Tesla, Intuit, OMERS, and Metaverse Group.',
    refIds: ['western'],
    followUps: [
      'What are you looking for next?',
      'Are you a PM or an engineer?',
      "What's your strongest technical experience?",
    ],
  },
  {
    question: 'How do you work with remote teams?',
    answer:
      'Most of my work has been remote across time zones, so it’s the normal case rather than the exception. At Autodesk my engineering team was in India with no in-person overlap, which meant specs had to be clear enough to build against without a follow-up conversation, which is part of why I started handing over working prototypes instead of documents. On the full-stack side I coordinated across 4 repositories and 3 teams in North America, Europe, and India. At Tesla I worked across 4 time zones with design, backend, and ML.',
    refIds: ['autodesk', 'autodesk-eng', 'tesla'],
    followUps: [
      'Tell me about influencing without authority.',
      'Have you worked on distributed systems?',
      'How do you handle ambiguity?',
    ],
  },
  // ---------- Quick answers reached from the chip branches ----------
  {
    question: 'What is ADP Studio?',
    answer:
      'A modern SQL editor: the query and exploration layer into Autodesk\u2019s Data Portal, its governed data lake. It went in as the internal replacement for PopSQL, which was being sunset. The catch is that DBeaver, Hive, and direct Snowflake access all reached the same data, so a forced migration deadline made moving mandatory without making us the obvious place to move to. That is why I spent the internship on adoption rather than features.',
    refIds: ['autodesk'],
    followUps: [
      'What was the biggest blocker to adoption?',
      'What did you own at Autodesk?',
      'How do you run user research?',
    ],
  },
  {
    question: 'What was the biggest blocker to adoption?',
    answer:
      'Export, and I did not find it in a roadmap. A power user mentioned halfway through that their team had quietly gone back to their old tools, because ADP Studio could not handle the volume they needed to export. Stickiness is rarely a missing feature. It is the cost of leaving what already works, so anything trying to unseat Snowflake or DBeaver competes with familiarity before it competes on capability.',
    refIds: ['autodesk'],
    followUps: [
      'Tell me about a hard tradeoff you made.',
      'What is ADP Studio?',
      'How do you run user research?',
    ],
  },
  {
    question: 'Why was Tesla an infrastructure problem?',
    answer:
      'Because the interface was the easy half. Showing ML inference results from factory cameras meant owning the video data infrastructure underneath it: API architecture, lazy loading, custom bounding-box overlays, and secure playback of protected footage with auth cookies, custom headers, and CORS. Operators in Shanghai, Fremont, Austin, and Berlin needed the same footage to load reliably, which is a delivery problem before it is a UI problem.',
    refIds: ['tesla'],
    followUps: [
      'What did Tesla teach you about systems?',
      'What did you build at Tesla?',
      'Have you worked on distributed systems?',
    ],
  },
  {
    question: 'What did Tesla teach you about systems?',
    answer:
      'That the constraint is usually a layer below where the complaint shows up. Operations teams asked for a faster page. What they actually needed was pagination, memoization, debounced inputs, and a video pipeline that did not refetch protected footage on every interaction. Cutting time-to-insight about 40% came from the infrastructure, not the screen. I stopped treating the frontend as the whole product after that.',
    refIds: ['tesla', 'autodesk-eng'],
    followUps: [
      'Why did you move from engineering to product?',
      "What's your strongest technical experience?",
      'What did you build at Tesla?',
    ],
  },
  {
    question: 'Why did you move from engineering to product?',
    answer:
      'I kept hitting questions the code could not answer. Not how to build it, but whether it was the right thing, what to cut, and whose problem it actually solved. Tesla and the Autodesk full-stack internship made the systems legible to me; product is where those systems meet a direction. I did not leave engineering so much as widen what I was responsible for, which is why I still prototype instead of writing documents.',
    refIds: ['intuit', 'tesla', 'autodesk-eng', 'autodesk'],
    followUps: [
      'How technical are you as a PM?',
      'Are you a PM or an engineer?',
      'What did Tesla teach you about systems?',
    ],
  },
  {
    question: 'What languages and tools do you use?',
    answer:
      'Java, C++, Python, and TypeScript with React on the front. For data, DynamoDB, Redis, PostgreSQL, Snowflake, and Airflow for orchestration. Pact for contract testing across services. Day to day now it is Claude, Cursor, Obsidian, and Jira MCP wired into one workflow, plus Figma for prototypes. I pick the ones I have actually shipped with rather than the ones that look good in a list.',
    refIds: ['autodesk-eng', 'tesla', 'intuit'],
    followUps: [
      "What's your strongest technical experience?",
      'Do you still write code as a PM?',
      'Have you worked on distributed systems?',
    ],
  },
  {
    question: 'What have you built zero to one?',
    answer:
      'LaurelSpace is the biggest one, a childcare CRM where I owned product and engineering end to end. Smaller and faster: TLDW summarized and classified YouTube videos, BrewMates helped students start networking conversations, and I led the six-person team behind the Hack Western hacker portal for 400+ participants. Different sizes, same instinct. Build the real thing to answer the question instead of debating it.',
    refIds: ['stealth-startup', 'tldw', 'brewmates', 'hack-western'],
    followUps: [
      'What is LaurelSpace?',
      'What did you build at Hack Western?',
      'Do you still write code as a PM?',
    ],
  },
  {
    question: 'What is LaurelSpace?',
    answer:
      'A pre-seed CRM for childcare providers where I led product and engineering. I shipped payments, email automation, the database, and the admin workflows, and defined the roadmap, personas, MVP scope, success metrics, and go-to-market through user research and competitive analysis. It is the clearest case of me owning both halves, and the reason I am comfortable when nobody has written the spec yet.',
    refIds: ['stealth-startup'],
    followUps: [
      'What have you built zero to one?',
      'How do you handle ambiguity?',
      'Are you a PM or an engineer?',
    ],
  },
  {
    question: 'What did you build at Hack Western?',
    answer:
      'The full-stack hacker portal, in Next.js and TypeScript, supporting 400+ participants. I built it first, then moved into leading a team of six engineers, owning product vision, technical direction, and delivery across design, operations, sponsorship, and event leadership. It was my first time being responsible for other people\u2019s work rather than just my own.',
    refIds: ['hack-western'],
    followUps: [
      'What have you built zero to one?',
      'Tell me about influencing without authority.',
      'How do you work with remote teams?',
    ],
  },
  {
    question: 'What did you build at Intuit?',
    answer:
      'Onboarding and B2C experiences for TurboTax USA: reusable UI components, animations, tables, and themed views, wired to REST APIs owned by other teams. It was frontend work inside a large existing component system, with theming rules and animation conventions already set.',
    refIds: ['intuit'],
    followUps: [
      'What did you learn at Intuit?',
      'What did you build at Tesla?',
      "What's your strongest technical experience?",
    ],
  },
  {
    question: 'What did you learn at Intuit?',
    answer:
      'That most of real engineering is integration. It was my first time building inside a system I did not design, so the job was making onboarding UI sit cleanly inside somebody else\u2019s component library, theming, and animation conventions, against APIs other teams owned. Fitting in correctly turned out to be harder and more useful than building something new in isolation.',
    refIds: ['intuit'],
    followUps: [
      'What did you build at Intuit?',
      'Why did you move from engineering to product?',
      'How do you work with remote teams?',
    ],
  },
  {
    question: 'How do your experiences connect?',
    answer:
      'Each one trained a different layer. Metaverse Group and OMERS taught automation and leverage, Intuit taught interfaces, Tesla taught systems and what sits under a screen, the Autodesk full-stack internship taught platforms and dependencies, and the PM role taught direction. Nothing replaced the layer before it, it just widened the frame. The Journey page maps it if you want to see the whole thing at once.',
    refIds: ['intuit', 'tesla', 'autodesk-eng', 'autodesk'],
    followUps: [
      'Are you a PM or an engineer?',
      'Why did you move from engineering to product?',
      'What are you looking for next?',
    ],
  },
]

const ANSWER_BY_QUESTION = new Map(
  RECRUITER_ANSWERS.map((entry) => [normalizeQuestion(entry.question), entry])
)

function normalizeQuestion(question: string): string {
  // Strip punctuation and collapse whitespace so a chip label, an autocomplete
  // pick, and a typed-but-identical question all land on the same answer.
  return question
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Exact (normalized) lookup only, no fuzzy matching, so a chip always gets its own answer. */
export function findRecruiterAnswer(query: string): RecruiterAnswer | undefined {
  return ANSWER_BY_QUESTION.get(normalizeQuestion(query))
}

/** Flat list of every curated question, for autocomplete and the chip grid. */
export const RECRUITER_QUESTIONS: string[] = RECRUITER_ANSWERS.map((entry) => entry.question)
