import { InspoHomepage } from '@/components/portfolio/proto/inspo/InspoHomepage'
import '@/components/portfolio/proto/inspo/proto-inspo.css'

export const metadata = {
  title: 'Proto: Inspo bento windows',
  description:
    'The homepage as a bento of OS-style windows, composed from references found through the Inspo MCP.',
}

export default function ProtoInspoPage() {
  return <InspoHomepage />
}
