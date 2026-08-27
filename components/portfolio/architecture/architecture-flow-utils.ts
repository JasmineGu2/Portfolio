import type { ArchitecturePort } from '@/lib/portfolio/abstraction-engine-data'

export interface Point {
  x: number
  y: number
}

/** Max y in node data, used to normalize vertical placement. */
export const FLOW_Y_MAX = 100

const PORT_OFFSET = 4
const CORNER_RADIUS = 8

export function portOffset(
  port: ArchitecturePort,
  width: number,
  height: number
): Point {
  switch (port) {
    case 'top':
      return { x: width / 2, y: -PORT_OFFSET }
    case 'bottom':
      return { x: width / 2, y: height + PORT_OFFSET }
    case 'left':
      return { x: -PORT_OFFSET, y: height / 2 }
    case 'right':
      return { x: width + PORT_OFFSET, y: height / 2 }
  }
}

/** Build smooth 90° orthogonal SVG path between two port positions. */
export function buildOrthogonalPath(from: Point, to: Point): string {
  const dx = to.x - from.x
  const dy = to.y - from.y

  if (Math.abs(dx) < 2) {
    return `M ${from.x} ${from.y} V ${to.y}`
  }
  if (Math.abs(dy) < 2) {
    return `M ${from.x} ${from.y} H ${to.x}`
  }

  const r = Math.min(CORNER_RADIUS, Math.abs(dx) / 2, Math.abs(dy) / 2)

  if (Math.abs(dy) >= Math.abs(dx)) {
    const dirY = dy > 0 ? 1 : -1
    const dirX = dx > 0 ? 1 : -1
    const y1 = to.y - dirY * r
    const xCorner = from.x
    const x2 = from.x + dirX * r
    return [
      `M ${from.x} ${from.y}`,
      `V ${y1}`,
      `Q ${xCorner} ${to.y} ${x2} ${to.y}`,
      `H ${to.x}`,
    ].join(' ')
  }

  const dirX = dx > 0 ? 1 : -1
  const dirY = dy > 0 ? 1 : -1
  const xMid = from.x + dx / 2
  const y2 = from.y + dirY * r

  return [
    `M ${from.x} ${from.y}`,
    `H ${xMid - dirX * r}`,
    `Q ${xMid} ${from.y} ${xMid} ${y2}`,
    `V ${to.y - dirY * r}`,
    `Q ${xMid} ${to.y} ${xMid + dirX * r} ${to.y}`,
    `H ${to.x}`,
  ].join(' ')
}

/** Connector opacity, always readable; brighter on active stage or hover. */
export function getConnectorOpacity(
  edgeStage: number,
  activeStageIndex: number,
  stageProgress: number[],
  isRelated: boolean,
  hasHoverFocus: boolean
): number {
  if (isRelated) return 1

  if (hasHoverFocus) return 0.55

  const activeProgress = stageProgress[activeStageIndex] ?? 0.5
  const dist = Math.abs(edgeStage - activeStageIndex)

  if (dist === 0) {
    return 0.78 + activeProgress * 0.22
  }
  if (dist === 1) {
    return 0.72 + activeProgress * 0.1
  }
  return Math.max(0.75, 0.82 - dist * 0.04)
}

/** Subtle accent mix for connectors near the active stage. */
export function getConnectorAccentMix(
  edgeStage: number,
  activeStageIndex: number,
  stageProgress: number[]
): number {
  const activeProgress = stageProgress[activeStageIndex] ?? 0.5
  const dist = Math.abs(edgeStage - activeStageIndex)

  if (dist === 0) return 0.55 + activeProgress * 0.35
  if (dist === 1) return 0.22 + activeProgress * 0.18
  return Math.max(0, 0.18 - dist * 0.05)
}
