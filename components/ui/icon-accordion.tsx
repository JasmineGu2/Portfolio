'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface AccordionItem {
  title: string
  description: string
  icon?: React.ReactNode
}

interface AccordionComponentProps {
  items?: AccordionItem[]
  defaultOpen?: number
}

const defaultItems: AccordionItem[] = [
  {
    title: "Tesla — Engineer → Sales & Brand Activation",
    description: "Weekdays: ML observability engineering. Weekends: sales and brand activations. (~2K+ leads across SF events and storefronts)"
  },
  {
    title: "Intuit — Frontend SWE → Shadowed PMs",
    description: "Built TurboTax onboarding and studied how A/B tests and experimentation make signing up for taxes delightful."
  },
  {
    title: "OMERS — Solutions Engineer → Business Analyst",
    description: "Shipped end-to-end enterprise IT solutions—from requirements → dev → QA → business ops."
  },
  {
    title: "Metaverse Group — BA → Python Engineer & B2B Growth Lead",
    description: "Automated B2B outreach with Python, generating 1,000+ leads from KPMG, Puma, and Hugo Boss."
  }
]

export function AccordionComponent({ items = defaultItems, defaultOpen }: AccordionComponentProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    defaultOpen !== undefined ? new Set([defaultOpen]) : new Set()
  )

  const toggleItem = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndices.has(index)
        
        return (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors hover:border-gray-300 dark:hover:border-gray-600"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-4 flex-1">
                {item.icon && (
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                )}
                <h3 
                  className="text-xl font-light text-[#2A2A2A] dark:text-white transition-colors group-hover:text-[#2A2A2A] dark:group-hover:text-white"
                  style={{ fontFamily: "Feature" }}
                >
                  {item.title}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors group-hover:text-[#2A2A2A] dark:group-hover:text-white" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-0">
                    <p 
                      className="text-lg text-gray-700 dark:text-gray-300 transition-colors leading-relaxed"
                      style={{ fontFamily: "Inter" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

