import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h2 className="text-4xl md:text-5xl font-light mb-4 text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>
        404 - Page Not Found
      </h2>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400" style={{ fontFamily: "Inter" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#2A2A2A] dark:bg-white text-white dark:text-[#2A2A2A] rounded-lg hover:opacity-80 transition-opacity"
        style={{ fontFamily: "Inter" }}
      >
        Go back home
      </Link>
    </div>
  )
}

