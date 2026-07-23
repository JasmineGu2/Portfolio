'use client'

import { useRef } from 'react'
import { BentoWorkspaceShell } from './bento-workflows/BentoWorkspaceShell'
import { useBentoWorkspace } from './bento-workflows/BentoWorkspaceContext'
import { HeroBentoPanel } from './HeroBentoPanel'
import { ProductStoryCanvas } from './ProductStoryCanvas'

export function ProductStoryHome() {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const { colorScheme } = useBentoWorkspace()

  return (
    <BentoWorkspaceShell
      title="My workspace"
      description="Intro above · drag the product story canvas below to explore both career chains."
      hidePageHeader
    >
      <div className="bento-workflow-wrap bw-workflow-canvas bw-workflow-canvas--unified bw-workflow-canvas--n8n bw-workflow-canvas--compact">
        <HeroBentoPanel cellRefs={cellRefs} colorScheme={colorScheme} />
        <ProductStoryCanvas />
      </div>
    </BentoWorkspaceShell>
  )
}
