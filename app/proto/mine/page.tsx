import { MaterialWebLoader } from '@/components/portfolio/proto/MaterialWebLoader'
import { ProtoHomepage } from '@/components/portfolio/proto/ProtoHomepage'
import '@/components/portfolio/proto/proto-mine.css'

export const metadata = {
  title: 'Proto — my colors',
  description: 'Material Web rebuild of the homepage, styled with the portfolio\'s own palette and fonts.',
}

export default function ProtoMinePage() {
  return (
    <>
      <MaterialWebLoader />
      <div className="proto-mine">
        <ProtoHomepage otherVariantHref="/proto/theirs" otherVariantLabel="View GSAP-style version" />
      </div>
    </>
  )
}
