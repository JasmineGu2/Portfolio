'use client'

import Link from 'next/link'
import { Linkedin, Github, FileText } from 'lucide-react'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

export default function Footer() {
  return (
    <footer className="w-full transition-colors pb-4 mt-8">
      <div className="w-full px-4 md:px-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[60%] mx-auto rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden">
          <div className="absolute inset-0 -z-0">
            <GridPatternSpotlight />
          </div>
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
            {/* Email CTA Section */}
            <div className="mb-12 text-center">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 transition-colors" style={{ fontFamily: "Inter" }}>
                Always looking for opportunities, email me at{' '}
                <a 
                  href="mailto:jgu.hba2027@ivey.ca"
                  className="text-[#2A2A2A] dark:text-white hover:underline transition-colors"
                >
                  jgu.hba2027@ivey.ca
                </a>
              </p>
            </div>

            {/* Social Links and Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.linkedin.com/in/jasminegu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[#2A2A2A] dark:text-white hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://github.com/JasmineGu2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[#2A2A2A] dark:text-white hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="/Jasmine_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[#2A2A2A] dark:text-white hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Resume"
                >
                  <FileText className="w-5 h-5" />
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-base text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
                <p>Coded and Designed by Jasmine :)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

