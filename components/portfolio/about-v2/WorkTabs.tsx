'use client'

import { useState } from 'react'
import { useSound } from '@/components/portfolio/SoundProvider'
import { SOUND_CUES } from '@/lib/portfolio/sound-cues'

const WORK_ITEMS = [
  { id: 1, title: 'Autodesk', role: 'PM - Data Platform', year: '2023-2024' },
  { id: 2, title: 'Tesla', role: 'Infra Engineer', year: '2022-2023' },
  { id: 3, title: 'Intuit', role: 'Frontend Engineer', year: '2021-2022' },
]

export function WorkTabs() {
  const [activeTab, setActiveTab] = useState(0)
  const sound = useSound()

  const handleTabClick = (index: number) => {
    sound.play(SOUND_CUES.TAB_SWITCH)
    setActiveTab(index)
  }

  return (
    <div className="work-tabs">
      <div className="tabs-header">
        {['Engineering', 'Product', 'Side Projects'].map((tab, i) => (
          <button
            key={i}
            className={`tab ${i === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {WORK_ITEMS.map((item) => (
          <div key={item.id} className="work-item">
            <h3>{item.title}</h3>
            <p>{item.role}</p>
            <p className="year">{item.year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
