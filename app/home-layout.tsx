import type { Metadata } from 'next'
import { SITE_METADATA } from '@/lib/portfolio/site-copy'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="pencil">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body className="q q6" data-map="blue">
        {children}
      </body>
    </html>
  )
}
