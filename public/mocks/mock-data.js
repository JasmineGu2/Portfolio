// Real content from the site (front page, capability layers, work cards). Only the sticky-note lines are "placeholder notes",
// and each is built from a real fact. Nothing here is invented.
window.SITE = {
  name: 'Jasmine Gu',
  tagline: "I'm a product engineer. I code while taking careful consideration of the end users, the business context, and product strategy.",
  status: 'currently leading engineering @ Hack Western, prev. @ Autodesk, Tesla and Intuit',
  about: "I've worked on tech with a deep variety of audiences, from enterprise data teams and factory operators to elderly nonprofit leaders.",
  highlights: [
    'Completed 7 internships across 4 big tech companies, a Series A startup, a stealth 0→1 and Enterprise IT',
    'Led my school’s Product Fellowship for 2 years, hosting 28 product educationals and helping students develop PM skills',
    'Lead a dev team of 8 for Hack Western, my school’s hackathon serving 300+ students',
    'Most recently, a Platform Product Manager Intern at Autodesk, where I worked on agentic workflows for enterprise data tools, and absolutely loved it',
  ],
  work: [
    { id: 'tesla', n: 'Tesla', line: 'Turning factory-camera inference into workflows operators can act on', tags: ['ML Visualization', 'React', 'Video Infrastructure'], group: 'Engineering', when: 'May to Aug 2025', video: '/work/teslagif.mp4', hover: true, img: '/work/tesla.png' },
    { id: 'autodesk', n: 'Autodesk · ADP Studio', line: 'Owning product strategy for a governed SQL and data-exploration platform', tags: ['Product strategy', 'AI workflows', 'Data governance'], group: 'Product', when: '2026', video: '/work/autodesk-pm.mp4' },
    { id: 'autodesk-eng', n: 'Autodesk Fusion', line: 'Building distributed asset-library services for Autodesk Fusion', tags: ['Microservices', 'Java', 'API reliability'], group: 'Engineering', when: 'Jan to May 2026', video: '/work/autodesk-eng.mp4' },
    { id: 'intuit', n: 'Intuit TurboTax', line: 'Building onboarding experiences for TurboTax.com', tags: ['Onboarding UX', 'Design systems', 'React'], group: 'Engineering', when: 'Summer 2024', video: '/work/Intuit.mp4' },
    { id: 'omers', n: 'OMERS', line: 'Digitizing enterprise workflows and internal services with ServiceNow', tags: ['ServiceNow', 'Workflow automation', 'Enterprise systems'], group: 'Engineering', when: 'Summer 2023', video: '/work/ServiceNowGif.mp4' },
    { id: 'metaverse', n: 'Metaverse Group', line: 'Automating B2B prospecting and improving outreach performance', tags: ['Python', 'Growth automation', 'Data analysis'], group: 'Engineering', when: '2022 to 2023', video: '/work/metaversegroup.mp4' },
    { id: 'laurelspace', n: 'LaurelSpace', line: 'Taking a childcare operations platform from customer discovery to MVP', tags: ['0→1 product', 'GTM', 'Full-stack'], group: 'Product', when: 'Pre-seed', img: '/projects/pm/laurelspace.png' },
    { id: 'hackwestern', n: 'Hack Western', line: 'Leading an 8-person dev team behind Hack Western, serving 300+ students', tags: ['Product vision', 'Engineering leadership', 'Platform'], group: 'Other', when: '2023 to present', img: '/work/hack-western.png' },
    { id: 'ips', n: 'IPS Fellowship', line: 'Led the Product Fellowship for 2 years and hosted 28 product educationals', tags: ['Program leadership', 'Product management', 'Mentorship'], group: 'Other', when: '2 years', img: '/work/ivey-product-cover.jpg' },
  ],
  side: [
    { n: 'TLDW', line: 'Summarizing and classifying YouTube videos', img: '/projects/technical/tldw.png' },
    { n: 'BrewMates', line: 'Helps students approach people at networking events with more confidence', img: '/projects/technical/brewmates.png' },
    { n: 'Email scraping bot', line: 'Automating lead generation and optimizing email campaigns for B2B sales outreach', img: '/projects/technical/bot.png' },
    { n: 'This site', line: 'Projects, experience, and skills in one place', img: '/projects/technical/website.png' },
  ],
  layers: [
    { id: 'swe', label: 'Software Engineering', caps: 'Frontend · Backend · Systems · Infrastructure', color: '#4d90d8', items: [['Frontend', 'Intuit TurboTax', 'B2C onboarding'], ['Infra + ML results', 'Tesla', 'Factory software, data viz'], ['Full-stack', 'Autodesk Fusion', 'Library assets, microservices'], ['Hackathon dev team lead', 'Hack Western', 'Platform for 300+ students']] },
    { id: 'product', label: 'Product', caps: 'Discovery · Prioritization · Product Strategy · Execution', color: '#5fae86', items: [['Technical platform PM', 'Autodesk', 'Governed SQL, AI query UX'], ['PM + engineer', 'LaurelSpace', '0→1 ops platform to MVP'], ['Product lead', 'Hack Western', 'Vision + roadmap, 8-person dev team'], ['Fellowship lead', 'IPS Fellowship', '28 product educationals in 2 years']] },
    { id: 'business', label: 'Business', caps: 'Strategy · Markets · Operations · Incentives', color: '#d9846a', items: [['Solutions engineer', 'OMERS', 'Enterprise service workflows'], ['Developer + analyst', 'Metaverse Group', 'B2B pipeline, 900+ leads'], ['GTM + pricing', 'LaurelSpace', 'Pre-seed positioning'], ['HBA', 'Ivey', 'Strategy, ops, finance']] },
    { id: 'community', label: 'Community', caps: 'Users · Facilitation · Storytelling · Feedback', color: '#9a86d6', items: [['Product + eng lead', 'Hack Western', '300+ students, 8-person team'], ['Fellowship lead', 'IPS Fellowship', 'Helping students develop PM skills'], ['User research', 'Autodesk', 'Interviews with data users']] },
  ],
  timeline: [
    { when: '2022', what: 'Western / Ivey', line: 'Computer Science and Business dual degree', kind: 'school' },
    { when: '2022 to 2023', what: 'Metaverse Group', line: 'Developer and Data Analyst Intern', kind: 'job' },
    { when: 'Summer 2023', what: 'OMERS', line: 'Solutions Engineer, ServiceNow', kind: 'job' },
    { when: '2023', what: 'Hack Western', line: 'Product and Engineering Lead', kind: 'community' },
    { when: 'Summer 2024', what: 'Intuit', line: 'Frontend Engineer Intern', kind: 'job' },
    { when: 'May to Aug 2025', what: 'Tesla', line: 'Frontend Engineering Intern', kind: 'job' },
    { when: 'Jan to May 2026', what: 'Autodesk', line: 'Full-Stack Engineering Intern', kind: 'job' },
    { when: '2026', what: 'Autodesk', line: 'Technical Platform Product Manager Intern', kind: 'job' },
  ],
  notes: ['900+ leads from one Python pipeline', '28 educationals. yes, I counted', 'Toronto. Grad 2027', 'loved the Autodesk internship. said so in writing'],
  photos: [['/gallery/moment-group-fleece.png', 'Team photo'], ['/gallery/moment-tesla-bubu-fest.png', 'Tesla at Bubu Fest'], ['/gallery/moment-night-market.png', 'Night market'], ['/gallery/moment-aerial-letters.png', 'Campus'], ['/gallery/moment-mahjong.png', 'Mahjong night'], ['/gallery/moment-yosemite-valley.png', 'Yosemite']],
}
// helpers shared by the mocks
SITE.media = (p, cls = 'media') => p.video
  ? `<video class="${cls}" src="${p.video}" muted loop playsinline ${p.hover ? `data-hover preload="none" poster="${p.img}"` : 'data-lazy preload="metadata"'}></video>`
  : `<img class="${cls}" src="${p.img}" alt="${p.n}" loading="lazy">`
SITE.tags = (p) => `<div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>`
SITE.sticky = (i, cls = '') => `<div class="sticky ${cls}" data-drag><span class="tape"></span><small>placeholder note</small>${SITE.notes[i]}</div>`
SITE.socials = ['Email', 'LinkedIn', 'GitHub', 'Résumé'].map((s) => `<a class="pill" href="#">${s}</a>`).join(' ')
