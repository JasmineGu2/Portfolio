// Round 8: Two-road simplified system with clearer visuals
// Engineering (main) and Product (secondary), all converging to current role
// Skills grouped by priority: Frontend Tech, Product Strategy, Fullstack

window.K9DATA = {
  me: { name: 'JASMINE GU', role: 'PRODUCT ENGINEER', current: 'autodesk-pm' },

  // Simplified split: just eng vs product
  exp: [
    { id: 'metaverse', co: 'Metaverse Group', year: 2022, month: 11, duration: '6mo',
      eng: 60, prod: 40, role: 'Growth Eng',
      blurb: 'Built Python outreach bots for B2B leads',
      skills: { fullstack: ['Python', 'Selenium'] } },

    { id: 'omers', co: 'OMERS', year: 2023, month: 5, duration: '4mo',
      eng: 50, prod: 50, role: 'Solutions Eng',
      blurb: 'Designed ServiceNow automation for 8+ processes',
      skills: { product: ['stakeholder management'] } },

    { id: 'intuit', co: 'Intuit', year: 2024, month: 5, duration: '4mo',
      eng: 90, prod: 10, role: 'Frontend Eng',
      blurb: 'Built reusable component library for TurboTax',
      skills: { frontend: ['React', 'TypeScript', 'Design Systems'] } },

    { id: 'ivey', co: 'Ivey', year: 2025, month: 5, duration: '4mo',
      eng: 85, prod: 15, role: 'AI Eng',
      blurb: 'Multi-stage LLM pipelines with LLaMA, Gemini, DeepSeek',
      skills: { fullstack: ['Python', 'LLM pipelines'] } },

    { id: 'tesla', co: 'Tesla', year: 2025, month: 5, duration: '4mo',
      eng: 85, prod: 15, role: 'Frontend/Infra Eng',
      blurb: 'ML factory software and video data infrastructure',
      skills: { frontend: ['React', 'TypeScript'], fullstack: ['Node.js', 'video infrastructure'] } },

    { id: 'autodesk-fs', co: 'Autodesk', year: 2026, month: 1, duration: '5mo',
      eng: 75, prod: 25, role: 'Fullstack Eng',
      blurb: 'Libraries Platform across microservices',
      skills: { fullstack: ['Java', 'C++', 'microservices', 'distributed systems'] } },

    { id: 'autodesk-pm', co: 'Autodesk', year: 2026, month: 5, duration: 'Now',
      eng: 30, prod: 70, role: 'Product Manager (AI)',
      blurb: 'PM for enterprise SQL query tool with AI workflows',
      skills: { product: ['roadmap planning', 'stakeholder management'], fullstack: ['semantic search', 'RAG'] },
      isCurrent: true },
  ],

  // Skill categories prioritized
  skillGroups: {
    frontend: {
      name: 'Frontend Technology',
      icon: '🎨',
      color: '#6366f1',
      skills: ['TypeScript', 'CSS', 'React', 'Design Systems']
    },
    product: {
      name: 'Product Strategy',
      icon: '📊',
      color: '#f97316',
      skills: ['roadmap planning', 'stakeholder management']
    },
    fullstack: {
      name: 'Fullstack Systems',
      icon: '⚙️',
      color: '#3b82f6',
      skills: ['systems', 'microservices', 'C++', 'Java', 'Python']
    },
  },
}
