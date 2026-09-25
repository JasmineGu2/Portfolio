// Verlet integration for rope physics simulation
// Based on mock 35's lanyard rope implementation

export interface Point {
  x: number
  y: number
  px: number
  py: number
  pinned?: boolean
}

export interface RopeConfig {
  gravity?: number          // Default: 0.6
  friction?: number         // Default: 0.987
  segmentCount?: number     // Default: 15
  restDistance?: number     // Default: auto-calculated
  boundsX?: [number, number]
  boundsY?: [number, number]
  constraintIterations?: number
}

export class RopePhysics {
  points: Point[]
  segments: [number, number][]
  config: Required<RopeConfig>
  canvasWidth: number
  canvasHeight: number

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    segmentCount: number = 15,
    config: RopeConfig = {}
  ) {
    this.config = {
      gravity: config.gravity ?? 0.6,
      friction: config.friction ?? 0.987,
      segmentCount: config.segmentCount ?? segmentCount,
      restDistance: config.restDistance ?? 0,
      boundsX: config.boundsX ?? [0, 800],
      boundsY: config.boundsY ?? [0, 600],
      constraintIterations: config.constraintIterations ?? 3,
    }

    this.canvasWidth = this.config.boundsX[1]
    this.canvasHeight = this.config.boundsY[1]

    this.points = []
    this.segments = []

    this.initialize(startX, startY, endX, endY)
  }

  private initialize(startX: number, startY: number, endX: number, endY: number) {
    const { segmentCount } = this.config
    const dx = (endX - startX) / segmentCount
    const dy = (endY - startY) / segmentCount

    // Create points along the rope
    for (let i = 0; i <= segmentCount; i++) {
      const x = startX + dx * i
      const y = startY + dy * i

      this.points.push({
        x,
        y,
        px: x,
        py: y,
        pinned: i === 0, // Pin the first point
      })
    }

    // Calculate rest distance if not provided
    const restDist =
      this.config.restDistance ||
      Math.sqrt(dx * dx + dy * dy)

    // Create segments connecting consecutive points
    for (let i = 0; i < segmentCount; i++) {
      this.segments.push([i, i + 1])
    }

    this.config.restDistance = restDist
  }

  update(delta: number = 0.016) {
    this.applyForces()
    this.updatePositions()
    this.constrainSegments()
    this.constrainBounds()
  }

  private applyForces() {
    const { gravity, friction } = this.config

    for (const point of this.points) {
      if (point.pinned) continue

      const vx = (point.x - point.px) * friction
      const vy = (point.y - point.py) * friction

      point.px = point.x
      point.py = point.y

      point.x += vx
      point.y += vy + gravity
    }
  }

  private updatePositions() {
    // Already updated in applyForces
  }

  private constrainSegments() {
    const { restDistance, constraintIterations } = this.config

    for (let iter = 0; iter < constraintIterations; iter++) {
      for (const [i, j] of this.segments) {
        const p1 = this.points[i]
        const p2 = this.points[j]

        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const diff = (dist - restDistance) / dist

        const offsetX = dx * diff * 0.5
        const offsetY = dy * diff * 0.5

        if (!p1.pinned) {
          p1.x += offsetX
          p1.y += offsetY
        }

        if (!p2.pinned) {
          p2.x -= offsetX
          p2.y -= offsetY
        }
      }
    }
  }

  private constrainBounds() {
    const [minX, maxX] = this.config.boundsX
    const [minY, maxY] = this.config.boundsY

    for (const point of this.points) {
      if (point.x < minX) point.x = minX
      if (point.x > maxX) point.x = maxX
      if (point.y < minY) point.y = minY
      if (point.y > maxY) point.y = maxY
    }
  }

  dragPoint(index: number, x: number, y: number) {
    if (index < 0 || index >= this.points.length) return

    const point = this.points[index]
    point.x = x
    point.y = y
  }

  getPoint(index: number): Point | null {
    return this.points[index] ?? null
  }

  getSegmentPoints(): [Point, Point][] {
    return this.segments.map(([i, j]) => [this.points[i], this.points[j]])
  }

  setBounds(boundsX: [number, number], boundsY: [number, number]) {
    this.config.boundsX = boundsX
    this.config.boundsY = boundsY
    this.canvasWidth = boundsX[1]
    this.canvasHeight = boundsY[1]
  }
}
