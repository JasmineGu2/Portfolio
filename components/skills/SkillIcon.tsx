'use client'

import { Html } from '@react-three/drei'

interface SkillIconProps {
  icon: string
  visible: boolean
  position: [number, number, number]
}

export default function SkillIcon({ icon, visible, position }: SkillIconProps) {
  // Icons are always fully visible
  const opacity = 1
  const scale = 1

  return (
    <Html
      position={position}
      distanceFactor={5}
      center
      transform
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          opacity: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '50%',
          padding: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          minWidth: '48px',
          minHeight: '48px',
        }}
      >
        <img
          src={icon}
          alt=""
          style={{
            width: '36px',
            height: '36px',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={(e) => {
            // Show a fallback indicator if icon doesn't exist
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = '<div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 20px;">?</div>'
            }
            console.warn(`Icon not found: ${icon}`)
          }}
        />
      </div>
    </Html>
  )
}

