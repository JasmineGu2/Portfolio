'use client'

import dynamic from 'next/dynamic'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import ExperienceList from './ExperienceList'

const Puzzle3DWrapper = dynamic(() => import('@/components/Puzzle3D/Puzzle3D'), {
  ssr: false,
})

interface HeroLayoutVariationProps {
  layout: 'left-right' | 'top-bottom' | 'overlay-left' | 'overlay-right' | 'centered' | 'split-diagonal'
  name: string
}

export function HeroLayoutVariation({ layout, name }: HeroLayoutVariationProps) {
  const renderLayout = () => {
    switch (layout) {
      case 'left-right':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
            {/* Left Side - Header and Subheader */}
            <div className="flex flex-col items-start text-left">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Right Side - Work Experience List */}
            <div className="flex flex-col justify-start">
              <ExperienceList />
            </div>
          </div>
        )

      case 'top-bottom':
        return (
          <div className="flex flex-col mb-8">
            {/* Top - Header and Subheader */}
            <div className="flex flex-col items-start text-left mb-8">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Bottom - Work Experience List */}
            <div className="flex justify-end">
              <ExperienceList />
            </div>
          </div>
        )

      case 'overlay-left':
        return (
          <div className="relative mb-8">
            {/* Header and Subheader Overlay Left */}
            <div className="absolute left-0 top-0 z-20 max-w-2xl">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Experience List Bottom Right */}
            <div className="absolute right-0 bottom-0 z-20">
              <ExperienceList />
            </div>
            {/* Spacer for overlay */}
            <div className="h-[400px]"></div>
          </div>
        )

      case 'overlay-right':
        return (
          <div className="relative mb-8">
            {/* Header and Subheader Overlay Right */}
            <div className="absolute right-0 top-0 z-20 max-w-2xl text-right">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Experience List Bottom Left */}
            <div className="absolute left-0 bottom-0 z-20">
              <ExperienceList />
            </div>
            {/* Spacer for overlay */}
            <div className="h-[400px]"></div>
          </div>
        )

      case 'centered':
        return (
          <div className="flex flex-col items-center text-center mb-8">
            {/* Centered Header and Subheader */}
            <div className="mb-8">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400 mb-8" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Centered Experience List */}
            <div className="flex justify-center">
              <ExperienceList />
            </div>
          </div>
        )

      case 'split-diagonal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
            {/* Left Top - Header */}
            <div className="flex flex-col items-start text-left">
              <h1 
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                style={{ fontFamily: "Editorial Old" }}
              >
                I'm Jasmine
              </h1>
            </div>
            {/* Right Bottom - Experience List */}
            <div className="flex flex-col justify-end">
              <ExperienceList />
            </div>
            {/* Left Bottom - Subheader */}
            <div className="flex flex-col items-start text-left">
              <div className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                <p>I build systems by connecting the right pieces.</p>
              </div>
            </div>
            {/* Right Top - Empty space for diagonal effect */}
            <div></div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <GridPatternSpotlight />
      </div>
      <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <section className="relative flex flex-col w-full">
          {renderLayout()}

          {/* Puzzle Component */}
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


