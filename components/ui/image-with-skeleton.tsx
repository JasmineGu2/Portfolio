'use client'

import { useState, useRef, useEffect } from 'react'
import { VideoSkeleton } from './skeleton'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  onError?: () => void
}

export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  aspectRatio,
  onError,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Check if image is already loaded (for cached images)
  useEffect(() => {
    const img = imgRef.current
    if (img) {
      // Check if image is already loaded
      if (img.complete && img.naturalHeight !== 0) {
        setIsLoading(false)
      }
      
      // Handle image load events
      const handleLoad = () => {
        setIsLoading(false)
      }
      
      const handleError = () => {
        setIsLoading(false)
        setHasError(true)
        if (onError) onError()
      }

      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)

      return () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
      }
    }
  }, [src, onError])

  if (hasError) {
    return (
      <div className={`w-full ${aspectRatio || 'aspect-video'} bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 dark:text-gray-500 text-sm">Image not found</span>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${aspectRatio || 'aspect-video'} overflow-hidden`}>
      {isLoading && (
        <VideoSkeleton className="absolute inset-0 z-10" aspectRatio={aspectRatio || 'aspect-video'} />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`relative w-full h-full object-cover ${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
          if (onError) onError()
        }}
      />
    </div>
  )
}


