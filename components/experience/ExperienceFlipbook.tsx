'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ExperienceFlipbookProps, ExperienceItem } from '@/lib/types'

const flipVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    rotateY: direction > 0 ? 90 : -90,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    rotateY: direction > 0 ? -90 : 90,
  }),
}

export default function ExperienceFlipbook({ experiences }: ExperienceFlipbookProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentExperience = experiences[currentIndex]

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  return (
    <section className="relative min-h-screen bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="metallic-text mb-16 text-center text-4xl font-bold md:text-5xl">
          Experience
        </h2>

        <div className="relative">
          {/* Flipbook Container */}
          <div className="relative h-[600px] perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  damping: 50,
                  stiffness: 300,
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-2xl bg-white border border-paragraph-black/20 shadow-sm p-8 md:p-12">
                  {currentExperience.image && (
                    <motion.img
                      src={currentExperience.image.src}
                      alt={currentExperience.image.alt}
                      className="h-24 w-24 rounded-full object-cover"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}

                  <div className="text-center">
                    <motion.p
                      className="text-sm font-medium uppercase tracking-wider text-paragraph-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentExperience.period}
                    </motion.p>
                    <motion.h3
                      className="mt-2 text-3xl font-bold md:text-4xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentExperience.role}
                    </motion.h3>
                    <motion.p
                      className="mt-2 text-xl text-paragraph-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentExperience.company}
                    </motion.p>
                  </div>

                  <motion.p
                    className="max-w-2xl text-center text-paragraph-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentExperience.description}
                  </motion.p>

                  {currentExperience.highlights && currentExperience.highlights.length > 0 && (
                    <motion.ul
                      className="flex flex-wrap justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {currentExperience.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="rounded-full border border-paragraph-black bg-background px-4 py-2 text-sm"
                        >
                          {highlight}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paragraph-black bg-white transition-colors hover:bg-secondary"
              aria-label="Previous experience"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5 5L7.5 10L12.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {experiences.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-paragraph-black'
                  }`}
                  aria-label={`Go to experience ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paragraph-black bg-white transition-colors hover:bg-secondary"
              aria-label="Next experience"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}

