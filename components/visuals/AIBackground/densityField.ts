import type { ClusterBlob } from './types'

/** Deterministic pseudo-random in [0, 1). */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0x100000000
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/** Gaussian-ish sample from uniform randoms (Irwin–Hall). */
export function gaussianSpread(rand: () => number, sigma: number): number {
  return ((rand() + rand() + rand()) - 1.5) * sigma
}

export function createClusters(count: number, seed = 42): ClusterBlob[] {
  const rand = seededRandom(seed)
  const blobs: ClusterBlob[] = []

  for (let i = 0; i < count; i++) {
    blobs.push({
      baseX: 0.1 + rand() * 0.8,
      baseY: 0.08 + rand() * 0.84,
      radius: 0.16 + rand() * 0.14,
      phase: rand() * Math.PI * 2,
      driftAmp: 0.05 + rand() * 0.08,
    })
  }

  return blobs
}

/** Metaball positions, faster gather / disperse cycles for visible motion. */
export function clusterPosition(
  blob: ClusterBlob,
  time: number
): { x: number; y: number } {
  const cycle = time * 0.00032 + blob.phase
  const breathe = Math.sin(time * 0.0002 + blob.phase * 1.3) * 0.028

  return {
    x: blob.baseX + Math.sin(cycle) * blob.driftAmp + breathe,
    y: blob.baseY + Math.cos(cycle * 0.73) * blob.driftAmp * 0.85 - breathe * 0.6,
  }
}

/** Layered sine noise for ambient drift (deterministic, no per-frame random). */
export function ambientNoise(x: number, y: number, time: number): number {
  const t = time * 0.00048
  return (
    Math.sin(x * 0.004 + t) * 0.5 +
    Math.cos(y * 0.0035 - t * 0.8) * 0.35 +
    Math.sin((x + y) * 0.002 + t * 0.5) * 0.25
  )
}

/** Fractional Brownian motion, contour bands from layered sine octaves. */
export function fbmContour(x: number, y: number, time: number): number {
  const t = time * 0.00022
  let value = 0
  let amp = 0.55
  let freq = 1
  for (let i = 0; i < 4; i++) {
    value +=
      Math.sin(x * 0.009 * freq + y * 0.006 * freq + t * (0.6 + i * 0.15)) * amp +
      Math.cos(y * 0.008 * freq - x * 0.005 * freq - t * (0.45 + i * 0.12)) * amp * 0.72
    amp *= 0.48
    freq *= 1.85
  }
  return value * 0.5 + 0.5
}

/** 2D flow-field angle (radians) for glyph advection and streamlines. */
export function flowAngle(x: number, y: number, time: number): number {
  const t = time * 0.00018
  return (
    Math.sin(x * 0.006 + y * 0.004 + t) * 2.1 +
    Math.cos(x * 0.004 - y * 0.005 - t * 0.85) * 1.4 +
    Math.sin((x + y) * 0.003 + t * 0.55) * 0.85 +
    Math.cos(y * 0.007 + t * 0.35) * 0.6
  )
}

/** Deterministic cell hash in [0, 1). */
export function cellHash(col: number, row: number, bucket: number): number {
  let s = ((col * 73856093) ^ (row * 19349663) ^ (bucket * 83492791)) >>> 0
  s = (s * 1664525 + 1013904223) >>> 0
  return s / 0x100000000
}

/**
 * Grayscale density field from drifting gaussian blobs.
 * Returns 0–1; scrollProgress gently shifts cluster strength.
 */
export function sampleFieldDensity(
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  clusters: ClusterBlob[],
  scrollProgress: number
): number {
  if (width <= 0 || height <= 0) return 0

  const nx = x / width
  const ny = y / height
  let density = 0.2

  const scrollBoost = lerp(0.9, 1.18, scrollProgress)

  for (const blob of clusters) {
    const pos = clusterPosition(blob, time)
    const dx = nx - pos.x
    const dy = ny - pos.y
    const distSq = dx * dx + dy * dy
    const r = blob.radius * scrollBoost
    density += Math.exp(-distSq / (r * r * 0.72))
  }

  const edgeFade =
    smoothstep(0, 0.06, nx) *
    smoothstep(0, 0.06, 1 - nx) *
    smoothstep(0, 0.05, ny) *
    smoothstep(0, 0.05, 1 - ny)

  const noise = ambientNoise(x, y, time) * 0.08

  return Math.max(0, Math.min(1, density * edgeFade + noise))
}

/**
 * Contour + flow density, perimeter clusters, central channel void, swirling bands.
 * Returns 0–1; all visual intensity comes from glyph population, not fills.
 */
export function sampleContourDensity(
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  clusters: ClusterBlob[],
  scrollProgress: number,
  densityScale = 1
): number {
  if (width <= 0 || height <= 0) return 0

  const nx = x / width
  const ny = y / height

  const blobField = sampleFieldDensity(x, y, width, height, time, clusters, scrollProgress)

  const edgeDist = Math.min(nx, 1 - nx, ny, 1 - ny)
  const perimeterBoost = lerp(1.38, 0.78, smoothstep(0, 0.22, edgeDist))

  const channelCx = 0.46 + Math.sin(ny * 3.4 + time * 0.00012) * 0.12
  const channelCy = 0.52 + Math.cos(nx * 2.6 - time * 0.000095) * 0.1
  const channelDist = Math.hypot(nx - channelCx, ny - channelCy)
  const centralChannel = smoothstep(0.05, 0.28, channelDist)

  const contour = fbmContour(x, y, time)
  const banding = smoothstep(0.22, 0.68, contour) * 0.42 + smoothstep(0.5, 0.82, contour) * 0.26

  const swirl = Math.sin(flowAngle(x, y, time) + blobField * 2.4) * 0.08

  const combined =
    (blobField * 1.28 * perimeterBoost * centralChannel + banding + swirl) * densityScale

  return Math.max(0, Math.min(1, combined))
}

/** Soft attenuation inside DOM card rects, creates negative space behind content. */
export function domDensityMask(
  x: number,
  y: number,
  obstacles: { left: number; top: number; right: number; bottom: number }[],
  feather = 48
): number {
  let mask = 1

  for (const obs of obstacles) {
    const cx = (obs.left + obs.right) * 0.5
    const cy = (obs.top + obs.bottom) * 0.5
    const halfW = (obs.right - obs.left) * 0.5 + feather
    const halfH = (obs.bottom - obs.top) * 0.5 + feather
    const dx = Math.abs(x - cx) - halfW + feather
    const dy = Math.abs(y - cy) - halfH + feather
    const dist = Math.max(dx, dy)

    if (dist < feather) {
      mask *= smoothstep(feather, 0, dist)
    }
  }

  return mask
}
