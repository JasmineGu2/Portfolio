'use client'

import { useEffect, useState } from 'react'
import { PLAY_FACES } from '@/lib/portfolio/play-data'

type Card = { r: string; s: string }
type Phase = 'idle' | 'play' | 'over'
type Game = { deck: Card[]; me: Card[]; dl: Card[]; bal: number; phase: Phase; msg: string; fresh: number }

const SUITS = ['♠', '♥', '♦', '♣']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function newDeck(): Card[] {
  const deck = SUITS.flatMap((s) => RANKS.map((r) => ({ r, s })))
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

function value(hand: Card[]) {
  let total = 0
  let aces = 0
  for (const c of hand) {
    if (c.r === 'A') {
      aces++
      total += 11
    } else total += 'JQK'.includes(c.r) || c.r === '10' ? 10 : Number(c.r)
  }
  while (total > 21 && aces) {
    total -= 10
    aces--
  }
  return total
}

const START: Game = { deck: [], me: [], dl: [], bal: 110, phase: 'idle', msg: 'deal · $10 a hand', fresh: 0 }

function deal(g: Game): Game {
  const deck = g.deck.length < 12 ? newDeck() : [...g.deck]
  const start = g.bal < 10 ? 100 : g.bal
  const bal = start - 10
  const me = [deck.pop()!, deck.pop()!]
  const dl = [deck.pop()!, deck.pop()!]
  const fresh = 2
  if (value(me) === 21) {
    const push = value(dl) === 21
    return { deck, me, dl, bal: bal + (push ? 10 : 25), phase: 'over', msg: push ? 'both blackjack · push' : 'blackjack · you win $15', fresh }
  }
  return { deck, me, dl, bal, phase: 'play', msg: 'hit or stand', fresh }
}

function finish(g: Game): Game {
  const deck = [...g.deck]
  const dl = [...g.dl]
  while (value(dl) < 17) dl.push(deck.pop()!)
  const p = value(g.me)
  const d = value(dl)
  let pay = 0
  let msg = 'dealer wins · −$10'
  if (d > 21) {
    pay = 20
    msg = 'dealer busts · you win $10'
  } else if (p > d) {
    pay = 20
    msg = 'you win $10'
  } else if (p === d) {
    pay = 10
    msg = 'push'
  }
  return { ...g, deck, dl, bal: g.bal + pay, phase: 'over', msg, fresh: 0 }
}

function hit(g: Game): Game {
  if (g.phase !== 'play') return g
  const deck = [...g.deck]
  const me = [...g.me, deck.pop()!]
  const v = value(me)
  if (v > 21) return { ...g, deck, me, phase: 'over', msg: 'bust · −$10', fresh: 1 }
  if (v === 21) return finish({ ...g, deck, me })
  return { ...g, deck, me, fresh: 1 }
}

function CardView({ card, down, fresh }: { card: Card; down?: boolean; fresh?: boolean }) {
  if (down) return <div className="pc down" />
  const face = PLAY_FACES[card.r]
  const red = card.s === '♥' || card.s === '♦'
  return (
    <div className={`pc${red ? ' red' : ''}${face ? ' face' : ''}${fresh ? ' fresh' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {face && <img src={face} alt="" />}
      <span className="rk">
        <b>{card.r}</b>
        <span>{card.s}</span>
      </span>
      {!face && <span className="st">{card.s}</span>}
    </div>
  )
}

/** A small blackjack table. Play money, $10 a hand, dealer stands on 17, J / Q / K are her photos. */
export function Blackjack() {
  const [g, setG] = useState<Game>(START)

  // deal the first hand on the client only, so the server and client render the same thing
  useEffect(() => {
    setG((cur) => (cur.phase === 'idle' ? deal(cur) : cur))
  }, [])

  const play = g.phase === 'play'
  return (
    <div className="play-bj">
      <div className="hd">
        <span className="chip">${g.bal}</span>
        <span className="msg">{g.msg}</span>
      </div>
      <p className="who">dealer {play || !g.dl.length ? '' : value(g.dl)}</p>
      <div className="hand">
        {g.dl.map((c, i) => (
          <CardView key={`d${i}${c.r}${c.s}`} card={c} down={play && i === 1} fresh={g.fresh > 0 && i >= g.dl.length - 2 && g.phase === 'play'} />
        ))}
      </div>
      <p className="who">you {g.me.length ? value(g.me) : ''}</p>
      <div className="hand">
        {g.me.map((c, i) => (
          <CardView key={`m${i}${c.r}${c.s}`} card={c} fresh={g.fresh > 0 && i >= g.me.length - g.fresh} />
        ))}
      </div>
      <div className="acts">
        {play ? (
          <>
            <button type="button" className="pf-btn" onClick={() => setG(hit)}>
              Hit
            </button>
            <button type="button" className="pf-btn" onClick={() => setG(finish)}>
              Stand
            </button>
          </>
        ) : (
          <button type="button" className="pf-btn" onClick={() => setG(deal)}>
            Deal
          </button>
        )}
      </div>
    </div>
  )
}
