import {
  ambientNoise,
  clusterPosition,
  createClusters,
  domDensityMask,
  gaussianSpread,
  lerp,
  sampleFieldDensity,
  seededRandom,
} from './densityField'
import {
  DEFAULT_ATTENTION_LINES,
  DEFAULT_CONSTELLATION_LINES,
  type AttentionLineConfig,
  type ClusterBlob,
  type ConstellationLineConfig,
  type DomObstacle,
  type FieldPalette,
  type Particle,
  type ParticleFieldContext,
  type PointerState,
} from './types'

const ARCHITECTURE_PALETTE: FieldPalette = [
  'rgba(255, 132, 82, 0.88)',
  'rgba(255, 210, 72, 0.82)',
  'rgba(255, 188, 148, 0.78)',
  'rgba(148, 218, 248, 0.84)',
  'rgba(168, 238, 212, 0.8)',
]

const WORK_PALETTE: FieldPalette = [
  'rgba(255, 120, 74, 0.82)',
  'rgba(220, 88, 62, 0.76)',
  'rgba(248, 200, 72, 0.72)',
  'rgba(168, 212, 232, 0.7)',
  'rgba(184, 232, 212, 0.68)',
]

let softCircleSprite: HTMLCanvasElement | null = null

function getSoftCircleSprite(): HTMLCanvasElement {
  if (softCircleSprite) return softCircleSprite

  const size = 48
  softCircleSprite = document.createElement('canvas')
  softCircleSprite.width = size
  softCircleSprite.height = size
  const ctx = softCircleSprite.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size * 0.5,
      size * 0.5,
      0,
      size * 0.5,
      size * 0.5,
      size * 0.5
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.42, 'rgba(255,255,255,0.62)')
    gradient.addColorStop(0.72, 'rgba(255,255,255,0.18)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }

  return softCircleSprite
}

export function resolvePalette(variant: 'architecture' | 'work'): FieldPalette {
  return variant === 'architecture' ? ARCHITECTURE_PALETTE : WORK_PALETTE
}

function particleCount(width: number, height: number, density: number): number {
  const areaFactor = (width * height) / (1280 * 720)
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024

  let base: number
  if (isMobile) {
    base = lerp(400, 800, Math.max(0, Math.min(1, density)))
  } else if (isTablet) {
    base = lerp(900, 1500, Math.max(0, Math.min(1, density)))
  } else {
    base = lerp(1500, 2500, Math.max(0, Math.min(1, density)))
  }

  const scaled = Math.round(base * Math.sqrt(Math.min(areaFactor, 1.85)))

  if (isMobile) return Math.min(scaled, 800)
  if (isTablet) return Math.min(scaled, 1500)
  return Math.min(scaled, 2500)
}

export function createParticleField(
  width: number,
  height: number,
  density: number,
  variant: 'architecture' | 'work',
  seed = 7
): { particles: Particle[]; clusters: ClusterBlob[] } {
  const rand = seededRandom(seed)
  const count = particleCount(width, height, density)
  const clusterCount = 4 + Math.floor(rand() * 2)
  const clusters = createClusters(clusterCount, seed + 11)
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    const clusterIndex = Math.floor(rand() * clusters.length)
    const cluster = clusters[clusterIndex]
    const pos = clusterPosition(cluster, 0)
    const spreadX = cluster.radius * width * 0.92
    const spreadY = cluster.radius * height * 0.88
    const baseX = pos.x * width + gaussianSpread(rand, spreadX)
    const baseY = pos.y * height + gaussianSpread(rand, spreadY)

    particles.push({
      baseX: Math.max(0, Math.min(width, baseX)),
      baseY: Math.max(0, Math.min(height, baseY)),
      x: baseX,
      y: baseY,
      phase: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
      size:
        variant === 'architecture'
          ? 3.5 + rand() * 12.5
          : 3 + rand() * 11,
      baseOpacity:
        variant === 'architecture' ? 0.58 + rand() * 0.38 : 0.52 + rand() * 0.4,
      colorIndex: Math.floor(rand() * 5),
      clusterIndex,
      attentionWeight: 0.4 + rand() * 0.6,
      densityBias: rand() * 0.55,
      vx: 0,
      vy: 0,
    })
  }

  return { particles, clusters }
}

function applyPointerInfluence(p: Particle, pointer: PointerState): void {
  if (!pointer.active) return

  const dx = pointer.x - p.x
  const dy = pointer.y - p.y
  const distSq = dx * dx + dy * dy
  const radius = 200 + pointer.velocity * 2
  const influence = Math.exp(-distSq / (radius * radius)) * p.attentionWeight

  p.vx += dx * influence * 0.0008
  p.vy += dy * influence * 0.0008
}

function deflectFromObstacles(p: Particle, obstacles: DomObstacle[], feather = 36): void {
  for (const obs of obstacles) {
    const pad = feather
    const left = obs.left - pad
    const right = obs.right + pad
    const top = obs.top - pad
    const bottom = obs.bottom + pad

    if (p.x < left || p.x > right || p.y < top || p.y > bottom) continue

    const dl = p.x - left
    const dr = right - p.x
    const dt = p.y - top
    const db = bottom - p.y
    const min = Math.min(dl, dr, dt, db)

    const push = (feather - min) * 0.08
    if (min === dl) p.vx -= push
    else if (min === dr) p.vx += push
    else if (min === dt) p.vy -= push
    else p.vy += push
  }
}

export function updateParticles(particles: Particle[], ctx: ParticleFieldContext): void {
  const {
    width,
    height,
    time,
    scrollProgress,
    density,
    variant,
    clusters,
    obstacles,
    pointer,
    reducedMotion,
  } = ctx
  const driftAmp = variant === 'architecture' ? 10 : 8
  const t = reducedMotion ? 0 : time

  for (const p of particles) {
    const field = sampleFieldDensity(p.baseX, p.baseY, width, height, t, clusters, scrollProgress)
    const visible = field > p.densityBias * (0.72 - density * 0.22)
    if (!visible && !reducedMotion) {
      p.x = p.baseX
      p.y = p.baseY
      p.vx *= 0.92
      p.vy *= 0.92
      continue
    }

    const cluster = clusters[p.clusterIndex]
    const cpos = clusterPosition(cluster, t)
    const cx = cpos.x * width
    const cy = cpos.y * height

    const waveX = Math.sin(p.baseY * 0.008 + t * 0.00012 + p.phase) * driftAmp
    const waveY = Math.cos(p.baseX * 0.007 - t * 0.0001 + p.phaseY) * driftAmp
    const noise = ambientNoise(p.baseX, p.baseY, t) * (variant === 'architecture' ? 5 : 4)

    let targetX = p.baseX + waveX + noise + (cx - p.baseX) * 0.08
    let targetY = p.baseY + waveY + noise * 0.7 + (cy - p.baseY) * 0.08

    if (!reducedMotion) {
      applyPointerInfluence(p, pointer)
      deflectFromObstacles(p, obstacles)
    }

    const alpha = reducedMotion ? 1 : 0.035
    p.vx += (targetX - p.x) * alpha
    p.vy += (targetY - p.y) * alpha
    p.vx *= 0.945
    p.vy *= 0.945
    p.x += p.vx
    p.y += p.vy
  }
}

function smoothFieldAlpha(field: number, bias: number, density: number): number {
  const threshold = bias * (0.72 - density * 0.18)
  return Math.max(0, Math.min(1, (field - threshold) * 2.2 + 0.32))
}

function applyOpacityToColor(color: string, opacity: number): string {
  const match = color.match(/rgba?\(([^)]+)\)/)
  if (!match) return color

  const parts = match[1].split(',').map((s) => s.trim())
  if (parts.length >= 3) {
    const r = parts[0]
    const g = parts[1]
    const b = parts[2]
    const baseA = parts.length >= 4 ? parseFloat(parts[3]) : 1
    return `rgba(${r}, ${g}, ${b}, ${baseA * opacity})`
  }

  return color
}

function drawSoftCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  opacity: number
): void {
  const sprite = getSoftCircleSprite()
  const diameter = size * 2.2
  const left = x - diameter * 0.5
  const top = y - diameter * 0.5

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.drawImage(sprite, left, top, diameter, diameter)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = color
  ctx.fillRect(left, top, diameter, diameter)
  ctx.restore()
}

function drawConstellationLines(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  fieldCtx: ParticleFieldContext,
  config: ConstellationLineConfig
): void {
  if (!config.enabled) return

  const { width, height, time, scrollProgress, density, variant, clusters, obstacles, reducedMotion } =
    fieldCtx
  const t = reducedMotion ? 0 : time
  const cellSize = 52
  const buckets = new Map<string, { x: number; y: number; cluster: number; opacity: number }[]>()
  let lineCount = 0

  for (const p of particles) {
    const field = sampleFieldDensity(p.baseX, p.baseY, width, height, t, clusters, scrollProgress)
    const domMask = domDensityMask(p.x, p.y, obstacles, variant === 'architecture' ? 52 : 48)
    const fieldAlpha = smoothFieldAlpha(field, p.densityBias, density)
    const opacity = p.baseOpacity * fieldAlpha * domMask
    if (opacity < 0.22) continue

    const key = `${Math.floor(p.x / cellSize)},${Math.floor(p.y / cellSize)}`
    const bucket = buckets.get(key)
    const entry = { x: p.x, y: p.y, cluster: p.clusterIndex, opacity }
    if (bucket) bucket.push(entry)
    else buckets.set(key, [entry])
  }

  ctx.lineWidth = 0.55
  const maxDistSq = config.maxDistance * config.maxDistance

  for (const [key, entries] of buckets) {
    if (lineCount >= config.maxLines) break
    const [cx, cy] = key.split(',').map(Number)

    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const neighbor = buckets.get(`${cx + ox},${cy + oy}`)
        if (!neighbor) continue

        for (const a of entries) {
          for (const b of neighbor) {
            if (a === b || a.cluster !== b.cluster) continue
            const dx = a.x - b.x
            const dy = a.y - b.y
            const distSq = dx * dx + dy * dy
            if (distSq > maxDistSq || distSq < 36) continue

            const fade = 1 - Math.sqrt(distSq) / config.maxDistance
            ctx.strokeStyle =
              variant === 'architecture'
                ? `rgba(255, 188, 120, ${config.opacity * fade * Math.min(a.opacity, b.opacity)})`
                : `rgba(232, 120, 74, ${config.opacity * fade * Math.min(a.opacity, b.opacity)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            lineCount++
            if (lineCount >= config.maxLines) return
          }
        }
      }
    }
  }
}

function pointerNearCluster(
  pointer: PointerState,
  clusters: ClusterBlob[],
  width: number,
  height: number,
  time: number
): boolean {
  if (!pointer.active) return false

  for (const blob of clusters) {
    const pos = clusterPosition(blob, time)
    const cx = pos.x * width
    const cy = pos.y * height
    if (Math.hypot(pointer.x - cx, pointer.y - cy) < 160) return true
  }

  return false
}

function drawAttentionLines(
  ctx: CanvasRenderingContext2D,
  clusters: ClusterBlob[],
  width: number,
  height: number,
  time: number,
  config: AttentionLineConfig,
  variant: 'architecture' | 'work'
): void {
  const centers = clusters.map((b) => {
    const pos = clusterPosition(b, time)
    return { x: pos.x * width, y: pos.y * height }
  })

  ctx.lineWidth = 0.65
  const stroke =
    variant === 'architecture' ? `rgba(255, 188, 120, ${config.opacity})` : `rgba(232, 120, 74, ${config.opacity})`
  ctx.strokeStyle = stroke

  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      const a = centers[i]
      const b = centers[j]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist > config.maxDistance) continue

      const fade = 1 - dist / config.maxDistance
      ctx.globalAlpha = fade * config.opacity
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
  }

  ctx.globalAlpha = 1
}

export function drawParticleField(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  fieldCtx: ParticleFieldContext,
  attentionLines: AttentionLineConfig = DEFAULT_ATTENTION_LINES,
  constellationLines: ConstellationLineConfig = DEFAULT_CONSTELLATION_LINES
): void {
  const {
    width,
    height,
    time,
    scrollProgress,
    density,
    variant,
    palette,
    clusters,
    obstacles,
    pointer,
    reducedMotion,
  } = fieldCtx
  const t = reducedMotion ? 0 : time

  ctx.clearRect(0, 0, width, height)

  drawConstellationLines(ctx, particles, fieldCtx, constellationLines)

  if (attentionLines.enabled && pointerNearCluster(pointer, clusters, width, height, t)) {
    drawAttentionLines(ctx, clusters, width, height, t, attentionLines, variant)
  }

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'

  for (const p of particles) {
    const field = sampleFieldDensity(p.baseX, p.baseY, width, height, t, clusters, scrollProgress)
    const domMask = domDensityMask(p.x, p.y, obstacles, variant === 'architecture' ? 52 : 48)
    const fieldAlpha = smoothFieldAlpha(field, p.densityBias, density)
    const opacity = p.baseOpacity * fieldAlpha * domMask

    if (opacity < 0.04) continue

    const color = palette[p.colorIndex % palette.length]
    drawSoftCircle(ctx, p.x, p.y, p.size, color, opacity)
  }

  ctx.restore()
}
