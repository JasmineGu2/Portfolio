'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FlowersBackground, type FlowersBackgroundConfig } from './FlowersBackground'

type FlowersBackgroundLayerProps = {
  dark?: boolean
  config?: Partial<FlowersBackgroundConfig>
}

/**
 * Mounts the fixed viewport flowers-video wallpaper on document.body after hydration.
 * Portaling avoids bw-shell overflow/isolation clipping the canvas.
 */
export function FlowersBackgroundLayer({ dark = false, config }: FlowersBackgroundLayerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(<FlowersBackground dark={dark} config={config} />, document.body)
}
