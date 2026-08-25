import { DEFAULTS } from './dotFieldMath'
import type { BlobDefinition, DeformationPoint, DotFieldConfig, DotFieldPreset, RadialMask } from './types'

const AMBIENT_DEFORMATIONS: DeformationPoint[] = [
  {
    x: 0.72,
    y: 0.22,
    radius: 0.42,
    strength: 72,
    directionX: -0.55,
    directionY: 0.45,
  },
  {
    x: 0.58,
    y: 0.62,
    radius: 0.48,
    strength: 58,
    directionX: 0.35,
    directionY: -0.42,
  },
  {
    x: 0.88,
    y: 0.48,
    radius: 0.32,
    strength: 44,
    directionX: -0.7,
    directionY: 0.25,
  },
]

const AMBIENT_MASKS: RadialMask[] = [
  { cx: 0.68, cy: 0.32, innerRadius: 80, outerRadius: 520 },
  { cx: 0.82, cy: 0.55, innerRadius: 60, outerRadius: 480 },
]

const AMBIENT_EXCLUSIONS = [
  { x: 0.02, y: 0.08, width: 0.52, height: 0.72, feather: 140 },
]

export const AMBIENT_PRESET: Partial<DotFieldConfig> = {
  renderMode: 'surface',
  colorScheme: 'warm',
  spacing: 10,
  dotRadius: 1,
  waveAmplitude: 28,
  waveFrequency: 0.01,
  waveSpeed: 0.00022,
  noiseScale: 0.0035,
  noiseStrength: 18,
  noiseSpeed: 0.00007,
  foldStrength: 70,
  mouseRadius: 250,
  mouseStrength: 18,
  deformationPoints: AMBIENT_DEFORMATIONS,
  masks: AMBIENT_MASKS,
  exclusionZones: AMBIENT_EXCLUSIONS,
  blobs: [],
  blobBreathPeriod: 45000,
  blobBaseOpacity: 0.04,
}

const BLOB_WARM: BlobDefinition[] = [
  {
    baseX: 0.38,
    baseY: 0.42,
    driftX: 0.09,
    driftY: 0.07,
    periodX: 68000,
    periodY: 82000,
    phase: 0,
    radius: 0.32,
    intensity: 1,
  },
  {
    baseX: 0.62,
    baseY: 0.28,
    driftX: 0.07,
    driftY: 0.1,
    periodX: 76000,
    periodY: 54000,
    phase: 1.4,
    radius: 0.26,
    intensity: 0.88,
  },
  {
    baseX: 0.52,
    baseY: 0.68,
    driftX: 0.06,
    driftY: 0.05,
    periodX: 90000,
    periodY: 72000,
    phase: 2.6,
    radius: 0.22,
    intensity: 0.72,
  },
  {
    baseX: 0.78,
    baseY: 0.58,
    driftX: 0.05,
    driftY: 0.06,
    periodX: 58000,
    periodY: 64000,
    phase: 0.9,
    radius: 0.18,
    intensity: 0.58,
  },
]

const BLOB_RIVER: BlobDefinition[] = [
  {
    baseX: 0.22,
    baseY: 0.32,
    driftX: 0.04,
    driftY: 0.08,
    periodX: 72000,
    periodY: 86000,
    phase: 0.2,
    radius: 0.28,
    intensity: 1,
  },
  {
    baseX: 0.34,
    baseY: 0.52,
    driftX: 0.05,
    driftY: 0.07,
    periodX: 64000,
    periodY: 78000,
    phase: 1.6,
    radius: 0.24,
    intensity: 0.9,
  },
  {
    baseX: 0.28,
    baseY: 0.72,
    driftX: 0.03,
    driftY: 0.06,
    periodX: 82000,
    periodY: 68000,
    phase: 2.8,
    radius: 0.2,
    intensity: 0.75,
  },
]

const BLOB_DARK: BlobDefinition[] = [
  {
    baseX: 0.42,
    baseY: 0.35,
    driftX: 0.08,
    driftY: 0.06,
    periodX: 70000,
    periodY: 88000,
    phase: 0.5,
    radius: 0.34,
    intensity: 1,
  },
  {
    baseX: 0.68,
    baseY: 0.48,
    driftX: 0.06,
    driftY: 0.08,
    periodX: 62000,
    periodY: 76000,
    phase: 1.8,
    radius: 0.28,
    intensity: 0.92,
  },
  {
    baseX: 0.55,
    baseY: 0.72,
    driftX: 0.05,
    driftY: 0.05,
    periodX: 84000,
    periodY: 70000,
    phase: 3.1,
    radius: 0.24,
    intensity: 0.78,
  },
]

const PRESET_MAP: Record<DotFieldPreset, Partial<DotFieldConfig>> = {
  ambient: AMBIENT_PRESET,
  terrain: {
    renderMode: 'surface',
    colorScheme: 'warm',
    spacing: 12,
    dotRadius: 1.1,
    waveAmplitude: 24,
    foldStrength: 90,
    deformationPoints: [],
    masks: [],
    exclusionZones: [],
    blobs: [],
    blobBreathPeriod: 45000,
    blobBaseOpacity: 0.04,
  },
  curtain: {
    renderMode: 'surface',
    colorScheme: 'warm',
    spacing: 9,
    dotRadius: 0.9,
    waveAmplitude: 32,
    foldStrength: 60,
    deformationPoints: [],
    masks: [],
    exclusionZones: [],
    blobs: [],
    blobBreathPeriod: 45000,
    blobBaseOpacity: 0.04,
  },
  river: {
    renderMode: 'blobs',
    colorScheme: 'warm',
    spacing: 9,
    dotRadius: 1,
    opacity: 0.62,
    blobBaseOpacity: 0.035,
    blobBreathPeriod: 52000,
    blobs: BLOB_RIVER,
    waveAmplitude: 0,
    foldStrength: 0,
    deformationPoints: [],
    masks: [
      { cx: 0.32, cy: 0.48, innerRadius: 20, outerRadius: 280 },
      { cx: 0.38, cy: 0.62, innerRadius: 10, outerRadius: 200 },
    ],
    exclusionZones: [
      { x: 0.52, y: 0, width: 0.48, height: 1, feather: 120 },
    ],
  },
  'animated-blobs': {
    renderMode: 'blobs',
    colorScheme: 'warm',
    spacing: 9,
    dotRadius: 1,
    opacity: 0.58,
    blobBaseOpacity: 0.04,
    blobBreathPeriod: 48000,
    blobs: BLOB_WARM,
    waveAmplitude: 0,
    foldStrength: 0,
    deformationPoints: [],
    masks: [
      { cx: 0.5, cy: 0.45, innerRadius: 40, outerRadius: 640 },
    ],
    exclusionZones: [
      { x: 0, y: 0.05, width: 0.42, height: 0.55, feather: 160 },
    ],
  },
}

export const ANIMATED_BLOBS_DARK: Partial<DotFieldConfig> = {
  renderMode: 'blobs',
  colorScheme: 'dark',
  spacing: 10,
  dotRadius: 1.05,
  opacity: 0.72,
  blobBaseOpacity: 0.06,
  blobBreathPeriod: 56000,
  blobs: BLOB_DARK,
  waveAmplitude: 0,
  foldStrength: 0,
  deformationPoints: [],
  masks: [
    { cx: 0.55, cy: 0.42, innerRadius: 60, outerRadius: 580 },
  ],
  exclusionZones: [],
}

export function resolveDotFieldConfig(
  preset: DotFieldPreset = 'ambient',
  overrides: Partial<DotFieldConfig> = {}
): DotFieldConfig {
  const presetConfig =
    preset === 'animated-blobs' && overrides.colorScheme === 'dark'
      ? { ...PRESET_MAP['animated-blobs'], ...ANIMATED_BLOBS_DARK }
      : (PRESET_MAP[preset] ?? AMBIENT_PRESET)

  return {
    renderMode: overrides.renderMode ?? presetConfig.renderMode ?? 'surface',
    colorScheme: overrides.colorScheme ?? presetConfig.colorScheme ?? 'warm',
    spacing: overrides.spacing ?? presetConfig.spacing ?? DEFAULTS.spacing,
    dotRadius: overrides.dotRadius ?? presetConfig.dotRadius ?? DEFAULTS.dotRadius,
    opacity: overrides.opacity ?? presetConfig.opacity ?? DEFAULTS.opacity,
    waveAmplitude: overrides.waveAmplitude ?? presetConfig.waveAmplitude ?? DEFAULTS.waveAmplitude,
    waveFrequency: overrides.waveFrequency ?? presetConfig.waveFrequency ?? DEFAULTS.waveFrequency,
    waveSpeed: overrides.waveSpeed ?? presetConfig.waveSpeed ?? DEFAULTS.waveSpeed,
    noiseScale: overrides.noiseScale ?? presetConfig.noiseScale ?? DEFAULTS.noiseScale,
    noiseStrength: overrides.noiseStrength ?? presetConfig.noiseStrength ?? DEFAULTS.noiseStrength,
    noiseSpeed: overrides.noiseSpeed ?? presetConfig.noiseSpeed ?? DEFAULTS.noiseSpeed,
    foldStrength: overrides.foldStrength ?? presetConfig.foldStrength ?? DEFAULTS.foldStrength,
    mouseRadius: overrides.mouseRadius ?? presetConfig.mouseRadius ?? DEFAULTS.mouseRadius,
    mouseStrength: overrides.mouseStrength ?? presetConfig.mouseStrength ?? DEFAULTS.mouseStrength,
    deformationPoints: overrides.deformationPoints ?? presetConfig.deformationPoints ?? [],
    masks: overrides.masks ?? presetConfig.masks ?? [],
    exclusionZones: overrides.exclusionZones ?? presetConfig.exclusionZones ?? [],
    blobs: overrides.blobs ?? presetConfig.blobs ?? [],
    blobBreathPeriod: overrides.blobBreathPeriod ?? presetConfig.blobBreathPeriod ?? 45000,
    blobBaseOpacity: overrides.blobBaseOpacity ?? presetConfig.blobBaseOpacity ?? 0.04,
  }
}
