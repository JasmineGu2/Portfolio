'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  getSchemeTokens,
  schemeTokensToCssVars,
} from '@/lib/portfolio/bento-workflows/scheme-tokens'
import { getPaletteVariant, isPaletteScheme } from '@/lib/portfolio/bento-workflows/color-schemes'
import {
  CUSTOM_DUO_PALETTE_UPDATE_EVENT,
  isCustomDuoScheme,
  readAllCustomDuoEdits,
  setClientDuoPaletteEdits,
} from '@/lib/portfolio/bento-workflows/custom-duo-palettes'
import {
  BentoWorkspaceProvider,
  useBentoWorkspace,
} from './BentoWorkspaceContext'
import { HeroWorkspaceNav } from './HeroWorkspaceNav'
import { AgentSidePanel } from '@/components/portfolio/agent/AgentSidePanel'

function BentoWorkspaceFrame({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useBentoWorkspace()
  const [duoRevision, setDuoRevision] = useState(0)
  const schemeTokens = getSchemeTokens(colorScheme)
  const schemeTone = isPaletteScheme(colorScheme) ? getPaletteVariant(colorScheme) : 'classic'
  const isCustomDuo = isCustomDuoScheme(colorScheme)
  const schemeVars = useMemo(
    () => schemeTokensToCssVars(getSchemeTokens(colorScheme)),
    [colorScheme, duoRevision]
  )

  useEffect(() => {
    const syncEdits = () => {
      setClientDuoPaletteEdits(readAllCustomDuoEdits())
      setDuoRevision((value) => value + 1)
    }

    syncEdits()
    window.addEventListener(CUSTOM_DUO_PALETTE_UPDATE_EVENT, syncEdits)
    return () => {
      window.removeEventListener(CUSTOM_DUO_PALETTE_UPDATE_EVENT, syncEdits)
      setClientDuoPaletteEdits(null)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    for (const [key, value] of Object.entries(schemeVars)) {
      if (typeof value === 'string') {
        root.style.setProperty(key, value)
      }
    }
    return () => {
      for (const key of Object.keys(schemeVars)) {
        root.style.removeProperty(key)
      }
    }
  }, [colorScheme, schemeVars])

  return (
    <div
      className="bw-shell"
      data-color-scheme={colorScheme}
      data-scheme-tone={schemeTone}
      data-work-mode={schemeTokens.workMode}
      data-custom-duo={isCustomDuo ? 'true' : undefined}
      style={schemeVars}
    >
      <div className="bw-main">
        <header className="bw-site-nav">
          <HeroWorkspaceNav compact showWorkspaceControls={false} />
        </header>
        {children}
        <AgentSidePanel />
      </div>
    </div>
  )
}

export function BentoWorkspaceRoot({ children }: { children: React.ReactNode }) {
  return (
    <BentoWorkspaceProvider>
      <BentoWorkspaceFrame>{children}</BentoWorkspaceFrame>
    </BentoWorkspaceProvider>
  )
}
