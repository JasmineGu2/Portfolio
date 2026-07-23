'use client'

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { schemeTagStyleVars, type TagVariant } from '@/lib/portfolio/bento-workflows/work-accents'

export function SchemeTag({
  label,
  color,
  size = 'md',
  className,
  icon,
  variant = 'primary',
}: {
  label: string
  color: string
  size?: 'sm' | 'md' | 'legend'
  className?: string
  icon?: ReactNode
  variant?: TagVariant
}) {
  return (
    <span
      className={cn(
        'bw-scheme-tag',
        variant === 'supporting' && 'bw-scheme-tag--supporting',
        variant === 'category' && 'bw-scheme-tag--category',
        variant === 'filled' && 'bw-scheme-tag--filled',
        size === 'sm' && 'bw-scheme-tag--sm',
        size === 'legend' && 'bw-scheme-tag--legend',
        size === 'md' && 'bw-scheme-tag--md',
        className
      )}
      style={schemeTagStyleVars(color, variant) as CSSProperties}
    >
      {icon && <span className="bw-scheme-tag-icon">{icon}</span>}
      {label}
    </span>
  )
}
