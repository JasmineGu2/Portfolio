'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SidebarProps {
  navItems?: Array<{ label: string; href: string; icon?: string }>
}

export default function Sidebar({ navItems }: SidebarProps) {
  const defaultNavItems = [
    { label: 'Home', href: '#', icon: '🏠' },
    { label: 'Story', href: '#story', icon: '📖' },
    { label: 'Projects', href: '#projects', icon: '📁' },
    { label: 'Contact', href: '#contact', icon: '✉️' },
  ]

  const items = navItems || defaultNavItems

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com', icon: 'gh' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'X' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white z-40 flex flex-col hidden md:flex">
      {/* Profile Section */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            JG
          </div>
          <div className="text-center">
            <h2 className="font-bold text-lg text-black">Jasmine Gu</h2>
            <p className="text-sm text-gray-600 mt-1">Engineer → Product Thinker</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors group"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span>{item.label}</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-black transition-colors" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-6 border-t border-gray-200">
        <ul className="space-y-2">
          {socialLinks.map((link, idx) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (items.length + idx) * 0.1 }}
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <span className="text-xs font-medium">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

