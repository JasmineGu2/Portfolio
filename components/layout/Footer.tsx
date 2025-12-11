'use client'

import Link from 'next/link'
import { Mail, Linkedin, Github, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="w-full bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Email CTA Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] dark:text-white mb-4 transition-colors font-['Fraunces',serif]">
            Let's connect and build something amazing together
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] hover:bg-[#1a1a1a] dark:hover:bg-gray-100 transition-colors"
          >
            <Link 
              href="mailto:jasmine@example.com"
              className="flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
            </Link>
          </Button>
        </div>

        {/* Social Links and Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/jasminegu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white dark:bg-gray-800 text-[#2A2A2A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/JasmineGu2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white dark:bg-gray-800 text-[#2A2A2A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="/Jasmine_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white dark:bg-gray-800 text-[#2A2A2A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Resume"
            >
              <FileText className="w-5 h-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            <p>© {new Date().getFullYear()} Jasmine Gu. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

