import Script from 'next/script'
import { BookShelf3D } from '@/components/portfolio/reading/BookShelf3D'
import { getReading, READING_LABELS } from '@/lib/portfolio/reading'
import { getTools } from '@/lib/portfolio/tools'
import { getToolsCreated } from '@/lib/portfolio/tools-created'
import { getAboutPhotos } from '@/lib/portfolio/about-photo'
import { getQuotes } from '@/lib/portfolio/quotes'

export default function AboutPage() {
  const reading = getReading()
  const photos = getAboutPhotos()
  // Tools copy lives in content/tools.md; the page script renders it from this JSON.
  const toolsJson = JSON.stringify(getTools()).replace(/</g, '\\u003c')
  // Same for the tools she built: content/tools-created.md
  const madeJson = JSON.stringify(getToolsCreated()).replace(/</g, '\\u003c')
  // Footer quotes: content/Quotes about engineering.md (the footer card reads #quotes-data)
  const quotesJson = JSON.stringify(getQuotes()).replace(/</g, '\\u003c')
  return (
    <>
      <div id="nav"></div>
      <main id="journey">
        <div className="q-w">
          <div className="q6-top">
            <div className="q6-left">
              <div id="notes"></div>
              <script id="tools-data" type="application/json" dangerouslySetInnerHTML={{ __html: toolsJson }} />
              <script id="made-data" type="application/json" dangerouslySetInnerHTML={{ __html: madeJson }} />
              <script id="quotes-data" type="application/json" dangerouslySetInnerHTML={{ __html: quotesJson }} />
              {/* hero polaroids tossed under the legal pad's bottom edge, in front of it (photos, alt and captions live in content/about-photo.md); each one is draggable like the other about cards */}
              <div className="q6-heros">
                {photos.map((photo, i) => (
                  <div className="q6-hero" id={`heroPol${i}`} key={photo.photo}>
                    <figure className="q6-hero-pol">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.photo} alt={photo.alt} width={768} height={1024} draggable={false} />
                      {photo.caption && <figcaption>{photo.caption}</figcaption>}
                    </figure>
                  </div>
                ))}
              </div>
            </div>
            {/* right column: "Tools I've Created" as a long receipt strip, as tall as the pad + polaroid */}
            <div className="q6-rc" id="customTools"></div>
          </div>
        </div>
        <div className="q-w q-block">
          <p className="q-lab">gallery</p>
          {/* "What I'm doing in my free time" is a paper note pinned beside the polaroids (items from k4-data.js sideQuests) */}
          <div className="q6-gal">
            <div className="q6-gal-note" id="quests"></div>
            <div id="pola"></div>
          </div>
        </div>
        <div className="q-w q-block">
          <p className="q-lab">{reading.title}</p>
          {reading.subtitle && <p className="bs-sub">{reading.subtitle}</p>}
          <BookShelf3D items={reading.items} labels={READING_LABELS} />
        </div>
        <div className="q-w q-block">
          <div id="dith"></div>
        </div>
      </main>
      <div style={{ height: '80px' }}></div>
      <div id="foot"></div>

      <Script src="/mocks/k2-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6-ask.js" strategy="beforeInteractive" />
      <Script src="/mocks/k2.js" strategy="beforeInteractive" />
      <Script src="/mocks/k3.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6.js" strategy="beforeInteractive" />

      <Script id="init-about" strategy="afterInteractive">
        {`
          const $ = (s) => document.querySelector(s)
          if (typeof Q !== 'undefined' && typeof K !== 'undefined') {
            $('#nav').innerHTML = Q.header({ active: 'about', work: '/', about: '#journey', ask: false })
            Q.toolsPad($('#notes'), JSON.parse($('#tools-data').textContent))
            Q.customTools($('#customTools'), JSON.parse($('#made-data').textContent))
            Q.sideQuests($('#quests'))
            Q.polaroids($('#pola'))
            Q.dither($('#dith'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
            Q.drag($('#notes'), { mouseOnly: true });
            ['#customTools', '#quests'].forEach((s) => Q.drag($(s)))
            document.querySelectorAll('.q6-hero').forEach((el) => Q.drag(el))
          }
        `}
      </Script>
    </>
  )
}
