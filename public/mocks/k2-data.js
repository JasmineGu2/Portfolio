// Round 2 content: mirrors the CURRENT localhost front page and The Journey (read from experience-cards-data.ts,
// showcase-data.ts, capability-layers-data.ts). Fun facts are built from real content; they are tagged "placeholder note".
window.K2 = {
  name: 'Jasmine Gu',
  headline: "An engineer passionate about building functional technology and delightful experiences.",
  status: "Currently 5th year of CS honors and Business @Western University. Previously SWE @Autodesk, Tesla, and Intuit, Platform PM @Autodesk",
  intro: "An engineer passionate about building functional technology and delightful experiences.",
  hlLead: 'A few highlights (not on my resume)',
  // items are small trusted HTML strings (renderers insert them as innerHTML) so one can carry links
  highlights: [
    'Lead dev on <a href="https://www.hackwestern.com/" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:underline">Hack Western</a>\'s dev team for 2 years (CI/CD, PR standards, full-stack app), shipping the live site for 2,000 students at the university\'s hackathon (<a href="https://archive.hackwestern.com/2025" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:underline">2025</a>)',
    'As VP, ran the <a href="https://www.instagram.com/iveyproductsociety_/" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:underline">Ivey Product Society</a> Fellowship for 2 years, hosting 28 educationals teaching product knowledge',
    'Helped a Series A startup (<a href="https://www.businesswire.com/news/home/20230605005137/en/Tokens.com-Completes-Acquisition-of-Metaverse-Group" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:underline">acquired by Tokens.com</a>) land B2B leads with Hugo Boss, KPMG, and Puma',
    'Engineered 0→1 at a pre-seed startup',
    '7 internships across industries: B2B, B2C, internal tools, dev tools, and more',
    'Built an agent to automate my own job applications',
    'Worked with a homeless shelter to automate processes and implement Salesforce so staff could spend less time on administration',
  ],
  notes: ['Product strategy', 'Systems & architecture', 'AI & ML', 'Data', 'User research'],
  building: [
    "owned product strategy for ADP Studio, Autodesk's governed SQL and data-exploration platform",
    "built ML visualization and anomaly-detection tooling for Tesla's factory camera systems",
    'shipped onboarding UI and animations for TurboTax at Intuit',
    'automated a B2B outreach pipeline that generated 900+ leads at Metaverse Group',
  ],
  previously: [['Data Products', 'Autodesk'], ['ML Systems', 'Tesla'], ['Platform Engineering', 'Autodesk'], ['Consumer Fintech', 'Intuit'], ['Enterprise Automation', 'OMERS'], ['0→1 Product', 'Stealth startup'], ['Growth Automation', 'Metaverse Group'], ['Product Leadership', 'Hack Western'], ['Product Education', 'IPS Fellowship'], ['Education', 'Western / Ivey']],
  contact: { email: 'jgu.hba2027@ivey.ca', linkedin: 'https://www.linkedin.com/in/jasmine-gu-b2aa65201', github: 'https://github.com/JasmineGu2', resume: '#' },

  // all 10 experiences, in the site's tile order; `label` is the orange cursor tag (CURSOR_LABELS in showcase-data.ts)
  exp: [
    { id: 'tesla', co: 'Tesla', role: 'Frontend and Infrastructure Engineering Intern', when: 'Summer 2025', group: 'Engineering', label: 'Factory ML interfaces', sub: 'Turning factory-camera inference into workflows operators can act on', tags: ['ML Visualization', 'React', 'Video Infrastructure'], video: '/work/teslagif.mp4', logo: '/work/tesla.png', kind: 'job', order: 7 },
    { id: 'autodesk', co: 'Autodesk', role: 'Technical Platform Product Manager Intern', when: 'May 2026 to present', group: 'Product', label: 'Product strategy', sub: 'Building governed, AI-assisted query experiences for Autodesk’s data platform', tags: ['Product Strategy', 'Data Governance', 'AI Workflows'], video: '/work/autodesk-pm.mp4', logo: '/work/autodesk-icon.png', kind: 'job', order: 9 },
    { id: 'autodesk-eng', co: 'Autodesk', role: 'Full-Stack Engineering Intern', when: 'Jan to May 2026', group: 'Engineering', label: 'Distributed backend services', sub: 'Building distributed asset-library services for Autodesk Fusion', tags: ['Microservices', 'Java', 'API Reliability'], video: '/work/autodesk-eng.mp4', logo: '/work/autodesk-icon.png', kind: 'job', order: 8 },
    { id: 'intuit', co: 'Intuit', role: 'Frontend Engineer Intern', when: 'Summer 2024', group: 'Engineering', label: 'B2C frontend experiences', sub: 'Building onboarding experiences for TurboTax.com', tags: ['Onboarding UX', 'Design Systems', 'React'], video: '/work/Intuit.mp4', logo: '/work/intuit.png', kind: 'job', order: 6 },
    { id: 'omers', co: 'OMERS', role: 'Solutions Engineer, ServiceNow', when: 'Summer 2023', group: 'Engineering', label: 'Enterprise workflow automation', sub: 'Digitizing enterprise workflows and internal services with ServiceNow', tags: ['ServiceNow', 'Workflow Automation', 'Enterprise Systems'], video: '/work/ServiceNowGif.mp4', logo: '/work/omers.png', kind: 'job', order: 3 },
    { id: 'metaverse', co: 'Metaverse Group', role: 'Developer and Data Analyst Intern', when: '2022 to 2023', group: 'Engineering', label: 'B2B growth automation', sub: 'Automating B2B prospecting and improving outreach performance', tags: ['Python', 'Growth Automation', 'Data Analysis'], video: '/work/metaversegroup.mp4', logo: '/work/metaverse.png', kind: 'job', order: 2 },
    { id: 'stealth-startup', co: 'Stealth', role: 'Product Manager and Engineer Intern', when: 'Pre-seed', group: 'Product', label: '0→1 product', sub: 'Taking a childcare operations platform from customer discovery to MVP', tags: ['Product Strategy', 'Full-Stack Development', 'GTM Strategy'], img: '/work/stealth-startup.png', logo: '/work/stealth-startup.png', kind: 'job', order: 10 },
    { id: 'hack-western', co: 'Hack Western', role: 'Product and Engineering Lead', when: '2023 to present', group: 'Other', label: 'Product leadership', sub: 'Leading an 8-person dev team behind Hack Western, serving 300+ students', tags: ['Product Vision', 'Engineering Leadership', 'Platform Development'], img: '/work/hack-western.png', logo: '/work/hack-western.png', kind: 'community', order: 4 },
    { id: 'ivey-product', co: 'IPS Fellowship', role: 'Product Fellowship Lead', when: '2 years', group: 'Other', label: 'Product education', sub: 'Led the Product Fellowship for 2 years and hosted 28 product educationals', tags: ['Program Leadership', 'Product Management', 'Mentorship'], img: '/work/ivey-product-cover.jpg', logo: '/work/ivey-product-cover.jpg', kind: 'community', order: 5 },
    { id: 'western', co: 'Western / Ivey', role: 'CS + Business Dual Degree', when: '2022 to 2027', group: 'Other', label: 'CS + business degree', sub: 'Studying computer science and business side by side', tags: ['Computer Science', 'Business', 'Product Strategy'], img: '/work/western-ivey-cover.png', logo: '/work/western-ivey-cover.png', kind: 'school', order: 1 },
  ],
  // only these experiences have a full written case study; every other experience tile shows the `comingSoon` tag
  caseStudies: ['autodesk', 'tesla'],
  comingSoon: 'Coming soon',
  comingSoonCursor: 'Case study coming soon',
  side: [
    { n: 'TLDW - Best Build with Co:Here', line: 'Summarizing and classifying YouTube videos', img: '/projects/technical/tldw.png' },
    { n: 'BrewMates - Coffee Chat App', line: 'Helps students approach people at networking events with more confidence.', img: '/projects/technical/brewmates.png' },
    { n: 'Email Scraping Bot - Metaverse Group', line: 'Automating lead generation and optimizing email campaigns for B2B sales outreach.', img: '/projects/technical/bot.png' },
    { n: 'Personal Website', line: 'This site: projects, experience, and skills in one place.', img: '/projects/technical/website.png' },
    { n: 'My UberEats Project - Ivey Product Society', line: 'Educational bootcamp for product design', img: '/projects/pm/ubereats.png' },
    { n: 'Royal Bank of Canada Design Thinking Project', line: 'User research and design thinking for LEAP.', img: '/projects/pm/leap.png' },
    { n: 'Fellowship Project', line: 'A fellowship project on user research and product strategy.', img: '/projects/pm/Fellowship.png' },
  ],
  photos: [['/gallery/moment-group-fleece.png', 'Team photo'], ['/gallery/moment-tesla-bubu-fest.png', 'Tesla at Bubu Fest'], ['/gallery/moment-night-market.png', 'Night market'], ['/gallery/moment-aerial-letters.png', 'Letters on the lawn'], ['/gallery/moment-mahjong.png', 'Mahjong night'], ['/gallery/moment-yosemite-valley.png', 'Yosemite overlook'], ['/gallery/moment-japan-garden.png', 'Japanese garden'], ['/gallery/moment-sushi.png', 'Sushi night'], ['/gallery/moment-osaka-gokart.png', 'Osaka go-kart'], ['/gallery/moment-temple-bar.png', 'Temple Bar']],
  layers: [
    { id: 'swe', label: 'Software Engineering', short: ['SOFTWARE', 'ENGINEERING'], caps: 'Frontend · Backend · Systems · Infrastructure', color: '#4d90d8', items: [['Frontend', 'Intuit TurboTax', 'B2C onboarding'], ['Infra + ML results', 'Tesla', 'Factory software, data viz'], ['Full-stack', 'Autodesk Fusion', 'Library assets, microservices'], ['Hackathon dev team lead', 'Hack Western', 'Platform for 300+ students']] },
    { id: 'product', label: 'Product', short: ['PRODUCT'], caps: 'Discovery · Prioritization · Product Strategy · Execution', color: '#5fae86', items: [['Technical platform PM', 'Autodesk', 'Governed SQL, AI query UX'], ['PM + engineer', 'Stealth startup', '0→1 ops platform to MVP'], ['Product lead', 'Hack Western', 'Vision + roadmap, 8-person dev team'], ['Fellowship lead', 'IPS Fellowship', '28 product educationals in 2 years']] },
    { id: 'business', label: 'Business', short: ['BUSINESS'], caps: 'Strategy · Markets · Operations · Incentives', color: '#d9846a', items: [['Solutions engineer', 'OMERS', 'Enterprise service workflows'], ['Developer + analyst', 'Metaverse Group', 'B2B pipeline, 900+ leads'], ['GTM + pricing', 'Stealth startup', 'Pre-seed positioning'], ['HBA', 'Ivey', 'Strategy, ops, finance']] },
    { id: 'community', label: 'Community', short: ['COMMUNITY'], caps: 'Users · Facilitation · Storytelling · Feedback', color: '#9a86d6', items: [['Product + eng lead', 'Hack Western', '300+ students, 8-person team'], ['Fellowship lead', 'IPS Fellowship', 'Helping students develop PM skills'], ['User research', 'Autodesk', 'Interviews with data users']] },
  ],
  // placeholder notes, each one a real fact
  facts: ['7 internships. 4 of them big tech.', '900+ leads from one Python pipeline', '28 educationals. yes, I counted', '300+ students on one hackathon platform', 'ADP Studio served 380+ users', '10+ production UI components shipped at Tesla', 'Toronto. Grad 2027.'],
}
