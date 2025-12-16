'use client'

import { useTexture } from '@react-three/drei'
import { Decal } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

interface SkillDecalProps {
  icon: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function SkillDecal({
  icon,
  position = [0, 0, 0.3],
  rotation = [0, 0, 0],
  scale = 0.3,
}: SkillDecalProps) {
  // Load texture for the decal
  const texture = useTexture(icon, (texture) => {
    // Configure texture for decal
    if (texture instanceof THREE.Texture) {
      texture.flipY = false
      texture.colorSpace = THREE.SRGBColorSpace
    }
  })

  // Create a less saturated version using a custom shader material approach
  // We'll use a simple color adjustment by creating a material with reduced saturation
  const desaturatedTexture = useMemo(() => {
    if (!texture || !(texture instanceof THREE.Texture)) return texture
    
    // For SVG textures, we can't easily desaturate in Three.js without a shader
    // Instead, we'll create a canvas and apply desaturation filter
    const img = texture.image
    if (!img || !(img instanceof HTMLImageElement)) return texture
    
    const canvas = document.createElement('canvas')
    canvas.width = img.width || 256
    canvas.height = img.height || 256
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Mirror the image horizontally by scaling and translating
      ctx.save()
      ctx.scale(-1, 1)
      ctx.drawImage(img, -canvas.width, 0, canvas.width, canvas.height)
      ctx.restore()
      
      // Apply desaturation filter (60% saturation)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const gray = r * 0.299 + g * 0.587 + b * 0.114
        const saturation = 0.6 // 60% saturation
        
        data[i] = Math.min(255, r * saturation + gray * (1 - saturation))
        data[i + 1] = Math.min(255, g * saturation + gray * (1 - saturation))
        data[i + 2] = Math.min(255, b * saturation + gray * (1 - saturation))
      }
      
      ctx.putImageData(imageData, 0, 0)
      const newTexture = new THREE.CanvasTexture(canvas)
      newTexture.flipY = false
      newTexture.colorSpace = THREE.SRGBColorSpace
      return newTexture
    }
    
    return texture
  }, [texture])

  if (!texture) {
    return null
  }

  // Decal position in local mesh space
  // Position on a visible face of the puzzle piece
  const decalPos = new THREE.Vector3(...position)
  const decalRot = new THREE.Euler(...rotation)

  // Use desaturated texture
  const finalTexture = desaturatedTexture || texture

  return (
    <Decal
      position={decalPos}
      rotation={decalRot}
      scale={scale}
      map={finalTexture as THREE.Texture}
      polygonOffset
      polygonOffsetFactor={-10}
      depthTest={true}
      depthWrite={true}
    />
  )
}

