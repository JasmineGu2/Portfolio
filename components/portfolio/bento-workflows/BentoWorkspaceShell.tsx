'use client'

import { useEffect } from 'react'
import { useBentoWorkspace } from './BentoWorkspaceContext'
import type { WorkflowLayoutConfig } from '@/lib/portfolio/bento-workflows/layouts'

export function BentoWorkspaceShell({
  children,
  layout,
  showSwitcher,
  onLayoutChange,
  title = 'My workspace',
  description,
  hidePageHeader = false,
}: {
  children: React.ReactNode
  layout?: WorkflowLayoutConfig
  showSwitcher?: boolean
  onLayoutChange?: (slug: string) => void
  title?: string
  description?: string
  hidePageHeader?: boolean
}) {
  const { setLayoutControls } = useBentoWorkspace()

  useEffect(() => {
    if (layout) {
      setLayoutControls({
        layout,
        showSwitcher,
        onLayoutChange,
      })
    } else {
      setLayoutControls(null)
    }

    return () => setLayoutControls(null)
  }, [layout, showSwitcher, onLayoutChange, setLayoutControls])

  return (
    <>
      {!hidePageHeader && (
        <header className="bw-main-header">
          <div>
            <p className="bw-main-eyebrow">{title}</p>
            {layout && (
              <h1 className="bw-main-title font-serif-display">
                Welcome back — <span className="text-[var(--pf-muted)]">{layout.title}</span>
              </h1>
            )}
          </div>
          {layout && <span className="bw-main-badge">{layout.tag}</span>}
        </header>
      )}

      {!hidePageHeader && description && <p className="bw-main-desc">{description}</p>}

      <div className="bw-main-canvas">{children}</div>
    </>
  )
}
