'use client'

import { useRouter } from 'next/navigation'
import { StockCard } from '@/components/ui/stock-card'
import { DitherShader } from '@/components/ui/dither-shader'
import { GALLERY_INTRO } from '@/lib/portfolio/gallery-data'
import { ENGINEERING_LESSONS, NOTES_LIST, PRODUCT_LAUNCHES, RESUME_NOTES, STOCK_META } from '@/lib/portfolio/play-data'
import { useStocks } from '@/components/portfolio/play/useStocks'

/** The punched navy "notes to self" sheet: what isn't on my resume, as a checklist. */
export function NotesSheet() {
  const { lead, items } = RESUME_NOTES.a
  return (
    <div className="play-notes">
      <p className="k">ABOUT · NOTES TO SELF</p>
      <p className="lead">{lead}</p>
      <ul className="chk">
        {items.map((h) => (
          <li key={h}>
            <i aria-hidden />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Only the two stories that go with the list of what has been most meaningful. */
const STORY_KEYS = ['Hack Western', 'Autodesk']

/**
 * The text at the top of the page, her two pasted blocks as one: what has been most meaningful (the list), the line
 * that leads into the stories, then the Hack Western and Autodesk stories, exactly as she wrote them, with no card
 * around it. The Notes topics close it.
 */
export function AboutText() {
  const { b } = RESUME_NOTES
  const stories = b.entries.filter(([k]) => STORY_KEYS.includes(k))
  return (
    <div className="play-text">
      <p className="lead">{b.lead}</p>
      <ul className="arrows">
        {b.items.map((x) => (
          <li key={x}>
            <span aria-hidden>→</span>
            <span>{x}</span>
          </li>
        ))}
      </ul>
      <p className="lead">{b.lead2}</p>
      <dl>
        {stories.map(([k, v]) => (
          <div key={k}>
            <dt>{k}:</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="topics">
        <b>Notes</b>
        {NOTES_LIST.join(' · ')}
      </p>
    </div>
  )
}

/** The companies she has worked at, as the pasted StockCard, with live prices. Hidden if the data is down. */
export function StockList() {
  const quotes = useStocks()
  const router = useRouter()
  if (!quotes.length) return null
  return (
    <div className="pf-shadcn play-stocks">
      {quotes.map((q) => {
        const meta = STOCK_META[q.ticker]
        if (!meta) return null
        return (
          <StockCard
            key={q.ticker}
            className="play-stock-card"
            logoSrc={meta.logoSrc}
            ticker={q.ticker}
            name={meta.name}
            price={q.price}
            change={q.change}
            actionLabel="View"
            onBuy={() => router.push(meta.href)}
          />
        )
      })}
    </div>
  )
}

/** The tilted polaroid with two black-and-white photos. */
export function PolaroidPair() {
  return (
    <div className="play-polad">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/gallery/moment-yosemite-valley.png" alt="" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/gallery/moment-machu-picchu-llama.png" alt="" draggable={false} />
    </div>
  )
}

/** The product launches she is bullish on. She has not sent the list, so this is a marked placeholder until she does. */
export function LaunchesNote() {
  return (
    <div className="play-launch">
      <h2 className="play-h">Product launches I&apos;m bullish on</h2>
      {PRODUCT_LAUNCHES.length ? (
        <ul>
          {PRODUCT_LAUNCHES.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : (
        <div className="play-empty">
          <b>The list goes here</b>
          <span>placeholder · waiting on your launches</span>
        </div>
      )}
    </div>
  )
}

/** Engineering lessons, as a card you can pick up. Placeholder lines from her own answers until she writes her own. */
export function LessonsNote() {
  return (
    <div className="play-lessons">
      <h2 className="play-h">Engineering lessons</h2>
      <ol>
        {ENGINEERING_LESSONS.map((l, i) => (
          <li key={l}>
            <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
            <span>{l}</span>
          </li>
        ))}
      </ol>
      <p className="tag">placeholder · lines from my answers, swap in yours</p>
    </div>
  )
}

/** The old Gallery page's heading and line, back as plain text pinned above the photos. Same words as before. */
export function GalleryNote() {
  return (
    <div className="play-gallery">
      <h2 className="play-h">{GALLERY_INTRO.title}</h2>
      <p>{GALLERY_INTRO.lead}</p>
    </div>
  )
}

/** Toronto skyline, ordered-dithered in the Aceternity DitherShader (navy and cream), pinned like a postcard. */
export function DitherPostcard() {
  return (
    <div className="play-dither">
      <div className="shader">
        <DitherShader
          src="/play/toronto-skyline.png"
          gridSize={3}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#0e3b8f"
          secondaryColor="#f5f3ee"
          threshold={0.5}
          animated
          animationSpeed={0.02}
          className="h-full w-full"
        />
      </div>
      <div className="box">
        <b>Toronto, Canada</b>
        <span>43.65° N, 79.38° W</span>
      </div>
    </div>
  )
}
