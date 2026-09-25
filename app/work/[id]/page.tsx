import type { Metadata } from 'next'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'
import { QuickCaseStudy } from '@/components/portfolio/work/QuickCaseStudy'
import { GlobalBackground } from '@/components/portfolio/GlobalBackground'
import '../../case-study-blog.css'

interface WorkPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: WorkPageProps): Promise<Metadata> {
  const params = await props.params
  const card = EXPERIENCE_CARDS[params.id as keyof typeof EXPERIENCE_CARDS]

  if (!card) {
    return { title: 'Not Found' }
  }

  return {
    title: `${card.role} · ${card.company} · Jasmine Gu`,
    description: card.description,
  }
}

export async function generateStaticParams() {
  return Object.keys(EXPERIENCE_CARDS).map((id) => ({ id }))
}

export default async function WorkPage(props: WorkPageProps) {
  const params = await props.params
  const card = EXPERIENCE_CARDS[params.id as keyof typeof EXPERIENCE_CARDS]

  if (!card) {
    return (
      <>
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Not Found</h1>
            <p className="text-gray-600 mt-2">This work experience doesn't exist.</p>
            <a href="/" className="text-blue-500 hover:underline mt-4 block">
              Go back home
            </a>
          </div>
        </div>
      </>
    )
  }

  const impact = [
    card.subtitle,
    ...card.expandedTags.slice(0, 3),
  ]

  return (
    <>
      <GlobalBackground />
      <div className="relative z-10">
        <QuickCaseStudy
          title={card.role}
          date={card.period}
          role={`${card.company} · ${card.category}`}
          context={card.description}
          impact={impact}
        />
      </div>
    </>
  )
}
