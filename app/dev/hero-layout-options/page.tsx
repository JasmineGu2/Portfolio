'use client'

import { useState } from 'react'
import { HeroLayoutVariation } from '@/components/hero/HeroLayoutVariations'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

const layoutVariations = [
  {
    id: 'left-right',
    name: 'Left-Right Split',
    description: 'Header on left, experience list on right, side by side',
  },
  {
    id: 'top-bottom',
    name: 'Top-Bottom Stack',
    description: 'Header at top, experience list at bottom right',
  },
  {
    id: 'overlay-left',
    name: 'Overlay Left',
    description: 'Header overlays on left, experience list bottom right',
  },
  {
    id: 'overlay-right',
    name: 'Overlay Right',
    description: 'Header overlays on right, experience list bottom left',
  },
  {
    id: 'centered',
    name: 'Centered',
    description: 'Everything centered vertically and horizontally',
  },
  {
    id: 'split-diagonal',
    name: 'Split Diagonal',
    description: 'Header top left, subheader bottom left, experience top right',
  },
]

export default function HeroLayoutOptionsPage() {
  const [selectedLayout, setSelectedLayout] = useState('left-right')

  return (
    <main className="w-full min-h-screen transition-colors pt-24 pb-12">
      <div className="w-full px-4 md:px-8">
        {/* Hero Section Preview */}
        <div className="w-full flex justify-center mb-12">
          <HeroLayoutVariation 
            layout={selectedLayout as any} 
            name={layoutVariations.find(v => v.id === selectedLayout)?.name || ''}
          />
        </div>

        {/* Layout Selector */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 text-center" style={{ fontFamily: "Editorial Old" }}>
            Choose a Layout Variation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {layoutVariations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setSelectedLayout(variation.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedLayout === variation.id
                    ? 'border-[#2A2A2A] dark:border-white bg-white dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                style={{ fontFamily: "Inter" }}
              >
                <div className={`text-base font-semibold mb-2 ${
                  selectedLayout === variation.id
                    ? 'text-[#2A2A2A] dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {variation.name}
                </div>
                <div className={`text-sm ${
                  selectedLayout === variation.id
                    ? 'text-gray-600 dark:text-gray-300'
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {variation.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}


