'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createUISFX } from 'uisfx'

interface SoundContextType {
  ui: ReturnType<typeof createUISFX> | null
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
  play: (cue: string) => void
  playLoop: (cue: string) => Promise<ReturnType<typeof createUISFX> | null>
  stopLoop: (handle: ReturnType<typeof createUISFX> | null) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setEnabled] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const uiRef = useRef<ReturnType<typeof createUISFX> | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize on first client render
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Unlock Web Audio on first user gesture
  useEffect(() => {
    if (!isClient) return

    const unlockAudio = async () => {
      try {
        // Create or resume audio context on user gesture
        if (!audioContextRef.current) {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)()
          audioContextRef.current = context
        } else if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        // Initialize uisfx with created context
        if (!uiRef.current) {
          uiRef.current = createUISFX({
            pack: 'studio',
            volume: 0.7,
            enabled: isEnabled,
            context: audioContextRef.current,
          })
        }

        // Remove listener after unlocking
        document.removeEventListener('pointerdown', unlockAudio)
      } catch (err) {
        console.error('Failed to unlock audio context:', err)
      }
    }

    document.addEventListener('pointerdown', unlockAudio, { once: true })

    return () => {
      document.removeEventListener('pointerdown', unlockAudio)
    }
  }, [isClient, isEnabled])

  // Update enabled state
  useEffect(() => {
    if (uiRef.current) {
      uiRef.current.setEnabled(isEnabled)
    }
  }, [isEnabled])

  const play = (cue: string) => {
    if (uiRef.current && isEnabled) {
      try {
        uiRef.current.play(cue as any)
      } catch (err) {
        console.warn(`Failed to play cue "${cue}":`, err)
      }
    }
  }

  const playLoop = async (cue: string) => {
    if (uiRef.current && isEnabled) {
      try {
        return await uiRef.current.play(cue as any)
      } catch (err) {
        console.warn(`Failed to play loop "${cue}":`, err)
        return null
      }
    }
    return null
  }

  const stopLoop = (handle: ReturnType<typeof createUISFX> | null) => {
    if (handle && uiRef.current && isEnabled) {
      try {
        uiRef.current.stop(handle)
      } catch (err) {
        console.warn('Failed to stop loop:', err)
      }
    }
  }

  return (
    <SoundContext.Provider
      value={{
        ui: uiRef.current,
        isEnabled,
        setEnabled,
        play,
        playLoop,
        stopLoop,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
