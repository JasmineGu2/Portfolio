'use client'

import { useState, useRef, useEffect } from 'react'
import { useSound } from '@/components/portfolio/SoundProvider'
import { SOUND_CUES } from '@/lib/portfolio/sound-cues'

interface AskPanelProps {
  onClose: () => void
}

const STARTERS = [
  { id: 'who', question: 'Who are you?' },
  { id: 'what', question: 'What are you building?' },
  { id: 'where', question: 'Where are you based?' },
  { id: 'next', question: 'What\'s next?' },
]

export function AskPanel({ onClose }: AskPanelProps) {
  const sound = useSound()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ type: 'q' | 'a'; text: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    sound.play(SOUND_CUES.OPEN_PANEL)
    inputRef.current?.focus()

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.play(SOUND_CUES.CLOSE_PANEL)
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [sound, onClose])

  const handleSubmit = (question: string) => {
    if (!question.trim()) return

    sound.play(SOUND_CUES.CLICK)
    setMessages((prev) => [...prev, { type: 'q', text: question }])

    // Mock answer
    const answer = `This is a response to: "${question}"`
    setMessages((prev) => [...prev, { type: 'a', text: answer }])
    sound.play(SOUND_CUES.SUCCESS)

    setInput('')
  }

  const handleQuickQuestion = (question: string) => {
    handleSubmit(question)
  }

  const handleClose = () => {
    sound.play(SOUND_CUES.CLOSE_PANEL)
    onClose()
  }

  return (
    <aside className="ask-panel">
      <div className="panel-header">
        <h2>✦ Ask me</h2>
        <button onClick={handleClose} className="close-btn">
          ✕
        </button>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <div className="starters">
            <p>Ask me anything:</p>
            <div className="starter-buttons">
              {STARTERS.map((starter) => (
                <button
                  key={starter.id}
                  className="starter-btn"
                  onClick={() => handleQuickQuestion(starter.question)}
                >
                  {starter.question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="panel-footer">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(input)}
          placeholder="Ask me anything..."
          className="ask-input"
        />
        <button onClick={() => handleSubmit(input)} className="submit-btn">
          Send
        </button>
      </div>
    </aside>
  )
}
