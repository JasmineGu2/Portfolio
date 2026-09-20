import { Inter_Tight } from 'next/font/google'
import { MaterialWebLoader } from '@/components/portfolio/proto/MaterialWebLoader'
import { ProtoHomepage } from '@/components/portfolio/proto/ProtoHomepage'
import '@/components/portfolio/proto/proto-theirs.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter-tight',
})

export const metadata = {
  title: 'Proto — GSAP style',
  description: 'Material Web rebuild of the homepage, styled with the GSAP style reference palette and fonts.',
}

export default function ProtoTheirsPage() {
  return (
    <>
      <MaterialWebLoader />
      <div className={`proto-theirs ${interTight.variable}`}>
        <ProtoHomepage otherVariantHref="/proto/mine" otherVariantLabel="View my colors" />
      </div>
    </>
  )
}
