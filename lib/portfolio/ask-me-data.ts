import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'

/**
 * "Ask me anything": the questions a recruiter might ask, answered in the first person.
 *
 * Every fact here is already on the site (the home page, the case studies, the About page) or in the
 * grounded answers in `lib/portfolio/agent/answers.ts`. There is no language model: typed questions are matched to the
 * nearest one below by keyword, and anything else gets an honest "not on my list yet" with the email link.
 */
export interface AskItem {
  id: string
  /** The question as it appears in the panel. */
  q: string
  /** Lowercase words and phrases that route a typed question here. Longer phrases count for more. */
  keys: string[]
  /** The answer, one string per paragraph. */
  a: string[]
  links?: { label: string; href: string }[]
  /** Follow-up question ids, shown as `↳` links under the answer. */
  next: string[]
}

export const ASK_INTRO =
  "Hi, I'm Jasmine. Ask me anything a recruiter might want to know. Pick a question or type your own."

/** The questions offered before anyone has asked anything. */
export const ASK_STARTERS = ['who', 'next', 'where', 'autodesk', 'notonresume']

export const ASK_FALLBACK =
  "I don't have a good answer for that one yet. Try one of these, or email me and I'll answer it myself."

export const ASK_ITEMS: AskItem[] = [
  {
    id: 'who',
    q: 'Who are you?',
    keys: ['who are you', 'about you', 'introduce', 'yourself', 'tell me about', 'background', 'summary', 'hello', 'hi'],
    a: [
      "I'm Jasmine, a product engineer based in Toronto. I code while taking careful consideration of the end users, the business context, and product strategy.",
      "I've worked on tech with a deep variety of audiences, from enterprise data teams and factory operators to elderly nonprofit leaders.",
    ],
    next: ['next', 'where', 'engineer_or_pm'],
  },
  {
    id: 'next',
    q: 'What are you looking for next?',
    keys: ['looking for', 'next', 'want', 'role', 'join', 'startup', 'agency', 'open to', 'hiring', 'seeking', 'job', 'available', 'availability'],
    a: [
      "I'm looking to join a startup or an agency and work with a team. More experience, better work.",
      "I'm most useful where the problem is technically deep and the direction isn't settled yet. Platform and data products, where security, access, and trust are real constraints, are the ones I keep coming back to.",
    ],
    next: ['graduate', 'where', 'contact'],
  },
  {
    id: 'graduate',
    q: 'Where are you based, and when do you graduate?',
    keys: ['graduate', 'graduation', 'based', 'live', 'location', 'toronto', 'school', 'university', 'degree', 'western', 'ivey', 'student', 'study', 'education', 'class of'],
    a: [
      "I'm in Toronto. I'm finishing a dual degree in Computer Science and Business at Western University and Ivey Business School, and I graduate in 2027.",
    ],
    next: ['where', 'next', 'contact'],
  },
  {
    id: 'where',
    q: 'Where have you worked?',
    keys: ['worked', 'work history', 'experience', 'internship', 'internships', 'companies', 'company', 'employers', 'previous', 'past roles'],
    a: [
      'I’ve done 7 internships across 4 big tech companies, a Series A startup, a stealth 0→1 and Enterprise IT.',
      'Autodesk twice (full-stack engineering, then platform product), Tesla and Intuit on the frontend, LaurelSpace, OMERS on ServiceNow workflows, and Metaverse Group on growth automation.',
    ],
    links: [{ label: 'See the work', href: '/' }],
    next: ['engineer_or_pm', 'built', 'autodesk'],
  },
  {
    id: 'engineer_or_pm',
    q: 'Are you a PM or an engineer?',
    keys: ['pm or', 'engineer or', 'product manager', 'product engineer', 'pm', 'swe', 'software engineer', 'both'],
    a: [
      'Both, in that order. I came up through engineering, frontend at Intuit and Tesla and full-stack at Autodesk. Most recently I was a Platform Product Manager Intern at Autodesk, working on agentic workflows for enterprise data tools, and I absolutely loved it.',
      'That is why I call myself a product engineer.',
    ],
    next: ['technical_pm', 'autodesk', 'next'],
  },
  {
    id: 'autodesk',
    q: 'What did you own at Autodesk?',
    keys: ['autodesk', 'adp studio', 'data portal', 'platform product', 'platform pm', 'sql', 'data platform', 'own'],
    a: [
      "I owned product strategy for ADP Studio, Autodesk's governed SQL and data-exploration platform, used by 380+ analysts and engineers. For most of the internship I was effectively the solo PM, with no embedded designer.",
      'Adoption went up 60%, usability improved about 50%, and I launched 7+ redesigned workflows. I also led the roadmap for AI-assisted data work (schema assistance, query discovery, SQL autocomplete, MCP integrations), which cut task time about 30%.',
    ],
    next: ['specmode', 'ai', 'technical_pm'],
  },
  {
    id: 'technical_pm',
    q: 'How technical are you as a PM?',
    keys: ['technical', 'code', 'coding', 'prototype', 'prototyping', 'design system', 'write code'],
    a: [
      "Technical enough to build what I'm asking for. Instead of writing a spec and waiting, I prototype in Claude and hand engineering something they can click through.",
      'That caught 20+ usability and technical issues before implementation and cut concept-to-validation time about 40%. I also built the 12-component design system the prototypes were made from, since the team had no designer.',
    ],
    next: ['specmode', 'tech', 'ai'],
  },
  {
    id: 'specmode',
    q: "What's Spec Mode?",
    keys: ['spec mode', 'spec', 'jira', 'communicat', 'product and engineering'],
    a: [
      "At Autodesk I noticed product and engineering weren't communicating effectively, so I created Spec Mode. It combines Jira-like stories, prototype annotations, and guided demos in one place.",
    ],
    next: ['technical_pm', 'remote', 'autodesk'],
  },
  {
    id: 'built',
    q: 'What have you built?',
    keys: ['built', 'build', 'shipped', 'projects', 'project', 'portfolio', 'side project', 'made', 'create'],
    a: [
      'A lot, at different sizes. The biggest is LaurelSpace, a childcare CRM where I owned product and engineering end to end: payments, email automation, the database, and the go-to-market plan.',
      'At Tesla I built factory-camera ML tooling and the video infrastructure under it. At Autodesk, distributed library services and later 7+ redesigned workflows for a governed SQL platform. Smaller and faster: TLDW, BrewMates, and the Hack Western hacker portal for 300+ students.',
    ],
    next: ['laurelspace', 'notonresume', 'ai'],
  },
  {
    id: 'laurelspace',
    q: 'What is LaurelSpace?',
    keys: ['laurelspace', 'laurel', 'childcare', 'crm', '0→1', 'zero to one', 'stealth', 'pre-seed', 'from scratch'],
    a: [
      'A pre-seed childcare operations platform. I led product and engineering for the CRM MVP, from customer discovery through shipping payments, email automation, database infrastructure, and administrative workflows.',
      'I defined the roadmap, customer personas, MVP capabilities, success metrics, and go-to-market strategy through user research and competitive analysis.',
    ],
    next: ['built', 'hackwestern', 'engineer_or_pm'],
  },
  {
    id: 'hackwestern',
    q: 'What do you do at Hack Western?',
    keys: ['hack western', 'hackwestern', 'hackathon', 'dev lead', 'pm lead', 'sponsorship', 'slack'],
    a: [
      "I lead a dev team of 8 for Hack Western, my school's hackathon serving 300+ students. I started by designing and building the full-stack hacker portal.",
      'I joined as Dev Lead, then pitched becoming PM Lead as AI changed how we could build. I introduced new product processes and empowered our dev team to build internal tools, including a sponsorship dashboard connected to Slack through MCP.',
    ],
    next: ['leadership', 'ai', 'users'],
  },
  {
    id: 'leadership',
    q: 'Have you led a team?',
    keys: ['lead', 'led', 'leadership', 'manage', 'team', 'mentor', 'fellowship', 'ips', 'community', 'president'],
    a: [
      "Yes. I lead a dev team of 8 for Hack Western, and I led my school's Product Fellowship for 2 years, hosting 28 product educationals to help students develop PM skills.",
      "Outside of work I've been Product VP of the Ivey Product Society, a hub leader for Rewriting the Code, and president of a municipal youth council, where membership grew 300%.",
    ],
    next: ['hackwestern', 'users', 'notonresume'],
  },
  {
    id: 'ai',
    q: 'How do you use AI in your work?',
    keys: ['ai', 'llm', 'agent', 'agents', 'agentic', 'mcp', 'claude', 'cursor', 'gpt', 'machine learning'],
    a: [
      'At Autodesk I owned the roadmap for AI-assisted data work and built a benchmarking framework across 20+ workflows, so features had to clear accuracy and trust thresholds before launch.',
      'For myself, I wired Claude, Cursor, Obsidian, and Jira MCP into one setup that cut my own process overhead by about 35%. I also built an agent that automates my job applications, including scraping roles and generating outreach.',
    ],
    next: ['mistake', 'tools', 'tech'],
  },
  {
    id: 'tech',
    q: 'What technologies do you use?',
    keys: ['technolog', 'tech stack', 'stack', 'languages', 'language', 'java', 'python', 'react', 'typescript', 'frameworks', 'databases'],
    a: [
      'Java and C++ across microservices at Autodesk, with Spring Boot, DynamoDB, and Redis. TypeScript and React on the frontend at Intuit and Tesla. Python and Selenium for automation at Metaverse Group. PostgreSQL and the Stripe API at LaurelSpace, and ServiceNow at OMERS.',
      'Day to day I work with Claude, Cursor, Obsidian, and Jira MCP.',
    ],
    next: ['tools', 'technical_pm', 'built'],
  },
  {
    id: 'users',
    q: 'How do you work with users?',
    keys: ['user', 'users', 'research', 'customer', 'customers', 'working style', 'process', 'approach', 'workflow', 'how do you work'],
    a: [
      'I start with a small piece of the problem, take it to whoever will actually use it, then prototype it instead of writing it up. I learn by building and asking a lot of questions.',
      "At Autodesk that meant analysts and engineers, plus the Trust, Metadata Management, and AI teams I needed governance sign-off from. My ServiceNow work at OMERS taught me that solving the technical problem means little if you've misread the human one.",
    ],
    next: ['remote', 'mistake', 'technical_pm'],
  },
  {
    id: 'remote',
    q: 'Have you worked with remote teams?',
    keys: ['remote', 'distributed', 'time zone', 'timezone', 'collaborate', 'cross-functional', 'stakeholders', 'india'],
    a: [
      "Mostly distributed, across time zones. On Autodesk's Libraries Platform I worked across four repositories and three engineering teams split between North America, Europe, and India.",
      'As a PM my engineering partners were in India with no in-person overlap, which is part of why I moved to handing over working prototypes instead of specs. Later I was pulled onto a cross-functional group of six engineering teams building toward one shared direction.',
    ],
    next: ['specmode', 'users', 'autodesk'],
  },
  {
    id: 'mistake',
    q: 'Tell me about something that went wrong.',
    keys: ['mistake', 'wrong', 'fail', 'failure', 'weakness', 'challenge', 'hardest', 'ambigu', 'sabbatical'],
    a: [
      "I once shipped an AI feature before it was ready and watched it cost user confidence. It's partly why I built the benchmarking framework across 20+ workflows, so the next feature couldn't launch on optimism.",
      'A different kind of hard: my manager left for a seven-week sabbatical two weeks into my taking the product over. My response was to define the process nobody had written down.',
    ],
    next: ['ai', 'users', 'next'],
  },
  {
    id: 'notonresume',
    q: "What isn't on your resume?",
    keys: ['on your resume', 'on my resume', 'not on', "isn't on", 'customer-facing', 'customer facing', 'other jobs', 'part-time', 'sales', 'server', 'restaurant', 'fun fact', 'interesting', 'personal', 'outside', 'nfc', 'hobby', 'hobbies'],
    a: [
      "I've worked 5+ customer-facing jobs: selling cars at Tesla (plus cold emails, messages, and calls), serving at a sports bar and 2 noodle restaurants, cold-calling sales for a lawn-mowing service, Salesforce integrations for a team of elderly nonprofit leaders, and IT customer service as a ServiceNow intern.",
      "What's been most meaningful, though, is how I've used engineering outside of a job description: a growth system that helped a B2B startup land leads at KPMG, Hugo Boss, and Puma, automating processes at a homeless shelter with Salesforce, and an NFC system that automates my morning walks.",
    ],
    next: ['built', 'tools', 'leadership'],
  },
  {
    id: 'tools',
    q: 'What are your favorite tools?',
    keys: ['favorite tool', 'favourite tool', 'tools', 'obsidian', 'agentation', 'telegram', 'foqus', 'tldr', 'apps', 'tailscale', 'freedom', 'automation', 'automations', 'job hunting', 'zero2sudo', 'interview app', 'nfc'],
    a: [
      'Obsidian is my context brain. Agentation is my favorite for prototyping and being specific about changes. My job hunting system is a Telegram bot that scrapes Simplify and other job boards, keeps five resumes ready for when each role drops, finds contacts and emails them, then reminds me to send a follow-up, because the sale is in the follow-up. Tailscale lets me SSH and code on my MacBook without it collapsing, Apple Automations sets up my day, Foqus, Freedom and NFC chips keep me off my phone, and I read TLDR.tech to keep up with everything product.',
    ],
    next: ['ai', 'tech', 'notonresume'],
  },
  {
    id: 'contact',
    q: 'How can I reach you?',
    keys: ['contact', 'reach', 'email', 'e-mail', 'linkedin', 'github', 'message', 'connect', 'interview', 'chat', 'call', 'book', 'hire'],
    a: ["Email is the fastest way to reach me. I'm also on LinkedIn and GitHub."],
    links: [
      { label: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
      { label: 'LinkedIn', href: SITE_CONTACT.linkedin },
      { label: 'GitHub', href: SITE_CONTACT.github },
    ],
    next: ['next', 'where', 'graduate'],
  },
]

const BY_ID = new Map(ASK_ITEMS.map((item) => [item.id, item]))

export function askItem(id: string): AskItem | undefined {
  return BY_ID.get(id)
}

/** Match typed text to the closest question, or undefined when nothing fits. */
const clean = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9→'\-+ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export function matchAsk(input: string): AskItem | undefined {
  const text = ` ${clean(input)} `
  if (text.trim().length < 2) return undefined
  let best: AskItem | undefined
  let bestScore = 0
  for (const item of ASK_ITEMS) {
    let score = 0
    if (text.includes(clean(item.q))) score += 20
    for (const key of item.keys) {
      // whole words only, so "ai" does not match "email" and "pm" does not match "upmarket"
      const needle = ` ${key} `
      if (text.includes(needle) || (key.length > 4 && text.includes(key))) score += key.length
    }
    if (score > bestScore) {
      best = item
      bestScore = score
    }
  }
  return best
}
