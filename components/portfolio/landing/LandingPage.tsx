import { HeroSection } from './HeroSection'
import { ProfileStrip } from './ProfileStrip'
import { ExperienceSection } from './ExperienceSection'
import { SiteFooter } from '@/components/portfolio/SiteFooter'

export function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-container">
        <HeroSection />
        <ProfileStrip />
        <ExperienceSection />
      </div>
      <SiteFooter />
    </main>
  )
}
