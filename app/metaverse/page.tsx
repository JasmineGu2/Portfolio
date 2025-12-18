'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

export default function MetaverseCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>('overview')
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const sections = [
    { id: 'overview', label: 'Overview' },
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
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">METAVERSE GROUP • 2023</div>
                  <Link href="/#work-experience" onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>

                <h1 className="text-6xl md:text-7xl font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Metaverse Group B2B Automation
                </h1>
                <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 transition-colors" style={{ fontFamily: "Inter" }}>
                  Hired to analyze business requirements but ended up building email automation tools that generated 900+ leads, triggering conversations with Target, Hugo Boss, and KPMG.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Data Analyst & Engineer</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>2023</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TEAM</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>B2B Operations</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                    <div className="text-base font-medium text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Inter" }}>Data Engineering, Automation, Lead Generation</div>
                  </div>
                </div>

                <div className="text-center py-20">
                  <div className="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
                      Still Building
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                    Coming Soon
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
                    I'm still working on documenting this case study. Happy to talk about it—feel free to reach out!
                  </p>
                  <a
                    href="mailto:jgu.hba2027@ivey.ca"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] rounded-lg hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "Inter" }}
                  >
                    <Mail className="w-5 h-5" />
                    Contact Me
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
