'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'what-was-built', label: 'What Was Built' },
  { id: 'key-project', label: 'One Key Project' },
  { id: 'shadowing-pm', label: 'Shadowing the PM Team' },
  { id: 'learnings', label: 'Learnings' },
]

export default function IntuitCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview')
  const [openLearnings, setOpenLearnings] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  })

  const toggleLearning = (learningNum: number) => {
    setOpenLearnings(prev => ({
      ...prev,
      [learningNum]: !prev[learningNum]
    }))
  }

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-6 space-y-2 md:space-y-3 pt-8 md:pt-12">
        {/* Fixed Left Sidebar Navigation */}
        <aside className="fixed left-4 md:left-6 top-24 w-64 rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <nav className="p-6 space-y-2">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors font-['Inter',sans-serif] ${
                  activeSection === section.id
                    ? 'text-[#2A2A2A] dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content with left margin for fixed sidebar */}
        <div className="max-w-7xl mx-auto ml-[18rem] md:ml-[20rem]">
          <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
            <main className="px-8 md:px-12 py-12 md:py-16">
              {/* Hero Section */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">INTUIT • 2024</div>
                  <Link href="/#work-experience" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#2A2A2A] dark:text-white leading-tight transition-colors font-['National 2',sans-serif]">
                  Building TurboTax Onboarding Components for Rapid Experimentation
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif]">
                  TurboTax's onboarding funnel is one of the highest-leverage surfaces in the entire product. It's the moment where users decide whether they trust TurboTax enough to begin filing — and also where the company sees its steepest drop-off.
                </p>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif]">
                  TurboTax personalizes onboarding across persona, intent, promotion, and entry point, meaning each campaign requires unique UI treatments, variants, and experiments.
                </p>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif]">
                  <span className="font-medium">Role:</span> Build reusable UI components to support rapid A/B experimentation across TurboTax.com, making onboarding delightful, low-friction, and personalized.
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Software Engineer Intern</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">2024</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TEAM</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Onboarding Engineering, PM, Design</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">React, A/B Testing, Component Design</div>
                  </div>
                </div>
              </div>

              {/* What Was Built */}
              <section id="what-was-built" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">What Was Built</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">1. Reusable Components for the Onboarding Funnel</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      I implemented several production components that powered experimentation and seasonal onboarding flows across TurboTax.com.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      These included:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                      <li>personalization inputs (name, filing status, goals)</li>
                      <li>progress / step indicators</li>
                      <li>experiment-friendly call-to-action components</li>
                      <li>dynamic forms with validation and feature-flag support</li>
                      <li>card and layout components</li>
                      <li>subtle animations that smoothed friction points in the funnel</li>
                    </ul>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      All components were designed to be reused across multiple campaigns, allowing PMs and designers to run tests faster and with fewer engineering dependencies.
                    </p>
                  </div>
                </div>
              </section>

              {/* One Key Project */}
              <section id="key-project" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">One Key Project — Unifying Credit Karma Theming</h2>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    As more Credit Karma (CK) users were funneled into TurboTax, the onboarding experience needed to feel visually cohesive.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    I worked cross-functionally across TurboTax, Credit Karma, and deployment teams in India to:
                  </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                    <li>unify color + theming systems across multiple pages</li>
                    <li>update components to support both CK and TurboTax design systems</li>
                    <li>ensure visual consistency across entry points</li>
                    <li>coordinate with distributed engineering teams to land changes safely</li>
                  </ul>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    This created a single, coherent onboarding journey for CK users—smoothing drop-off and improving trust during critical signup moments.
                  </p>
                </div>
              </section>

              {/* Shadowing the PM Team */}
              <section id="shadowing-pm" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">Shadowing the PM Team</h2>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    To better understand how onboarding decisions were made, I embedded myself with the PM team.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    This included:
                  </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                    <li>attending daily PM standups</li>
                    <li>reviewing experiment variants + activation results</li>
                    <li>learning how metrics were defined across surfaces and SKUs</li>
                    <li>understanding how campaigns personalized content to different user types</li>
                  </ul>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                    This influenced how I built components: flexible, configurable, and optimized for rapid iteration.
                  </p>
                </div>
              </section>

              {/* Learnings */}
              <section id="learnings" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">Learnings — First Engineering Internship</h2>
                
                <div className="space-y-4">
                  {/* Learning 1 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(1)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
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
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          Starting in a massive monorepo, across multiple collaborating teams, meant navigating ambiguity.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          I learned to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>run a structured "discovery phase" before coding</li>
                          <li>document findings and dead ends</li>
                          <li>validate assumptions proactively with senior engineers</li>
                          <li>recognize when nearly-duplicate SKUs or flows should diverge</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          This improved my velocity and built confidence as a first-time SWE intern.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Learning 2 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(2)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
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
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          To keep pace in a fast-moving environment (with many systems owned by the SJYS team), I created a Notion knowledge base containing:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>updated internal documentation</li>
                          <li>meeting notes and async summaries</li>
                          <li>system diagrams and unknown concepts</li>
                          <li>end-of-day reflections and problem logs</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          Future interns adopted this system, helping them ramp faster.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Learning 3 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleLearning(3)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
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
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          I collaborated daily with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>multiple engineering teams</li>
                          <li>UX and design system teams</li>
                          <li>PMs both inside and outside onboarding</li>
                          <li>Credit Karma engineers</li>
                          <li>the deployment team in India</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          This highlighted how onboarding spans multiple surfaces and how communication is directly tied to shipping speed.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </main>
  )
}

