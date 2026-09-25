import type { Metadata } from 'next'
import { AutodeskCaseStudyClient } from '@/components/portfolio/autodesk/AutodeskCaseStudyClient'
import { GlobalBackground } from '@/components/portfolio/GlobalBackground'
import '../case-study-blog.css'
import './autodesk-case-study.css'

export const metadata: Metadata = {
  title: 'Owning Product Strategy for a Governed SQL Platform · Autodesk · Jasmine Gu',
  description:
    'Case study on owning product strategy for ADP Studio, Autodesks governed SQL and data-exploration platform: adoption, ambiguity, AI-assisted data workflows, and the agentic data strategy it grew into.',
}

export default function AutodeskCaseStudyPage() {
  return (
    <>
      <GlobalBackground />
      <div className="relative z-10">
        <AutodeskCaseStudyClient />
      </div>
    </>
  )
}
