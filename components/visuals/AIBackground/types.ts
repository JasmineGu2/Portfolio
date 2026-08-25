export type AIBackgroundVariant = 'architecture' | 'work'

export type Particle = {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
  phaseY: number
  size: number
  baseOpacity: number
  colorIndex: number
  clusterIndex: number
  attentionWeight: number
  densityBias: number
  vx: number
  vy: number
}

export type ClusterBlob = {
  baseX: number
  baseY: number
  radius: number
  phase: number
  driftAmp: number
}

export type DomObstacle = {
  left: number
  top: number
  right: number
  bottom: number
  centerX: number
  centerY: number
}

export type PointerState = {
  x: number
  y: number
  active: boolean
  velocity: number
}

export type FieldPalette = readonly string[]

export type ContourFlowContext = {
  width: number
  height: number
  time: number
  scrollProgress: number
  density: number
  variant: AIBackgroundVariant
  palette: FieldPalette
  obstacles: DomObstacle[]
  reducedMotion: boolean
}

export type AIBackgroundProps = {
  variant?: AIBackgroundVariant
  /** 0–1 field intensity multiplier (glyph density / saturation) */
  density?: number
  /** Comma-separated CSS selectors for DOM density avoidance */
  interactWithSelectors?: string
  className?: string
  animate?: boolean
}

export type ParticleFieldContext = {
  width: number
  height: number
  time: number
  scrollProgress: number
  density: number
  variant: AIBackgroundVariant
  palette: FieldPalette
  clusters: ClusterBlob[]
  obstacles: DomObstacle[]
  pointer: PointerState
  reducedMotion: boolean
}

export type AttentionLineConfig = {
  enabled: boolean
  maxDistance: number
  opacity: number
}

export const DEFAULT_ATTENTION_LINES: AttentionLineConfig = {
  enabled: true,
  maxDistance: 480,
  opacity: 0.08,
}

export type ConstellationLineConfig = {
  enabled: boolean
  maxDistance: number
  opacity: number
  maxLines: number
}

export const DEFAULT_CONSTELLATION_LINES: ConstellationLineConfig = {
  enabled: true,
  maxDistance: 44,
  opacity: 0.07,
  maxLines: 900,
}
