'use client'

import { useRef, useState, useEffect } from 'react'
import { useMousePositionRef } from '@/components/hooks/use-mouse-position-ref'

export function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const positionRef = useMousePositionRef(containerRef)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ ...positionRef.current })
    }
    const interval = setInterval(updatePosition, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="w-full h-full absolute inset-0"
    >
      <div
        className="w-full h-full absolute transition-[background] duration-75"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
        }}
      />
    </div>
  )
}



