'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

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
    { id: 'what-i-worked-on', label: 'What I Worked On' },
    { id: 'technical-challenges', label: 'Technical Challenges' },
    { id: 'business-outcomes', label: 'Business Outcomes' },
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
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">TESLA • SHIPPED 2025</div>
                  <Link href="/#work-experience" onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>

                <h1 className="text-6xl md:text-7xl font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Building Tesla's Factory Observability Video Player
                </h1>
              <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                I worked on Tesla's factory observability tool. The next step in the roadmap was enabling video-based ML for safety, security, and operations. My role: build the first reusable, production-ready video player that factory teams could use to view ML detections across multiple workflows.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Frontend Engineer</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                  <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>2024</div>
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

              <div className="grid grid-cols-2 gap-4 mb-16">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src="/work/teslagif.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src="/work/teslagif.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
              </section>

              {/* What I Worked On */}
              <section 
                id="what-i-worked-on" 
                ref={(el) => { sectionsRef.current['what-i-worked-on'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  What I Worked On
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I built a video player using Video.js and an internal rendering library (Drawing Studio) that could play sensitive factory footage reliably, display synchronized ML bounding boxes, be reused across workflows, and support operator interactions.
                </p>
                
                <h3 className="text-2xl font-light mb-4 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  1. A Reusable Video Viewer for Factory Operators
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  It became the primary UI for viewing ML results inside the tool and was added as a reusable component in our internal library — standardizing the video experience across teams.
                </p>

                <h3 className="text-2xl font-light mb-4 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Video Player Page & UX Flow
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  I designed the full user flow based on business requirements (no Figma), following our internal design system: thumbnail grid → open modal → video viewer, tooltips & operator-facing metadata, clear entry/exit points, stable UI state across reloads, and modular architecture.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
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
                  Solved challenges around bounding box rendering, security/CORS for sensitive factory footage, and page infrastructure performance.
                </p>
                <div className="space-y-4 mb-8">
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
                          When video ML launched, a new detection format was introduced: bounding boxes, timestamps, detection types, and operator metadata. I worked with backend engineers to define how the frontend would consume this data and documented the integration.
                        </p>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors" style={{ fontFamily: "Inter" }}>
                          Rendering challenges: scaling boxes correctly as the video resized, keeping overlays synchronized frame-by-frame.
                        </p>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors" style={{ fontFamily: "Inter" }}>
                          My solution: parsed detection responses, normalized coordinates, synced overlays to each frame, used Drawing Studio for performant, styled rendering.
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
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Factory footage is highly sensitive. I hit a major blocker: the MP4 endpoint only returned a file location, relied on a new internal library, and couldn't be accessed through our normal API layer. It required strict auth cookies, custom headers, and CORS rules.
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Since Video.js expects public URLs, I built a custom request flow that added credentials: "include" and forwarded the required cookies + headers. This let Video.js stream secured MP4s while remaining fully compliant with Tesla's security requirements.
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
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors" style={{ fontFamily: "Inter" }}>
                          Latency & Data Weight
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Factory videos are large and incident pages needed to load MP4/MOV files, detection metadata, and frequent updates. To keep the UI responsive, I added skeleton loaders, parallel data fetching, Suspense boundaries, and fallback/loading states.
                        </p>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors" style={{ fontFamily: "Inter" }}>
                          Auto-Reloading Data (Without Breaking the UI)
                        </p>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors" style={{ fontFamily: "Inter" }}>
                          Live incident pages refreshed automatically, which originally caused closed modals, reset playback, wiped state, and full component unmounts. My fix: persistent state management, memoized video + overlay state, separating video state vs. metadata state, and diff-based updates instead of full reloads. Operators could continue scrubbing, pausing, or inspecting incidents without interruptions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </section>

              {/* Business Outcomes */}
              <section 
                id="business-outcomes" 
                ref={(el) => { sectionsRef.current['business-outcomes'] = el }}
                className="mb-20 scroll-mt-8"
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Business Outcomes
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  Delivered Tesla's operator-facing ML video viewer and enabled safety/security teams to inspect detections directly on video.
                </p>
                <div className="mb-8">
                  <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg mb-2">
                    ✅ Delivered Tesla's operator-facing ML video viewer
                  </div>
                  <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg mb-2">
                    ✅ Enabled safety/security teams to inspect detections directly on video
                  </div>
                  <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg mb-2">
                    ✅ Reduced friction in incident review
                  </div>
                  <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg mb-2">
                    ✅ Created a reusable foundation for future internal tools
                  </div>
                  <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
                    ✅ Helped Tesla shift from image-only → video-based models
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <video
                      src="/work/teslagif.mp4"
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
