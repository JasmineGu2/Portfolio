'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarProps {
  navItems?: Array<{ label: string; href: string; icon?: string }>
}

export default function Sidebar({ navItems }: SidebarProps) {
  const defaultNavItems = [
    { label: 'Work', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  const items = navItems || defaultNavItems

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-[#FAFAF9] dark:bg-[rgb(23,22,23)] z-40 flex flex-col hidden md:flex transition-colors">
      {/* Name Section */}
      <div className="p-8 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <h1 className="text-2xl font-bold text-[#2A2A2A] dark:text-white uppercase tracking-tight transition-colors">
          Jasmine Gu
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">Engineer → Product Thinker</p>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#2A2A2A] dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

