'use client'

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { BOOT_COMMANDS, SUGGESTIONS, complete, runCommand, type OutputLine } from './terminal-commands'

interface Entry {
  id: number
  command: string
  lines: OutputLine[]
}

function scrollToId(id: string, smooth: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

function Line({ line, smooth }: { line: OutputLine; smooth: boolean }) {
  switch (line.kind) {
    case 'row':
      return (
        <div className="pt-row">
          <span className="pt-row__a">{line.cols[0]}</span>
          <span className="pt-row__b">{line.cols[1]}</span>
          <span className="pt-row__c">{line.cols[2]}</span>
        </div>
      )
    case 'error':
      return <p className="pt-line pt-line--error">{line.text}</p>
    case 'muted':
      return <p className="pt-line pt-line--muted">{line.text}</p>
    case 'link': {
      const { scrollTo, href, text } = line
      if (scrollTo) {
        return (
          <button type="button" className="pt-line pt-line--link" onClick={() => scrollToId(scrollTo, smooth)}>
            {text}
          </button>
        )
      }
      const external = href?.startsWith('http')
      return (
        <a
          className="pt-line pt-line--link"
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {text}
        </a>
      )
    }
    default:
      return <p className="pt-line">{line.text}</p>
  }
}

/**
 * The hero terminal: types out `BOOT_COMMANDS` on first paint, then hands over to a real prompt. All output
 * comes from `runCommand`, so a typed command and a clicked suggestion behave identically.
 */
export function TerminalWindow() {
  const reduceMotion = useReducedMotion() ?? false
  const inputId = useId()
  const [entries, setEntries] = useState<Entry[]>([])
  const [typing, setTyping] = useState('')
  const [booted, setBooted] = useState(false)
  const [value, setValue] = useState('')
  const nextId = useRef(1)
  const history = useRef<string[]>([])
  const historyIndex = useRef(0)
  const logRef = useRef<HTMLDivElement>(null)

  // Boot sequence. Reduced motion skips the typing and prints everything at once.
  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

    setEntries([])
    setTyping('')
    setBooted(false)

    void (async () => {
      for (const command of BOOT_COMMANDS) {
        if (!reduceMotion) {
          for (let i = 1; i <= command.length; i++) {
            if (cancelled) return
            setTyping(command.slice(0, i))
            await sleep(26)
          }
          await sleep(140)
        }
        if (cancelled) return
        setTyping('')
        setEntries((prev) => [...prev, { id: nextId.current++, command, lines: runCommand(command).lines }])
        if (!reduceMotion) await sleep(220)
      }
      if (!cancelled) setBooted(true)
    })()

    return () => {
      cancelled = true
    }
  }, [reduceMotion])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries, typing])

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim()
      if (!command) return
      history.current.push(command)
      historyIndex.current = history.current.length

      const result = runCommand(command)
      if (result.clear) {
        setEntries([])
        return
      }
      setEntries((prev) => [...prev, { id: nextId.current++, command, lines: result.lines }])
      if (result.scrollTo) scrollToId(result.scrollTo, !reduceMotion)
    },
    [reduceMotion]
  )

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.current.length) return
      historyIndex.current = Math.max(0, historyIndex.current - 1)
      setValue(history.current[historyIndex.current] ?? '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      historyIndex.current = Math.min(history.current.length, historyIndex.current + 1)
      setValue(history.current[historyIndex.current] ?? '')
    } else if (event.key === 'Tab') {
      event.preventDefault()
      setValue((current) => complete(current))
    }
  }

  return (
    <div className="pt-term" data-booted={booted ? '' : undefined}>
      <div className="pt-term__bar">
        <span className="pt-term__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="pt-term__title">zsh · ~/jasmine</span>
        <span className="pt-term__meta">toronto</span>
      </div>

      <div ref={logRef} className="pt-term__log" role="log" aria-live="polite" aria-label="Terminal output" tabIndex={0}>
        {entries.map((entry) => (
          <div key={entry.id} className="pt-entry">
            <p className="pt-cmd">
              <span className="pt-ps1" aria-hidden>
                $
              </span>{' '}
              {entry.command}
            </p>
            {entry.lines.map((line, i) => (
              <Line key={i} line={line} smooth={!reduceMotion} />
            ))}
          </div>
        ))}
        {typing && (
          <p className="pt-cmd">
            <span className="pt-ps1" aria-hidden>
              $
            </span>{' '}
            {typing}
            <span className="pt-caret" aria-hidden />
          </p>
        )}
      </div>

      {booted && (
        <>
          <form
            className="pt-prompt"
            onSubmit={(event) => {
              event.preventDefault()
              run(value)
              setValue('')
            }}
          >
            <label htmlFor={inputId} className="pt-sr">
              Type a command
            </label>
            <span className="pt-ps1" aria-hidden>
              $
            </span>
            <input
              id={inputId}
              className="pt-input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
          <div className="pt-suggest" aria-label="Suggested commands">
            {SUGGESTIONS.map((suggestion) => (
              <button key={suggestion} type="button" className="pt-chip" onClick={() => run(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
