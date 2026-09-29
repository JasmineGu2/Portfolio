/** Content for the footer and the Play page. Everything here is her own words or a real fact. */

/** The three public companies she has worked at. Prices come from /api/stocks (live), never from here. */
export const STOCK_META: Record<string, { name: string; logoSrc: string; href: string }> = {
  ADSK: { name: 'Autodesk', logoSrc: '/work/logos/autodesk-square.png', href: '/autodesk' },
  TSLA: { name: 'Tesla', logoSrc: '/work/logos/tesla-square.png', href: '/tesla' },
  INTU: { name: 'Intuit', logoSrc: '/work/logos/intuit-square.png', href: '/work/intuit' },
}

export const FOOTER_FACTS = {
  currently: 'Leading engineering at Hack Western',
  city: 'Toronto',
  timeZone: 'America/Toronto',
  wordmark: 'innovation is easy, integration is hard',
  signature: 'Jasmine',
} as const

/** The footer's quote card: core values, in her own words from around the site. Click the card for another. */
export const FOOTER_QUOTES: readonly string[] = [
  'A strong commitment to always learning and showing up.',
  'I code while taking careful consideration of the end users, the business context, and product strategy.',
  'How I use technology to solve problems around me.',
  'Built 0→1 products at startups, where there wasn’t an established roadmap or system to inherit.',
  'More experience, better work.',
]

/** Rotating pins. Lines from her own copy, until she sends her saved pins. */
export const PLAY_QUOTES: string[] = [
  'Built an agent to automate my own job applications.',
  '28 educationals. yes, I counted',
  'Built systems for people I care about.',
]

/** Face cards in the blackjack game are her photos. */
export const PLAY_FACES: Record<string, string> = {
  J: '/gallery/moment-bruno-mars-mural.png',
  Q: '/gallery/moment-shanghai-skyline.png',
  K: '/gallery/moment-yosemite-valley.png',
}

/** Polaroids you can move around. No captions: the file names do not always match the photos. */
export const PLAY_PHOTOS: string[] = [
  'moment-tesla-bubu-fest',
  'moment-group-fleece',
  'moment-machu-picchu-llama',
  'moment-bruno-mars-mural',
  'moment-kyoto-maple-shrine',
  'moment-mahjong',
  'moment-shanghai-skyline',
  'moment-night-market',
  'moment-snow-hanfu',
  'moment-temple-bar',
  'moment-yosemite-valley',
  'moment-osaka-gokart',
  'moment-barcelona-batllo',
  'moment-jigsaw-puzzle',
  'moment-lagree-studio',
  'moment-wall-collage',
  'moment-aerial-letters',
  'moment-japan-garden',
  'moment-steamed-bao',
  'moment-sushi',
].map((n) => `/gallery/${n}.png`)

export const FAVORITE_TOOLS_LEAD = 'I really love my productivity tools and tech.'

export const FAVORITE_TOOLS: { name: string; role: string; note?: string }[] = [
  { name: 'Obsidian', role: 'context brain' },
  {
    name: 'Agentation',
    role: 'annotate parts of a prototype and let my coding agent know',
    note: 'Favorite for prototyping and being specific about changes.',
  },
  {
    name: 'Job hunting system',
    role: 'a Telegram bot that scrapes Simplify and other job boards to give me a job',
    note: 'Notifications on for Zero2Sudo. 5 different resumes, perfected for when each role drops. It looks for contacts for each role when it drops and emails them, then reminds me to send a follow-up (the sale is in the follow-up).',
  },
  { name: 'Interview app', role: 'my interview app · details [TBD]' },
  { name: 'Foqus', role: 'NFC chip set up to lock me out' },
  { name: 'TLDR.tech', role: 'keeping up with everything product' },
  { name: 'Tailscale', role: 'lets me SSH and code on my MacBook without it collapsing on my MacBook Air' },
  {
    name: 'Apple Automations',
    role: 'sets up my daily to-do list',
    note: 'Opens any relevant tabs for that task for the day, starts my music, opens my Outlook, shuts me out of all distractions and starts a pomodoro timer.',
  },
  { name: 'Freedom', role: 'Foqos for PC, set up as an automation' },
  { name: 'NFC Chips', role: 'daily walks to fix my doomscrolling problem' },
]

/**
 * Engineering lessons, pinned on the About page. Lines from her own answers on the site (the Ask me anything answers
 * on values, working style and beliefs), marked as a placeholder on the card until she writes her own.
 */
export const ENGINEERING_LESSONS: string[] = [
  "Get the real problem right before building. Solving the technical problem means little if you've misread the human one.",
  'Treat security and governance as product concerns, not things bolted on at the end.',
  'Set the bar before launch. I shipped an AI feature before it was ready and watched it cost confidence.',
  'Prototype it instead of writing it up: hand engineering something they can click through.',
  'When anyone can build fast, building stops being the bottleneck and agreement becomes it.',
  "Stickiness is rarely a missing feature. It's the cost of leaving what already works.",
]

/** She has not sent the list of launches yet. The page shows a marked placeholder until this has items. */
export const PRODUCT_LAUNCHES: string[] = []

/** What isn't on the resume, verbatim. */
export const RESUME_NOTES = {
  a: {
    lead: 'What isn’t on my resume is that I’ve worked 5+ customer-facing jobs:',
    items: [
      'Selling cars at Tesla + cold emails, messages, and calls',
      'Server at a sports bar + 2 noodle restaurants',
      'Cold-calling sales for a lawn-mowing service',
      'Salesforce integrations for a team of elderly nonprofit leaders',
      'IT Customer Service as a ServiceNow Intern',
    ],
  },
  b: {
    lead: 'What’s been most meaningful, though, is how I’ve used engineering outside of a job description:',
    items: [
      'Built a growth engineering system that helped a B2B startup land leads at KPMG, Hugo Boss, and Puma.',
      'Worked with a homeless shelter to automate processes and implement Salesforce so staff could spend less time on administration.',
      'Built an agent to automate my own job applications, including scraping roles and generating outreach.',
      'Built 0→1 products at startups, where there wasn’t an established roadmap or system to inherit.',
      'Built systems for people I care about, from an NFC system that automates my morning walks to a custom app for a friend.',
    ],
    lead2:
      'I’ve done 7 internships, 4 startup roles, run my own tutoring business, and led Hack Western, but I think what’s most interesting about me is how I use technology to solve problems around me:',
    entries: [
      ['Hack Western', 'Joined as Dev Lead, then pitched becoming PM Lead as AI changed how we could build. I introduced new product processes and empowered our dev team to build internal tools, including a sponsorship dashboard connected to Slack through MCP.'],
      ['Autodesk', 'As a PM, noticed product and engineering weren’t communicating effectively and created Spec Mode, combining Jira-like stories, prototype annotations, and guided demos.'],
      ['Startup', 'Built a growth engineering system that brought leads from KPMG, Hugo Boss, and Puma.'],
      ['Community', 'Helped a homeless shelter automate processes and set up Salesforce.'],
      ['For myself', 'Built an agent to automate job applications and an NFC system to automate my morning walks.'],
    ] as [string, string][],
  },
}

export const NOTES_LIST = ['Product strategy', 'Systems & architecture', 'AI & ML', 'Data', 'User research']
