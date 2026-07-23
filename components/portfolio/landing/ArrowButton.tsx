import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ArrowButton({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <span className={cn('landing-arrow-btn', className)} aria-label={label}>
      <ArrowUpRight className="landing-arrow-btn__icon" aria-hidden />
    </span>
  )
}
