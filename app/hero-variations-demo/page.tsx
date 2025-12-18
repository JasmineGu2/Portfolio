'use client'

import { useState } from 'react'
import {
  Variation1_HorizontalCards,
  Variation2_VerticalTimeline,
  Variation3_CompactPills,
  Variation4_RotatingCarousel,
  Variation5_GridLayout,
  Variation6_MinimalText,
  Variation7_HorizontalFlow,
  Variation8_StackedCards,
} from '@/components/hero/WorkExperienceVariations'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

const experiences = [
  { year: '2026 (Spring)', company: 'Autodesk', role: 'FullStack' },
  { year: '2025', company: 'Tesla', role: 'Software Engineer' },
  { year: '2025', company: 'Ivey Business School', role: 'ML Engineer (Research Assistant)' },
  { year: '2024', company: 'Intuit', role: 'Software Engineer' },
  { year: '2023', company: 'OMERS', role: 'Solutions Architect' },
  { year: '2023', company: 'Metaverse Group', role: 'Data Analyst & Engineer' },
]

const variations = [
  { name: 'Variation 1: Horizontal Cards (Current)', component: Variation1_HorizontalCards },
  { name: 'Variation 2: Vertical Timeline', component: Variation2_VerticalTimeline },
  { name: 'Variation 3: Compact Pills', component: Variation3_CompactPills },
  { name: 'Variation 4: Rotating Carousel', component: Variation4_RotatingCarousel },
  { name: 'Variation 5: Grid Layout', component: Variation5_GridLayout },
  { name: 'Variation 6: Minimal Text', component: Variation6_MinimalText },
  { name: 'Variation 7: Horizontal Flow', component: Variation7_HorizontalFlow },
  { name: 'Variation 8: Stacked Cards', component: Variation8_StackedCards },
]

export default function HeroVariationsDemo() {
  const [selectedVariation, setSelectedVariation] = useState(0)
  const SelectedComponent = variations[selectedVariation].component

  return (
    <main className="w-full min-h-screen transition-colors pt-24 pb-12">
      <div className="w-full px-4 md:px-8">
        {/* Hero Section Preview */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
              <section className="relative flex flex-col w-full">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-full">
                    <h1 
                      className="text-[10rem] md:text-[12rem] lg:text-[14rem] font-light mb-6 text-[#2A2A2A] dark:text-white leading-tight"
                      style={{ fontFamily: "Editorial Old" }}
                    >
                      I'm Jasmine
                    </h1>
                    <div className="text-3xl md:text-4xl mb-8 text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                      <p>I build systems by connecting the right pieces.</p>
                    </div>
                  </div>
                </div>

                {/* Work Experience Variation */}
                <SelectedComponent experiences={experiences} />
              </section>
            </div>
          </div>
        </div>

        {/* Variation Selector */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 text-center" style={{ fontFamily: "Editorial Old" }}>
            Choose a Variation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {variations.map((variation, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariation(idx)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedVariation === idx
                    ? 'border-[#2A2A2A] dark:border-white bg-white dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                style={{ fontFamily: "Inter" }}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  selectedVariation === idx
                    ? 'text-[#2A2A2A] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {variation.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}


