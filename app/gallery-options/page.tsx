'use client'

import { useState } from 'react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  description: string
}

const galleryImages: GalleryImage[] = [
  {
    src: '/gallery/20250323_124223_A19484 1.JPEG',
    alt: 'Gallery Photo',
    description: 'Sample description',
  },
  {
    src: '/gallery/FDFBF53D-4E00-4881-855B-DD5BBB768CFB 1.JPG',
    alt: 'Gallery Photo',
    description: 'Sample description',
  },
  {
    src: '/gallery/IMG_1426 1.JPEG',
    alt: 'Gallery Photo',
    description: 'Sample description',
  },
  {
    src: '/gallery/IMG_1862 1.PNG',
    alt: 'Gallery Photo',
    description: 'Sample description',
  },
  {
    src: '/gallery/IMG_2295 1.JPEG',
    alt: 'Gallery Photo',
    description: 'Sample description',
  },
]

interface GalleryOption {
  id: number
  name: string
  description: string
  component: React.ReactNode
  code: string
}

export default function GalleryOptionsPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const galleryOptions: GalleryOption[] = [
    {
      id: 1,
      name: 'Standard Grid',
      description: 'Uniform square grid layout',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'grid grid-cols-2 md:grid-cols-3 gap-4',
    },
    {
      id: 2,
      name: 'Masonry Layout',
      description: 'Pinterest-style masonry grid',
      component: (
        <div className="columns-2 md:columns-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="mb-4 break-inside-avoid overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'columns-2 md:columns-3 gap-4',
    },
    {
      id: 3,
      name: 'Large Featured Grid',
      description: 'First image larger, rest in grid',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg group cursor-pointer ${
                idx === 0 ? 'md:col-span-2 md:row-span-2' : 'aspect-square'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'First item: md:col-span-2 md:row-span-2',
    },
    {
      id: 4,
      name: 'Card Grid with Descriptions',
      description: 'Grid with hover descriptions',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-lg group cursor-pointer relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                <p className="text-white text-sm px-3 pb-3" style={{ fontFamily: "Inter" }}>
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
      code: 'Hover overlay with gradient and description',
    },
    {
      id: 5,
      name: 'Bento Grid',
      description: 'Varied sizes in a bento box style',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg group cursor-pointer ${
                idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' :
                idx === 1 ? 'md:col-span-2 aspect-[2/1]' :
                'aspect-square'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'Bento grid with varied sizes',
    },
    {
      id: 6,
      name: 'Minimal Grid',
      description: 'Clean grid with subtle borders',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded border border-gray-200 dark:border-gray-700 group cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
            </div>
          ))}
        </div>
      ),
      code: 'Minimal with borders, no hover scale',
    },
    {
      id: 7,
      name: 'Full Width Carousel',
      description: 'Horizontal scrolling carousel',
      component: (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="flex-shrink-0 w-64 md:w-80 aspect-square overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'Horizontal scrolling carousel',
    },
    {
      id: 8,
      name: 'Staggered Grid',
      description: 'Alternating heights for visual interest',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg group cursor-pointer ${
                idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'Staggered heights with aspect-[4/5]',
    },
    {
      id: 9,
      name: 'Overlay Grid',
      description: 'Grid with always-visible overlays',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-lg group cursor-pointer relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white text-lg font-light px-4 text-center" style={{ fontFamily: "Editorial Old" }}>
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
      code: 'Always-visible overlay with text',
    },
    {
      id: 10,
      name: 'Spaced Grid',
      description: 'More spacing between images',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ),
      code: 'Larger gaps (gap-8) and rounded-2xl',
    },
  ]

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-8 space-y-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-4 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Gallery Layout Options
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
            Choose your preferred gallery layout
          </p>
        </div>

        {galleryOptions.map((option) => (
          <div
            key={option.id}
            className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-8 md:py-12">
              <div className="mb-6">
                <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Option {option.id}: {option.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
                  {option.description}
                </p>
              </div>
              
              <div className="mb-4">
                {option.component}
              </div>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono" style={{ fontFamily: "Inter" }}>
                  {option.code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

