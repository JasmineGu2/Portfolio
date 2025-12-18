'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'pulse' | 'wave'
}

export function Skeleton({ className, variant = 'pulse' }: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-800 rounded'
  
  const variantClasses = {
    default: 'animate-pulse',
    pulse: 'animate-pulse',
    wave: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%]',
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    />
  )
}

// Specific skeleton variants for common use cases
export function ImageSkeleton({ className, aspectRatio }: { className?: string; aspectRatio?: string }) {
  return (
    <Skeleton 
      className={cn('w-full', aspectRatio || 'aspect-video', className)} 
      variant="pulse"
    />
  )
}

export function VideoSkeleton({ className, aspectRatio }: { className?: string; aspectRatio?: string }) {
  return (
    <Skeleton 
      className={cn('w-full', aspectRatio || 'aspect-video', className)} 
      variant="pulse"
    />
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 space-y-3', className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

