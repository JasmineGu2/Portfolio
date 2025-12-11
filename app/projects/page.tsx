'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { caseStudies, technicalProjects } from '@/lib/projects-data'

export default function ProjectsPage() {
  const [activeProjectType, setActiveProjectType] = useState<'pm' | 'technical'>('pm')

  const validCaseStudies = caseStudies.filter(
    (caseStudy) => caseStudy.title && caseStudy.image
  )

  const hackwesternProject = technicalProjects.find(p => 
    p.id === 'hackwestern-web-developer' || 
    p.title.toLowerCase().includes('hackwestern')
  )
  const otherProjects = technicalProjects.filter(p => 
    p.id !== 'hackwestern-web-developer' && 
    !p.title.toLowerCase().includes('hackwestern')
  )

  return (
    <main className="w-full min-h-screen flex justify-center transition-colors pt-16 md:pt-20">
      <div className="w-full max-w-[75%] space-y-6 py-6">
        <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] px-6 md:px-12 py-12 md:py-16 transition-colors">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-fit">
              <button
                onClick={() => setActiveProjectType('pm')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeProjectType === 'pm'
                    ? 'bg-white dark:bg-gray-700 text-[#2A2A2A] dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
                )}
              >
                PM Projects
              </button>
              <button
                onClick={() => setActiveProjectType('technical')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeProjectType === 'technical'
                    ? 'bg-white dark:bg-gray-700 text-[#2A2A2A] dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
                )}
              >
                Technical Projects
              </button>
            </div>
          </div>
          
          {/* PM Case Studies Section */}
          <div 
            id="pm-case-studies" 
            className={activeProjectType === 'pm' ? 'block' : 'hidden'}
          >
            <section className="py-16 w-full">
              <div className="w-full">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {validCaseStudies.map((caseStudy, idx) => {
                      const projectLink = caseStudy.link || '#'
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
                              
                              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <ArrowRight className="w-5 h-5 text-[#2A2A2A] dark:text-white" />
                              </div>
                            </div>
                            
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
          </div>

          {/* Technical Projects Section */}
          <div 
            id="technical-projects" 
            className={activeProjectType === 'technical' ? 'block' : 'hidden'}
          >
            <section className="py-16 w-full">
              <div className="w-full">
                <div className="max-w-7xl mx-auto">
                  {hackwesternProject && (
                    <div className="mb-8">
                      <Link
                        href={hackwesternProject.demo || hackwesternProject.github || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 block"
                      >
                        <div className="flex flex-col">
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
                            
                            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                              <ArrowRight className="w-5 h-5 text-[#2A2A2A] dark:text-white" />
                            </div>
                          </div>
                          
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
                              
                              <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                <ArrowRight className="w-3 h-3 text-[#2A2A2A] dark:text-white" />
                              </div>
                            </div>
                            
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
          </div>
        </div>
      </div>
    </main>
  )
}

