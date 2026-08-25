'use client'

import { useEffect, useRef, useState } from 'react'

export const TYPEWRITER_TIMING = {
  typeMs: 48,
  deleteMs: 32,
  pauseAfterCompleteMs: 2200,
  pauseBetweenQuestionsMs: 480,
  reducedMotionRotateMs: 5000,
} as const

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function useTypewriterCycle(questions: readonly string[], enabled: boolean) {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    if (!enabled || questions.length === 0) {
      setDisplayText('')
      return
    }

    let cancelled = false
    let timerId = 0

    const schedule = (delayMs: number, fn: () => void) => {
      timerId = window.setTimeout(() => {
        if (!cancelled) fn()
      }, delayMs)
    }

    if (reducedMotion) {
      const showAt = (i: number) => {
        indexRef.current = i
        setIndex(i)
        setDisplayText(questions[i] ?? '')
      }

      showAt(indexRef.current % questions.length)

      const rotate = () => {
        const next = (indexRef.current + 1) % questions.length
        showAt(next)
        timerId = window.setTimeout(rotate, TYPEWRITER_TIMING.reducedMotionRotateMs)
      }

      timerId = window.setTimeout(rotate, TYPEWRITER_TIMING.reducedMotionRotateMs)
      return () => {
        cancelled = true
        window.clearTimeout(timerId)
      }
    }

    let charIndex = 0
    let phase: 'typing' | 'pause' | 'deleting' | 'between' = 'typing'

    const currentQuestion = () => questions[indexRef.current] ?? ''

    const tick = () => {
      if (cancelled) return
      const question = currentQuestion()

      if (phase === 'typing') {
        charIndex += 1
        setDisplayText(question.slice(0, charIndex))
        if (charIndex >= question.length) {
          phase = 'pause'
          schedule(TYPEWRITER_TIMING.pauseAfterCompleteMs, tick)
        } else {
          schedule(TYPEWRITER_TIMING.typeMs, tick)
        }
        return
      }

      if (phase === 'pause') {
        phase = 'deleting'
        tick()
        return
      }

      if (phase === 'deleting') {
        charIndex -= 1
        setDisplayText(question.slice(0, charIndex))
        if (charIndex <= 0) {
          phase = 'between'
          schedule(TYPEWRITER_TIMING.pauseBetweenQuestionsMs, tick)
        } else {
          schedule(TYPEWRITER_TIMING.deleteMs, tick)
        }
        return
      }

      const next = (indexRef.current + 1) % questions.length
      indexRef.current = next
      setIndex(next)
      charIndex = 0
      phase = 'typing'
      schedule(TYPEWRITER_TIMING.typeMs, tick)
    }

    charIndex = 0
    phase = 'typing'
    setDisplayText('')
    schedule(TYPEWRITER_TIMING.typeMs, tick)

    return () => {
      cancelled = true
      window.clearTimeout(timerId)
    }
  }, [enabled, reducedMotion, questions])

  return {
    displayText,
    currentQuestion: questions[index] ?? '',
    reducedMotion,
  }
}
