import { cn } from '@/lib/utils'

export type PillTagVariant = 'primary-coral' | 'primary-lavender' | 'supporting' | 'card'

export function PillTag({
  label,
  variant = 'supporting',
  className,
}: {
  label: string
  variant?: PillTagVariant
  className?: string
}) {
  return (
    <span className={cn('landing-pill', `landing-pill--${variant}`, className)}>
      {label}
    </span>
  )
}
