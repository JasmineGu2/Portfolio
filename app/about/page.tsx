import Script from 'next/script'
import { BookShelf3D } from '@/components/portfolio/reading/BookShelf3D'
import { getReading, READING_LABELS } from '@/lib/portfolio/reading'
import { getTools } from '@/lib/portfolio/tools'
import { IDCardLanyard } from '@/components/ui/id-card-lanyard'
import { BADGE } from '@/lib/portfolio/badge'

export default function AboutPage() {
  const reading = getReading()
  // Tools copy lives in content/tools.md; the page script renders it from this JSON.
  const toolsJson = JSON.stringify(getTools()).replace(/</g, '\\u003c')
  return (
    <>
      <div id="nav"></div>
      <main id="journey">
        <div className="q-w">
          <div className="q6-top">
            <div className="q6-left">
              <div id="notes"></div>
              <script id="tools-data" type="application/json" dangerouslySetInnerHTML={{ __html: toolsJson }} />
              <div className="q6-made" id="customTools"></div>
            </div>
            {/* the ID badge: a canvas rope you can swing; badge copy and the photo path live in lib/portfolio/badge.ts */}
            <div className="q6-lan">
              <IDCardLanyard {...BADGE} ropeColor="#0e3b8f" swingOnMount />
            </div>
          </div>
        </div>
        <hr className="q-rule" />
        <div className="q-w">
          <div className="q-desk">
            <div className="d2" id="trends"></div>
            <div className="d4" id="quests"></div>
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
            Q.customTools($('#customTools'))
            Q.sideQuests($('#quests'))
            Q.polaroids($('#pola'))
            Q.dither($('#dith'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
            Q.drag($('#notes'), { mouseOnly: true });
            ['#trends', '#customTools', '#quests'].forEach((s) => Q.drag($(s)))
          }
        `}
      </Script>
    </>
  )
}
