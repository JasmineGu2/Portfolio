// Round 4 data, layered on k2-data.js (window.K2). Everything here is real or clearly marked as a placeholder. Swap freely.
window.K4 = {
  // Stock rows: the "price" is a real number from the site's own facts, the ticker is a playful label (only ADSK and TSLA are real tickers).
  stocks: [
    { t: 'ADSK', n: 'Autodesk', v: '380+', u: 'ADP Studio users', logo: '/work/autodesk-icon.png', id: 'autodesk' },
    { t: 'TSLA', n: 'Tesla', v: '10+', u: 'production UI components', logo: '/work/tesla.png', id: 'tesla' },
    { t: 'MVG', n: 'Metaverse Group', v: '900+', u: 'leads from one pipeline', logo: '/work/metaverse.png', id: 'metaverse' },
    { t: 'HKW', n: 'Hack Western', v: '300+', u: 'students on one platform', logo: '/work/hack-western.png', id: 'hack-western' },
    { t: 'IPS', n: 'IPS Fellowship', v: '28', u: 'product educationals', logo: '/work/ivey-product-cover.jpg', id: 'ivey-product' },
  ],
  // Rotating pins. She has not sent her Pinterest quotes yet, so these are lines from her own site copy, marked "placeholder pin".
  quotes: [
    'I code while taking careful consideration of the end users, the business context, and product strategy.',
    "I've worked on tech with a deep variety of audiences.",
    'Built 0→1 products at startups, where there wasn’t an established roadmap or system to inherit.',
    'Built an agent to automate my own job applications.',
    '28 educationals. yes, I counted',
  ],
  // face cards in the blackjack game use her photos
  faces: { J: '/gallery/moment-bruno-mars-mural.png', Q: '/gallery/moment-shanghai-skyline.png', K: '/gallery/moment-yosemite-valley.png' },
  // polaroid gallery (no captions: the file names don't always match the photos)
  photos: ['moment-tesla-bubu-fest', 'moment-group-fleece', 'moment-machu-picchu-llama', 'moment-bruno-mars-mural', 'moment-kyoto-maple-shrine', 'moment-mahjong', 'moment-shanghai-skyline', 'moment-night-market', 'moment-snow-hanfu', 'moment-temple-bar', 'moment-yosemite-valley', 'moment-osaka-gokart', 'moment-barcelona-batllo', 'moment-jigsaw-puzzle', 'moment-lagree-studio', 'moment-wall-collage', 'moment-aerial-letters', 'moment-japan-garden', 'moment-steamed-bao', 'moment-sushi'].map((n) => '/gallery/' + n + '.png'),
  // ID card: real facts only. No ID number, no photo yet.
  id: { name: 'Jasmine Gu', role: 'Product Engineer', loc: 'Toronto', school: 'Western / Ivey', grad: '2027', logo: '/icons/jasmine-logo.png' },
  // footer facts. "currently" comes from the hero status line; the rest is computed live in the page.
  foot: { currently: 'leading engineering at Hack Western', city: 'Toronto', tz: 'America/Toronto', lat: 43.6532, lon: -79.3832, word: 'always curious', sig: 'Jasmine' },
  // hero block, her exact words
  next: { title: "What's next", when: 'Now', text: 'Looking to join a high-ownership, dynamic role in NYC or the Bay Area. Optimizing for learning.' },
  // her favorite tools, in her words
  tools: [
    { n: 'Obsidian', r: 'context brain' },
    { n: 'Agentation', r: 'annotate', note: 'Favorite for prototyping and being specific about changes.' },
    { n: 'Telegram', r: 'job scraping bot' },
    { n: 'Foqus', r: 'NFC chip set up to lock me out' },
    { n: 'TLDR.tech', r: 'keeping up with everything product' },
  ],
  // she has not sent the launches list yet
  launches: [],
  // product trends she's interested in
  productTrends: [
    { title: 'Agentic Interfaces', desc: 'Google\'s shift to Gemini-first approach, building interfaces for agents to best comprehend, GitHub may no longer be suited for the AI-native developer' },
    { title: 'Attention Hacking with AI Slop', desc: 'The rise of Microdramas and compelling AI-generated content' },
    { title: 'Agents for Personal Use', desc: 'I\'d love to see Muse come to WhatsApp in a Poke or customer service way for SMB users' },
  ],
  // custom tools she's built
  customTools: [
    { name: 'Notification & Terminal Setup', desc: 'To support multitasking with outlined notifications' },
    { name: 'Notion Transcript Sync', desc: 'Save transcripts and projects on Notion with modified summarize skill' },
    { name: 'Obsidian Context with Git Syncing', desc: 'PC notepad to Macbook sync, thorough knowledge systems for architecture, PRDs, etc.' },
    { name: 'Job Scraping Bot (Telegram)', desc: 'Scrapes job sites based on repo, learn about startups from curated lists' },
    { name: 'Claude Routine for Thought Leadership', desc: 'Remember threads from TLDR.tech with daily ingestion into Obsidian' },
    { name: 'NFC Chip Setup with Foqus', desc: 'Stop doomscrolling and mandate daily walks outside' },
    { name: 'Tailscale SSH Setup', desc: 'SSH into PC from Macbook Air to prevent overheating' },
    { name: 'Watch & Wear Preload Queue', desc: 'NFC chip by fridge auto-opens watch later queue, NFC chip by bed sets timer & play music' },
  ],
  // side quests she loves
  sideQuests: [
    'Orientation Leader @Uni',
    'Love traveling (Not vacationing! there\'s a difference)',
    'Very competitive board game player (Catan, Secret Hitler, Ticket To Ride, Code names spymaster)',
    'Fashion (shot a magazine for my school\'s fashion club, was the creative director)',
  ],
  // what isn't on her resume, verbatim
  resume: {
    a: { lead: 'What isn’t on my resume is that I’ve worked 5+ customer-facing jobs:', items: ['Selling cars at Tesla + cold emails, messages, and calls', 'Server at a sports bar + 2 noodle restaurants', 'Cold-calling sales for a lawn-mowing service', 'Salesforce integrations for a team of elderly nonprofit leaders', 'IT Customer Service as a ServiceNow Intern'] },
    b: { lead: 'What’s been most meaningful, though, is how I’ve used engineering outside of a job description:',
      items: ['Built a growth engineering system that helped a B2B startup land leads at KPMG, Hugo Boss, and Puma.', 'Worked with a homeless shelter to automate processes and implement Salesforce so staff could spend less time on administration.', 'Built an agent to automate my own job applications, including scraping roles and generating outreach.', 'Built 0→1 products at startups, where there wasn’t an established roadmap or system to inherit.', 'Built systems for people I care about, from an NFC system that automates my morning walks to a custom app for a friend.'],
      lead2: 'I’ve done 7 internships, 4 startup roles, run my own tutoring business, and led Hack Western, but I think what’s most interesting about me is how I use technology to solve problems around me:',
      entries: [['Hack Western', 'Joined as Dev Lead, then pitched becoming PM Lead as AI changed how we could build. I introduced new product processes and empowered our dev team to build internal tools, including a sponsorship dashboard connected to Slack through MCP.'], ['Autodesk', 'As a PM, noticed product and engineering weren’t communicating effectively and created Spec Mode, combining Jira-like stories, prototype annotations, and guided demos.'], ['Startup', 'Built a growth engineering system that brought leads from KPMG, Hugo Boss, and Puma.'], ['Community', 'Helped a homeless shelter automate processes and set up Salesforce.'], ['For myself', 'Built an agent to automate job applications and an NFC system to automate my morning walks.']] },
  },
}
