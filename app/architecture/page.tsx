import Link from 'next/link'

export const metadata = {
  title: 'Architecture — Jasmine Gu',
  description:
    'The agent architecture behind my work — how experience became capability, reasoning, and output.',
}

export default function ArchitecturePage() {
  return (
    <main className="architecture-placeholder">
      <div className="architecture-placeholder__gradient" aria-hidden />
      <div className="architecture-placeholder__content">
        <p className="architecture-placeholder__label font-analogue">
          ARCHITECTURE · AGENT RUNTIME
        </p>
        <h1 className="architecture-placeholder__title font-bootzy">I kept zooming out.</h1>
        <p className="architecture-placeholder__lead font-awesome-shorten">
          I started by building the thing in front of me. Then I kept wondering what was underneath
          it, what surrounded it, and eventually who decides what the whole system should do.
        </p>
        <p className="architecture-placeholder__note">
          This is the background layer — how experiences trained different parts of how I work. The
          full agent architecture is coming next. Explore the evidence in Work, or ask the side
          agent on the Work page.
        </p>
        <div className="architecture-placeholder__actions">
          <Link href="/" className="architecture-placeholder__cta architecture-placeholder__cta--primary">
            Work
          </Link>
          <Link
            href="/projects"
            className="architecture-placeholder__cta architecture-placeholder__cta--secondary"
          >
            Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
