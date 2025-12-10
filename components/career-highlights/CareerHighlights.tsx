'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CareerHighlightsProps } from '@/lib/types'

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

export default function CareerHighlights({ highlights }: CareerHighlightsProps) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="metallic-text mb-16 text-center text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Career Highlights
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((highlight) => (
            <motion.div
              key={highlight.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link
                href={highlight.link || '#'}
                className="block h-full rounded-2xl bg-white border border-paragraph-black/20 shadow-sm p-6 transition-all hover:shadow-md"
              >
                {highlight.icon && (
                  <div className="mb-4 text-3xl">{highlight.icon}</div>
                )}

                <h3 className="mb-2 text-xl font-bold">{highlight.title}</h3>
                <p className="text-paragraph-white">{highlight.description}</p>

                {highlight.tags && highlight.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {highlight.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-paragraph-black bg-background px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

