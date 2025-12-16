'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="w-full bg-[#E8E8E8] dark:bg-[rgb(28,27,28)] transition-colors relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 -z-0">
          <GridPatternSpotlight />
        </div>
        <div className="relative z-10 px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] mx-auto">
              {/* Name/Logo */}
              <Link 
                href="/" 
                className="text-xl md:text-2xl text-[#2A2A2A] dark:text-white hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Editorial Old" }}
              >
                Jasmine Gu
              </Link>

              {/* Navigation and Actions */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Navigation Links */}
                <nav className="flex items-center gap-4 md:gap-6">
                  <Link 
                    href="/#work-experience" 
                    className={cn(
                      "text-base md:text-lg font-medium transition-colors",
                      pathname === '/' 
                        ? "text-[#2A2A2A] dark:text-white" 
                        : "text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white"
                    )}
                    style={{ fontFamily: "Inter" }}
                  >
                    Work
                  </Link>
                  <Link 
                    href="/projects" 
                    className={cn(
                      "text-base md:text-lg font-medium transition-colors",
                      pathname === '/projects' 
                        ? "text-[#2A2A2A] dark:text-white" 
                        : "text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white"
                    )}
                    style={{ fontFamily: "Inter" }}
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/gallery" 
                    className={cn(
                      "text-base md:text-lg font-medium transition-colors",
                      pathname === '/gallery' 
                        ? "text-[#2A2A2A] dark:text-white" 
                        : "text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white"
                    )}
                    style={{ fontFamily: "Inter" }}
                  >
                    Gallery
                  </Link>
                  <Link 
                    href="/Jasmine_Resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-base md:text-lg font-medium transition-colors",
                      "text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white"
                    )}
                    style={{ fontFamily: "Inter" }}
                  >
                    Resume
                  </Link>
                </nav>
              </div>
          </div>
        </div>
      </div>
    </header>
  )
}
