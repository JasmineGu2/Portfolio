'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Editorial Old" }}>
            Something went wrong.
          </h2>
          <button
            onClick={reset}
            style={{
              padding: '4px 12px',
              border: '1px solid #ED3801',
              borderRadius: 9999,
              background: 'transparent',
              color: '#C22E01',
              font: '500 12px/16px Inter, system-ui, sans-serif',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}



