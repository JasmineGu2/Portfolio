'use client'

import { useState } from 'react'
import { useSound } from '@/components/portfolio/SoundProvider'
import { SOUND_CUES } from '@/lib/portfolio/sound-cues'

const QUOTES = [
  'Built an agent to automate my own job applications.',
  '28 educationals. yes, I counted',
  'Built systems for people I care about.',
  'Wrote 100k+ lines of code this year',
  'Led a hackathon with 300+ students',
]

export function QuotesPin() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sound = useSound()

  const handleNext = () => {
    sound.play(SOUND_CUES.CLICK)
    setCurrentIndex((i) => (i + 1) % QUOTES.length)
  }

  return (
    <div className="quotes-pin">
      <div className="pin-header">
        <h3>Core Values</h3>
        <button onClick={handleNext} className="next-btn">
          →
        </button>
      </div>
      <p className="quote">{QUOTES[currentIndex]}</p>
      <div className="pin-indicator">
        {QUOTES.map((_, i) => (
          <span key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
