import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <p id={id} className={cn('landing-section-label', className)}>
      {children}
    </p>
  )
}
