'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import { VideoWithSkeleton } from '@/components/ui/video-with-skeleton'
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton'

export default function IntuitCaseStudy() {
  const [openLearnings, setOpenLearnings] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  })
  const [activeSection, setActiveSection] = useState<string>('overview')
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'what-was-built', label: 'What I Built' },
    { id: 'one-key-project', label: 'Unifying Credit Karma Onboarding' },
    { id: 'shadowing-pm', label: 'Working with Product' },
    { id: 'learnings', label: 'Learnings' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = sectionsRef.current[section.id]
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleLearning = (learningNum: number) => {
    setOpenLearnings(prev => ({
      ...prev,
      [learningNum]: !prev[learningNum]
    }))
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = '/#work-experience'
  }

  return (
    <main className="w-full min-h-screen transition-colors pt-24 md:pt-28 pb-2 md:pb-3">
      <div className="w-full px-4 md:px-8 space-y-2 md:space-y-3">
        <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] mx-auto flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="hidden lg:block w-48 flex-shrink-0 h-fit z-40">
            <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
              <div className="absolute inset-0 -z-0">
                <GridPatternSpotlight />
              </div>
              <nav className="relative z-10 p-4 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeSection === section.id
                        ? 'bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    style={{ fontFamily: "Inter" }}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
              {/* Overview Section */}
              <section 
                id="overview" 
                ref={(el) => { sectionsRef.current['overview'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">INTUIT • 2024</div>
                  <Link href="/#work-experience" onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>

                <h1 className="text-6xl md:text-7xl font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  TurboTax Onboarding Experimentation Platform
                </h1>
              <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                TurboTax's onboarding funnel is a high-leverage surface where users decide whether they trust TurboTax enough to begin filing. Because onboarding is personalized across persona, intent, and entry point, each campaign requires distinct UI treatments and experiments.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Software Engineer Intern</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>2024</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TEAM</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Onboarding Engineering</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TECHNOLOGIES</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>React, A/B Testing, Component Design</div>
                </div>
              </div>

              <div className="mb-16">
                <VideoWithSkeleton
                  src="/work/Intuit.mp4"
                  className="rounded-lg shadow-lg"
                  aspectRatio="aspect-video"
                />
              </div>
              </section>

              {/* What I Built */}
              <section 
                id="what-was-built" 
                ref={(el) => { sectionsRef.current['what-was-built'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  What I Built
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-6 transition-colors" style={{ fontFamily: "Inter" }}>
                  I built reusable frontend components that powered experimentation and seasonal onboarding flows across TurboTax.com. These included personalization inputs, progress indicators, experiment-friendly CTAs, dynamic forms with validation and feature-flag support, shared layout components, and subtle animations to reduce friction.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  All components were designed to be reused across campaigns, enabling faster iteration with fewer engineering dependencies.
                </p>
              </section>

              {/* Unifying Credit Karma Onboarding */}
              <section 
                id="one-key-project" 
                ref={(el) => { sectionsRef.current['one-key-project'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Unifying Credit Karma Onboarding
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  As more Credit Karma users entered TurboTax through different acquisition paths, I worked across TurboTax, Credit Karma, and deployment teams in India to unify theming and component support across both design systems. This created a single, cohesive onboarding experience for Credit Karma users during critical signup moments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <ImageWithSkeleton
                    src="/case-studies/intuit/creditkarma.png"
                    alt="Credit Karma Onboarding"
                    className="rounded-lg shadow-lg"
                    aspectRatio="aspect-video"
                  />
                  <ImageWithSkeleton
                    src="/case-studies/intuit/creditkarma2.png"
                    alt="Credit Karma Onboarding"
                    className="rounded-lg shadow-lg"
                    aspectRatio="aspect-video"
                  />
                </div>
              </section>

              {/* Working with Product */}
              <section 
                id="shadowing-pm" 
                ref={(el) => { sectionsRef.current['shadowing-pm'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Working with Product
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I closely followed the PM team by attending standups and reviewing experiment variants and results, which informed how I built flexible, configurable components to support rapid experimentation.
                </p>
              </section>

              {/* Learnings */}
              <section 
                id="learnings" 
                ref={(el) => { sectionsRef.current['learnings'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Learnings — First Engineering Internship
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  First Engineering Internship — Key learnings from navigating a massive monorepo and collaborating across multiple teams.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(1)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                        1. Asking Good Questions Early
                      </h3>
                      {openLearnings[1] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openLearnings[1] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Starting in a massive monorepo, across multiple collaborating teams, meant navigating ambiguity. I learned to: run a structured "discovery phase" before coding, document findings and dead ends, validate assumptions proactively with senior engineers, and recognize when nearly-duplicate SKUs or flows should diverge.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          This improved my velocity and built confidence as a first-time SWE intern.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(2)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                        2. Onboarding & Retaining Knowledge
                      </h3>
                      {openLearnings[2] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openLearnings[2] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          To keep pace in a fast-moving environment (with many systems owned by the SJYS team), I created a Notion knowledge base containing: updated internal documentation, meeting notes and async summaries, system diagrams and unknown concepts, and end-of-day reflections and problem logs.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Future interns adopted this system, helping them ramp faster.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(3)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                        3. Cross-Collaboration in an Agile Environment
                      </h3>
                      {openLearnings[3] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openLearnings[3] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          I collaborated daily with: multiple engineering teams, UX and design system teams, PMs both inside and outside onboarding, Credit Karma engineers, and the deployment team in India.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          This highlighted how onboarding spans multiple surfaces and how communication is directly tied to shipping speed.
                        </p>
                      </div>
                    )}
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
