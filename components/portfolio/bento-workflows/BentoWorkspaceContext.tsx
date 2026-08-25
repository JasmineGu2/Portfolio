'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  PORTFOLIO_DEFAULT_SCHEME,
  normalizeColorSchemeId,
  getColorSchemeIndex,
  type ColorSchemeId,
} from '@/lib/portfolio/bento-workflows/color-schemes'
import type { WorkflowLayoutConfig } from '@/lib/portfolio/bento-workflows/layouts'

const COLOR_SCHEME_STORAGE_KEY = 'bw-color-scheme'

const LEGACY_SCHEME_MIGRATIONS: Record<string, ColorSchemeId> = {
  'palette-sand-chartreuse-duo': PORTFOLIO_DEFAULT_SCHEME,
  soft: PORTFOLIO_DEFAULT_SCHEME,
}

function readStoredColorScheme(): ColorSchemeId {
  if (typeof window === 'undefined') return PORTFOLIO_DEFAULT_SCHEME
  try {
    const stored = window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)
    if (!stored) return PORTFOLIO_DEFAULT_SCHEME
    const migrated = LEGACY_SCHEME_MIGRATIONS[stored] ?? stored
    const normalized = normalizeColorSchemeId(migrated as ColorSchemeId)
    return getColorSchemeIndex(normalized) >= 0 ? normalized : PORTFOLIO_DEFAULT_SCHEME
  } catch {
    return PORTFOLIO_DEFAULT_SCHEME
  }
}

export interface BentoLayoutControls {
  layout?: WorkflowLayoutConfig
  showSwitcher?: boolean
  onLayoutChange?: (slug: string) => void
}

interface BentoWorkspaceContextValue {
  colorScheme: ColorSchemeId
  setColorScheme: (id: ColorSchemeId) => void
  layoutControls: BentoLayoutControls | null
  setLayoutControls: (controls: BentoLayoutControls | null) => void
}

const BentoWorkspaceContext = createContext<BentoWorkspaceContextValue | null>(null)

export function BentoWorkspaceProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeId>(PORTFOLIO_DEFAULT_SCHEME)
  const [layoutControls, setLayoutControls] = useState<BentoLayoutControls | null>(null)

  useEffect(() => {
    setColorSchemeState(readStoredColorScheme())
  }, [])

  const setColorScheme = (id: ColorSchemeId) => {
    const normalized = normalizeColorSchemeId(id) as ColorSchemeId
    if (getColorSchemeIndex(normalized) < 0) return
    setColorSchemeState(normalized)
    try {
      window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, normalized)
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  const value = useMemo(
    () => ({
      colorScheme,
      setColorScheme,
      layoutControls,
      setLayoutControls,
    }),
    [colorScheme, layoutControls]
  )

  return (
    <BentoWorkspaceContext.Provider value={value}>{children}</BentoWorkspaceContext.Provider>
  )
}

export function useBentoWorkspace() {
  const context = useContext(BentoWorkspaceContext)
  if (!context) {
    throw new Error('useBentoWorkspace must be used within BentoWorkspaceProvider')
  }
  return context
}
