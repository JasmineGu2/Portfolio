import type { ReactNode } from 'react'
import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

export function ResumeLink({
  children,
  className,
  'aria-label': ariaLabel,
  onClick,
  'data-cuelume-hover': cuelumeHover,
}: {
  children: ReactNode
  className?: string
  'aria-label'?: string
  onClick?: () => void
  'data-cuelume-hover'?: boolean
}) {
  return (
    <a
      {...RESUME_LINK_PROPS}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      data-cuelume-hover={cuelumeHover}
    >
      {children}
    </a>
  )
}
