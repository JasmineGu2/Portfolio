'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

const storytellingText = "I'm the kind of engineer who chases the missing puzzle piece—whether it's buried in code, revealed in user behavior, or shaped by business constraints. Curiosity has pulled every role I've taken into something bigger."

const experiences = [
  {
    title: "Tesla — Engineer → Sales & Brand Activation",
    description: "Weekdays: ML observability engineering. Weekends: sales and brand activations. (~2K+ leads across SF events and storefronts)"
  },
  {
    title: "Intuit — Frontend SWE → Shadowed PMs",
    description: "Built TurboTax onboarding and studied how A/B tests and experimentation make signing up for taxes delightful."
  },
  {
    title: "OMERS — Solutions Engineer → Business Analyst",
    description: "Shipped end-to-end enterprise IT solutions—from requirements → dev → QA → business ops."
  },
  {
    title: "Metaverse Group — BA → Python Engineer & B2B Growth Lead",
    description: "Automated B2B outreach with Python, generating 1,000+ leads from KPMG, Puma, and Hugo Boss."
  }
]

const closingText = "Next piece of the puzzle: SWE or technical product roles in infra, reliability, and AI"

function AccordionItem({ exp, isOpen, onToggle }: { exp: typeof experiences[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Feature" }}>
          {exp.title}
        </h3>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-3 pt-0">
          <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
            {exp.description}
          </p>
        </div>
      )}
    </div>
  )
}

function TabbedExperiences() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
        {experiences.map((exp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === idx
                ? 'text-[#2A2A2A] dark:text-white border-b-2 border-[#2A2A2A] dark:border-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
            }`}
            style={{ fontFamily: "Inter" }}
          >
            {exp.title.split(' — ')[0]}
          </button>
        ))}
      </div>
      <div className="pt-4">
        <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Feature" }}>
          {experiences[activeTab].title}
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
          {experiences[activeTab].description}
        </p>
      </div>
    </div>
  )
}

export default function StorytellingOptionsPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (variationId: number, index: number) => {
    const key = `${variationId}-${index}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const storytellingVariations = [
    {
      id: 1,
      title: 'Standard Paragraphs - Large Header',
      description: 'Large header with standard paragraph layout',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Editorial Old',
      experienceStyle: 'paragraphs',
      spacing: 'space-y-6'
    },
    {
      id: 2,
      title: 'Bullet List - Clean',
      description: 'Header with bullet point list',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Inter',
      experienceStyle: 'bullets',
      spacing: 'space-y-4'
    },
    {
      id: 3,
      title: 'Collapsible Accordion - Interactive',
      description: 'Header with collapsible experience sections',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Feature',
      experienceStyle: 'accordion',
      spacing: 'space-y-2'
    },
    {
      id: 4,
      title: 'Timeline Style - Vertical',
      description: 'Header with vertical timeline layout',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Instrument Serif',
      experienceStyle: 'timeline',
      spacing: 'space-y-4'
    },
    {
      id: 5,
      title: 'Card Grid - Modern',
      description: 'Header with card-style experience grid',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'National 2',
      experienceStyle: 'cards',
      spacing: 'space-y-4'
    },
    {
      id: 6,
      title: 'Numbered List - Sequential',
      description: 'Header with numbered experience list',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Redaction',
      experienceStyle: 'numbered',
      spacing: 'space-y-4'
    },
    {
      id: 7,
      title: 'Tabbed Interface - Compact',
      description: 'Header with tabbed experience display',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Inter',
      experienceStyle: 'tabs',
      spacing: 'space-y-4'
    },
    {
      id: 8,
      title: 'Quote Style - Elegant',
      description: 'Header with quote-style experience blocks',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Editorial Old',
      experienceStyle: 'quotes',
      spacing: 'space-y-6'
    },
    {
      id: 9,
      title: 'Split Layout - Two Column',
      description: 'Header with two-column experience layout',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Feature',
      experienceStyle: 'split',
      spacing: 'space-y-4'
    },
    {
      id: 10,
      title: 'Minimal Dots - Clean',
      description: 'Header with minimal dot-separated layout',
      headerSize: 'text-2xl md:text-3xl',
      headerFont: 'Inter',
      experienceStyle: 'dots',
      spacing: 'space-y-4'
    }
  ]

  const renderExperiences = (style: string, variationId: number) => {
    switch (style) {
      case 'bullets':
        return (
          <ul className="space-y-3 list-none">
            {experiences.map((exp, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#2A2A2A] dark:text-white mt-2 text-lg">•</span>
                <div>
                  <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Feature" }}>
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                    {exp.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )

      case 'accordion':
        return (
          <div className="space-y-2">
            {experiences.map((exp, idx) => (
              <AccordionItem
                key={idx}
                exp={exp}
                isOpen={openItems[`${variationId}-${idx}`] || false}
                onToggle={() => toggleItem(variationId, idx)}
              />
            ))}
          </div>
        )

      case 'timeline':
        return (
          <div className="relative pl-8 space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#2A2A2A] dark:bg-white border-2 border-[#F2F2F2] dark:border-[rgb(23,22,23)]"></div>
                {idx < experiences.length - 1 && (
                  <div className="absolute left-[5px] top-5 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                )}
                <div className="ml-4">
                  <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Feature" }}>
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )

      case 'cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Feature" }}>
                  {exp.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )

      case 'numbered':
        return (
          <ol className="space-y-4 list-none">
            {experiences.map((exp, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] flex items-center justify-center font-bold text-sm" style={{ fontFamily: "Inter" }}>
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Feature" }}>
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                    {exp.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )

      case 'tabs':
        return <TabbedExperiences />

      case 'quotes':
        return (
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Feature" }}>
                  {exp.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors italic" style={{ fontFamily: "Inter" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )

      case 'split':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Feature" }}>
                  {exp.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )

      case 'dots':
        return (
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2A2A2A] dark:bg-white mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Feature" }}>
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )

      default: // paragraphs
        return (
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Feature" }}>
                  {exp.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <main className="w-full min-h-screen bg-white dark:bg-black transition-colors pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#2A2A2A] dark:text-white mb-12 transition-colors" style={{ fontFamily: "Feature" }}>
          Storytelling Section Display Options
        </h1>

        <div className="space-y-20">
          {storytellingVariations.map((variation) => (
            <div 
              key={variation.id}
              className="border-b border-gray-200 dark:border-gray-800 pb-16 last:border-b-0"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Option {variation.id}: {variation.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {variation.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span>Header Font: {variation.headerFont}</span>
                  <span>•</span>
                  <span>Header Size: {variation.headerSize}</span>
                  <span>•</span>
                  <span>Style: {variation.experienceStyle}</span>
                </div>
              </div>
              
              {/* Preview */}
              <div className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
                <div className="absolute inset-0 -z-0">
                  <GridPatternSpotlight />
                </div>
                <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
                  <div className="max-w-4xl">
                    {/* Header Text */}
                    <div className="mb-8">
                      <p 
                        className={`${variation.headerSize} font-light text-[#2A2A2A] dark:text-white leading-relaxed transition-colors`}
                        style={{ fontFamily: `"${variation.headerFont}", ${variation.headerFont === 'Inter' ? 'sans-serif' : 'serif'}` }}
                      >
                        {storytellingText}
                      </p>
                    </div>

                    {/* Experiences */}
                    <div className={variation.spacing}>
                      {renderExperiences(variation.experienceStyle, variation.id)}
                    </div>

                    {/* Closing Text */}
                    <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors italic" style={{ fontFamily: "Inter" }}>
                        {closingText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

