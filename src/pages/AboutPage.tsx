import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { env } from '@/lib/env'

export function AboutPage() {
  useDocumentTitle(`${env.appName} · About`)

  return (
    <Container as="section" className="section narrow">
      <p className="eyebrow">About</p>
      <h1>Ship frontend work faster</h1>
      <p className="lede">
        This boilerplate keeps the boring setup out of your way: path aliases, a clean
        app shell, ESLint + Prettier, Vitest, and typed environment variables.
      </p>
      <ul className="checklist">
        <li>Feature-friendly folder layout under <code>src/</code></li>
        <li>React Router with layout routes and a 404 page</li>
        <li>Strict TypeScript and a sample component test</li>
        <li>
          API base URL via <code>VITE_API_URL</code> ({env.apiUrl})
        </li>
      </ul>
    </Container>
  )
}
