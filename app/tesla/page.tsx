'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import { VideoWithSkeleton } from '@/components/ui/video-with-skeleton'

export default function TeslaCaseStudy() {
  const [openChallenges, setOpenChallenges] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  })
  const [activeSection, setActiveSection] = useState<string>('overview')
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'what-i-worked-on', label: 'Project Highlight' },
    { id: 'technical-challenges', label: 'Technical Challenges' },
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

  const toggleChallenge = (challengeNum: number) => {
    setOpenChallenges(prev => ({
      ...prev,
      [challengeNum]: !prev[challengeNum]
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
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">TESLA • 2025</div>
                  <Link href="/#work-experience" onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>

                <h1 className="text-6xl md:text-7xl font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Building Tesla's Factory Observability Video Player
                </h1>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-6 transition-colors" style={{ fontFamily: "Inter" }}>
                  At Tesla, I worked on the factory ML observability platform, building operator-facing features that made machine learning outputs usable in production.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I owned the development of many different features including intake and configuration flows, reactive dashboards, charts, and tables that allowed factory teams to monitor and act on ML detections.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I also led the implementation of the platform's first reusable video player, a foundational component that enabled video-based ML workflows for safety, security, and factory operations.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Software Engineer</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>2025</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TEAM</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Backend Engineers, ML Team</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Video.js, React, API Design, Security</div>
                  </div>
                </div>

                <div className="mb-16">
                  <VideoWithSkeleton
                    src="/work/teslagif.mp4"
                    className="rounded-lg shadow-lg"
                    aspectRatio="aspect-video"
                  />
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic transition-colors" style={{ fontFamily: "Inter" }}>
                    Note: Due to NDA restrictions, I cannot discuss other projects I worked on during my time at Tesla. This case study focuses on the video player project which I have permission to share.
                  </p>
                </div>
              </section>

              {/* Project Highlight */}
              <section 
                id="what-i-worked-on" 
                ref={(el) => { sectionsRef.current['what-i-worked-on'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Project Highlight
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-6 transition-colors" style={{ fontFamily: "Inter" }}>
                  I built a <span className="font-medium">production-ready, reusable video viewer</span> for Tesla's factory ML observability platform, designed for operators working with sensitive, high-throughput video data.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-6 transition-colors" style={{ fontFamily: "Inter" }}>
                  The component was built using <span className="font-medium">Video.js</span> alongside an internal rendering library (<span className="font-medium">Drawing Studio</span>) and was responsible for:
                </p>
                
                <ul className="list-disc list-inside space-y-3 text-neutral-800 dark:text-neutral-200 text-base md:text-lg mb-6 ml-4 transition-colors" style={{ fontFamily: "Inter" }}>
                  <li><span className="font-medium">Reliable playback of sensitive factory footage</span> under strict security and performance constraints</li>
                  <li><span className="font-medium">Pixel-accurate, frame-synchronized ML bounding boxes</span>, overlaid in real time</li>
                  <li><span className="font-medium">Operator-first interactions</span> (pause, step-through, fullscreen) aligned with real factory investigation workflows</li>
                  <li><span className="font-medium">Reuse across safety, security, and operational contexts</span>, avoiding one-off implementations</li>
                </ul>

                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  This video viewer became the <span className="font-medium">primary interface for visualizing ML detections</span> in the platform and was later promoted into our <span className="font-medium">internal component library</span>, standardizing video-based ML visualization across teams.
                </p>
              </section>


              {/* Technical Challenges */}
              <section 
                id="technical-challenges" 
                ref={(el) => { sectionsRef.current['technical-challenges'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Technical Challenges
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  Key technical challenges from building a production-ready video player for factory operations.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(1)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
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
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Synchronizing ML bounding boxes with video playback required careful API design. I worked with backend engineers to create endpoints that returned frame-accurate detection data, ensuring bounding boxes aligned perfectly with video frames.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          This required understanding video encoding, frame rates, and how to handle edge cases like variable frame rates and seeking.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(2)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                        2. Security & Performance
                      </h3>
                      {openChallenges[2] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openChallenges[2] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Factory footage is highly sensitive. I implemented secure video streaming with proper authentication, ensuring only authorized operators could access footage. Performance optimization was critical for smooth playback of high-resolution factory videos.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          This included implementing adaptive bitrate streaming and optimizing rendering performance for ML overlays.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleChallenge(3)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                        3. Reusability & Component Design
                      </h3>
                      {openChallenges[3] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    {openChallenges[3] && (
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Making the video player reusable across different workflows required careful component architecture. I designed a modular system that could be configured for different use cases while maintaining consistent UX.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          This included creating a flexible API for customizing controls, overlays, and interactions while keeping the core video playback logic consistent.
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
