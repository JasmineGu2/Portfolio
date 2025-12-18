'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Experience {
  year: string
  company: string
  role: string
}

interface WorkExperienceVariationsProps {
  experiences: Experience[]
}

// VARIATION 1: Current horizontal scrollable cards
export function Variation1_HorizontalCards({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-nowrap gap-2 md:gap-3 justify-center overflow-x-auto">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-sm md:text-base" style={{ fontFamily: "Inter" }}>
            <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors whitespace-nowrap">{exp.company}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm transition-colors whitespace-nowrap">{exp.year} • {exp.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// VARIATION 2: Vertical Timeline
export function Variation2_VerticalTimeline({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8 flex justify-center">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
        
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "Inter" }}>
                  {exp.year}
                </div>
                <div className="font-bold text-lg md:text-xl text-[#2A2A2A] dark:text-white mb-0.5" style={{ fontFamily: "Inter" }}>
                  {exp.company}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                  {exp.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// VARIATION 3: Compact Pills/Badges
export function Variation3_CompactPills({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors group"
            style={{ fontFamily: "Inter" }}
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">{exp.year}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></span>
            <span className="font-semibold text-sm md:text-base text-[#2A2A2A] dark:text-white">{exp.company}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">• {exp.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// VARIATION 4: Rotating Carousel
export function Variation4_RotatingCarousel({ experiences }: WorkExperienceVariationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [experiences.length, isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
    setIsAutoPlaying(false)
  }

  const currentExp = experiences[currentIndex]

  return (
    <div className="w-full mb-8">
      <div className="max-w-2xl mx-auto">
        <div 
          className="relative px-8 py-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2" style={{ fontFamily: "Inter" }}>
              {currentExp.year}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#2A2A2A] dark:text-white mb-2" style={{ fontFamily: "Inter" }}>
              {currentExp.company}
            </div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
              {currentExp.role}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsAutoPlaying(false)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex 
                    ? 'bg-[#2A2A2A] dark:bg-white w-6' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to ${experiences[idx].company}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// VARIATION 5: Grid Layout
export function Variation5_GridLayout({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-105"
            style={{ fontFamily: "Inter" }}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{exp.year}</div>
            <div className="font-bold text-base md:text-lg text-[#2A2A2A] dark:text-white mb-1">{exp.company}</div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{exp.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// VARIATION 6: Minimal Text List
export function Variation6_MinimalText({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="text-center"
            style={{ fontFamily: "Inter" }}
          >
            <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">{exp.year}</span>
            <span className="mx-3 text-gray-400 dark:text-gray-600">•</span>
            <span className="font-semibold text-base md:text-lg text-[#2A2A2A] dark:text-white">{exp.company}</span>
            <span className="mx-3 text-gray-400 dark:text-gray-600">•</span>
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">{exp.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// VARIATION 7: Horizontal Flow with Connectors
export function Variation7_HorizontalFlow({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8 overflow-x-auto">
      <div className="flex items-center justify-center gap-4 md:gap-6 min-w-max px-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center min-w-[120px] md:min-w-[150px]">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "Inter" }}>
                {exp.year}
              </div>
              <div className="font-bold text-sm md:text-base text-[#2A2A2A] dark:text-white mb-1" style={{ fontFamily: "Inter" }}>
                {exp.company}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                {exp.role}
              </div>
            </div>
            
            {/* Connector */}
            {idx < experiences.length - 1 && (
              <div className="flex items-center">
                <div className="w-8 md:w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                <div className="w-8 md:w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// VARIATION 8: Stacked Cards with Hover Effect
export function Variation8_StackedCards({ experiences }: WorkExperienceVariationsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col items-center gap-3 md:gap-4 max-w-md mx-auto">
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="w-full p-4 md:p-5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
            style={{ 
              fontFamily: "Inter",
              transform: `translateX(${idx % 2 === 0 ? '-10px' : '10px'})`
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{exp.year}</div>
                <div className="font-bold text-lg md:text-xl text-[#2A2A2A] dark:text-white mb-1">{exp.company}</div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">{exp.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


