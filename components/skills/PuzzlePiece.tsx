'use client'

import { useRef, useMemo } from 'react'
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
  // Front side decal
  const decalPositionFront = useMemo<[number, number, number]>(() => {
    return [0, 0, 0.4]
  }, [])

  const decalRotationFront = useMemo<[number, number, number]>(() => {
    return [0, 0, 0]
  }, [])

  // Back side decal (opposite side)
  const decalPositionBack = useMemo<[number, number, number]>(() => {
    return [0, 0, -0.4]
  }, [])

  const decalRotationBack = useMemo<[number, number, number]>(() => {
    return [0, Math.PI, 0] // Rotate 180 degrees on Y axis to face the back
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() + random * 10000

    // Rotation animation
    meshRef.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    )

    // Floating animation
    const floatOffset = Math.sin(t / 1.5) / 2
    meshRef.current.position.y = floatOffset

    // Keep scale constant
    meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = baseScale
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

