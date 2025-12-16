'use client'

import { useRef, useState, useEffect } from 'react'
import { Spotlight } from '@/components/ui/spotlight'
import { useMousePositionRef } from '@/components/hooks/use-mouse-position-ref'

// Color interpolation function
function interpolateColor(color1: number[], color2: number[], factor: number): string {
  const result = color1.map((channel, i) => {
    return Math.round(channel + (color2[i] - channel) * factor)
  })
  return `rgb(${result.join(' ')})`
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): number[] {
  h /= 360
  s /= 100
  l /= 100
  
  let r: number, g: number, b: number
  
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// Get rainbow color based on position
function getColorFromPosition(x: number, y: number, width: number, height: number): {
  color1: string
  color2: string
  color3: string
  darkColor1: string
  darkColor2: string
  darkColor3: string
} {
  // Normalize position to 0-1
  const normalizedX = Math.max(0, Math.min(1, x / width))
  const normalizedY = Math.max(0, Math.min(1, y / height))
  
  // Create a rainbow effect based on position
  // Use angle from center to create circular rainbow, or use x/y for linear
  // For a more interesting effect, use both x and y
  const angle = Math.atan2(normalizedY - 0.5, normalizedX - 0.5) + Math.PI
  const distance = Math.sqrt(Math.pow(normalizedX - 0.5, 2) + Math.pow(normalizedY - 0.5, 2))
  
  // Map angle (0 to 2π) to hue (0 to 360) for rainbow
  // Also incorporate distance for radial effect
  const hue = (angle / (2 * Math.PI)) * 360
  const saturation = 70 + distance * 30 // 70-100% saturation
  const lightness = 50 + (1 - distance) * 20 // 50-70% lightness
  
  const darkLightness = 40 + (1 - distance) * 15 // 40-55% for dark mode
  
  // Generate three colors for the gradient (slightly different hues/lightness)
  const color1 = hslToRgb(hue, saturation, lightness)
  const color2 = hslToRgb((hue + 20) % 360, saturation, lightness + 5)
  const color3 = hslToRgb((hue + 40) % 360, saturation, lightness + 10)
  
  const darkColor1 = hslToRgb(hue, saturation, darkLightness)
  const darkColor2 = hslToRgb((hue + 20) % 360, saturation, darkLightness + 5)
  const darkColor3 = hslToRgb((hue + 40) % 360, saturation, darkLightness + 10)
  
  return {
    color1: `rgb(${color1.join(' ')})`,
    color2: `rgb(${color2.join(' ')})`,
    color3: `rgb(${color3.join(' ')})`,
    darkColor1: `rgb(${darkColor1.join(' ')})`,
    darkColor2: `rgb(${darkColor2.join(' ')})`,
    darkColor3: `rgb(${darkColor3.join(' ')})`,
  }
}

export function GridPatternSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const positionRef = useMousePositionRef(containerRef)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [colors, setColors] = useState({
    color1: 'rgb(30 64 175)',
    color2: 'rgb(37 99 235)',
    color3: 'rgb(96 165 250)',
    darkColor1: 'rgb(30 58 138)',
    darkColor2: 'rgb(59 130 246)',
    darkColor3: 'rgb(30 58 138)',
  })

  useEffect(() => {
    const updatePosition = () => {
      const newPosition = { ...positionRef.current }
      setPosition(newPosition)
      
      // Update colors based on position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newColors = getColorFromPosition(
          newPosition.x,
          newPosition.y,
          rect.width,
          rect.height
        )
        setColors(newColors)
      }
    }
    const interval = setInterval(updatePosition, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      style={{
        '--spotlight-x': `${position.x}px`,
        '--spotlight-y': `${position.y}px`,
      } as React.CSSProperties}
    >
      <Spotlight
        className="opacity-100"
        size={64}
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        darkColor1={colors.darkColor1}
        darkColor2={colors.darkColor2}
        darkColor3={colors.darkColor3}
      />
      <div className="absolute inset-0">
        <svg className="h-full w-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 4H4M4 4V0M4 4H8M4 4V8"
                stroke="currentColor"
                strokeOpacity="0.3"
                className="stroke-white dark:stroke-black"
              />
              <rect
                x="3"
                y="3"
                width="2"
                height="2"
                fill="currentColor"
                fillOpacity="0.25"
                className="fill-white dark:fill-black"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  )
}

