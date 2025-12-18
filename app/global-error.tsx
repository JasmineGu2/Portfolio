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
            Something went wrong!
          </h2>
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] rounded-lg hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Inter" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}



