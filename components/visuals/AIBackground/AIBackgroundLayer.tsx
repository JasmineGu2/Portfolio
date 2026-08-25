'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AIBackground } from './AIBackground'
import type { AIBackgroundVariant } from './types'

type AIBackgroundLayerProps = {
  variant: AIBackgroundVariant
  density: number
}

/**
 * Mounts the fixed viewport wallpaper on document.body after hydration.
 * Portaling avoids bw-shell overflow/isolation clipping the canvas.
 */
export function AIBackgroundLayer({ variant, density }: AIBackgroundLayerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AIBackground variant={variant} density={density} />,
    document.body
  )
}
