'use client'

import Hero from '@/components/sections/Hero'
import WorkExperiences from '@/components/sections/WorkExperiences'
import type { WorkExperience } from '@/components/sections/WorkExperiences'

const heroData = {
  title: "I'm Jasmine",
  subtitle: 'Engineer → Aspiring Product Manager. I build systems by connecting the right pieces.',
}

const experiences = [
  { year: '2025', company: 'Tesla', role: 'Software Engineer' },
  { year: '2025', company: 'Ivey Business School', role: 'ML Engineer (Research Assistant)' },
  { year: '2024', company: 'Intuit', role: 'Software Engineer' },
  { year: '2023', company: 'OMERS', role: 'Solutions Architect' },
  { year: '2023', company: 'Metaverse Group', role: 'Data Analyst & Engineer' },
]

const workExperiences: WorkExperience[] = [
  {
    id: 'tesla',
    year: '2025',
    company: 'Tesla',
    role: 'Software Engineer',
    description: 'Built enterprise tools and dashboards for Safety and Security teams. Worked on frontend development while gaining insights into hardware UX and customer behavior through retail experience.',
    tags: ['Frontend', 'Enterprise Tools', 'Safety & Security'],
    video: {
      src: '/teslagif.mp4',
      alt: 'Tesla work experience',
    },
  },
  {
    id: 'intuit',
    year: '2024',
    company: 'Intuit',
    role: 'Software Engineer',
    description: 'Developed frontend features for TurboTax and Credit Karma. Spent significant time shadowing PMs, understanding experiments, activation funnels, and growth loops. Learned how data-driven product decisions are made through A/B testing and customer obsession.',
    tags: ['Frontend', 'Product Strategy', 'Growth'],
    video: {
      src: '/icons/Intuit.mp4',
      alt: 'Intuit work experience',
    },
  },
  {
    id: 'omers',
    year: '2023',
    company: 'OMERS',
    role: 'Solutions Architect',
    description: 'Redesigned workflows and automated enterprise processes by 60-70%. Conducted user interviews to understand needs and translated technical requirements into business solutions. Started as a developer and evolved into understanding the intersection of technology and business.',
    tags: ['Solutions Architecture', 'Automation', 'UX Research'],
    video: {
      src: '/ServiceNowGif.mp4',
      alt: 'OMERS work experience',
    },
  },
  {
    id: 'metaverse',
    year: '2023',
    company: 'Metaverse Group',
    role: 'Data Analyst & Engineer',
    description: 'Hired to analyze business requirements but ended up building email automation tools that generated 900+ leads, triggering conversations with Target, Hugo Boss, and KPMG. This was my first experience building something that directly impacts real people and business outcomes.',
    tags: ['Data Engineering', 'Automation', 'Lead Generation'],
    video: {
      src: '/metaversegroup.mp4',
      alt: 'Metaverse Group work experience',
    },
  },
]

export default function Home() {
  return (
    <main className="w-full min-h-screen transition-colors pt-20 md:pt-24">
      <div className="w-full px-4 md:px-6 space-y-4 md:space-y-6 pt-8 md:pt-12">
      {/* Hero Section */}
      <div className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <Hero title={heroData.title} subtitle={heroData.subtitle} experiences={experiences} />
        </div>
      </div>

      {/* Work Experience Section */}
      <div id="work-experience" className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <WorkExperiences experiences={workExperiences} />
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-4xl font-bold text-[#2A2A2A] dark:text-white mb-8 transition-colors">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">Let's connect and build something amazing together.</p>
          <a href="mailto:jasmine@example.com" className="text-[#2A2A2A] dark:text-white font-medium hover:underline transition-colors">
            jasmine@example.com
          </a>
        </div>
      </div>
      </div>
    </main>
  )
}
