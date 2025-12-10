'use client'

import dynamic from 'next/dynamic'
import type { HeroProps, Experience } from '@/lib/types'
import SectionNav from '@/components/ui/section-nav'

const Puzzle3DWrapper = dynamic(() => import('@/components/Puzzle3D/Puzzle3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  ),
})

export default function Hero({
  title,
  subtitle,
  experiences = [],
}: HeroProps) {
  const defaultExperiences: Experience[] = [
    { year: '2025', company: 'Tesla', role: 'Software Engineer' },
    { year: '2025', company: 'Ivey Business School', role: 'ML Engineer (Research Assistant)' },
    { year: '2024', company: 'Intuit', role: 'Software Engineer' },
    { year: '2023', company: 'OMERS', role: 'Solutions Architect' },
    { year: '2023', company: 'Metaverse Group', role: 'Data Analyst & Engineer' },
  ]

  const expList = experiences.length > 0 ? experiences : defaultExperiences

  return (
    <section className="relative flex min-h-screen flex-col w-full">
      {/* Top Row: Name/Text on Left, Experiences on Right */}
      <div className="flex flex-col md:flex-row items-start md:items-start gap-8 md:gap-12 mb-12">
        {/* Left side - Name and Text */}
        <div className="flex-1 min-w-0">
          <h1 className="text-5xl md:text-7xl font-bold text-[#2A2A2A] dark:text-white mb-4 leading-tight transition-colors font-['Fraunces',serif] font-light">
            {title}
          </h1>
          {subtitle && (
            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 transition-colors font-['Inter',sans-serif]">
              <p>Engineer → Aspiring Product Manager.</p>
              <p className="mt-2">I build systems by connecting the right pieces.</p>
            </div>
          )}
          
          {/* Explore my work section with navigation */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide transition-colors">
              Explore my work
            </h2>
            <SectionNav
              items={[
                { id: 'work-experience', label: 'Work Experience' },
                { id: 'pm-case-studies', label: 'PM Case Studies' },
                { id: 'technical-projects', label: 'Technical Projects' },
              ]}
              className="justify-start"
            />
          </div>
        </div>

        {/* Right side - Resume Experiences */}
        <div className="flex-1 w-full md:w-auto mt-8 md:mt-12">
          <div className="space-y-3">
            {expList.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start text-sm">
                <div className="text-gray-400 dark:text-gray-500 whitespace-nowrap transition-colors">{exp.year}</div>
                <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                <div className="text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">{exp.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Puzzle3D Animation - aligned with content above */}
      <div className="w-full mt-12">
        <div className="relative w-full aspect-video rounded-3xl bg-gray-900 dark:bg-gray-900 overflow-hidden shadow-2xl transition-colors">
          <div className="absolute inset-0 h-full w-full" style={{ transform: 'scale(1.2)' }}>
            <Puzzle3DWrapper />
          </div>
        </div>
      </div>
    </section>
  )
}
