'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import VectorWordmark from '@/components/ui/vector-wordmark'
import { PinBoard } from '@/components/portfolio/play/PinBoard'
import { AboutText } from '@/components/portfolio/play/PlaySections'

// The lanyard is canvas + physics and injects its own <style>, so it renders on the client only.
const IDCardLanyard = dynamic(() => import('@/components/ui/id-card-lanyard').then((m) => m.IDCardLanyard), {
  ssr: false,
})

/**
 * About me: some text at the top, then a pinboard canvas of little things you can pick up and move, and the ID
 * badge (her pasted IDCardLanyard, as pasted: a full-window overlay you can drag anywhere; on a phone it hangs in a
 * box at the top instead), with her pasted Vector Wordmark on its face. "Ask me anything" now lives on the home page. SiteShell provides <main>.
 */
export function PlayPageClient() {
  // on a phone the badge hangs from the top of the page in its own box instead of floating over the text
  const [phone, setPhone] = useState(false)
  // someone who asked for reduced motion gets a badge that hangs still and a wordmark that does not sweep
  const [still, setStill] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => {
      setPhone(mq.matches)
      setStill(motion.matches)
    }
    on()
    mq.addEventListener('change', on)
    motion.addEventListener('change', on)
    return () => {
      mq.removeEventListener('change', on)
      motion.removeEventListener('change', on)
    }
  }, [])

  return (
    <div className="play">
      <div className="play-lanwrap">
        <IDCardLanyard
          name="Jasmine Gu"
          role="Product Engineer"
          brand="JASMINE GU"
          brandTagline="Product Engineer"
          pillars={['Engineering', 'Product', 'Community']}
          location="Toronto"
          idNumber="JG-2027"
          validThru="2027"
          site="jasminegu.com"
          githubUrl={SITE_CONTACT.github}
          linkedinUrl={SITE_CONTACT.linkedin}
          zIndex={900}
          swingOnMount={!still}
          photo={
            <VectorWordmark
              text="JASMINE"
              font={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800, fontSize: '215px', letterSpacing: '-0.02em' }}
              background="#0e3b8f"
              textColor="#ffffff"
              shade="#9fc0ff"
              accent="#ffffff"
              reach={70}
              speed={still ? 0 : 40}
              handles={{ size: 26, spread: 45, labels: true }}
              style={{ minWidth: 0, minHeight: 0 }}
            />
          }
          anchorX={phone ? '50%' : undefined}
        />
      </div>

      <section className="play-intro">
        <AboutText />
      </section>

      <PinBoard />
    </div>
  )
}
