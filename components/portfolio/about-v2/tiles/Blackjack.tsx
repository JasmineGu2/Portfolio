'use client'

import { useState } from 'react'
import { useSound } from '@/components/portfolio/SoundProvider'
import { SOUND_CUES } from '@/lib/portfolio/sound-cues'

export function Blackjack() {
  const [hand, setHand] = useState<number[]>([])
  const [balance, setBalance] = useState(100)
  const sound = useSound()

  const handleDeal = () => {
    sound.play(SOUND_CUES.CLICK)
    setHand([Math.floor(Math.random() * 10) + 2, Math.floor(Math.random() * 10) + 2])
  }

  const handleHit = () => {
    sound.play(SOUND_CUES.CLICK)
    setHand([...hand, Math.floor(Math.random() * 10) + 2])
  }

  const total = hand.reduce((a, b) => a + b, 0)

  return (
    <div className="blackjack-game">
      <h3>Blackjack</h3>
      <div className="game-area">
        <div className="hand">
          {hand.map((card, i) => (
            <div key={i} className="card">
              {card}
            </div>
          ))}
        </div>
        <p className="total">Total: {total}</p>
      </div>
      <div className="buttons">
        <button onClick={handleDeal} className="btn-deal">
          Deal
        </button>
        {hand.length > 0 && (
          <button onClick={handleHit} className="btn-hit">
            Hit
          </button>
        )}
      </div>
      <p className="balance">Balance: ${balance}</p>
    </div>
  )
}
