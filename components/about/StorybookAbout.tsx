'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
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

const cardContent = [
  {
    id: '1',
    text: "I've always been the kind of engineer who can't stop asking why.",
  },
  {
    id: '2',
    text: 'Why users behave the way they do.',
  },
  {
    id: '3',
    text: 'Why systems break.',
  },
  {
    id: '4',
    text: "Why certain designs convert and others don't.",
  },
  {
    id: '5',
    text: 'Every role I\'ve taken, I\'ve slowly shifted closer to the user — from writing code → to understanding behavior → to driving product decisions.',
  },
]

export default function StorybookAbout() {
  return (
    <section className="relative bg-white w-full">
      <div className="w-full">
        <motion.h2
          className="text-4xl font-bold text-black mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="space-y-4">
          {cardContent.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <p className="text-base text-gray-700 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


