'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudiesProps } from '@/lib/types'

export default function CaseStudies({
  caseStudies,
  title = 'PM Case Studies',
}: CaseStudiesProps) {
  // Filter out cards without titles or images
  const validCaseStudies = caseStudies.filter(
    (caseStudy) => caseStudy.title && caseStudy.image
  )

  return (
    <section className="py-16 w-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {validCaseStudies.map((caseStudy, idx) => {
            const projectLink = caseStudy.link || '#'
            // Create asymmetrical sizing - alternate between larger and smaller
            const isLarge = idx % 3 === 0
            return (
              <Link
                key={caseStudy.id}
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 block ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col">
                  {/* Large background image */}
                  <div className={`relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] ${
                    isLarge ? 'aspect-[21/9]' : 'aspect-[16/10]'
                  }`}>
                    {caseStudy.image ? (
                      <img
                        src={caseStudy.image.src}
                        alt={caseStudy.image.alt}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-colors">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</span>
                      </div>
                    )}
                    
                    {/* Arrow icon on bottom left */}
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowRight className="w-5 h-5 text-[#2A2A2A] dark:text-white" />
                    </div>
                  </div>
                  
                  {/* Text content below */}
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-[#2A2A2A] dark:text-white mb-1 transition-colors">
                      {caseStudy.title}
                    </h3>
                      {caseStudy.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
                          {caseStudy.description}
                        </p>
                      )}
                  </div>
                </div>
              </Link>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}

