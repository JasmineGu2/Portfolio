import type { ReactNode } from 'react'
import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

export function ResumeLink({
  children,
  className,
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  className?: string
  'aria-label'?: string
}) {
  return (
    <a {...RESUME_LINK_PROPS} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}
