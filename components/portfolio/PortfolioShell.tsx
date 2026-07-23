'use client'

import { BentoWorkspaceShell } from './bento-workflows/BentoWorkspaceShell'
import type { WorkflowLayoutConfig } from '@/lib/portfolio/bento-workflows/layouts'

export function PortfolioShell({
  children,
  title = 'My workspace',
  description,
  layout,
  showSwitcher,
  onLayoutChange,
}: {
  children: React.ReactNode
  title?: string
  description?: string
  layout?: WorkflowLayoutConfig
  showSwitcher?: boolean
  onLayoutChange?: (slug: string) => void
}) {
  return (
    <BentoWorkspaceShell
      title={title}
      description={description}
      layout={layout}
      showSwitcher={showSwitcher}
      onLayoutChange={onLayoutChange}
    >
      {children}
    </BentoWorkspaceShell>
  )
}
