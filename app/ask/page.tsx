import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Ask Jasmine · Portfolio Agent',
  description: 'Ask about my work, projects, or how I got here.',
}

export default function AskPage() {
  redirect('/')
}
