'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { FooterProps } from '@/lib/types'

export default function Footer({
  email,
  socialLinks = [],
  copyright,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-paragraph-black bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="mb-2 text-xl font-bold">Let's Connect</h3>
            <Link
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 text-paragraph-white transition-colors hover:text-primary"
            >
              <span>{email}</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:rotate-45"
              >
                <path
                  d="M6.25 3.75L11.25 8.75L6.25 13.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Link>
          </div>

          {socialLinks.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-paragraph-white transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="border-t border-paragraph-black pt-8 text-center">
          <p className="mb-2 text-sm text-paragraph-white">
            {copyright || `© ${currentYear} All rights reserved.`}
          </p>
          <p className="text-sm font-medium italic text-paragraph-white">
            Curiosity builds the best products.
          </p>
        </div>
      </div>
    </footer>
  )
}

