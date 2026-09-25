import Link from 'next/link'

export const metadata = {
  title: 'Other Features v2 — Experimental & Future Work',
  description: 'Exploratory features and experimental work not yet integrated into the main portfolio experience.',
}

const FEATURES = [
  {
    href: '/ask',
    title: 'Ask Jasmine',
    body: 'An experimental AI chat interface to ask questions about my work, projects, and background. Currently in prototype phase.',
  },
]

export default function OtherFeaturesV2Page() {
  return (
    <>
      <main
        style={{
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '48rem',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        <Link href="/proto" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '0.9375rem' }}>
          ← Back to prototypes
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>
          Other Features v2
        </h1>
        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem', maxWidth: '40rem' }}>
          Experimental features and exploratory work. These are ideas being explored but not yet integrated into the
          main portfolio experience.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {FEATURES.map((feature) => (
            <Link key={feature.href} href={feature.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0'
                  e.currentTarget.style.borderColor = '#d0d0d0'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9'
                  e.currentTarget.style.borderColor = '#e5e5e5'
                }}
              >
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 0.5rem 0', color: '#0066cc' }}>
                  {feature.title}
                </h2>
                <p style={{ fontSize: '0.9375rem', color: '#666', margin: 0 }}>{feature.body}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e5e5' }}>
          <p style={{ fontSize: '0.875rem', color: '#999' }}>
            These features are experimental and subject to change. Feedback is welcome.
          </p>
        </div>
      </main>
    </>
  )
}
