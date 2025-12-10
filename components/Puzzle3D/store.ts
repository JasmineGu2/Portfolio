// Generate positions on a sphere surface
const randomSphereVector = (radius: number) => {
  // Generate random point on sphere surface using spherical coordinates
  const theta = Math.random() * Math.PI * 2 // azimuthal angle (0 to 2π)
  const phi = Math.acos(2 * Math.random() - 1) // polar angle (0 to π)
  
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  
  return [x, y, z]
}

// For hero: tighter sphere, fewer puzzles
const randomSphereVectorHero = (radius: number) => {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  
  return [x, y, z]
}

const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
]

// Main data for Puzzle3D section (20 puzzle pieces for Skills Map)
const data = Array.from({ length: 20 }, () => ({
  random: Math.random(),
  position: randomSphereVector(8.5), // Increased radius for more spread
  rotation: randomEuler(),
}))

// Hero data (tighter sphere, fewer items)
const heroData = Array.from({ length: 300 }, () => ({
  random: Math.random(),
  position: randomSphereVectorHero(6), // Tighter sphere with radius 6
  rotation: randomEuler(),
}))

export { data, heroData }
