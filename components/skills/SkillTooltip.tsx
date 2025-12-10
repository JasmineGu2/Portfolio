'use client'

import { Html } from '@react-three/drei'
import { useState, useEffect } from 'react'

interface SkillTooltipProps {
  skill: string
  description: string
  visible: boolean
  position: [number, number, number]
  above?: boolean // Position above or below icon
}

export default function SkillTooltip({
  skill,
  description,
  visible,
  position,
  above = true,
}: SkillTooltipProps) {
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.95)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible) {
      setOpacity(1)
      setScale(1)
    } else {
      setOpacity(0)
      setScale(0.95)
    }
  }, [visible])

  const offsetY = above ? 0.8 : -0.8
  const tooltipPosition: [number, number, number] = [
    position[0],
    position[1] + offsetY,
    position[2],
  ]

  return (
    <Html
      position={tooltipPosition}
      distanceFactor={4}
      center
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        }}
      >
        <div
          style={{
            background: isDark ? 'rgb(23, 22, 23)' : 'white',
            padding: '32px 40px',
            borderRadius: '16px',
            boxShadow: isDark ? '0 12px 32px rgba(255, 255, 255, 0.1)' : '0 12px 32px rgba(0, 0, 0, 0.25)',
            whiteSpace: 'nowrap',
            fontSize: '36px',
            lineHeight: '1.5',
            color: isDark ? '#ffffff' : '#1a1a1a',
            maxWidth: '600px',
            border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '42px' }}>{skill}</div>
          <div style={{ fontSize: '28px', color: isDark ? '#999' : '#666', whiteSpace: 'normal', lineHeight: '1.7' }}>
            {description}
          </div>
        </div>
      </div>
    </Html>
  )
}

