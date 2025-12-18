'use client'

import { useState, useRef, useEffect } from 'react'
import { VideoSkeleton } from './skeleton'

interface VideoWithSkeletonProps {
  src: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  aspectRatio?: string
}

export function VideoWithSkeleton({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  aspectRatio = 'aspect-video',
}: VideoWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Check if video is already loaded (for cached videos)
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Check if video is already loaded
      if (video.readyState >= 2) {
        setIsLoading(false)
      }
      
      // Handle video load events
      const handleLoadedData = () => {
        setIsLoading(false)
      }
      
      const handleCanPlay = () => {
        setIsLoading(false)
      }
      
      const handleError = () => {
        setIsLoading(false)
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
    }
  }, [src])

  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
      {isLoading && (
        <VideoSkeleton className="absolute inset-0 z-10" aspectRatio={aspectRatio} />
      )}
      <video
        ref={videoRef}
        src={src}
        className={`relative w-full h-full object-cover ${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  )
}

