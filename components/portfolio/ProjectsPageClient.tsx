'use client'

import { BentoWorkspaceShell } from './bento-workflows/BentoWorkspaceShell'
import { ProjectsBentoGrid } from './ProjectsBentoGrid'

export function ProjectsPageClient() {
  return (
    <BentoWorkspaceShell hidePageHeader>
      <ProjectsBentoGrid />
    </BentoWorkspaceShell>
  )
}
