'use client'

import { useState } from 'react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

interface GalleryImage {
  src: string
  alt: string
  description: string
}

// Gallery images - only photos that actually exist in the public/gallery folder
const galleryImages: GalleryImage[] = [
  {
    src: '/gallery/20250323_124223_A19484 1.JPEG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/FDFBF53D-4E00-4881-855B-DD5BBB768CFB 1.JPG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_1426 1.JPEG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_1862 1.PNG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_2295 1.JPEG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_4673 3 1.JPG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_4772 1.jpg',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_4855 1.JPEG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_6385 1.JPG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_7394 1.jpg',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_7655 1.JPG',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/IMG_8054 1.jpg',
    alt: 'Gallery Photo',
    description: '',
  },
  {
    src: '/gallery/white-IMG_9600 1.JPG',
    alt: 'Gallery Photo',
    description: '',
  },
]

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const [imageError, setImageError] = useState(false)
  
  // Check if file is HEIC format (not supported by most browsers)
  const isHEIC = image.src.toLowerCase().endsWith('.heic')
  
  // URL encode the image source to handle spaces and special characters
  const encodedSrc = image.src.split('/').map((part, idx) => 
    idx === image.src.split('/').length - 1 ? encodeURIComponent(part) : part
  ).join('/')
  
  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
        {!imageError ? (
          <>
            {isHEIC ? (
              // For HEIC files, use regular img tag with better error message
              <img
                src={encodedSrc}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              // For supported formats, use regular img tag to avoid Next.js Image issues with encoded URLs
              <img
                src={encodedSrc}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-4">
            <span className="text-gray-400 dark:text-gray-500 text-xs text-center">
              {isHEIC ? 'HEIC format not supported. Please convert to JPG/PNG.' : `Image not found: ${image.src}`}
            </span>
          </div>
        )}
        
        {/* Hover overlay with description - only show if description exists */}
        {image.description && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
            <p className="text-white text-xs px-3 pb-3 font-light">
              {image.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <main className="w-full min-h-screen transition-colors pt-24 md:pt-28 pb-2 md:pb-3">
      <div className="w-full px-4 md:px-8 space-y-2 md:space-y-3">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
          <div className="absolute inset-0 -z-0">
            <GridPatternSpotlight />
          </div>
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors animate-fade-in-up" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 transition-colors animate-fade-in-up" style={{ fontFamily: "Inter", animationDelay: '100ms' }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          
          {/* Impact Roles Section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
              Impact Roles
            </h2>
            <ul className="space-y-3" style={{ fontFamily: "Inter" }}>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>VP, Ivey Product Society Fellowship</span> — redesigned a 50-person product bootcamp
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Hub Leader, Rewriting the Code</span>
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Orientation Residence Leader</span>
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>President, Mississauga Youth Action Council</span> — grew membership 300%
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>President, Social Justice Club</span>
              </li>
            </ul>
          </div>

          {/* Side-Questing Section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
              Side-Questing At…
            </h2>
            <ul className="space-y-3" style={{ fontFamily: "Inter" }}>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Poker Club</span> — Top 9 finalist
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Hip Hop Western</span> — dancer
              </li>
              <li className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Fashion Lifestyle Society</span> — stylist & creative director
              </li>
            </ul>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${(idx + 1) * 50}ms` }}>
                <GalleryItem image={image} index={idx} />
              </div>
            ))}
          </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

