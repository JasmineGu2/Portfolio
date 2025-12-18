'use client'

import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import ExperienceList from './ExperienceList'

interface HeroTextVariationProps {
  nameSize: string
  nameFont: string
  nameStyle?: string
  subheadingSize: string
  subheadingFont: string
  subheadingItalic?: boolean
  taglineSize: string
  taglineFont: string
  taglineItalic?: boolean
  name: string
  order?: 'name-subheading-tagline' | 'subheading-name-tagline' | 'name-tagline-subheading' | 'subheading-tagline-name'
}

export function HeroTextVariation({
  nameSize,
  nameFont,
  nameStyle = '',
  subheadingSize,
  subheadingFont,
  subheadingItalic = false,
  taglineSize,
  taglineFont,
  taglineItalic = false,
  name,
  order = 'name-subheading-tagline',
}: HeroTextVariationProps) {
  const renderContent = () => {
    const nameElement = (
      <h1 
        key="name"
        className={`${nameSize} ${nameStyle} mb-4 text-[#2A2A2A] dark:text-white leading-tight`}
        style={{ fontFamily: nameFont }}
      >
        I'm Jasmine
      </h1>
    )

    const subheadingElement = (
      <div 
        key="subheading"
        className={`${subheadingSize} ${subheadingItalic ? 'italic' : ''} text-gray-500 dark:text-gray-400 mb-6`} 
        style={{ fontFamily: subheadingFont }}
      >
        CS and Business Grad Spring 2027
      </div>
    )

    const taglineElement = (
      <div 
        key="tagline"
        className={`${taglineSize} ${taglineItalic ? 'italic' : ''} text-gray-600 dark:text-gray-400`} 
        style={{ fontFamily: taglineFont }}
      >
        <p>An engineer who loves connecting the pieces.</p>
      </div>
    )

    switch (order) {
      case 'subheading-name-tagline':
        return [subheadingElement, nameElement, taglineElement]
      case 'name-tagline-subheading':
        return [nameElement, taglineElement, subheadingElement]
      case 'subheading-tagline-name':
        return [subheadingElement, taglineElement, nameElement]
      default:
        return [nameElement, subheadingElement, taglineElement]
    }
  }

  return (
    <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <GridPatternSpotlight />
      </div>
      <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <section className="relative flex flex-col w-full">
          {/* Centered Header and Subheader */}
          <div className="flex flex-col items-center text-center mb-8">
            {renderContent()}
          </div>

          {/* Work Experience Cards in Horizontal Line - Centered */}
          <div className="flex justify-center mb-8">
            <ExperienceList />
          </div>
        </section>
      </div>
    </div>
  )
}

