'use client'

import { AnimatePresence, motion } from '@/lib/motion'
import { ChevronDown } from 'lucide-react'
import type { NodeDetails } from '@/lib/workflow/types'

interface ExpandableNodePanelProps {
  details: NodeDetails
  isOpen: boolean
  onToggle: () => void
}

export function ExpandableNodePanel({
  details,
  isOpen,
  onToggle,
}: ExpandableNodePanelProps) {
  return (
    <div className="mt-3 border-t border-workflow-border/40 pt-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left text-xs font-medium text-workflow-blue hover:text-workflow-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-workflow-blue rounded px-1 py-0.5"
        aria-expanded={isOpen}
      >
        <span>View execution details</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <dl className="mt-3 space-y-2.5 text-xs">
              <DetailRow label="Input" value={details.input} />
              <DetailRow label="Process" value={details.process} />
              <DetailRow label="Output" value={details.output} />
              <DetailRow label="Translation" value={details.translation} highlight />
              <DetailRow label="Unlocked" value={details.unlocked} />
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted mb-1">
                  Tools
                </dt>
                <dd className="flex flex-wrap gap-1">
                  {details.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-workflow-powder-light text-workflow-text"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-workflow-muted mb-0.5">
        {label}
      </dt>
      <dd
        className={`text-workflow-text leading-relaxed ${
          highlight ? 'text-workflow-blue font-medium' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
