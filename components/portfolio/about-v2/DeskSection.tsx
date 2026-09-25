'use client'

import { useState, useRef } from 'react'
import { useDrag } from '@/hooks/useDrag'
import { QuotesPin } from './tiles/QuotesPin'
import { StockList } from './tiles/StockList'
import { Blackjack } from './tiles/Blackjack'
import { PolaroidTwo } from './tiles/PolaroidTwo'

export function DeskSection() {
  const quotesRef = useRef<HTMLDivElement>(null)
  const stockRef = useRef<HTMLDivElement>(null)
  const blackjackRef = useRef<HTMLDivElement>(null)
  const polaroidRef = useRef<HTMLDivElement>(null)

  const [quotesPos, setQuotesPos] = useState({ x: 0, y: 0 })
  const [stockPos, setStockPos] = useState({ x: 500, y: 0 })
  const [blackjackPos, setBlackjackPos] = useState({ x: 0, y: 300 })
  const [polaroidPos, setPolaroidPos] = useState({ x: 500, y: 300 })

  useDrag(quotesRef, {
    onDrag: (x, y) => setQuotesPos({ x, y }),
    constrainX: [0, 500],
    constrainY: [0, 400],
  })

  useDrag(stockRef, {
    onDrag: (x, y) => setStockPos({ x, y }),
    constrainX: [200, 700],
    constrainY: [0, 400],
  })

  useDrag(blackjackRef, {
    onDrag: (x, y) => setBlackjackPos({ x, y }),
    constrainX: [0, 500],
    constrainY: [100, 500],
  })

  useDrag(polaroidRef, {
    onDrag: (x, y) => setPolaroidPos({ x, y }),
    constrainX: [200, 700],
    constrainY: [100, 500],
  })

  return (
    <div className="desk-section">
      {/* Quotes pins */}
      <div
        ref={quotesRef}
        className="desk-tile quotes-tile"
        style={{ transform: `translate(${quotesPos.x}px, ${quotesPos.y}px)` }}
      >
        <QuotesPin />
      </div>

      {/* Stock list */}
      <div
        ref={stockRef}
        className="desk-tile stock-tile"
        style={{ transform: `translate(${stockPos.x}px, ${stockPos.y}px)` }}
      >
        <StockList />
      </div>

      {/* Blackjack game */}
      <div
        ref={blackjackRef}
        className="desk-tile blackjack-tile"
        style={{ transform: `translate(${blackjackPos.x}px, ${blackjackPos.y}px)` }}
      >
        <Blackjack />
      </div>

      {/* Polaroid photo */}
      <div
        ref={polaroidRef}
        className="desk-tile polaroid-tile"
        style={{ transform: `translate(${polaroidPos.x}px, ${polaroidPos.y}px)` }}
      >
        <PolaroidTwo />
      </div>
    </div>
  )
}
