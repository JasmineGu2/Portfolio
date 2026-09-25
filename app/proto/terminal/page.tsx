import { TerminalHomepage } from '@/components/portfolio/proto/terminal/TerminalHomepage'
import '@/components/portfolio/proto/terminal/proto-terminal.css'

export const metadata = {
  title: 'Proto: terminal',
  description:
    'Jasmine Gu as a terminal session: a live prompt and scrolling stories, composed from Inspo references.',
}

export default function ProtoTerminalPage() {
  return <TerminalHomepage />
}
