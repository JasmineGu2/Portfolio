'use client'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Bvh, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useMemo, useEffect, useState } from 'react'
import { data } from './store'
import { getSkillByIndex } from '@/lib/skills'
import PuzzlePiece from '@/components/skills/PuzzlePiece'

// Clean-tech silver matte material (light mode)
const createSilverMaterial = (isDark: boolean = false): THREE.Material => {
  return new THREE.MeshPhysicalMaterial({
    color: isDark ? new THREE.Color('#2a2a2a') : new THREE.Color('#d9d9d9'),
    metalness: 0.9,
    roughness: 0.15,
    transmission: 0,
    envMapIntensity: isDark ? 0.8 : 1.2,
    clearcoat: 0.4,
    iridescence: 0,
  })
}

export default function Puzzle3D() {
  const { range } = useControls({ range: { value: 20, min: 0, max: 100, step: 1 } })
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

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={isDark ? 0.8 : 0.6} />
      <directionalLight intensity={isDark ? 1.0 : 0.8} position={[5, 25, 20]} />
      <pointLight intensity={isDark ? 0.6 : 0.4} position={[0, 0, 10]} color={isDark ? "#ffffff" : "#ffffff"} />

      <Bvh firstHitOnly>
        <Puzzles range={range} data={data} isDark={isDark} />
      </Bvh>

      <Environment preset={isDark ? "night" : "city"} />
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
    </Canvas>
  )
}

function Puzzles({ data, range, isDark }: { data: any[]; range: number; isDark: boolean }) {
  const { nodes } = useGLTF('/puzzle.glb')

  // Find geometry from puzzle.glb
  let geometry: THREE.BufferGeometry | null = null

  // Try to find geometry by common names
  const possibleNames = ['Puzzle', 'puzzle', 'Mesh', 'mesh', 'Shoe', 'shoe']
  for (const name of possibleNames) {
    if ((nodes as any)[name]?.geometry) {
      geometry = (nodes as any)[name].geometry
      break
    }
  }

  // If not found by name, find first mesh with geometry
  if (!geometry) {
    const meshNode = Object.values(nodes).find(
      (node: any) => node.isMesh && node.geometry
    ) as any
    geometry = meshNode?.geometry || null
  }

  if (!geometry) {
    console.warn('Could not find geometry in puzzle.glb')
    return null
  }

  // Create material based on dark mode
  const material = useMemo(() => createSilverMaterial(isDark), [isDark])

  // Ensure range doesn't exceed data length
  const effectiveRange = Math.min(range, data.length)

  // Clone geometry for each piece (needed for decals)
  const clonedGeometries = useMemo(() => {
    return data.slice(0, effectiveRange).map(() => geometry!.clone())
  }, [geometry, effectiveRange])

  return (
    <>
      {data.slice(0, effectiveRange).map((props: any, i: number) => {
        const skill = getSkillByIndex(i)
        return (
          <PuzzlePiece
            key={i}
            random={props.random}
            position={props.position}
            rotation={props.rotation}
            skill={skill}
            baseScale={5.5}
            geometry={clonedGeometries[i]}
            material={material}
          />
        )
      })}
    </>
  )
}
