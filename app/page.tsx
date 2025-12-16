'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, useState, useEffect } from 'react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

const Puzzle3DWrapper = dynamic(() => import('@/components/Puzzle3D/Puzzle3D'), {
  ssr: false,
})

interface WorkExperience {
  id: string
  year: string
  company: string
  role: string
  description: string
  tags?: string[]
  link?: string
  video?: {
    src: string
    alt: string
  }
}

const experiences = [
  { year: '2026 (Spring)', company: 'Autodesk', role: 'FullStack' },
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
    link: '/tesla',
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
    link: '/intuit',
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
    link: '/omers',
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
    link: '/metaverse',
    video: {
      src: '/work/metaversegroup.mp4',
      alt: 'Metaverse Group work experience',
    },
  },
]

function ScrollFadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const keyExperiences = workExperiences.slice(0, 4)

  return (
    <main className="w-full min-h-screen transition-colors pt-24 md:pt-28 pb-2 md:pb-3">
      <div className="w-full px-4 md:px-8 space-y-2 md:space-y-3">
        {/* Hero Section */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
            <section className="relative flex flex-col w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-full">
                  <h1 
                    className="text-[10rem] md:text-[12rem] lg:text-[14rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                    style={{ fontFamily: "Editorial Old" }}
                  >
                    I'm Jasmine
                  </h1>
                  <div className="text-3xl md:text-4xl mb-8 text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                    <p>I build systems by connecting the right pieces.</p>
                  </div>
                </div>
              </div>

              {/* Experiences Centered Cards - Below Header */}
              <div className="w-full mb-8">
                <div className="flex flex-nowrap gap-2 md:gap-3 justify-center overflow-x-auto">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-sm md:text-base" style={{ fontFamily: "Inter" }}>
                      <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors whitespace-nowrap">{exp.company}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm transition-colors whitespace-nowrap">{exp.year} • {exp.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full mb-10">
                <div className="relative w-full aspect-video rounded-3xl bg-gray-900 dark:bg-gray-900 overflow-hidden shadow-2xl transition-colors">
                  <div 
                    className="absolute inset-0 h-full w-full" 
                    style={{ 
                      transform: 'scale(1.2)', 
                      zIndex: 1
                    }}
                  >
                    <Puzzle3DWrapper />
                  </div>
                  {/* Info Tooltip */}
                  <div className="absolute bottom-4 right-4 z-10 group">
                    <button
                      className="w-6 h-6 rounded-full bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-sm border border-white/20 dark:border-white/20 flex items-center justify-center transition-all duration-200"
                      aria-label="Info"
                    >
                      <svg
                        className="w-4 h-4 text-white/70 dark:text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Inter" }}>
                        Built with React Three.js and open source 3D puzzle model
                      </p>
                      <div className="absolute bottom-0 right-4 transform translate-y-full">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="w-full flex justify-center">
          <div id="work-experience" className="w-full max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
              <section className="py-16 w-full">
                <div className="w-full">
                  <h2 className="text-6xl md:text-7xl font-light text-[#2A2A2A] dark:text-white mb-10 transition-colors" style={{ fontFamily: "Editorial Old" }}>
                    Work
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyExperiences.map((experience, idx) => {
                      const isLarge = idx % 3 === 0
                      const content = (
                        <div className="flex flex-col">
                          <div className={`relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] ${
                            isLarge ? 'aspect-[21/9]' : 'aspect-[16/10]'
                          }`}>
                            {experience.video ? (
                              <video
                                src={experience.video.src}
                                className="relative w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                autoPlay
                                loop
                                muted
                                playsInline
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-colors">
                                <span className="text-gray-400 dark:text-gray-500 text-base">Image Placeholder</span>
                              </div>
                            )}
                            
                            {experience.link && (
                              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <ArrowRight className="w-5 h-5 text-[#2A2A2A] dark:text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Editorial Old" }}>
                              {experience.company}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
                              {experience.role}
                            </p>
                          </div>
                        </div>
                      )
                      
                      return experience.link ? (
                        <Link
                          key={experience.id}
                          href={experience.link}
                          className={`group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                            isLarge ? 'md:col-span-2' : ''
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {content}
                        </Link>
                      ) : (
                        <div
                          key={experience.id}
                          className={`group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 ${
                            isLarge ? 'md:col-span-2' : ''
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {content}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
