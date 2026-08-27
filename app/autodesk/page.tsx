import type { Metadata } from 'next'
import { AutodeskCaseStudyClient } from '@/components/portfolio/autodesk/AutodeskCaseStudyClient'
import './autodesk-case-study.css'

export const metadata: Metadata = {
  title: 'Owning Product Strategy for a Governed SQL Platform · Autodesk · Jasmine Gu',
  description:
    'Case study on owning product strategy for ADP Studio, Autodesk’s governed SQL and data-exploration platform: adoption, ambiguity, AI-assisted data workflows, and the cross-functional agentic data strategy it became.',
}

export default function AutodeskCaseStudyPage() {
  return <AutodeskCaseStudyClient />
}
