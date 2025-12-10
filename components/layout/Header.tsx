'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, FolderKanban, Images } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 pointer-events-none">
      {/* Name Button */}
      <Link 
        href="/" 
        className="px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md hover:bg-white/20 dark:hover:bg-white/10 transition-colors font-['Fraunces',serif] font-light text-base md:text-lg text-black dark:text-white pointer-events-auto"
      >
        Jasmine Gu
      </Link>

      {/* Icon Buttons */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <Link 
          href="/" 
          className={cn(
            "p-2.5 rounded-lg backdrop-blur-md transition-all",
            pathname === '/' 
              ? "bg-white/20 dark:bg-white/10 text-black dark:text-white" 
              : "bg-white/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
          )}
          title="Work"
        >
          <Briefcase className="w-4 h-4" />
        </Link>
        <Link 
          href="/work" 
          className={cn(
            "p-2.5 rounded-lg backdrop-blur-md transition-all",
            pathname === '/work' 
              ? "bg-white/20 dark:bg-white/10 text-black dark:text-white" 
              : "bg-white/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
          )}
          title="Projects"
        >
          <FolderKanban className="w-4 h-4" />
        </Link>
        <Link 
          href="/gallery" 
          className={cn(
            "p-2.5 rounded-lg backdrop-blur-md transition-all",
            pathname === '/gallery' 
              ? "bg-white/20 dark:bg-white/10 text-black dark:text-white" 
              : "bg-white/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
          )}
          title="Gallery"
        >
          <Images className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

