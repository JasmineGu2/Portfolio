'use client'

import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

interface TextOption {
  id: number
  name: string
  description: string
  header: string
  subheader: string
  headerFont: string
  subheaderFont: string
  headerSize: string
  subheaderSize: string
  headerStyle: string
}

export default function GalleryTextOptionsPage() {
  const textOptions: TextOption[] = [
    {
      id: 1,
      name: 'Current Style',
      description: 'Your current gallery text',
      header: 'Powered by community (and a lot of love)',
      subheader: 'A small collection of the people, communities, and projects I\'ve gotten to help shape along the way.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-xl',
      headerStyle: 'font-light',
    },
    {
      id: 2,
      name: 'Bold & Direct',
      description: 'Strong, confident statement',
      header: 'Community & Impact',
      subheader: 'The people, projects, and communities that have shaped my journey.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-6xl md:text-7xl',
      subheaderSize: 'text-xl',
      headerStyle: 'font-light',
    },
    {
      id: 3,
      name: 'Personal & Warm',
      description: 'More personal, heartfelt tone',
      header: 'The people who made it possible',
      subheader: 'Behind every project and role, there\'s a community of incredible people who believed, supported, and pushed me forward.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light italic',
    },
    {
      id: 4,
      name: 'Minimal & Clean',
      description: 'Short and simple',
      header: 'Gallery',
      subheader: 'People, communities, projects.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-6xl md:text-7xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 5,
      name: 'Storytelling',
      description: 'Narrative approach',
      header: 'Beyond the code',
      subheader: 'These are the moments, people, and communities that have shaped who I am—both as an engineer and as a person.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 6,
      name: 'Gratitude Focus',
      description: 'Thankful and appreciative',
      header: 'Thank you',
      subheader: 'To everyone who has been part of this journey—your support, mentorship, and collaboration mean everything.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-6xl md:text-7xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 7,
      name: 'Impact Focused',
      description: 'Emphasizes impact and change',
      header: 'Making an impact, together',
      subheader: 'From product bootcamps to community leadership—these are the spaces where I\'ve had the privilege to contribute and grow.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 8,
      name: 'Casual & Friendly',
      description: 'Relaxed, approachable tone',
      header: 'The people behind the work',
      subheader: 'A peek into the communities, projects, and people who\'ve made this journey meaningful.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 9,
      name: 'Professional',
      description: 'Formal and structured',
      header: 'Community Engagement & Leadership',
      subheader: 'A comprehensive overview of my involvement in various communities, leadership roles, and collaborative projects.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-base',
      headerStyle: 'font-light',
    },
    {
      id: 10,
      name: 'Poetic',
      description: 'More lyrical and expressive',
      header: 'Where connections become collaborations',
      subheader: 'In every role, every project, every moment—there are people who turned ideas into reality and challenges into opportunities.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light italic',
    },
    {
      id: 11,
      name: 'Question Format',
      description: 'Engages with a question',
      header: 'What drives me?',
      subheader: 'The answer isn\'t just in the code—it\'s in the communities I\'ve built, the people I\'ve learned from, and the impact we\'ve created together.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
    {
      id: 12,
      name: 'Journey Focused',
      description: 'Emphasizes the journey',
      header: 'The journey so far',
      subheader: 'From student to engineer, from participant to leader—these are the communities and people who\'ve been part of the journey.',
      headerFont: 'Editorial Old',
      subheaderFont: 'Inter',
      headerSize: 'text-5xl md:text-6xl',
      subheaderSize: 'text-lg',
      headerStyle: 'font-light',
    },
  ]

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-8 space-y-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-4 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Gallery Text Options
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
            Choose your preferred text style for the gallery page
          </p>
        </div>

        {textOptions.map((option) => (
          <div
            key={option.id}
            className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-8 md:py-12">
              <div className="mb-4">
                <h3 className="text-2xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Option {option.id}: {option.name}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 transition-colors mb-6" style={{ fontFamily: "Inter" }}>
                  {option.description}
                </p>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <h1
                  className={`${option.headerSize} ${option.headerStyle} text-[#2A2A2A] dark:text-white mb-6 transition-colors`}
                  style={{ fontFamily: option.headerFont }}
                >
                  {option.header}
                </h1>
                <p
                  className={`${option.subheaderSize} text-gray-600 dark:text-gray-400 transition-colors`}
                  style={{ fontFamily: option.subheaderFont }}
                >
                  {option.subheader}
                </p>
              </div>

              {/* Code */}
              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-2" style={{ fontFamily: "Inter" }}>
                  Header: "{option.header}"
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono" style={{ fontFamily: "Inter" }}>
                  Subheader: "{option.subheader}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

