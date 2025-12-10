'use client'

import { useState } from 'react'
import CaseStudies from '@/components/sections/CaseStudies'
import TechnicalProjects from '@/components/sections/TechnicalProjects'
import ProjectToggle from '@/components/ui/project-toggle'
import { caseStudies, technicalProjects } from '@/lib/projects-data'

export default function WorkPage() {
  const [activeProjectType, setActiveProjectType] = useState<'pm' | 'technical'>('pm')

  return (
    <main className="w-full min-h-screen flex justify-center transition-colors pt-20 md:pt-24">
      <div className="w-full max-w-[75%] space-y-6 py-6">
        {/* Projects Section with Toggle */}
        <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] px-6 md:px-12 py-12 md:py-16 transition-colors">
          <div className="mb-8 flex justify-center">
            <ProjectToggle 
              value={activeProjectType}
              onToggle={setActiveProjectType}
            />
          </div>
          
          {/* PM Case Studies Section */}
          <div 
            id="pm-case-studies" 
            className={activeProjectType === 'pm' ? 'block' : 'hidden'}
          >
            <CaseStudies caseStudies={caseStudies} />
          </div>

          {/* Technical Projects Section */}
          <div 
            id="technical-projects" 
            className={activeProjectType === 'technical' ? 'block' : 'hidden'}
          >
            <TechnicalProjects projects={technicalProjects} />
          </div>
        </div>
      </div>
    </main>
  )
}

