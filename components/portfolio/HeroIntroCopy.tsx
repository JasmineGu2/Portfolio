import type { ReactNode } from 'react'
import { HERO_TAGLINE } from '@/lib/portfolio/site-copy'

export function HeroIntroCopy({
  headline,
  sub,
  showSub = true,
}: {
  headline?: ReactNode
  sub?: string
  showSub?: boolean
}) {
  return (
    <>
      {headline ? (
        <p className="hero-editorial-headline font-serif-display">{headline}</p>
      ) : (
        <p className="hero-editorial-headline font-serif-display">
          Jasmine Gu is an <em className="hero-em hero-em--accent">engineer</em> solving{' '}
          <em className="hero-em hero-em--accent">product</em> problems with{' '}
          <em className="hero-em hero-em--accent">code and empathy</em>.
          <span
            className="hero-worked-with"
            aria-label="Worked at Tesla, Autodesk, and Intuit"
          >
            <img src="/work/tesla.png" alt="Tesla" className="hero-worked-with__logo" />
            <img
              src="/work/autodesk-icon.png"
              alt="Autodesk"
              className="hero-worked-with__logo hero-worked-with__logo--autodesk"
            />
            <img src="/puzzle/intuit.png" alt="Intuit" className="hero-worked-with__logo" />
            <span className="hero-worked-with__divider" aria-hidden="true" />
            <span className="hero-worked-with__text">Grad 2027</span>
          </span>
        </p>
      )}

      {showSub && (
        <p className="hero-editorial-sub font-awesome-shorten mt-6 md:mt-7">
          {sub ?? HERO_TAGLINE.secondary}
        </p>
      )}
    </>
  )
}
