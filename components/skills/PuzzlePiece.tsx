'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Skill } from '@/lib/skills'
import SkillDecal from './SkillDecal'
import SkillTooltip from './SkillTooltip'

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
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHover] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

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

  // Tooltip position (above the puzzle piece)
  const [tooltipPosition, setTooltipPosition] = useState<[number, number, number]>([
    position[0],
    position[1] + 1.5,
    position[2],
  ])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return
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

    // Update tooltip position to follow the puzzle piece
    const worldPosition = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPosition)
    setTooltipPosition([
      worldPosition.x,
      worldPosition.y + 1.5,
      worldPosition.z,
    ])

    // Scale on hover
    meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z =
      THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        hovered ? baseScale * 1.2 : baseScale,
        0.1
      )
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          setShowTooltip(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHover(false)
          setShowTooltip(false)
          document.body.style.cursor = 'default'
        }}
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

      {/* Skill Tooltip - Only on hover */}
      {skill && (
        <SkillTooltip
          skill={skill.skill}
          description={skill.description}
          visible={showTooltip}
          position={tooltipPosition}
          above={true}
        />
      )}
    </group>
  )
}

