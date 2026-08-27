'use client'

/** Canvas pan is disabled, viewport is static; page scrolls normally. */
export function useCanvasPan() {
  return {
    pan: { x: 0, y: 0 },
    onPointerDown: undefined,
    onPointerMove: undefined,
    onPointerUp: undefined,
  }
}
