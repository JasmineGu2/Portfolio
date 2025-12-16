'use client'

import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export default function MetaverseCaseStudy() {
  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-6 space-y-2 md:space-y-3 pt-8 md:pt-12">
        {/* Fixed Left Sidebar Navigation */}
        <aside className="fixed left-4 md:left-6 top-24 w-64 rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <nav className="p-6 space-y-2">
            <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
              Overview
            </div>
          </nav>
        </aside>

        {/* Main Content with left margin for fixed sidebar */}
        <div className="max-w-7xl mx-auto ml-[18rem] md:ml-[20rem]">
          <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors">
            <main className="px-8 md:px-12 py-12 md:py-16">
              {/* Hero Section */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">METAVERSE GROUP • 2023</div>
                  <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </Link>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#2A2A2A] dark:text-white leading-tight transition-colors font-['National 2',sans-serif]">
                  Metaverse Group B2B Automation
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif]">
                  Hired to analyze business requirements but ended up building email automation tools that generated 900+ leads, triggering conversations with Target, Hugo Boss, and KPMG.
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">ROLE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Data Analyst & Engineer</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">TIMELINE</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">2023</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 transition-colors">SKILLS</div>
                    <div className="text-sm font-medium text-[#2A2A2A] dark:text-white transition-colors font-['Inter',sans-serif]">Data Engineering, Automation, Lead Generation</div>
                  </div>
                </div>
              </div>

              {/* Coming Soon Section */}
              <section className="mb-20">
                <div className="text-center py-20">
                  <div className="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
                      Still Building
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A] dark:text-white transition-colors font-['National 2',sans-serif]">
                    Coming Soon
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors font-['Feature',sans-serif] max-w-2xl mx-auto">
                    I'm still working on documenting this case study. Happy to talk about it—feel free to reach out!
                  </p>
                  <a
                    href="mailto:jasmine@example.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] rounded-lg hover:opacity-90 transition-opacity font-['Inter',sans-serif]"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Me
                  </a>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </main>
  )
}

