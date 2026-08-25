import type { ReactNode } from 'react'
import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

export function ResumeLink({
  children,
  className,
  'aria-label': ariaLabel,
  onClick,
}: {
  children: ReactNode
  className?: string
  'aria-label'?: string
  onClick?: () => void
}) {
  return (
    <a {...RESUME_LINK_PROPS} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  )
}
