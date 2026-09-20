import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Projects · Jasmine Gu',
  description: 'PM case studies and technical projects.',
}

export default function ProjectsPage() {
  redirect('/')
}
