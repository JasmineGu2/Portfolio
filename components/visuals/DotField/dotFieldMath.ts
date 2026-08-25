import type {
  BlobDefinition,
  DeformationPoint,
  DotFieldColorScheme,
  DotFieldConfig,
  ExclusionZone,
  PointerState,
  RadialMask,
  RenderContext,
} from './types'

/** Botanical palette + occasional red speckle (see --pf-dot) */
export const DOT_COLORS = ['#e8c547', '#f4b896', '#a8d4e8', '#b8e8d4'] as const
export const DOT_COLORS_WARM = ['#e8c547', '#f4b896', '#e8784a', '#a8d4e8', '#b8e8d4'] as const
export const DOT_COLORS_DARK = ['#b8e8d4', '#a8d4e8', '#e8c547', '#f4f0ea', '#e8784a'] as const
export const DOT_SPECKLE = 'rgba(200, 80, 60, 0.55)'
export const DOT_SPECKLE_WARM = 'rgba(200, 80, 60, 0.55)'
export const DOT_SPECKLE_DARK = 'rgba(232, 120, 74, 0.65)'

export const DEFAULTS = {
  spacing: 10,
  dotRadius: 1,
  opacity: 0.5,
  waveAmplitude: 32,
  waveFrequency: 0.012,
  waveSpeed: 0.00025,
  noiseScale: 0.0035,
  noiseStrength: 22,
  noiseSpeed: 0.00008,
  foldStrength: 80,
  mouseRadius: 240,
  mouseStrength: 22,
} as const

const GRID_PADDING = 100

const PERM = new Uint8Array(512)
;(function seedPermutation() {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  let seed = 42
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647
    const j = seed % (i + 1)
    const tmp = p[i]
    p[i] = p[j]
    p[j] = tmp
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255]
})()

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3
  const u = h < 2 ? x : y
  const v = h < 2 ? y : x
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

export function noise2D(x: number, y: number): number {
  const xi = Math.floor(x) & 255
  const yi = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const u = fade(xf)
  const v = fade(yf)
  const aa = PERM[PERM[xi] + yi]
  const ab = PERM[PERM[xi] + yi + 1]
  const ba = PERM[PERM[xi + 1] + yi]
  const bb = PERM[PERM[xi + 1] + yi + 1]
  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u)
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u)
  return lerp(x1, x2, v)
}

export function lerp(start: number, end: number, alpha: number): number {
  return start + (end - start) * alpha
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0 || 1)))
  return t * t * (3 - 2 * t)
}

export function radialMask(
  x: number,
  y: number,
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number
): number {
  const d = Math.hypot(x - cx, y - cy)
  return 1 - smoothstep(innerRadius, outerRadius, d)
}

function applyMasks(x: number, y: number, width: number, height: number, masks: RadialMask[]): number {
  let mask = 1
  for (const m of masks) {
    mask *= radialMask(x, y, m.cx * width, m.cy * height, m.innerRadius, m.outerRadius)
  }
  return mask
}

function exclusionMask(x: number, y: number, zones: ExclusionZone[], width: number, height: number): number {
  let mask = 1
  for (const zone of zones) {
    const zx = zone.x * width
    const zy = zone.y * height
    const zw = zone.width * width
    const zh = zone.height * height
    const cx = Math.max(zx, Math.min(x, zx + zw))
    const cy = Math.max(zy, Math.min(y, zy + zh))
    const dist = Math.hypot(x - cx, y - cy)
    mask *= smoothstep(0, zone.feather, dist)
  }
  return mask
}

export function adaptiveSpacing(baseSpacing: number, width: number): number {
  let spacing = baseSpacing
  if (width < 640) spacing *= 1.5
  if (width > 1800) spacing *= 1.15
  return spacing
}

function applyWaveDeformation(
  x: number,
  y: number,
  time: number,
  config: DotFieldConfig
): { px: number; py: number; waveDepth: number } {
  const { waveAmplitude, waveFrequency, waveSpeed } = config

  const waveX = Math.sin(y * waveFrequency + time * waveSpeed) * waveAmplitude
  const waveY = Math.cos(x * waveFrequency * 0.8 - time * waveSpeed * 0.7) * waveAmplitude
  const surface =
    Math.sin(x * waveFrequency + time * waveSpeed) *
    Math.cos(y * waveFrequency * 0.75 - time * waveSpeed * 0.72)

  const dx = waveX * surface
  const dy = waveY * surface
  const waveDepth = surface

  return { px: x + dx, py: y + dy, waveDepth }
}

function applyNoiseDeformation(
  px: number,
  py: number,
  time: number,
  config: DotFieldConfig
): { px: number; py: number; noiseDepth: number } {
  const { noiseScale, noiseStrength, noiseSpeed } = config
  const nx = noise2D(px * noiseScale + time * noiseSpeed, py * noiseScale)
  const ny = noise2D(px * noiseScale, py * noiseScale + time * noiseSpeed * 0.85)
  const noiseDepth = (nx + ny) * 0.5
  return {
    px: px + nx * noiseStrength,
    py: py + ny * noiseStrength,
    noiseDepth,
  }
}

function applyFolds(
  px: number,
  py: number,
  width: number,
  height: number,
  points: DeformationPoint[],
  foldStrength: number
): { px: number; py: number; foldDepth: number } {
  let foldDepth = 0
  let totalDx = 0
  let totalDy = 0

  for (const point of points) {
    const centerX = point.x * width
    const centerY = point.y * height
    const radiusPx = point.radius * Math.min(width, height)
    const dx = px - centerX
    const dy = py - centerY
    const distanceSq = dx * dx + dy * dy
    const influence = Math.exp(-distanceSq / (radiusPx * radiusPx))
    const dirX = point.directionX ?? dx / (Math.hypot(dx, dy) || 1)
    const dirY = point.directionY ?? dy / (Math.hypot(dx, dy) || 1)
    const strength = point.strength * (foldStrength / 80)
    totalDx += dirX * influence * strength
    totalDy += dirY * influence * strength
    foldDepth += influence
  }

  return { px: px + totalDx, py: py + totalDy, foldDepth }
}

function applyPointer(
  px: number,
  py: number,
  pointer: PointerState,
  config: DotFieldConfig
): { px: number; py: number; pointerDepth: number } {
  if (!pointer.active) {
    return { px, py, pointerDepth: 0 }
  }

  const mdx = px - pointer.smoothX
  const mdy = py - pointer.smoothY
  const mouseDistSq = mdx * mdx + mdy * mdy
  const mouseStrength = config.mouseStrength + pointer.velocity * 0.25
  const influence = Math.exp(-mouseDistSq / (config.mouseRadius * config.mouseRadius))

  return {
    px: px + mdx * influence * 0.015,
    py: py + mdy * influence * 0.015,
    pointerDepth: influence * 0.25 * (mouseStrength / config.mouseStrength),
  }
}

function dotColor(x: number, y: number, width: number, height: number): string {
  const speckle = noise2D(x * 0.047 + 12.3, y * 0.041 - 7.8)
  if (speckle > 0.78) return DOT_SPECKLE

  const t = (x / width) * 0.4 + (y / height) * 0.35 + noise2D(x * 0.008, y * 0.008) * 0.25
  const idx = Math.max(0, Math.min(DOT_COLORS.length - 1, Math.floor(t * DOT_COLORS.length)))
  return DOT_COLORS[idx] ?? DOT_COLORS[0]
}

export function renderDotField(
  ctx: CanvasRenderingContext2D,
  { width, height, time, config, pointer, reducedMotion, globalOpacity }: RenderContext
): void {
  ctx.clearRect(0, 0, width, height)

  const spacing = adaptiveSpacing(config.spacing, width)
  const staticTime = reducedMotion ? 0 : time

  for (let y = -GRID_PADDING; y < height + GRID_PADDING; y += spacing) {
    for (let x = -GRID_PADDING; x < width + GRID_PADDING; x += spacing) {
      let wave = applyWaveDeformation(x, y, staticTime, config)
      let noise = applyNoiseDeformation(wave.px, wave.py, staticTime, config)
      let fold = applyFolds(noise.px, noise.py, width, height, config.deformationPoints, config.foldStrength)
      let pointerEffect = applyPointer(fold.px, fold.py, pointer, config)

      const depth =
        wave.waveDepth * 0.35 + noise.noiseDepth * 0.3 + fold.foldDepth * 0.25 + pointerEffect.pointerDepth
      const normalizedDepth = Math.max(0, Math.min(1, (depth + 1) / 2))

      const radius = config.dotRadius * lerp(0.55, 1.65, normalizedDepth)
      let dotOpacity = config.opacity * globalOpacity * lerp(0.12, 1, normalizedDepth)

      dotOpacity *= applyMasks(pointerEffect.px, pointerEffect.py, width, height, config.masks)
      dotOpacity *= exclusionMask(pointerEffect.px, pointerEffect.py, config.exclusionZones, width, height)

      if (dotOpacity < 0.02) continue

      ctx.globalAlpha = dotOpacity
      ctx.fillStyle = dotColor(x, y, width, height)
      ctx.beginPath()
      ctx.arc(pointerEffect.px, pointerEffect.py, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
}

function animatedBlobCenter(
  blob: BlobDefinition,
  time: number,
  width: number,
  height: number
): { x: number; y: number } {
  const tSec = time * 0.001
  const wobbleX =
    Math.sin(tSec * ((Math.PI * 2) / blob.periodX) + blob.phase) * blob.driftX +
    Math.sin(tSec * ((Math.PI * 2) / (blob.periodX * 1.7)) + blob.phase * 0.6) * blob.driftX * 0.35
  const wobbleY =
    Math.cos(tSec * ((Math.PI * 2) / blob.periodY) + blob.phase * 1.1) * blob.driftY +
    Math.cos(tSec * ((Math.PI * 2) / (blob.periodY * 1.4)) + blob.phase * 0.8) * blob.driftY * 0.3

  return {
    x: (blob.baseX + wobbleX) * width,
    y: (blob.baseY + wobbleY) * height,
  }
}

function computeBlobDensity(
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  config: DotFieldConfig
): number {
  const minDim = Math.min(width, height)
  let density = 0

  for (const blob of config.blobs) {
    const center = animatedBlobCenter(blob, time, width, height)
    const radiusPx = blob.radius * minDim
    const dx = x - center.x
    const dy = y - center.y
    const distSq = dx * dx + dy * dy
    const sigma = radiusPx * radiusPx * 0.55
    density += blob.intensity * Math.exp(-distSq / (sigma || 1))
  }

  const edgeNoise = noise2D(x * 0.011 + time * 0.000014, y * 0.011 - time * 0.000011)
  density *= 0.82 + edgeNoise * 0.18

  const breathPeriod = config.blobBreathPeriod
  const breath = 0.86 + 0.14 * Math.sin((time / breathPeriod) * Math.PI * 2)
  density *= breath

  return Math.min(1, density)
}

function dotColorForScheme(
  x: number,
  y: number,
  width: number,
  height: number,
  scheme: DotFieldColorScheme,
  density: number
): string {
  const colors = scheme === 'dark' ? DOT_COLORS_DARK : DOT_COLORS_WARM
  const speckle = scheme === 'dark' ? DOT_SPECKLE_DARK : DOT_SPECKLE_WARM
  const speckleThreshold = scheme === 'dark' ? 0.72 : 0.78

  const speckleNoise = noise2D(x * 0.047 + 12.3, y * 0.041 - 7.8)
  if (speckleNoise > speckleThreshold && density > 0.15) return speckle

  const bias = scheme === 'dark' ? density * 0.35 : 0
  const t =
    (x / width) * 0.38 +
    (y / height) * 0.32 +
    noise2D(x * 0.008, y * 0.008) * 0.22 +
    bias
  const idx = Math.max(0, Math.min(colors.length - 1, Math.floor(t * colors.length)))
  return colors[idx] ?? colors[0]
}

export function renderBlobDotField(
  ctx: CanvasRenderingContext2D,
  { width, height, time, config, reducedMotion, globalOpacity }: RenderContext
): void {
  ctx.clearRect(0, 0, width, height)

  const spacing = adaptiveSpacing(config.spacing, width)
  const staticTime = reducedMotion ? 0 : time
  const padding = 40

  for (let y = -padding; y < height + padding; y += spacing) {
    for (let x = -padding; x < width + padding; x += spacing) {
      let density = computeBlobDensity(x, y, width, height, staticTime, config)

      density *= applyMasks(x, y, width, height, config.masks)
      density *= exclusionMask(x, y, config.exclusionZones, width, height)

      const base = config.blobBaseOpacity
      const peak = config.opacity * globalOpacity
      const dotOpacity = base + density * peak * (1 - base)

      if (dotOpacity < 0.012) continue

      const radius = config.dotRadius * (0.88 + density * 0.28)

      ctx.globalAlpha = Math.min(1, dotOpacity)
      ctx.fillStyle = dotColorForScheme(x, y, width, height, config.colorScheme, density)
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
}
