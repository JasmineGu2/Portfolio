'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderOption {
  id: string
  name: string
  description: string
  component: React.ReactNode
}

const headerOptions: HeaderOption[] = [
  {
    id: 'current',
    name: 'Current',
    description: 'Inline with smaller CS text',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-lg md:text-xl" style={{ fontFamily: "Editorial Old" }}> - CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'stacked',
    name: 'Stacked',
    description: 'Name on top, CS below',
    component: (
      <div className="text-[#2A2A2A] dark:text-white">
        <div className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</div>
        <div className="text-sm md:text-base text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</div>
      </div>
    ),
  },
  {
    id: 'stacked-centered',
    name: 'Stacked Centered',
    description: 'Centered, name on top',
    component: (
      <div className="text-[#2A2A2A] dark:text-white text-center">
        <div className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</div>
        <div className="text-sm md:text-base text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</div>
      </div>
    ),
  },
  {
    id: 'inline-gray',
    name: 'Inline Gray',
    description: 'CS part in gray, same size',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-xl md:text-2xl text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}> - CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'inline-small-gray',
    name: 'Inline Small Gray',
    description: 'CS part smaller and gray',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}> - CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'separator-line',
    name: 'Separator Line',
    description: 'Vertical line separator',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center gap-2">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'separator-dot',
    name: 'Separator Dot',
    description: 'Dot separator',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center gap-2">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-gray-400 dark:text-gray-500">·</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'uppercase-cs',
    name: 'Uppercase CS',
    description: 'CS part uppercase and smaller',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'italic-cs',
    name: 'Italic CS',
    description: 'CS part italicized',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 italic" style={{ fontFamily: "Inter" }}> - CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'light-weight-cs',
    name: 'Light Weight CS',
    description: 'CS part lighter font weight',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light" style={{ fontFamily: "Inter" }}> - CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'spaced-out',
    name: 'Spaced Out',
    description: 'More spacing between elements',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center gap-3">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 tracking-wider" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</span>
      </div>
    ),
  },
  {
    id: 'minimal-dash',
    name: 'Minimal Dash',
    description: 'Thin dash, subtle CS text',
    component: (
      <div className="text-[#2A2A2A] dark:text-white flex items-center">
        <span className="text-xl md:text-2xl" style={{ fontFamily: "Editorial Old" }}>Jasmine Gu</span>
        <span className="text-gray-300 dark:text-gray-600 mx-2">—</span>
        <span className="text-sm md:text-base text-gray-400 dark:text-gray-500" style={{ fontFamily: "Inter" }}>CS and Business Grad 2027</span>
      </div>
    ),
  },
]

export default function HeaderOptionsPage() {
  const [selectedOption, setSelectedOption] = useState('current')

  const selected = headerOptions.find(o => o.id === selectedOption) || headerOptions[0]

  return (
    <main className="w-full min-h-screen transition-colors pt-24 pb-12">
      <div className="w-full px-4 md:px-8">
        {/* Selected Header Preview */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden p-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="hover:opacity-80 transition-opacity">
                {selected.component}
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                  Work
                </div>
                <div className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
                  Projects
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Options */}
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 text-center" style={{ fontFamily: "Editorial Old" }}>
            Header Typography Options ({headerOptions.length} options)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headerOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
                  selectedOption === option.id
                    ? 'border-[#2A2A2A] dark:border-white ring-2 ring-offset-2 ring-offset-[#F2F2F2] dark:ring-offset-[rgb(23,22,23)] ring-[#2A2A2A] dark:ring-white'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-6 bg-[#F2F2F2] dark:bg-[rgb(23,22,23)]">
                  <div className="flex items-center justify-center">
                    {option.component}
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
