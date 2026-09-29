import Script from 'next/script'
import { BookShelf3D } from '@/components/portfolio/reading/BookShelf3D'
import { getReading, READING_LABELS } from '@/lib/portfolio/reading'
import { getTools } from '@/lib/portfolio/tools'
import { getToolsCreated } from '@/lib/portfolio/tools-created'
import { getAboutPhoto } from '@/lib/portfolio/about-photo'
import { getQuotes } from '@/lib/portfolio/quotes'

export default function AboutPage() {
  const reading = getReading()
  const photo = getAboutPhoto()
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
              {/* hero polaroid under the legal pad (photo, alt and caption live in content/about-photo.md); draggable like the other about cards */}
              <div className="q6-hero" id="heroPol">
                <figure className="q6-hero-pol">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.photo} alt={photo.alt} width={768} height={1024} draggable={false} />
                  {photo.caption && <figcaption>{photo.caption}</figcaption>}
                </figure>
              </div>
            </div>
            {/* right column: "Tools I've Created" as a long receipt strip, as tall as the pad + polaroid */}
            <div className="q6-rc" id="customTools"></div>
          </div>
        </div>
        <hr className="q-rule" />
        <div className="q-w">
          <div className="q-desk">
            <div className="d4" id="quests"></div>
            <div className="d2" id="trends"></div>
          </div>
        </div>
        <div className="q-w q-block">
          <p className="q-lab">gallery</p>
          <div id="pola"></div>
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
            Q.productTrends($('#trends'))
            Q.customTools($('#customTools'), JSON.parse($('#made-data').textContent))
            Q.sideQuests($('#quests'))
            Q.polaroids($('#pola'))
            Q.dither($('#dith'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
            Q.drag($('#notes'), { mouseOnly: true });
            ['#trends', '#customTools', '#quests', '#heroPol'].forEach((s) => Q.drag($(s)))
          }
        `}
      </Script>
    </>
  )
}
