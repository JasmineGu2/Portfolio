'use client'

import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Puzzle3DWrapper = dynamic(() => import('@/components/Puzzle3D/Puzzle3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  ),
})

interface WorkExperience {
  id: string
  year: string
  company: string
  role: string
  description: string
  tags?: string[]
  video?: {
    src: string
    alt: string
  }
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
      src: '/work/teslagif.mp4',
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
      src: '/work/Intuit.mp4',
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
      src: '/work/ServiceNowGif.mp4',
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
      src: '/work/metaversegroup.mp4',
      alt: 'Metaverse Group work experience',
    },
  },
]

export default function Home() {
  const keyExperiences = workExperiences.slice(0, 4)

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-6 space-y-2 md:space-y-3 pt-8 md:pt-12">
        {/* Hero Section */}
        <div className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
            <section className="relative flex min-h-screen flex-col w-full">
              <div className="flex flex-col md:flex-row items-start md:items-start gap-8 md:gap-12 mb-12">
                <div className="flex-1 min-w-0">
                  <h1 className="text-5xl md:text-7xl font-bold text-[#2A2A2A] dark:text-white mb-4 leading-tight transition-colors font-['Fraunces',serif] font-light">
                    I'm Jasmine
                  </h1>
                  <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 transition-colors font-['Inter',sans-serif]">
                    <p>Engineer → Aspiring Product Manager.</p>
                    <p className="mt-2">I build systems by connecting the right pieces.</p>
                  </div>
                  
                  <div className="mt-8">
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide transition-colors">
                      Explore my work
                    </h2>
                    <nav className="flex flex-wrap items-center gap-4 md:gap-6">
                      {[
                        { id: 'work-experience', label: 'Work Experience' },
                        { id: 'pm-case-studies', label: 'PM Case Studies' },
                        { id: 'technical-projects', label: 'Technical Projects' },
                      ].map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const element = document.getElementById(item.id)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                          className="text-xs md:text-sm text-[#6B6B6B] dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white hover:bg-transparent rounded-none px-0 py-1 h-auto font-normal transition-colors"
                        >
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-auto mt-8 md:mt-12">
                  <div className="space-y-3">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start text-sm">
                        <div className="text-gray-400 dark:text-gray-500 whitespace-nowrap transition-colors">{exp.year}</div>
                        <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                        <div className="text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">{exp.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full mt-12">
                <div className="relative w-full aspect-video rounded-3xl bg-gray-900 dark:bg-gray-900 overflow-hidden shadow-2xl transition-colors">
                  <div className="absolute inset-0 h-full w-full" style={{ transform: 'scale(1.2)' }}>
                    <Puzzle3DWrapper />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Storytelling Section */}
        <div className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="max-w-4xl">
              <p className="text-lg md:text-xl text-black dark:text-white mb-8 transition-colors font-['Inter',sans-serif] leading-relaxed">
                I'm the kind of engineer who chases the missing puzzle piece—whether it's buried in code, revealed in user behavior, or shaped by business constraints. Curiosity has pulled every role I've taken into something bigger.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-2 transition-colors font-['Fraunces',serif]">
                    Tesla — Engineer → Sales & Brand Activation
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 transition-colors font-['Inter',sans-serif]">
                    Weekdays: ML observability engineering. Weekends: sales and brand activations. (~2K+ leads across SF events and storefronts)
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-2 transition-colors font-['Fraunces',serif]">
                    Intuit — Frontend SWE → Shadowed PMs
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 transition-colors font-['Inter',sans-serif]">
                    Built TurboTax onboarding and studied how A/B tests and experimentation make signing up for taxes delightful.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-2 transition-colors font-['Fraunces',serif]">
                    OMERS — Solutions Engineer → Business Analyst
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 transition-colors font-['Inter',sans-serif]">
                    Shipped end-to-end enterprise IT solutions—from requirements → dev → QA → business ops.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-2 transition-colors font-['Fraunces',serif]">
                    Metaverse Group — BA → Python Engineer & B2B Growth Lead
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 transition-colors font-['Inter',sans-serif]">
                    Automated B2B outreach with Python, generating 1,000+ leads from KPMG, Puma, and Hugo Boss.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-base text-gray-700 dark:text-gray-300 transition-colors font-['Inter',sans-serif] italic">
                    Next piece of the puzzle: SWE or technical product roles in infra, reliability, and AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div id="work-experience" className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <section className="py-16 w-full">
              <div className="w-full">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] dark:text-white mb-8 transition-colors font-['Fraunces',serif]">
                    Work
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyExperiences.map((experience, idx) => {
                      const isLarge = idx % 3 === 0
                      return (
                        <div
                          key={experience.id}
                          className={`group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 ${
                            isLarge ? 'md:col-span-2' : ''
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="flex flex-col">
                            <div className={`relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] ${
                              isLarge ? 'aspect-[21/9]' : 'aspect-[16/10]'
                            }`}>
                              {experience.video ? (
                                <video
                                  src={experience.video.src}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-colors">
                                  <span className="text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</span>
                                </div>
                              )}
                              
                              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <ArrowRight className="w-5 h-5 text-[#2A2A2A] dark:text-white" />
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-1 transition-colors">
                                {experience.company}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
                                {experience.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </main>
  )
}
