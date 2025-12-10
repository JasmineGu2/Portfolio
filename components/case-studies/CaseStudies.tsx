'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CaseStudiesProps } from '@/lib/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 70,
      stiffness: 500,
    },
  },
}

export default function CaseStudies({
  caseStudies,
  title = 'PM Case Studies',
}: CaseStudiesProps) {
  // Split into first card (large) and remaining cards (small)
  const firstCard = caseStudies[0]
  const remainingCards = caseStudies.slice(1)

  return (
    <section className="py-16 w-full">
      <div className="w-full">
        <motion.h2
          className="text-4xl font-bold text-black mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* First row - Large card */}
          {firstCard && (
            <motion.article
              key={firstCard.id}
              variants={cardVariants}
              className="group"
            >
              <Link
                href={firstCard.link || '#'}
                className="block overflow-hidden rounded-lg bg-white border border-gray-200 transition-all hover:border-gray-300"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image on left */}
                  <div className="relative h-64 md:h-auto bg-background flex items-center justify-center p-8">
                    {firstCard.image ? (
                      <img
                        src={firstCard.image.src}
                        alt={firstCard.image.alt}
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-paragraph-black/5 rounded-lg flex items-center justify-center">
                        <span className="text-paragraph-white text-sm">Image Placeholder</span>
                      </div>
                    )}
                  </div>

                  {/* Content on right */}
                  <div className="flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {firstCard.category || 'Category'}
                      </span>
                      <h3 className="mt-2 text-2xl md:text-3xl font-bold text-black leading-tight">
                        {firstCard.title}
                      </h3>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {firstCard.description || 'Faced with a 40% cart abandonment rate, I redesigned the checkout flow to address user pain points. By simplifying the process, optimizing for mobile, and reducing friction, we achieved significant improvements in conversion rates.'}
                      </p>
                    </div>

                    {/* Tags */}
                    {firstCard.tags && firstCard.tags.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {firstCard.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Second row - Two smaller cards */}
          {remainingCards.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8">
              {remainingCards.slice(0, 2).map((caseStudy) => (
                <motion.article
                  key={caseStudy.id}
                  variants={cardVariants}
                  className="group"
                >
                  <Link
                    href={caseStudy.link || '#'}
                    className="block overflow-hidden rounded-lg bg-white border border-gray-200 transition-all hover:border-gray-300"
                  >
                    {/* Image on top */}
                    <div className="relative h-48 bg-background flex items-center justify-center p-6">
                      {caseStudy.image ? (
                        <img
                          src={caseStudy.image.src}
                          alt={caseStudy.image.alt}
                          className="h-full w-full object-contain transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-paragraph-black/5 rounded-lg flex items-center justify-center">
                          <span className="text-paragraph-white text-sm">Image Placeholder</span>
                        </div>
                      )}
                    </div>

                    {/* Content below */}
                    <div className="p-6">
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {caseStudy.category || 'Category'}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-black leading-tight">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.tags && caseStudy.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {caseStudy.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

