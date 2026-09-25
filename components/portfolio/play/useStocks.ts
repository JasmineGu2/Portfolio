'use client'

import { useEffect, useState } from 'react'

export type StockQuote = { ticker: string; price: number; change: number }

/** Live quotes from /api/stocks. Empty until loaded, and empty if the provider is down: callers hide the cards. */
export function useStocks(): StockQuote[] {
  const [quotes, setQuotes] = useState<StockQuote[]>([])

  useEffect(() => {
    let dead = false
    fetch('/api/stocks')
      .then((r) => r.json())
      .then((j) => {
        if (!dead && Array.isArray(j?.quotes)) setQuotes(j.quotes)
      })
      .catch(() => {})
    return () => {
      dead = true
    }
  }, [])

  return quotes
}
