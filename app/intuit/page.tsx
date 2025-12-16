'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

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
    { id: 'what-was-built', label: 'What Was Built' },
    { id: 'one-key-project', label: 'One Key Project' },
    { id: 'shadowing-pm', label: 'Shadowing the PM Team' },
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
          {/* Right Sidebar Navigation */}
          <aside className="hidden lg:block w-48 flex-shrink-0 fixed top-32 right-4 h-fit z-40">
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
                  Building TurboTax Onboarding Components for Rapid Experimentation
                </h1>
              <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                TurboTax's onboarding funnel is one of the highest-leverage surfaces in the entire product. It's the moment where users decide whether they trust TurboTax enough to begin filing — and also where the company sees its steepest drop-off.
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                TurboTax personalizes onboarding across persona, intent, promotion, and entry point, meaning each campaign requires unique UI treatments, variants, and experiments.
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                <span className="font-medium">Role:</span> Build reusable UI components to support rapid A/B experimentation across TurboTax.com, making onboarding delightful, low-friction, and personalized.
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
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Onboarding Engineering, PM, Design</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>React, A/B Testing, Component Design</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-16">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src="/work/Intuit.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src="/work/Intuit.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
              </section>

              {/* What Was Built */}
              <section 
                id="what-was-built" 
                ref={(el) => { sectionsRef.current['what-was-built'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  What Was Built
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I implemented several production components that powered experimentation and seasonal onboarding flows across TurboTax.com.
                </p>
                
                <h3 className="text-2xl font-light mb-4 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  1. Reusable Components for the Onboarding Funnel
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4 transition-colors" style={{ fontFamily: "Inter" }}>
                  These included: personalization inputs (name, filing status, goals), progress / step indicators, experiment-friendly call-to-action components, dynamic forms with validation and feature-flag support, card and layout components, and subtle animations that smoothed friction points in the funnel.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  All components were designed to be reused across multiple campaigns, allowing PMs and designers to run tests faster and with fewer engineering dependencies.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </section>

              {/* One Key Project */}
              <section 
                id="one-key-project" 
                ref={(el) => { sectionsRef.current['one-key-project'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  One Key Project — Unifying Credit Karma Theming
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  As more Credit Karma (CK) users were funneled into TurboTax, the onboarding experience needed to feel visually cohesive.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4 transition-colors" style={{ fontFamily: "Inter" }}>
                  I worked cross-functionally across TurboTax, Credit Karma, and deployment teams in India to: unify color + theming systems across multiple pages, update components to support both CK and TurboTax design systems, ensure visual consistency across entry points, and coordinate with distributed engineering teams to land changes safely.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  This created a single, coherent onboarding journey for CK users—smoothing drop-off and improving trust during critical signup moments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </section>

              {/* Shadowing the PM Team */}
              <section 
                id="shadowing-pm" 
                ref={(el) => { sectionsRef.current['shadowing-pm'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Shadowing the PM Team
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  To better understand how onboarding decisions were made, I embedded myself with the PM team. This included: attending daily PM standups, reviewing experiment variants + activation results, learning how metrics were defined across surfaces and SKUs, and understanding how campaigns personalized content to different user types.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  This influenced how I built components: flexible, configurable, and optimized for rapid iteration.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/Intuit.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
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
