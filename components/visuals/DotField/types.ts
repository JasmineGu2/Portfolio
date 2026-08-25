export type DotFieldPreset = 'ambient' | 'terrain' | 'curtain' | 'river' | 'animated-blobs'

export type DotFieldRenderMode = 'surface' | 'blobs'

export type DotFieldColorScheme = 'warm' | 'dark'

export type BlobDefinition = {
  baseX: number
  baseY: number
  driftX: number
  driftY: number
  periodX: number
  periodY: number
  phase: number
  radius: number
  intensity: number
}

export type DeformationPoint = {
  x: number
  y: number
  radius: number
  strength: number
  directionX?: number
  directionY?: number
}

export type RadialMask = {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
}

export type ExclusionZone = {
  x: number
  y: number
  width: number
  height: number
  feather: number
}

export type DotFieldConfig = {
  renderMode: DotFieldRenderMode
  colorScheme: DotFieldColorScheme
  spacing: number
  dotRadius: number
  opacity: number
  waveAmplitude: number
  waveFrequency: number
  waveSpeed: number
  noiseScale: number
  noiseStrength: number
  noiseSpeed: number
  foldStrength: number
  mouseRadius: number
  mouseStrength: number
  deformationPoints: DeformationPoint[]
  masks: RadialMask[]
  exclusionZones: ExclusionZone[]
  blobs: BlobDefinition[]
  blobBreathPeriod: number
  blobBaseOpacity: number
}

export type DotFieldProps = {
  preset?: DotFieldPreset
  colorScheme?: DotFieldColorScheme
  spacing?: number
  dotRadius?: number
  opacity?: number
  waveAmplitude?: number
  waveFrequency?: number
  waveSpeed?: number
  noiseScale?: number
  noiseStrength?: number
  noiseSpeed?: number
  foldStrength?: number
  mouseRadius?: number
  mouseStrength?: number
  deformationPoints?: DeformationPoint[]
  scrollProgress?: number
  interactive?: boolean
  animate?: boolean
  className?: string
}

export type PointerState = {
  targetX: number
  targetY: number
  smoothX: number
  smoothY: number
  velocity: number
  active: boolean
}

export type RenderContext = {
  width: number
  height: number
  time: number
  config: DotFieldConfig
  pointer: PointerState
  reducedMotion: boolean
  globalOpacity: number
}
