'use client'

export function BentoCanvasViewport({ children }: { children: React.ReactNode }) {
  return (
    <div className="bw-canvas-viewport">
      <div className="bw-canvas-stage">{children}</div>
    </div>
  )
}
