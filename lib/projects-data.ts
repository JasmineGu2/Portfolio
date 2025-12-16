import type { CaseStudy, TechnicalProject } from '@/lib/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'ubereats',
    title: 'My UberEats Project - Ivey Product Society',
    category: 'Product Design',
    description: 'Educational bootcamp for product design',
    challenge: 'Learning product design principles',
    solution: 'Applied design thinking and prototyping',
    results: ['Enhanced design skills', 'Product design knowledge', 'Team collaboration'],
    tags: ['Figma', 'Product Design', 'Team Leadership'],
    link: 'https://www.figma.com/proto/uQoQufP7QYdcJpW1jxI7nQ/UberEats-Slides?page-id=0%3A1&node-id=18-11323&starting-point-node-id=18%3A11323&scaling=min-zoom&show-proto-sidebar=1&mode=design&t=ltxlPmzZ6nlexlNy-1',
    image: {
      src: '/projects/pm/ubereats.png',
      alt: 'UberEats Project',
    },
  },
  {
    id: 'rbc-leap',
    title: 'Royal Bank of Canada Design Thinking Project',
    category: 'Design Thinking',
    description: 'User-centric design and research for LEAP. Applied design thinking methodologies to understand user needs and create innovative solutions.',
    challenge: 'Need for user-centric design approach',
    solution: 'Applied design thinking and UX research methodologies',
    results: ['Improved user understanding', 'Innovative solution design', 'Enhanced user experience'],
    tags: ['Design Thinking', 'UX Research', 'Product Design'],
    link: 'https://www.figma.com/file/TItO4qnPpXbOTbgmQntyPH/Untitled?type=design&node-id=0%3A1&mode=design&t=b7TGhkGp8WEKgZFX-1',
    image: {
      src: 'projects/pm/leap.png',
      alt: 'RBC LEAP Project',
    },
  },
  {
    id: 'compass-food-bank',
    title: 'The Compass Food Bank VBA',
    category: 'Automation',
    description: 'Automating task scheduling with VBA to improve operational efficiency and reduce manual work.',
    challenge: 'Manual task scheduling processes',
    solution: 'Developed VBA automation solutions',
    results: ['Reduced manual work', 'Improved efficiency', 'Streamlined operations'],
    tags: ['Excel VBA', 'Automation', 'Process Improvement'],
    link: 'https://thecompass.ca/',
    image: {
      src: '/projects/pm/compassfoodbanklogo.png',
      alt: 'Compass Food Bank Project',
    },
  },
  {
    id: 'fellowship',
    title: 'Fellowship Project',
    category: 'Product Management',
    description: 'Product management fellowship project focusing on user research and product strategy.',
    challenge: 'Understanding user needs and market opportunities',
    solution: 'Applied PM methodologies and user research',
    results: ['Improved product strategy', 'Better user insights', 'Enhanced product decisions'],
    tags: ['Product Management', 'User Research', 'Strategy'],
    link: 'https://j-wang.notion.site/Ivey-Product-Society-Fellowship-Hub-2b5eb5d156a4801494facd629e976be8',
    image: {
      src: '/projects/pm/Fellowship.png',
      alt: 'Fellowship Project',
    },
  },
].filter(caseStudy => caseStudy.title && caseStudy.image)

export const technicalProjects: TechnicalProject[] = [
  {
    id: 'hackwestern-web-developer',
    title: 'HackWestern Web Developer',
    description: 'Web development project built for HackWestern hackathon.',
    technologies: ['React', 'JavaScript', 'Web Development'],
    demo: 'https://www.hackwestern.com/',
    image: {
      src: '/projects/technical/Hackwestern.png',
      alt: 'HackWestern Web Developer Project',
    },
  },
  {
    id: 'tldw',
    title: 'TLDW - Best Build with Co:Here',
    description: 'Summarizing and classifying YouTube videos',
    technologies: ['Web Scraping', 'AI', 'NLP', 'React', 'Django'],
    demo: 'https://devpost.com/software/tldw-too-long-didn-t-watch',
    image: {
      src: '/projects/technical/tldw.png',
      alt: 'TLDW Project',
    },
  },
  {
    id: 'brewmates',
    title: 'BrewMates - Coffee Chat App',
    description: 'Empowering students with tools to approach networking events confidently.',
    technologies: ['React', 'Cohere API', 'QR Code Scanner', 'HTML', 'CSS', 'Firebase', 'Figma'],
    demo: 'https://devpost.com/software/brewmates',
    image: {
      src: '/projects/technical/brewmates.png',
      alt: 'BrewMates Project',
    },
  },
  {
    id: 'email-scraping-bot',
    title: 'Email Scraping Bot - Metaverse Group',
    description: 'Automating lead generation and optimizing email campaigns for B2B sales outreach.',
    technologies: ['Python', 'Selenium', 'Excel', 'PowerBI', 'A/B Testing'],
    github: 'https://github.com/JasmineGu2/scrapeEmail',
    demo: 'https://github.com/JasmineGu2/scrapeEmail',
    image: {
      src: '/projects/technical/bot.png',
      alt: 'Email Scraping Bot',
    },
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    description: 'Personal portfolio website showcasing projects, experience, and skills.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    demo: '#',
    image: {
      src: '/projects/technical/website.png',
      alt: 'Personal Website Project',
    },
  },
]

