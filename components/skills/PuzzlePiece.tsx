'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Skill } from '@/lib/skills'
import SkillDecal from './SkillDecal'

interface PuzzlePieceProps {
  random: number
  position: [number, number, number]
  rotation: [number, number, number]
  skill: Skill | null
  baseScale?: number
  geometry: THREE.BufferGeometry
  material: THREE.Material
}

export default function PuzzlePiece({
  random,
  position,
  rotation,
  skill,
  baseScale = 2.5,
  geometry,
  material,
}: PuzzlePieceProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverScale, setHoverScale] = useState(1)

  // Handle click to scroll
  const handleClick = () => {
    if (skill?.targetId) {
      const element = document.getElementById(skill.targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // Calculate decal positions and orientations for both sides
  // Front side decal - slightly inset to avoid z-fighting and ensure proper depth testing
  const decalPositionFront = useMemo<[number, number, number]>(() => {
    return [0, 0, 0.35] // Slightly inset from surface
  }, [])

  const decalRotationFront = useMemo<[number, number, number]>(() => {
    return [0, 0, 0]
  }, [])

  // Back side decal (opposite side) - slightly inset
  const decalPositionBack = useMemo<[number, number, number]>(() => {
    return [0, 0, -0.35] // Slightly inset from surface
  }, [])

  const decalRotationBack = useMemo<[number, number, number]>(() => {
    return [0, Math.PI, 0] // Rotate 180 degrees on Y axis to face the back
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() + random * 10000

    // Smooth hover scale transition
    const targetScale = isHovered ? 1.15 : 1
    setHoverScale((prev) => prev + (targetScale - prev) * 0.1)

    // Rotation animation
    meshRef.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    )

    // Floating animation
    const floatOffset = Math.sin(t / 1.5) / 2
    meshRef.current.position.y = floatOffset

    // Apply base scale with hover scale
    const finalScale = baseScale * hoverScale
    meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = finalScale
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setIsHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          setIsHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Skill Decal - Front side */}
        {skill && (
          <SkillDecal
            icon={skill.icon}
            position={decalPositionFront}
            rotation={decalRotationFront}
            scale={0.5}
          />
        )}
        {/* Skill Decal - Back side */}
        {skill && (
          <SkillDecal
            icon={skill.icon}
            position={decalPositionBack}
            rotation={decalRotationBack}
            scale={0.5}
          />
        )}
      </mesh>
    </group>
  )
}

