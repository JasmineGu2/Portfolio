'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ProjectGridProps } from '@/lib/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const cubeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 70,
      stiffness: 500,
    },
  },
}

export default function ProjectGrid({
  projects,
  title = 'Projects',
  description,
}: ProjectGridProps) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="metallic-text mb-4 text-4xl font-bold md:text-5xl">{title}</h2>
          {description && (
            <p className="text-paragraph-white">{description}</p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cubeVariants}
              whileHover={{ y: -4 }}
              className="group aspect-square"
            >
              <Link
                href={project.link || '#'}
                className="relative flex h-full flex-col justify-between rounded-xl bg-white border border-paragraph-black/20 shadow-sm p-4 transition-all hover:shadow-md"
              >
                {/* Image placeholder */}
                <div className="relative h-32 bg-background rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-paragraph-black/5 flex items-center justify-center">
                      <span className="text-paragraph-white text-xs">Image</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-paragraph-white">
                    {project.category || 'Category'}
                  </span>
                  <h3 className="text-sm font-bold leading-tight">{project.title}</h3>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-paragraph-black/20 bg-white px-2 py-1 text-xs font-medium text-paragraph-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

