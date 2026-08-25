'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

const experiences = [
  { year: '2025', company: 'Tesla', role: 'Software Engineer' },
  { year: '2025', company: 'Ivey Business School', role: 'ML Engineer (Research Assistant)' },
  { year: '2024', company: 'Intuit', role: 'Software Engineer' },
  { year: '2023', company: 'OMERS', role: 'Solutions Architect' },
  { year: '2023', company: 'Metaverse Group', role: 'Data Analyst & Engineer' },
]

export default function HeroOptionsPage() {
  const allVariations = [
    // Instrument Serif Variations
    {
      id: 1,
      title: 'Instrument Serif Italic Light - Tight Spacing',
      description: 'Classic serif italic with minimal spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 2,
      title: 'Instrument Serif Italic Light - Medium Spacing',
      description: 'Serif italic with balanced medium spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 3,
      title: 'Instrument Serif Italic Bold - Generous Spacing',
      description: 'Bold italic serif with generous spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left'
    },
    {
      id: 4,
      title: 'Instrument Serif - Centered Large',
      description: 'Centered layout with large serif header',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 5,
      title: 'Instrument Serif - Extra Large Maximum Spacing',
      description: 'Largest serif with maximum spacing',
      headerSize: 'text-9xl md:text-[12rem] lg:text-[14rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-2xl md:text-3xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-10',
        subtitleMargin: 'mb-12',
        experiencesMargin: 'mb-14',
        puzzleMargin: 'mb-16'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Redaction Variations
    {
      id: 6,
      title: 'Redaction Light - Tight Editorial',
      description: 'Redaction font with tight editorial spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 7,
      title: 'Redaction Bold - Medium Spacing',
      description: 'Bold Redaction with balanced spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 8,
      title: 'Redaction Italic - Generous',
      description: 'Redaction italic with generous spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 9,
      title: 'Redaction - Centered Compact',
      description: 'Centered Redaction with compact spacing',
      headerSize: 'text-6xl md:text-8xl lg:text-9xl',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-base md:text-lg',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-3',
        subtitleMargin: 'mb-5',
        experiencesMargin: 'mb-7',
        puzzleMargin: 'mb-9'
      },
      layout: 'center',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // National 2 Variations
    {
      id: 10,
      title: 'National 2 Light - Clean Sans',
      description: 'National 2 light weight with clean spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 11,
      title: 'National 2 Medium - Balanced',
      description: 'National 2 medium weight with balanced spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 12,
      title: 'National 2 Bold - Strong',
      description: 'National 2 bold for strong presence',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'National 2',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 13,
      title: 'National 2 - Centered Large',
      description: 'Centered National 2 with large spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Feature Variations
    {
      id: 14,
      title: 'Feature Light - Playful',
      description: 'Feature font light for playful aesthetic',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 15,
      title: 'Feature Bold - Bold Statement',
      description: 'Feature bold for strong statement',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Feature',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 16,
      title: 'Feature Italic - Unique',
      description: 'Feature italic for unique character',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 17,
      title: 'Feature Bold Italic - Maximum Impact',
      description: 'Feature bold italic for maximum visual impact',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Feature',
      headerStyle: 'italic font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Inter Variations
    {
      id: 18,
      title: 'Inter Light - Minimalist',
      description: 'Inter light for minimalist modern look',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Inter',
      headerStyle: 'font-light tracking-tight',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 19,
      title: 'Inter Semibold - Professional',
      description: 'Inter semibold for professional feel',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-semibold',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 20,
      title: 'Inter Bold - Strong Modern',
      description: 'Inter bold for strong modern presence',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-bold tracking-tight',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 21,
      title: 'Inter Medium - Balanced Modern',
      description: 'Inter medium for balanced modern aesthetic',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Mixed Font Combinations
    {
      id: 22,
      title: 'Instrument Serif + Inter - Classic Modern',
      description: 'Serif header with Inter subtitle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 23,
      title: 'Redaction + Feature - Editorial Playful',
      description: 'Redaction header with Feature subtitle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 24,
      title: 'National 2 + Inter - Clean Professional',
      description: 'National 2 header with Inter subtitle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 25,
      title: 'Feature + Inter - Unique Modern',
      description: 'Feature header with Inter subtitle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Compact Variations
    {
      id: 26,
      title: 'Instrument Serif Compact - Minimal Spacing',
      description: 'Compact serif with minimal spacing',
      headerSize: 'text-6xl md:text-8xl lg:text-9xl',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-base md:text-lg',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-1',
        subtitleMargin: 'mb-2',
        experiencesMargin: 'mb-3',
        puzzleMargin: 'mb-4'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    {
      id: 27,
      title: 'Inter Compact - Tight Modern',
      description: 'Compact Inter with tight spacing',
      headerSize: 'text-6xl md:text-8xl lg:text-9xl',
      headerFont: 'Inter',
      headerStyle: 'font-light',
      subtitleSize: 'text-base md:text-lg',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-3',
        experiencesMargin: 'mb-4',
        puzzleMargin: 'mb-5'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'standard'
    },
    
    // Different Experience Layouts
    {
      id: 28,
      title: 'Experiences Below Header - Vertical Stack',
      description: 'Experience timeline below header in vertical stack',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 29,
      title: 'Experiences Above Puzzle - Horizontal',
      description: 'Experiences displayed horizontally above puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 30,
      title: 'Experiences Left Side - Vertical List',
      description: 'Experiences on left side, header on right',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    {
      id: 31,
      title: 'Experiences Centered Below - Card Style',
      description: 'Experiences centered below in card-style layout',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    
    // Different Puzzle Styles
    {
      id: 32,
      title: 'Puzzle Full Width - No Rounding',
      description: 'Puzzle component full width with sharp corners',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'full-width'
    },
    {
      id: 33,
      title: 'Puzzle Compact - Small Rounded',
      description: 'Smaller puzzle with compact rounded corners',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'compact'
    },
    {
      id: 34,
      title: 'Puzzle Square - Large Rounded',
      description: 'Square puzzle with large rounded corners',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'square'
    },
    {
      id: 35,
      title: 'Puzzle Centered - Medium Size',
      description: 'Centered puzzle with medium size and rounded corners',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'center',
      experienceLayout: 'below',
      puzzleStyle: 'centered'
    },
    {
      id: 36,
      title: 'Puzzle Wide - Minimal Rounding',
      description: 'Wide puzzle with minimal corner rounding',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'right',
      puzzleStyle: 'wide'
    },
    
    // Combined Variations
    {
      id: 37,
      title: 'Experiences Below + Puzzle Wide',
      description: 'Experiences below header, wide puzzle component',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'wide'
    },
    {
      id: 38,
      title: 'Experiences Horizontal + Puzzle Compact',
      description: 'Horizontal experiences above compact puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-semibold',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'compact'
    },
    {
      id: 39,
      title: 'Experiences Left + Puzzle Square',
      description: 'Experiences on left, square puzzle on right',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'square'
    },
    {
      id: 40,
      title: 'Centered Everything + Puzzle Centered',
      description: 'All components centered with centered puzzle',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'centered'
    },
    
    // Additional Variations with Different Experience Layouts
    {
      id: 41,
      title: 'Redaction Light - Experiences Below - Tight Spacing',
      description: 'Redaction light with experiences below header, tight spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 42,
      title: 'Redaction Bold - Experiences Horizontal - Medium Spacing',
      description: 'Redaction bold with horizontal experiences, medium spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 43,
      title: 'Redaction Italic - Experiences Left - Generous Spacing',
      description: 'Redaction italic with experiences on left, generous spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    {
      id: 44,
      title: 'National 2 Light - Experiences Below - Clean Spacing',
      description: 'National 2 light with experiences below, clean spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 45,
      title: 'National 2 Medium - Experiences Horizontal - Balanced',
      description: 'National 2 medium with horizontal experiences, balanced spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 46,
      title: 'National 2 Bold - Experiences Centered Cards - Strong',
      description: 'National 2 bold with centered card experiences, strong spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'National 2',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 47,
      title: 'Feature Light - Experiences Below - Playful',
      description: 'Feature light with experiences below, playful spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 48,
      title: 'Feature Italic - Experiences Horizontal - Unique',
      description: 'Feature italic with horizontal experiences, unique spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 49,
      title: 'Feature Bold - Experiences Left - Bold Statement',
      description: 'Feature bold with experiences on left, bold spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Feature',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    {
      id: 50,
      title: 'Instrument Serif Italic - Experiences Below - Classic',
      description: 'Instrument Serif italic with experiences below, classic spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 51,
      title: 'Instrument Serif Italic - Experiences Horizontal - Tight',
      description: 'Instrument Serif italic with horizontal experiences, tight spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 52,
      title: 'Instrument Serif Bold Italic - Experiences Centered Cards - Generous',
      description: 'Instrument Serif bold italic with centered cards, generous spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 53,
      title: 'Inter Light - Experiences Below - Minimalist',
      description: 'Inter light with experiences below, minimalist spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Inter',
      headerStyle: 'font-light tracking-tight',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 54,
      title: 'Inter Semibold - Experiences Horizontal - Professional',
      description: 'Inter semibold with horizontal experiences, professional spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-semibold',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 55,
      title: 'Inter Bold - Experiences Left - Strong Modern',
      description: 'Inter bold with experiences on left, strong modern spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Inter',
      headerStyle: 'font-bold tracking-tight',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    {
      id: 56,
      title: 'Redaction + Feature - Experiences Below - Editorial',
      description: 'Redaction header with Feature subtitle, experiences below',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 57,
      title: 'National 2 + Inter - Experiences Horizontal - Clean',
      description: 'National 2 header with Inter subtitle, horizontal experiences',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 58,
      title: 'Feature + Inter - Experiences Centered Cards - Modern',
      description: 'Feature header with Inter subtitle, centered card experiences',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 59,
      title: 'Redaction Light - Experiences Below + Puzzle Wide',
      description: 'Redaction light with experiences below and wide puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Redaction',
      headerStyle: 'font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'wide'
    },
    {
      id: 60,
      title: 'National 2 Medium - Experiences Horizontal + Puzzle Compact',
      description: 'National 2 medium with horizontal experiences and compact puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'National 2',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'compact'
    },
    {
      id: 61,
      title: 'Feature Italic - Experiences Centered Cards + Puzzle Square',
      description: 'Feature italic with centered cards and square puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Feature',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Feature',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'square'
    },
    {
      id: 62,
      title: 'Instrument Serif Italic - Experiences Left + Puzzle Centered',
      description: 'Instrument Serif italic with left experiences and centered puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Instrument Serif',
      headerStyle: 'italic font-light',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'centered'
    },
    
    // New Font Variations - Editorial Old
    {
      id: 63,
      title: 'Editorial Old Regular - Experiences Below - Classic',
      description: 'Editorial Old regular with experiences below, classic spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Editorial Old',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 64,
      title: 'Editorial Old Bold - Experiences Horizontal - Strong',
      description: 'Editorial Old bold with horizontal experiences, strong spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Editorial Old',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 65,
      title: 'Editorial Old Regular - Experiences Centered Cards - Tight',
      description: 'Editorial Old regular with centered cards, tight spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Editorial Old',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 66,
      title: 'Editorial Old Bold - Experiences Left - Generous',
      description: 'Editorial Old bold with left experiences, generous spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Editorial Old',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    
    // Neue Montreal Variations
    {
      id: 67,
      title: 'Neue Montreal Regular - Experiences Below - Clean',
      description: 'Neue Montreal regular with experiences below, clean spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Neue Montreal',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 68,
      title: 'Neue Montreal Medium - Experiences Horizontal - Balanced',
      description: 'Neue Montreal medium with horizontal experiences, balanced spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Neue Montreal',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 69,
      title: 'Neue Montreal Bold - Experiences Centered Cards - Strong',
      description: 'Neue Montreal bold with centered cards, strong spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Neue Montreal',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 70,
      title: 'Neue Montreal Medium - Experiences Left - Modern',
      description: 'Neue Montreal medium with left experiences, modern spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Neue Montreal',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    
    // Swear Variations
    {
      id: 71,
      title: 'Swear Regular - Experiences Below - Editorial',
      description: 'Swear regular with experiences below, editorial spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Swear',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 72,
      title: 'Swear Bold - Experiences Horizontal - Bold',
      description: 'Swear bold with horizontal experiences, bold spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Swear',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 73,
      title: 'Swear Regular - Experiences Centered Cards - Tight',
      description: 'Swear regular with centered cards, tight spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Swear',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 74,
      title: 'Swear Bold - Experiences Left - Generous',
      description: 'Swear bold with left experiences, generous spacing',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Swear',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    
    // DM Mono Variations
    {
      id: 75,
      title: 'DM Mono Regular - Experiences Below - Monospace',
      description: 'DM Mono regular with experiences below, monospace spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'DM Mono',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'standard'
    },
    {
      id: 76,
      title: 'DM Mono Medium - Experiences Horizontal - Technical',
      description: 'DM Mono medium with horizontal experiences, technical spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'DM Mono',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'standard'
    },
    {
      id: 77,
      title: 'DM Mono Regular - Experiences Centered Cards - Compact',
      description: 'DM Mono regular with centered cards, compact spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'DM Mono',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'standard'
    },
    {
      id: 78,
      title: 'DM Mono Medium - Experiences Left - Minimal',
      description: 'DM Mono medium with left experiences, minimal spacing',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'DM Mono',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-2',
        subtitleMargin: 'mb-4',
        experiencesMargin: 'mb-6',
        puzzleMargin: 'mb-8'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'standard'
    },
    
    // Combined New Font Variations with Different Puzzle Styles
    {
      id: 79,
      title: 'Editorial Old Regular - Experiences Below + Puzzle Wide',
      description: 'Editorial Old regular with experiences below and wide puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Editorial Old',
      headerStyle: 'font-normal',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'below',
      puzzleStyle: 'wide'
    },
    {
      id: 80,
      title: 'Neue Montreal Medium - Experiences Horizontal + Puzzle Compact',
      description: 'Neue Montreal medium with horizontal experiences and compact puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'Neue Montreal',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'left',
      experienceLayout: 'horizontal',
      puzzleStyle: 'compact'
    },
    {
      id: 81,
      title: 'Swear Bold - Experiences Centered Cards + Puzzle Square',
      description: 'Swear bold with centered cards and square puzzle',
      headerSize: 'text-8xl md:text-[10rem] lg:text-[12rem]',
      headerFont: 'Swear',
      headerStyle: 'font-bold',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-6',
        subtitleMargin: 'mb-8',
        experiencesMargin: 'mb-10',
        puzzleMargin: 'mb-12'
      },
      layout: 'center',
      experienceLayout: 'centered-cards',
      puzzleStyle: 'square'
    },
    {
      id: 82,
      title: 'DM Mono Medium - Experiences Left + Puzzle Centered',
      description: 'DM Mono medium with left experiences and centered puzzle',
      headerSize: 'text-7xl md:text-9xl lg:text-[10rem]',
      headerFont: 'DM Mono',
      headerStyle: 'font-medium',
      subtitleSize: 'text-lg md:text-xl',
      subtitleFont: 'Inter',
      spacing: {
        headerMargin: 'mb-4',
        subtitleMargin: 'mb-6',
        experiencesMargin: 'mb-8',
        puzzleMargin: 'mb-10'
      },
      layout: 'right',
      experienceLayout: 'left',
      puzzleStyle: 'centered'
    }
  ]

  // Filter to only show selected variations (37, 40, 6, 11, 16, 22, 28, 31)
  const selectedIds = [37, 40, 6, 11, 16, 22, 28, 31, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82]
  const heroVariations = allVariations
    .filter(v => selectedIds.includes(v.id))
    .map((v, index) => ({ ...v, id: index + 1 })) // Renumber to 1-8

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
          Hero Component Options (All Components Included)
        </h1>

        <div className="space-y-20">
          {heroVariations.map((variation) => (
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
                  <span>Subtitle Font: {variation.subtitleFont}</span>
                  <span>•</span>
                  <span>Layout: {variation.layout}</span>
                  <span>•</span>
                  <span>Header Margin: {variation.spacing.headerMargin}</span>
                  <span>•</span>
                  <span>Subtitle Margin: {variation.spacing.subtitleMargin}</span>
                  <span>•</span>
                  <span>Experience Layout: {variation.experienceLayout || 'right'}</span>
                  <span>•</span>
                  <span>Puzzle Style: {variation.puzzleStyle || 'standard'}</span>
                </div>
              </div>
              
              {/* Hero Preview */}
              <div className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
                <div className="absolute inset-0 -z-0">
                  <GridPatternSpotlight />
                </div>
                <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
                  <section className="relative flex flex-col w-full">
                    {/* Header and Subtitle Section */}
                    <div className={`flex flex-col ${variation.layout === 'center' ? 'items-center text-center' : variation.layout === 'right' ? 'items-end text-right' : 'items-start'} ${variation.experienceLayout === 'left' ? 'md:flex-row-reverse' : variation.experienceLayout === 'right' || !variation.experienceLayout ? 'md:flex-row' : ''} gap-8 md:gap-12`}>
                      {/* Header and Subtitle */}
                      <div className={`${variation.experienceLayout === 'below' || variation.experienceLayout === 'horizontal' || variation.experienceLayout === 'centered-cards' ? 'w-full' : 'flex-1'} min-w-0 animate-fade-in-up`}>
                        <h1 
                          className={`${variation.headerSize} ${variation.headerStyle} ${variation.spacing.headerMargin} text-[#2A2A2A] dark:text-white leading-tight transition-colors`}
                          style={{ 
                            fontFamily: `"${variation.headerFont}", ${
                              ['Inter', 'National 2', 'Feature', 'Neue Montreal', 'DM Mono'].includes(variation.headerFont) ? 'sans-serif' : 
                              ['Instrument Serif', 'Editorial Old', 'Swear', 'Redaction'].includes(variation.headerFont) ? 'serif' : 
                              'sans-serif'
                            }`,
                            fontFeatureSettings: 'normal',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                          }}
                        >
                          I'm Jasmine
                        </h1>
                        <div 
                          className={`${variation.subtitleSize} ${variation.spacing.subtitleMargin} text-gray-600 dark:text-gray-400 transition-colors`} 
                          style={{ 
                            fontFamily: `"${variation.subtitleFont}", sans-serif`,
                            fontFeatureSettings: 'normal',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                          }}
                        >
                          <p>Engineer → Aspiring Product Manager.</p>
                          <p className="mt-2">I build systems by connecting the right pieces.</p>
                        </div>
                      </div>

                      {/* Experiences Timeline - Right/Left Side */}
                      {(variation.experienceLayout === 'right' || variation.experienceLayout === 'left' || !variation.experienceLayout) && (
                        <div className="flex-1 w-full md:w-auto mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                          <div className={`space-y-3`}>
                            {experiences.map((exp, idx) => (
                              <div key={idx} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start text-sm">
                                <div className="text-gray-400 dark:text-gray-500 whitespace-nowrap transition-colors">{exp.year}</div>
                                <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                                <div className="text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">{exp.role}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Experiences Below Header */}
                    {variation.experienceLayout === 'below' && (
                      <div className={`w-full ${variation.spacing.experiencesMargin} animate-fade-in-up`} style={{ animationDelay: '100ms' }}>
                        <div className="space-y-3">
                          {experiences.map((exp, idx) => (
                            <div key={idx} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start text-sm">
                              <div className="text-gray-400 dark:text-gray-500 whitespace-nowrap transition-colors">{exp.year}</div>
                              <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                              <div className="text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors">{exp.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experiences Horizontal */}
                    {variation.experienceLayout === 'horizontal' && (
                      <div className={`w-full ${variation.spacing.experiencesMargin} animate-fade-in-up`} style={{ animationDelay: '100ms' }}>
                        <div className="flex flex-wrap gap-6 items-center justify-start">
                          {experiences.map((exp, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="text-gray-400 dark:text-gray-500 transition-colors">{exp.year}</div>
                              <div className="text-gray-600 dark:text-gray-400 transition-colors">•</div>
                              <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                              <div className="text-gray-500 dark:text-gray-400 transition-colors">—</div>
                              <div className="text-gray-500 dark:text-gray-400 transition-colors">{exp.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experiences Centered Cards */}
                    {variation.experienceLayout === 'centered-cards' && (
                      <div className={`w-full ${variation.spacing.experiencesMargin} animate-fade-in-up`} style={{ animationDelay: '100ms' }}>
                        <div className="flex flex-wrap gap-4 justify-center">
                          {experiences.map((exp, idx) => (
                            <div key={idx} className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                              <div className="font-bold text-[#2A2A2A] dark:text-white transition-colors">{exp.company}</div>
                              <div className="text-gray-500 dark:text-gray-400 text-xs transition-colors">{exp.year} • {exp.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Puzzle Placeholder - Different Styles */}
                    <div className={`${variation.puzzleStyle === 'centered' ? 'w-full flex justify-center' : 'w-full'} ${variation.spacing.puzzleMargin} animate-fade-in-up`} style={{ animationDelay: '200ms' }}>
                      <div className={`relative ${
                        variation.puzzleStyle === 'full-width' ? 'w-full aspect-video rounded-none' :
                        variation.puzzleStyle === 'compact' ? 'w-full max-w-2xl mx-auto aspect-video rounded-lg' :
                        variation.puzzleStyle === 'square' ? 'w-full max-w-lg mx-auto aspect-square rounded-3xl' :
                        variation.puzzleStyle === 'centered' ? 'w-full max-w-4xl aspect-video rounded-3xl' :
                        variation.puzzleStyle === 'wide' ? 'w-full aspect-[21/9] rounded-xl' :
                        'w-full aspect-video rounded-3xl'
                      } bg-gray-900 dark:bg-gray-900 overflow-hidden shadow-2xl transition-colors`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white/50 dark:text-white/30 text-sm font-medium">
                            3D Puzzle Component
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Code Preview */}
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono overflow-x-auto">
                <code className="text-gray-700 dark:text-gray-300 whitespace-pre">
{`<section className="relative flex flex-col w-full">
  <div className="flex flex-col ${variation.layout === 'center' ? 'items-center text-center' : 'items-start'} md:flex-row md:items-start gap-8 md:gap-12">
    <div className="flex-1 min-w-0">
      <h1 
        className="${variation.headerSize} ${variation.headerStyle} ${variation.spacing.headerMargin} text-[#2A2A2A] dark:text-white leading-tight"
        style={{ fontFamily: "${variation.headerFont}" }}
      >
        I'm Jasmine
      </h1>
      <div className="${variation.subtitleSize} ${variation.spacing.subtitleMargin} text-gray-600 dark:text-gray-400" style={{ fontFamily: "${variation.subtitleFont}" }}>
        <p>Engineer → Aspiring Product Manager.</p>
        <p className="mt-2">I build systems by connecting the right pieces.</p>
      </div>
    </div>
    <div className="flex-1 w-full md:w-auto mt-8 md:mt-12">
      {/* Experience timeline */}
    </div>
  </div>
  <div className="w-full ${variation.spacing.puzzleMargin}">
    {/* Puzzle component */}
  </div>
</section>`}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-20 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Use
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            All selected variations include:
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
            <li>Header text with different fonts (Instrument Serif, Redaction, National 2, Feature, Inter)</li>
            <li>Subtitle text</li>
            <li>Experience timeline component</li>
            <li>Puzzle placeholder (static dark component)</li>
            <li>Various spacing options (tight, medium, generous, maximum)</li>
            <li>Left-aligned and centered layouts</li>
          </ul>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-4">
            Copy the code snippet from your preferred option and replace the hero section in <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">app/page.tsx</code>.
          </p>
        </div>
      </div>
    </main>
  )
}
