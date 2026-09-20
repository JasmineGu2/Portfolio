import { SiteNav } from '@/components/portfolio/nav/SiteNav'
import { SiteFooter } from '@/components/portfolio/SiteFooter'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full flex-col bg-[var(--pf-canvas)]">
      <SiteNav />
      <main className="mx-auto w-[80%] flex-1 pb-16">{children}</main>
      <SiteFooter />
    </div>
  )
}
