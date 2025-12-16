"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  title: string
  content: React.ReactNode
}

interface TimelineProps {
  data: TimelineItem[]
}

export function Timeline({ data }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeItem, setActiveItem] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-content-index") || "0")
            setActiveItem(index)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" }
    )

    const items = containerRef.current?.querySelectorAll("[data-content-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left side - Titles */}
        <div className="md:w-1/4 flex-shrink-0">
          <div className="space-y-16 md:space-y-24">
            {data.map((item, index) => (
              <div
                key={index}
                data-title-index={index}
                className="relative"
                style={{ minHeight: '120px' }}
              >
                <button
                  data-index={index}
                  className={cn(
                    "text-left transition-all duration-300 cursor-pointer w-full sticky",
                    activeItem === index
                      ? "text-[#2A2A2A] dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                  style={{
                    top: '2rem'
                  }}
                  onClick={() => {
                    const element = containerRef.current?.querySelector(`[data-content-index="${index}"]`)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                      setActiveItem(index)
                    }
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-['Feature',sans-serif] transition-all duration-300">
                    {item.title}
                  </h3>
                  {activeItem === index && (
                    <div className="mt-2 h-0.5 w-full bg-[#2A2A2A] dark:bg-white transition-all duration-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="md:w-3/4 space-y-16 md:space-y-24">
          {data.map((item, index) => (
            <div
              key={index}
              data-content-index={index}
              className="scroll-mt-8"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

