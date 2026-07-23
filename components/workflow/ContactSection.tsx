'use client'

import Link from 'next/link'
import { motion } from '@/lib/motion'
import { Mail, Linkedin, FileText } from 'lucide-react'
import { CONTACT_COPY } from '@/lib/workflow/workflow-data'
import { WorkflowGroup } from './WorkflowGroup'
import { ExecutionStatus } from './ExecutionStatus'

export function ContactSection() {
  return (
    <WorkflowGroup id="contact">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border-2 border-workflow-blue/30 bg-workflow-ivory p-6 md:p-8 shadow-lg max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted">
            Integration / Output
          </span>
          <ExecutionStatus state="idle" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-workflow-text">
          {CONTACT_COPY.title}
        </h2>
        <p className="text-sm md:text-base text-workflow-secondary mt-3 leading-relaxed">
          {CONTACT_COPY.body}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {CONTACT_COPY.buttons.map((btn) => {
            const Icon =
              btn.label.includes('Email')
                ? Mail
                : btn.label.includes('LinkedIn')
                  ? Linkedin
                  : FileText
            return btn.external ? (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-workflow-blue text-white font-semibold text-sm hover:bg-workflow-blue/90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue"
              >
                <Icon className="w-4 h-4" aria-hidden />
                {btn.label}
              </a>
            ) : (
              <Link
                key={btn.label}
                href={btn.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-workflow-border text-workflow-text font-semibold text-sm hover:bg-workflow-powder-light transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue"
              >
                <Icon className="w-4 h-4" aria-hidden />
                {btn.label}
              </Link>
            )
          })}
        </div>

        <p className="font-mono text-[10px] text-workflow-muted mt-5 max-w-md mx-auto leading-relaxed">
          {CONTACT_COPY.status}
        </p>
      </motion.div>
    </WorkflowGroup>
  )
}
