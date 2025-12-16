'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function HeaderOptionsPage() {
  const headerVariations = [
    {
      id: 1,
      title: 'Instrument Serif - Large Italic',
      font: 'Instrument Serif',
      className: 'text-7xl md:text-9xl lg:text-[10rem] italic font-light',
      layout: 'left'
    },
    {
      id: 2,
      title: 'Instrument Serif - Extra Large Bold Italic',
      font: 'Instrument Serif',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] italic font-bold',
      layout: 'left'
    },
    {
      id: 3,
      title: 'Instrument Serif - Centered Large',
      font: 'Instrument Serif',
      className: 'text-7xl md:text-9xl lg:text-[10rem] italic font-light text-center',
      layout: 'center'
    },
    {
      id: 4,
      title: 'Redaction - Large',
      font: 'Redaction',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-light',
      layout: 'left'
    },
    {
      id: 5,
      title: 'Redaction - Bold Centered',
      font: 'Redaction',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-center',
      layout: 'center'
    },
    {
      id: 6,
      title: 'National 2 - Extra Large',
      font: 'National 2',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] font-light',
      layout: 'left'
    },
    {
      id: 7,
      title: 'National 2 - Medium Weight Centered',
      font: 'National 2',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-medium text-center',
      layout: 'center'
    },
    {
      id: 8,
      title: 'Feature - Large',
      font: 'Feature',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-light',
      layout: 'left'
    },
    {
      id: 9,
      title: 'Feature - Bold Centered',
      font: 'Feature',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-center',
      layout: 'center'
    },
    {
      id: 10,
      title: 'Instrument Serif - Compact',
      font: 'Instrument Serif',
      className: 'text-6xl md:text-8xl lg:text-9xl italic font-light',
      layout: 'left'
    },
    {
      id: 11,
      title: 'Redaction - Wide Spacing',
      font: 'Redaction',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-light tracking-wider',
      layout: 'left'
    },
    {
      id: 12,
      title: 'Instrument Serif - Tight Spacing Centered',
      font: 'Instrument Serif',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] italic font-light tracking-tight text-center',
      layout: 'center'
    },
    {
      id: 13,
      title: 'National 2 - Uppercase',
      font: 'National 2',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-light uppercase tracking-wider',
      layout: 'left'
    },
    {
      id: 14,
      title: 'Feature - Mixed Case Centered',
      font: 'Feature',
      className: 'text-7xl md:text-9xl lg:text-[10rem] font-light text-center',
      layout: 'center'
    },
    {
      id: 15,
      title: 'Instrument Serif - Extra Large with Subtitle',
      font: 'Instrument Serif',
      className: 'text-8xl md:text-[10rem] lg:text-[12rem] italic font-light',
      layout: 'left',
      hasSubtitle: true
    }
  ]

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

        <h1 className="text-4xl font-bold text-[#2A2A2A] dark:text-white mb-12 transition-colors">
          Header Typography Options
        </h1>

        <div className="space-y-16">
          {headerVariations.map((variation) => (
            <div 
              key={variation.id}
              className="border-b border-gray-200 dark:border-gray-800 pb-12 last:border-b-0"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Option {variation.id}: {variation.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Font: {variation.font} | Layout: {variation.layout}
                </p>
              </div>
              
              <div className={`${variation.layout === 'center' ? 'text-center' : ''} bg-gray-50 dark:bg-gray-900 rounded-lg p-8 md:p-12 transition-colors`}>
                <h1 
                  className={`${variation.className} text-[#2A2A2A] dark:text-white transition-colors`}
                  style={{ fontFamily: `"${variation.font}", serif` }}
                >
                  I'm Jasmine
                </h1>
                {variation.hasSubtitle && (
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4 transition-colors font-['Feature',sans-serif]">
                    Engineer → Aspiring Product Manager.
                  </p>
                )}
              </div>

              {/* Code Preview */}
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono overflow-x-auto">
                <code className="text-gray-700 dark:text-gray-300">
                  {`<h1 className="${variation.className}" style={{ fontFamily: "${variation.font}" }}>`}
                  <br />
                  {`  I'm Jasmine`}
                  <br />
                  {`</h1>`}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Use
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Review each option above and choose the one that best fits your design. 
            Copy the code snippet and apply it to your header component. 
            Make sure the font files are available in your <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">/public/fonts/</code> directory.
          </p>
        </div>
      </div>
    </main>
  )
}

