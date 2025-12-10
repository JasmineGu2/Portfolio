'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { TechnicalProjectsProps } from '@/lib/types'

export default function TechnicalProjects({
  projects,
  title = 'Technical Projects',
}: TechnicalProjectsProps) {
  // Find HackWestern project and separate it from others
  const hackwesternProject = projects.find(p => 
    p.id === 'hackwestern-web-developer' || 
    p.title.toLowerCase().includes('hackwestern')
  )
  const otherProjects = projects.filter(p => 
    p.id !== 'hackwestern-web-developer' && 
    !p.title.toLowerCase().includes('hackwestern')
  )

  return (
    <section className="py-16 w-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          {/* Featured HackWestern Project */}
          {hackwesternProject && (
            <div className="mb-8">
              <Link
                href={hackwesternProject.demo || hackwesternProject.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="flex flex-col">
                  {/* Large background image */}
                  <div className="relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] aspect-[21/9]">
                    {hackwesternProject.image ? (
                      <img
                        src={hackwesternProject.image.src}
                        alt={hackwesternProject.image.alt}
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
                      {hackwesternProject.title}
                    </h3>
                      {hackwesternProject.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
                          {hackwesternProject.description}
                        </p>
                      )}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Small grid for other projects */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherProjects.map((project, idx) => {
              const projectLink = project.demo || project.github || '#'
              return (
                <Link
                  key={project.id}
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 block"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col">
                    {/* Small background image */}
                    <div className="relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] aspect-square">
                      {project.image ? (
                        <img
                          src={project.image.src}
                          alt={project.image.alt}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-colors">
                          <span className="text-gray-400 dark:text-gray-500 text-xs">Image</span>
                        </div>
                      )}
                      
                      {/* Arrow icon on bottom left */}
                      <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowRight className="w-3 h-3 text-[#2A2A2A] dark:text-white" />
                      </div>
                    </div>
                    
                    {/* Text content below */}
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-[#2A2A2A] dark:text-white mb-0.5 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors line-clamp-2 font-['Inter',sans-serif]">
                          {project.description}
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

