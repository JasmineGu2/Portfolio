import { NextResponse } from 'next/server'

/** Current conditions in Toronto for the footer's "site conditions" note. Server-side, cached 15 minutes. */
export const revalidate = 900

const TORONTO = { lat: 43.6532, lon: -79.3832 }

function describe(code: number) {
  if (code === 0) return 'CLEAR'
  if (code === 1) return 'MOSTLY CLEAR'
  if (code === 2) return 'PARTLY CLOUDY'
  if (code === 3) return 'OVERCAST'
  if (code <= 48) return 'FOG'
  if (code <= 57) return 'DRIZZLE'
  if (code <= 67) return 'RAIN'
  if (code <= 77) return 'SNOW'
  if (code <= 82) return 'SHOWERS'
  if (code <= 86) return 'SNOW SHOWERS'
  return 'THUNDERSTORM'
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${TORONTO.lat}&longitude=${TORONTO.lon}&current=temperature_2m,weather_code&timezone=auto`,
      { next: { revalidate } },
    )
    if (!res.ok) return NextResponse.json({ note: null })
    const json = await res.json()
    const temp = json?.current?.temperature_2m
    const code = json?.current?.weather_code
    if (typeof temp !== 'number' || typeof code !== 'number') return NextResponse.json({ note: null })
    return NextResponse.json(
      { note: `SITE CONDITIONS: ${Math.round(temp)}°C, ${describe(code)}` },
      { headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600' } },
    )
  } catch {
    return NextResponse.json({ note: null })
  }
}
