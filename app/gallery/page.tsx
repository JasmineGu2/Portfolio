'use client'

import { useState } from 'react'

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
    src: '/gallery/IMG_3572.jpg',
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
  const [isLoading, setIsLoading] = useState(true)
  
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
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              // For supported formats, use regular img tag to avoid Next.js Image issues with encoded URLs
              <img
                src={encodedSrc}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                onLoad={() => setIsLoading(false)}
              />
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
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
    <main className="w-full min-h-screen flex justify-center transition-colors pt-16 md:pt-20">
      <div className="w-full max-w-[75%] space-y-6 py-6">
        <div className="rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] px-6 md:px-12 py-12 md:py-16 transition-colors">
          <h1 className="text-4xl font-bold text-[#2A2A2A] dark:text-white mb-4 transition-colors font-['Fraunces',serif]">
            Powered by community (and a lot of love)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12 transition-colors font-['Inter',sans-serif]">
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          
          {/* Impact Roles Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2A2A2A] dark:text-white mb-6 transition-colors font-['Fraunces',serif]">
              Impact Roles
            </h2>
            <ul className="space-y-3 font-['Inter',sans-serif]">
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">VP, Ivey Product Society Fellowship</span> — redesigned a 50-person product bootcamp
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Hub Leader, Rewriting the Code</span>
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Orientation Residence Leader</span>
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">President, Mississauga Youth Action Council</span> — grew membership 300%
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">President, Social Justice Club</span>
              </li>
            </ul>
          </div>

          {/* Side-Questing Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2A2A2A] dark:text-white mb-6 transition-colors font-['Fraunces',serif]">
              Side-Questing At…
            </h2>
            <ul className="space-y-3 font-['Inter',sans-serif]">
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Poker Club</span> — Top 9 finalist
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Hip Hop Western</span> — dancer
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Fashion Lifestyle Society</span> — stylist & creative director
              </li>
            </ul>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, idx) => (
              <GalleryItem key={idx} image={image} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

