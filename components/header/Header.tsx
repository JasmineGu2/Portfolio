'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeaderProps {
  logo?: React.ReactNode
  navItems?: Array<{ label: string; href: string }>
  className?: string
}

export default function Header({ logo, navItems, className }: HeaderProps) {
  return (
    <header className={`fixed top-0 z-50 w-full ${className || ''}`}>
      <div className="glass border-b border-paragraph-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          {/* Left side - Logo/Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {logo || (
              <Link href="/" className="text-xl font-bold hover:text-primary smooth-transition">
                Jasmine Gu
              </Link>
            )}
          </motion.div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-6">
            {/* Navigation items */}
            {navItems && navItems.length > 0 && (
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-paragraph-white hover:text-primary smooth-transition"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className="block h-0.5 w-6 bg-black transition-all" />
              <span className="block h-0.5 w-6 bg-black transition-all" />
              <span className="block h-0.5 w-6 bg-black transition-all" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

