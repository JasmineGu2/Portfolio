'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'what-i-worked-on', label: 'What I Worked On' },
  { id: 'business-outcomes', label: 'Business Outcomes' },
  { id: 'technical-challenges', label: 'Technical Challenges' },
]

export default function TeslaCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview')
  const [openChallenges, setOpenChallenges] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  })

  const toggleChallenge = (challengeNum: number) => {
    setOpenChallenges(prev => ({
      ...prev,
      [challengeNum]: !prev[challengeNum]
    }))
  }

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-6 space-y-2 md:space-y-3 pt-8 md:pt-12">
        {/* Fixed Left Sidebar Navigation */}
        <aside className="fixed left-4 md:left-6 top-[calc(4rem+2rem+3rem)] md:top-[calc(5rem+3rem+4rem)] w-64 rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
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

        {/* Main Content centered with left margin for fixed sidebar */}
        <div className="max-w-7xl mx-auto ml-[18rem] md:ml-[20rem] flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
            <main className="px-8 md:px-12 py-12 md:py-16">
              {/* Hero Section */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">TESLA • SHIPPED 2024</div>
                  <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#2A2A2A] dark:text-white leading-tight transition-colors font-['National 2',sans-serif]">
                  Building Tesla's Factory Observability Video Player
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif]">
                  I worked on Tesla's factory observability tool. The next step in the roadmap was enabling video-based ML for safety, security, and operations. My role: build the first reusable, production-ready video player that factory teams could use to view ML detections across multiple workflows.
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Frontend Engineer</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">2024</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TEAM</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Backend Engineers, ML Team</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Video.js, React, API Design, Security</div>
                  </div>
                </div>
              </div>

              {/* What I Worked On */}
              <section id="what-i-worked-on" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">What I Worked On</h2>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">1. A Reusable Video Viewer for Factory Operators</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      I built a video player using Video.js and an internal rendering library (Drawing Studio) that could:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                      <li>Play sensitive factory footage reliably</li>
                      <li>Display synchronized, pixel-aligned ML bounding boxes</li>
                      <li>Be reused across safety, security, and operator workflows</li>
                      <li>Support the interactions operators actually needed (pause, step, fullscreen)</li>
                    </ol>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      It became the primary UI for viewing ML results inside the tool and was added as a reusable component in our internal library — standardizing the video experience across teams.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">Video Player Page & UX Flow</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                      I designed the full user flow based on business requirements (no Figma), following our internal design system:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                      <li>Thumbnail grid → open modal → video viewer</li>
                      <li>Tooltips & operator-facing metadata</li>
                      <li>Clear entry/exit points for navigating incidents</li>
                      <li>UI state that stayed stable across reloads</li>
                      <li>Modular architecture so other pages could reuse the component</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Business Outcomes */}
              <section id="business-outcomes" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">Business Outcomes</h2>
                <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300 transition-colors font-['Feature',sans-serif]">
                  <li className="flex items-start">
                    <span className="text-[#2A2A2A] dark:text-white mr-3">•</span>
                    <span>Delivered Tesla's operator-facing ML video viewer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A2A2A] dark:text-white mr-3">•</span>
                    <span>Enabled safety/security teams to inspect detections directly on video</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A2A2A] dark:text-white mr-3">•</span>
                    <span>Reduced friction in incident review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A2A2A] dark:text-white mr-3">•</span>
                    <span>Created a reusable foundation for future internal tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A2A2A] dark:text-white mr-3">•</span>
                    <span>Helped Tesla shift from image-only → video-based models</span>
                  </li>
                </ul>
              </section>

              {/* Technical Challenges */}
              <section id="technical-challenges" className="mb-20 scroll-mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">Technical Challenges</h2>
                
                <div className="space-y-4">
                  {/* Challenge 1 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(1)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
                        1. Bounding Boxes & API Architecture
                      </h3>
                      {openChallenges[1] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openChallenges[1] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          When video ML launched, a new detection format was introduced:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>bounding boxes</li>
                          <li>timestamps</li>
                          <li>detection types</li>
                          <li>operator metadata/tooltips</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          I worked with backend engineers to define how the frontend would consume this data and documented the integration.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors font-['Feature',sans-serif]">
                          Rendering challenges:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>scaling boxes correctly as the video resized</li>
                          <li>keeping overlays synchronized frame-by-frame</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors font-['Feature',sans-serif]">
                          My solution:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>parsed detection responses</li>
                          <li>normalized coordinates</li>
                          <li>synced overlays to each frame</li>
                          <li>used Drawing Studio for performant, styled rendering (colors, borders, labels)</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Challenge 2 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(2)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
                        2. Security, Cookies, and CORS
                      </h3>
                      {openChallenges[2] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openChallenges[2] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          Factory footage is highly sensitive. I hit a major blocker: the MP4 endpoint only returned a file location, relied on a new internal library, and couldn't be accessed through our normal API layer. It required strict auth cookies, custom headers, and CORS rules.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          Since Video.js expects public URLs, I built a custom request flow that:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                          <li>added <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm transition-colors">credentials: "include"</code></li>
                          <li>forwarded the required cookies + headers</li>
                        </ul>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                          This let Video.js stream secured MP4s while remaining fully compliant with Tesla's security requirements.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Challenge 3 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(3)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white transition-colors font-['Feature',sans-serif]">
                        3. Page Infrastructure & Performance
                      </h3>
                      {openChallenges[3] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openChallenges[3] && (
                      <div className="px-4 pb-4 space-y-4">
                        <div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-medium transition-colors font-['Feature',sans-serif]">
                            Latency & Data Weight
                          </p>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                            Factory videos are large and incident pages needed to load:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 mb-6 transition-colors font-['Feature',sans-serif]">
                            <li>MP4/MOV files</li>
                            <li>detection metadata</li>
                            <li>frequent updates</li>
                          </ul>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                            To keep the UI responsive, I added:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                            <li>skeleton loaders</li>
                            <li>parallel data fetching</li>
                            <li>Suspense boundaries</li>
                            <li>fallback/loading states</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-medium transition-colors font-['Feature',sans-serif]">
                            Auto-Reloading Data (Without Breaking the UI)
                          </p>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors font-['Feature',sans-serif]">
                            Live incident pages refreshed automatically, which originally caused:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 mb-6 transition-colors font-['Feature',sans-serif]">
                            <li>closed modals</li>
                            <li>reset playback</li>
                            <li>wiped state</li>
                            <li>full component unmounts</li>
                          </ul>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-medium transition-colors font-['Feature',sans-serif]">
                            My fix:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4 transition-colors font-['Feature',sans-serif]">
                            <li>persistent state management</li>
                            <li>memoized video + overlay state</li>
                            <li>separating video state vs. metadata state</li>
                            <li>diff-based updates instead of full reloads</li>
                          </ul>
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors font-['Feature',sans-serif]">
                            Operators could continue scrubbing, pausing, or inspecting incidents without interruptions.
                          </p>
                        </div>
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

