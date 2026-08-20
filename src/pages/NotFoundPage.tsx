import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { env } from '@/lib/env'

export function NotFoundPage() {
  useDocumentTitle(`${env.appName} · Not found`)

  return (
    <Container as="section" className="section narrow">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lede">That route does not exist in this starter.</p>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </Container>
  )
}
