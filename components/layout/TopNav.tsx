'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TopNavProps {
  navItems?: Array<{ label: string; href: string; icon?: string }>
}

export default function TopNav({ navItems }: TopNavProps) {
  const defaultNavItems = [
    { label: 'Work', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  const items = navItems || defaultNavItems
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF9]/80 dark:bg-[rgb(23,22,23)]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Name Section - Left */}
          <div>
            <h1 className="text-base md:text-lg font-bold text-[#2A2A2A] dark:text-white uppercase tracking-tight transition-colors">
              JASMINE GU ENGINEER → PRODUCT THINKER
            </h1>
          </div>

          {/* Navigation - Right */}
          <nav>
            <ul className="flex items-center gap-6 md:gap-8">
              {items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href === '/' && pathname === '/') ||
                  (item.href !== '/' && item.href !== '#contact' && pathname?.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm md:text-base font-medium transition-colors relative uppercase tracking-wide',
                        isActive
                          ? 'text-[#2A2A2A] dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

