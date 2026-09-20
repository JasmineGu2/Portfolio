import { ChatHeroSection } from '@/components/portfolio/ChatHeroSection'

export const metadata = {
  title: 'Ask Jasmine · Portfolio Agent',
  description: 'Ask about my work, projects, or how I got here.',
}

export default function AiPage() {
  return (
    <div className="ai-page">
      <ChatHeroSection />
    </div>
  )
}
