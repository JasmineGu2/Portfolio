'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SectionNavItem {
  id: string
  label: string
}

interface SectionNavProps {
  items: SectionNavItem[]
  className?: string
}

export default function SectionNav({ items, className }: SectionNavProps) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={cn('flex flex-wrap items-center gap-4 md:gap-6', className)}>
      {items.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="sm"
          onClick={() => handleClick(item.id)}
          className="text-xs md:text-sm text-[#6B6B6B] dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white hover:bg-transparent rounded-none px-0 py-1 h-auto font-normal transition-colors"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )
}

