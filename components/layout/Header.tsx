'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, FolderKanban, Images, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Name/Logo */}
          <Link 
            href="/" 
            className="font-['Fraunces',serif] font-light text-lg md:text-xl text-[#2A2A2A] dark:text-white hover:opacity-80 transition-opacity"
          >
            Jasmine Gu
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Navigation Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <Link 
                href="/" 
                className={cn(
                  "p-2 md:p-2.5 rounded-lg transition-all",
                  pathname === '/' 
                    ? "bg-[#2A2A2A] dark:bg-white/10 text-white dark:text-white" 
                    : "text-[#2A2A2A] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#2A2A2A] dark:hover:text-white"
                )}
                title="Work"
              >
                <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link 
                href="/projects" 
                className={cn(
                  "p-2 md:p-2.5 rounded-lg transition-all",
                  pathname === '/projects' 
                    ? "bg-[#2A2A2A] dark:bg-white/10 text-white dark:text-white" 
                    : "text-[#2A2A2A] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#2A2A2A] dark:hover:text-white"
                )}
                title="Projects"
              >
                <FolderKanban className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link 
                href="/gallery" 
                className={cn(
                  "p-2 md:p-2.5 rounded-lg transition-all",
                  pathname === '/gallery' 
                    ? "bg-[#2A2A2A] dark:bg-white/10 text-white dark:text-white" 
                    : "text-[#2A2A2A] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#2A2A2A] dark:hover:text-white"
                )}
                title="Gallery"
              >
                <Images className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            {/* Resume Button */}
            <Button
              asChild
              className="bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] hover:bg-[#1a1a1a] dark:hover:bg-gray-100 transition-colors ml-2 md:ml-4"
            >
              <Link 
                href="/Jasmine_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden md:inline">Resume</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
