'use client'

import { cn } from '@/lib/utils'

interface ProjectToggleProps {
  value: 'pm' | 'technical'
  onToggle: (value: 'pm' | 'technical') => void
}

export default function ProjectToggle({ value, onToggle }: ProjectToggleProps) {
  const handleClick = (newValue: 'pm' | 'technical') => {
    onToggle(newValue)
  }

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-fit">
      <button
        onClick={() => handleClick('pm')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
          value === 'pm'
            ? 'bg-white dark:bg-gray-700 text-[#2A2A2A] dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
        )}
      >
        PM Projects
      </button>
      <button
        onClick={() => handleClick('technical')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
          value === 'technical'
            ? 'bg-white dark:bg-gray-700 text-[#2A2A2A] dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-[#2A2A2A] dark:hover:text-white'
        )}
      >
        Technical Projects
      </button>
    </div>
  )
}

