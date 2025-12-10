'use client'

import { ArrowRight } from 'lucide-react'

export interface WorkExperience {
  id: string
  year: string
  company: string
  role: string
  description: string
  tags?: string[]
  image?: {
    src: string
    alt: string
  }
  video?: {
    src: string
    alt: string
  }
}

interface WorkExperiencesProps {
  experiences: WorkExperience[]
  title?: string
}

export default function WorkExperiences({
  experiences,
  title = 'Key Work Experiences',
}: WorkExperiencesProps) {
  // Get first 4 experiences
  const keyExperiences = experiences.slice(0, 4)

  return (
    <section className="py-16 w-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] dark:text-white mb-8 transition-colors font-['Inter',sans-serif]">
            Work
          </h2>
          
          {/* Subheadings */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-black dark:text-white mb-4 transition-colors font-['Inter',sans-serif]">
              I've always been the kind of engineer who can't stop asking why and needed to know every piece of the puzzle.
            </p>
            <p className="text-lg md:text-xl text-black dark:text-white transition-colors font-['Inter',sans-serif]">
              Every role I've taken, I've slowly shifted closer to the user → and hence worked on Sales, PM, Business Analyst and Data teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyExperiences.map((experience, idx) => {
            // Create asymmetrical sizing - alternate between larger and smaller
            const isLarge = idx % 3 === 0
            return (
              <div
                key={experience.id}
                className={`group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col">
                  {/* Large background image/video */}
                  <div className={`relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-[1.02] ${
                    isLarge ? 'aspect-[21/9]' : 'aspect-[16/10]'
                  }`}>
                    {experience.video ? (
                      <video
                        src={experience.video.src}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : experience.image ? (
                      <img
                        src={experience.image.src}
                        alt={experience.image.alt}
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
                      {experience.company}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors font-['Inter',sans-serif]">
                      {experience.role}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}

