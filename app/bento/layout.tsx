import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jasmine Gu · Bento workspace',
  description: 'Bento workflow canvas with experience blocks and layout switcher',
}

export default function BentoLayout({ children }: { children: React.ReactNode }) {
  return <div className="bento-workspace-root">{children}</div>
}
