import { NextResponse } from 'next/server'

/**
 * Live quotes for the three public companies Jasmine has worked at (Autodesk, Tesla, Intuit).
 * Fetched on the server so visitors never hit the data provider, and cached for 15 minutes.
 * If the provider fails, the route returns fewer (or no) quotes and the UI hides the cards.
 * Nothing here is ever made up.
 */
export const revalidate = 900

const SYMBOLS = ['ADSK', 'TSLA', 'INTU'] as const

type Quote = { ticker: string; price: number; change: number }

async function fetchQuote(ticker: string): Promise<Quote | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1d&interval=1d`,
      { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate } },
    )
    if (!res.ok) return null
    const json = await res.json()
    const meta = json?.chart?.result?.[0]?.meta
    const price = meta?.regularMarketPrice
    const prev = meta?.chartPreviousClose ?? meta?.previousClose
    if (typeof price !== 'number' || typeof prev !== 'number' || prev === 0) return null
    return { ticker, price, change: ((price - prev) / prev) * 100 }
  } catch {
    return null
  }
}

export async function GET() {
  const quotes = (await Promise.all(SYMBOLS.map(fetchQuote))).filter(
    (q): q is Quote => q !== null,
  )
  return NextResponse.json(
    { quotes, asOf: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600' } },
  )
}
