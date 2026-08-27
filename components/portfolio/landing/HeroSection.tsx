import { FlowerIcon } from '@/components/portfolio/FlowerIcon'
import { StrengthsPanel } from './StrengthsPanel'

export function HeroSection() {
  return (
    <section className="landing-hero" aria-labelledby="landing-hero-heading">
      <div className="landing-hero__intro">
        <p id="landing-hero-heading" className="landing-hero__headline font-serif-display">
          Jasm
          <span className="landing-hero__flower-wrap">
            i
            <FlowerIcon className="landing-hero__flower" />
          </span>
          ne Gu is a{' '}
          <em className="landing-hero__em">product-minded builder</em> with the experience and
          versatility to translate between users, engineering, and operations.
        </p>
        <p className="landing-hero__sub">
          Product manager and engineer building thoughtful, AI-powered products, from consumer
          experiences at TurboTax to enterprise data platforms at Autodesk.
        </p>
      </div>
      <StrengthsPanel />
    </section>
  )
}
