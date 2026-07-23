'use client'

import { useEffect, useRef } from 'react'
import { BentoWorkspaceShell } from './bento-workflows/BentoWorkspaceShell'
import { GalleryHeroPanel } from './GalleryHeroPanel'
import { GalleryPhotoGrid } from './GalleryPhotoGrid'
import { useBentoWorkspace } from './bento-workflows/BentoWorkspaceContext'
import { PORTFOLIO_PAGE_SCHEME } from '@/lib/portfolio/bento-workflows/color-schemes'

export function GalleryPageClient() {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const { colorScheme, setColorScheme } = useBentoWorkspace()

  useEffect(() => {
    setColorScheme(PORTFOLIO_PAGE_SCHEME)
  }, [setColorScheme])

  return (
    <BentoWorkspaceShell hidePageHeader>
      <div className="bento-workflow-wrap bw-workflow-canvas bw-workflow-canvas--unified bw-workflow-canvas--n8n bw-workflow-canvas--compact bw-workflow-canvas--gallery">
        <GalleryHeroPanel cellRefs={cellRefs} colorScheme={colorScheme} showKindTabs={false} />

        <div className="bento-career-zone">
          <p className="bw-card-label mb-3 md:mb-4">Moments</p>
          <GalleryPhotoGrid />
        </div>
      </div>
    </BentoWorkspaceShell>
  )
}
