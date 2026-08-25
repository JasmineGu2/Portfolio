import {
  cellHash,
  createClusters,
  domDensityMask,
  flowAngle,
  lerp,
  sampleContourDensity,
} from './densityField'
import type {
  AIBackgroundVariant,
  ClusterBlob,
  ContourFlowContext,
  DomObstacle,
  FieldPalette,
} from './types'

const GLYPH_HIGH = ['@', '#', '%'] as const
const GLYPH_MED = ['+', 'X', 'V'] as const
const GLYPH_LOW = [':', '-', '.'] as const

const ARCHITECTURE_PALETTE: FieldPalette = [
  'rgba(255, 122, 62, 1)',
  'rgba(255, 202, 52, 1)',
  'rgba(255, 172, 122, 1)',
  'rgba(172, 232, 255, 1)',
  'rgba(182, 252, 222, 1)',
]

const WORK_PALETTE: FieldPalette = [
  'rgba(255, 78, 32, 1)',
  'rgba(252, 52, 26, 1)',
  'rgba(255, 172, 32, 1)',
  'rgba(92, 172, 242, 1)',
  'rgba(112, 236, 182, 1)',
]

const FONT_STACK = "'Analogue OS', 'JetBrains Mono', ui-monospace, monospace"

export function resolvePalette(variant: AIBackgroundVariant): FieldPalette {
  return variant === 'architecture' ? ARCHITECTURE_PALETTE : WORK_PALETTE
}

export type ContourGrid = {
  cols: number
  rows: number
  spacingX: number
  spacingY: number
  fontSize: number
  clusters: ClusterBlob[]
}

export function createContourGrid(
  width: number,
  height: number,
  variant: AIBackgroundVariant,
  seed = 7
): ContourGrid {
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024

  const isWork = variant === 'work'
  const targetCols = isMobile ? (isWork ? 44 : 40) : isTablet ? (isWork ? 68 : 62) : isWork ? 88 : 80
  const targetRows = isMobile ? (isWork ? 78 : 70) : isTablet ? (isWork ? 105 : 95) : isWork ? 132 : 120

  const spacingX = width / targetCols
  const spacingY = height / targetRows
  const sizeScale = isWork ? 1.02 : 0.94
  const fontSize = Math.max(8, Math.min(isWork ? 14 : 13, Math.min(spacingX, spacingY) * sizeScale))

  const clusterCount = variant === 'architecture' ? 5 : 4
  const clusters = createClusters(clusterCount, seed + 11)

  return {
    cols: targetCols,
    rows: targetRows,
    spacingX,
    spacingY,
    fontSize,
    clusters,
  }
}

function pickGlyph(
  density: number,
  col: number,
  row: number,
  time: number,
  variant: AIBackgroundVariant
): string | null {
  const bucketMs = variant === 'work' ? 650 : 850
  const bucket = Math.floor(time / bucketMs)
  const h = cellHash(col, row, bucket)
  const isWork = variant === 'work'

  if (density < (isWork ? 0.03 : 0.08)) return null
  if (density >= (isWork ? 0.46 : 0.66)) return GLYPH_HIGH[Math.floor(h * GLYPH_HIGH.length)] ?? '@'
  if (density >= (isWork ? 0.28 : 0.42)) return GLYPH_MED[Math.floor(h * GLYPH_MED.length)] ?? '+'
  if (density >= (isWork ? 0.08 : 0.16)) return GLYPH_LOW[Math.floor(h * GLYPH_LOW.length)] ?? '.'
  return null
}

function densityToColor(
  density: number,
  variant: AIBackgroundVariant,
  palette: FieldPalette,
  col: number,
  row: number
): string {
  const hueShift = cellHash(col, row, 3)
  const index = Math.min(palette.length - 1, Math.floor(density * palette.length + hueShift * 0.35))
  const base = palette[index] ?? palette[0]

  const alpha =
    variant === 'architecture'
      ? lerp(0.68, 1, Math.pow(density, 0.75))
      : lerp(0.74, 1, Math.pow(density, 0.65))

  const match = base.match(/rgba?\(([^)]+)\)/)
  if (!match) return base

  const parts = match[1].split(',').map((s) => s.trim())
  if (parts.length >= 3) {
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
  }

  return base
}

function drawFlowLines(
  ctx: CanvasRenderingContext2D,
  grid: ContourGrid,
  fieldCtx: ContourFlowContext
): void {
  const { width, height, time, scrollProgress, density, variant, obstacles, reducedMotion } =
    fieldCtx
  const t = reducedMotion ? 0 : time

  const step = variant === 'architecture' ? 5 : 5
  const lineLen = grid.spacingX * (variant === 'work' ? 2.35 : 2.05)
  const baseOpacity = variant === 'work' ? 0.16 : 0.14

  ctx.lineWidth = 0.55
  ctx.strokeStyle =
    variant === 'architecture' ? 'rgba(255, 172, 92, 0.82)' : 'rgba(252, 88, 42, 0.86)'

  let lines = 0
  const maxLines = variant === 'architecture' ? 420 : 400

  for (let row = 0; row < grid.rows; row += step) {
    for (let col = 0; col < grid.cols; col += step) {
      if (lines >= maxLines) return

      const x = (col + 0.5) * grid.spacingX
      const y = (row + 0.5) * grid.spacingY

      const field = sampleContourDensity(
        x,
        y,
        width,
        height,
        t,
        grid.clusters,
        scrollProgress,
        density
      )
      if (field < (variant === 'work' ? 0.28 : 0.35) || field > 0.82) continue

      const domMask =
        obstacles.length > 0
          ? domDensityMask(x, y, obstacles, 48)
          : 1
      if (domMask < 0.4) continue

      const angle = flowAngle(x, y, t)
      const fade = (field - 0.35) * 1.4 * domMask

      ctx.globalAlpha = baseOpacity * fade
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * lineLen, y + Math.sin(angle) * lineLen)
      ctx.stroke()
      lines++
    }
  }

  ctx.globalAlpha = 1
}

export function drawContourFlowField(
  ctx: CanvasRenderingContext2D,
  grid: ContourGrid,
  fieldCtx: ContourFlowContext
): { glyphCount: number; skippedCount: number } {
  const {
    width,
    height,
    time,
    scrollProgress,
    density,
    variant,
    palette,
    obstacles,
    reducedMotion,
  } = fieldCtx
  const t = reducedMotion ? 0 : time

  ctx.clearRect(0, 0, width, height)
  if (variant === 'architecture') {
    ctx.fillStyle = '#1a1410'
    ctx.fillRect(0, 0, width, height)
  }

  drawFlowLines(ctx, grid, fieldCtx)

  ctx.font = `${grid.fontSize}px ${FONT_STACK}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  let glyphCount = 0
  let skippedCount = 0
  const timeBucket = Math.floor(t / (variant === 'work' ? 420 : 550))
  const driftScale = variant === 'work' ? 0.00105 : 0.00088

  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const baseX = (col + 0.5) * grid.spacingX
      const baseY = (row + 0.5) * grid.spacingY

      const field = sampleContourDensity(
        baseX,
        baseY,
        width,
        height,
        t,
        grid.clusters,
        scrollProgress,
        density
      )

      const domMask =
        obstacles.length > 0
          ? domDensityMask(baseX, baseY, obstacles, variant === 'architecture' ? 52 : 48)
          : 1
      const effectiveDensity = field * domMask

      const glyph = pickGlyph(effectiveDensity, col, row, t + timeBucket * 100, variant)
      if (!glyph) {
        skippedCount++
        continue
      }

      const angle = flowAngle(baseX, baseY, t)
      const drift = reducedMotion ? 0 : Math.sin(t * driftScale + col * 0.31 + row * 0.27) * 1.65
      const x = baseX + Math.cos(angle) * drift
      const y = baseY + Math.sin(angle) * drift

      ctx.fillStyle = densityToColor(effectiveDensity, variant, palette, col, row)
      ctx.fillText(glyph, x, y)
      glyphCount++
    }
  }

  return { glyphCount, skippedCount }
}

export function getGridCellCount(grid: ContourGrid): number {
  return grid.cols * grid.rows
}
