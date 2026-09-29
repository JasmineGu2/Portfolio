// Round 5 data: which of her four disciplines each experience touches, in the SITE's own words.
// Every phrase below is a tag, expanded tag, subtitle, role or description line from the portfolio site
// (lib/portfolio/experience-cards-data.ts, capability-layers-data.ts), not from the resume PDF.
// Edit this table to move an experience on any of the maps.
window.K5DATA = {
  disc: [
    { id: 'swe', n: 'Software engineering', s: 'SWE' },
    { id: 'fe', n: 'Frontend', s: 'FE' },
    { id: 'ux', n: 'User experience', s: 'UX' },
    { id: 'pm', n: 'Product management', s: 'PM' },
  ],
  ev: {
    tesla: {
      swe: ['Video Infrastructure', 'API Architecture', 'Anomaly Detection'],
      fe: ['React', 'TypeScript', 'Frontend Performance'],
      ux: ['Workflows operators can act on'],
    },
    autodesk: {
      swe: ['SQL Experience', 'LLM Evaluation', 'MCP'],
      ux: ['UX Prototyping', 'User Research', 'Query-experience redesigns'],
      pm: ['Product Strategy', 'Data Governance'],
    },
    'autodesk-eng': {
      swe: ['Microservices', 'Java', 'API Reliability', 'Search Infrastructure'],
    },
    intuit: {
      swe: ['REST APIs'],
      fe: ['React', 'TypeScript', 'UI Animation', 'Component Libraries'],
      ux: ['Onboarding UX', 'Design Systems'],
    },
    omers: {
      swe: ['ServiceNow', 'Workflow Automation'],
      pm: ['Requirements analysis', 'Stakeholder Discovery', 'Process Design'],
    },
    metaverse: {
      swe: ['Python', 'Selenium', 'Web Scraping'],
    },
    'stealth-startup': {
      swe: ['Full-Stack Development', 'PostgreSQL', 'Stripe API'],
      ux: ['User Research', 'A/B Testing'],
      pm: ['Product Strategy', 'GTM Strategy', 'Product Roadmapping'],
    },
    'hack-western': {
      swe: ['Full-Stack Engineering', 'Platform Development'],
      fe: ['Next.js', 'TypeScript'],
      ux: ['Design reviews', 'Developer Experience'],
      pm: ['Product Vision', 'Roadmapping'],
    },
    'ivey-product': {
      pm: ['Product Management', 'Program Leadership', 'Mentorship'],
    },
    western: {
      swe: ['Computer Science', 'Software Engineering'],
      pm: ['Product Strategy', 'Business'],
    },
  },
  // four ring roads (ellipses) that overlap in all 15 ways, found by search so every region has room for its pins.
  // same order as `disc`: swe, fe, ux, pm. Canvas is 1200 x 640.
  venn: [
    { cx: 572, cy: 328, rx: 316, ry: 188, rot: 32 },
    { cx: 769, cy: 352, rx: 222, ry: 200, rot: 2 },
    { cx: 636, cy: 385, rx: 247, ry: 184, rot: 172 },
    { cx: 549, cy: 307, rx: 339, ry: 136, rot: 165 },
  ],
}
