import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ReflectionLink({
  href,
  title,
  className,
}: {
  href: string
  title: string
  className?: string
}) {
  return (
    <Link href={href} className={cn('landing-reflection-link', className)}>
      {title}
      <span aria-hidden> →</span>
    </Link>
  )
}
