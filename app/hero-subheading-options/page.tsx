'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import ExperienceList from '@/components/hero/ExperienceList'

const Puzzle3DWrapper = dynamic(() => import('@/components/Puzzle3D/Puzzle3D'), {
  ssr: false,
})

interface SubheadingOption {
  id: string
  name: string
  description: string
  size: string
  font: string
  letterSpacing?: string
  fontWeight?: string
}

const subheadingOptions: SubheadingOption[] = [
  {
    id: 'inter-base',
    name: 'Inter Base',
    description: 'Current size, Inter font',
    size: 'text-base md:text-lg lg:text-xl',
    font: 'Inter',
  },
  {
    id: 'inter-medium',
    name: 'Inter Medium',
    description: 'Slightly larger, Inter font',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Inter',
  },
  {
    id: 'inter-spaced',
    name: 'Inter Spaced',
    description: 'Medium size with letter spacing',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Inter',
    letterSpacing: 'tracking-wider',
  },
  {
    id: 'inter-wide',
    name: 'Inter Wide',
    description: 'Medium size with wide spacing',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Inter',
    letterSpacing: 'tracking-widest',
  },
  {
    id: 'inter-light',
    name: 'Inter Light',
    description: 'Medium size, lighter weight',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Inter',
    fontWeight: 'font-light',
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    description: 'DM Sans font, medium size',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'DM Sans',
  },
  {
    id: 'dm-sans-spaced',
    name: 'DM Sans Spaced',
    description: 'DM Sans with letter spacing',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'DM Sans',
    letterSpacing: 'tracking-wider',
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    description: 'Fraunces serif font',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Fraunces',
    fontWeight: 'font-light',
  },
  {
    id: 'fraunces-spaced',
    name: 'Fraunces Spaced',
    description: 'Fraunces with letter spacing',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Fraunces',
    fontWeight: 'font-light',
    letterSpacing: 'tracking-wider',
  },
  {
    id: 'syne',
    name: 'Syne',
    description: 'Syne bold font',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Syne',
    fontWeight: 'font-bold',
  },
  {
    id: 'editorial-old',
    name: 'Editorial Old',
    description: 'Editorial Old font (matches name)',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Editorial Old',
    fontWeight: 'font-light',
  },
  {
    id: 'editorial-spaced',
    name: 'Editorial Old Spaced',
    description: 'Editorial Old with wide spacing',
    size: 'text-lg md:text-xl lg:text-2xl',
    font: 'Editorial Old',
    fontWeight: 'font-light',
    letterSpacing: 'tracking-widest',
  },
  {
    id: 'inter-uppercase',
    name: 'Inter Uppercase',
    description: 'Uppercase with spacing',
    size: 'text-base md:text-lg lg:text-xl',
    font: 'Inter',
    letterSpacing: 'tracking-widest',
    fontWeight: 'font-medium',
  },
]

function HeroPreview({ option }: { option: SubheadingOption }) {
  return (
    <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <GridPatternSpotlight />
      </div>
      <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <section className="relative flex flex-col w-full">
          {/* Centered Header and Subheader */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`${option.size} ${option.letterSpacing || ''} ${option.fontWeight || ''} text-gray-500 dark:text-gray-400 mb-6 ${option.id === 'inter-uppercase' ? 'uppercase' : ''}`}
              style={{ fontFamily: option.font }}
            >
              CS and Business Grad Spring 2027
            </div>
            <h1
              className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light italic mb-4 text-[#2A2A2A] dark:text-white leading-tight"
              style={{ fontFamily: "Editorial Old" }}
            >
              I'm Jasmine
            </h1>
            <div className="text-3xl md:text-4xl lg:text-5xl text-gray-600 dark:text-gray-400 italic" style={{ fontFamily: "Inter" }}>
              <p>An engineer who loves connecting the pieces.</p>
            </div>
          </div>

          {/* Work Experience Cards */}
          <div className="flex justify-center mb-8">
            <ExperienceList />
          </div>

          <div className="w-full mb-10">
            <div className="relative w-full aspect-video rounded-3xl bg-gray-900 dark:bg-gray-900 overflow-hidden shadow-2xl transition-colors">
              <div
                className="absolute inset-0 h-full w-full"
                style={{
                  transform: 'scale(1.2)',
                  zIndex: 1
                }}
              >
                <Puzzle3DWrapper />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function HeroSubheadingOptionsPage() {
  const [selectedOption, setSelectedOption] = useState('inter-base')

  const selected = subheadingOptions.find(o => o.id === selectedOption) || subheadingOptions[0]

  return (
    <main className="w-full min-h-screen transition-colors pt-24 pb-12">
      <div className="w-full px-4 md:px-8">
        {/* Selected Hero Preview */}
        <div className="w-full flex justify-center mb-12">
          <HeroPreview option={selected} />
        </div>

        {/* All Options */}
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 text-center" style={{ fontFamily: "Editorial Old" }}>
            Subheading Typography Options ({subheadingOptions.length} options)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subheadingOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
                  selectedOption === option.id
                    ? 'border-[#2A2A2A] dark:border-white ring-2 ring-offset-2 ring-offset-[#F2F2F2] dark:ring-offset-[rgb(23,22,23)] ring-[#2A2A2A] dark:ring-white'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-4 bg-[#F2F2F2] dark:bg-[rgb(23,22,23)]">
                  <div
                    className={`${option.size} ${option.letterSpacing || ''} ${option.fontWeight || ''} text-gray-500 dark:text-gray-400 mb-2 text-center ${option.id === 'inter-uppercase' ? 'uppercase' : ''}`}
                    style={{ fontFamily: option.font }}
                  >
                    CS and Business Grad Spring 2027
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className={`text-sm font-semibold ${
                    selectedOption === option.id
                      ? 'text-[#2A2A2A] dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} style={{ fontFamily: "Inter" }}>
                    {option.name}
                  </div>
                  <div className={`text-xs ${
                    selectedOption === option.id
                      ? 'text-gray-600 dark:text-gray-300'
                      : 'text-gray-500 dark:text-gray-500'
                  }`} style={{ fontFamily: "Inter" }}>
                    {option.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

