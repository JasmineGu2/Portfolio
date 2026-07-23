'use client'

import { useState } from 'react'
import { STORY_STEPS } from '@/lib/workflow/story-narrative'
import { LargeCardsOption } from './options/LargeCardsOption'
import { MiroFlowOption } from './options/MiroFlowOption'
import { ZonedStoryOption } from './options/ZonedStoryOption'
import { N8nCanvas } from './N8nCanvas'

type OptionId = 'current' | 'large' | 'miro' | 'zones'

const OPTIONS: { id: OptionId; label: string; desc: string }[] = [
  { id: 'large', label: 'A · Big cards', desc: 'Large timeline cards — easiest to scan' },
  { id: 'miro', label: 'B · Miro flow', desc: 'Boxes + oval tags, zigzag layout' },
  { id: 'zones', label: 'C · Story zones', desc: 'Themed chapters like n8n steps' },
  { id: 'current', label: 'Compact', desc: 'Small n8n-style node canvas' },
]

export function StoryOptionsSwitcher() {
  const [active, setActive] = useState<OptionId>('large')

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Site header + layout tabs — always visible */}
      <header className="shrink-0 border-b border-n8n-border bg-n8n-toolbar z-50">
        <div className="flex items-center justify-between px-4 py-2 gap-3">
          <a href="/" className="text-sm font-bold text-n8n-text shrink-0">
            Jasmine Gu
          </a>
          <a
            href="mailto:jgu.hba2027@ivey.ca"
            className="text-xs font-medium px-3 py-1.5 rounded bg-n8n-accent text-white shrink-0"
          >
            Contact
          </a>
        </div>

        <nav
          className="flex items-center gap-2 px-4 pb-3 overflow-x-auto"
          aria-label="Layout options"
        >
          <span className="text-xs font-semibold text-n8n-text shrink-0 mr-1">
            Layout:
          </span>
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActive(opt.id)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                active === opt.id
                  ? 'bg-n8n-accent text-white shadow-md shadow-n8n-accent/30'
                  : 'bg-n8n-node border border-n8n-border text-n8n-text hover:border-n8n-accent/60'
              }`}
              title={opt.desc}
            >
              {opt.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden">
        {active === 'large' && <LargeCardsOption steps={STORY_STEPS} />}
        {active === 'miro' && <MiroFlowOption steps={STORY_STEPS} />}
        {active === 'zones' && <ZonedStoryOption steps={STORY_STEPS} />}
        {active === 'current' && <N8nCanvas className="h-full" />}
      </div>
    </div>
  )
}
