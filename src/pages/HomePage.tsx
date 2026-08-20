import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FeatureGrid } from '@/features/home/FeatureGrid'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { env } from '@/lib/env'

export function HomePage() {
  useDocumentTitle(`${env.appName} · Home`)

  return (
    <>
      <section className="hero">
        <Container>
          <p className="eyebrow">Professional starter</p>
          <h1>{env.appName}</h1>
          <p className="lede">
            A production-minded Vite + React + TypeScript foundation with routing,
            typed env, linting, formatting, and tests already wired.
          </p>
          <div className="hero__actions">
            <Button onClick={() => window.scrollTo({ top: 640, behavior: 'smooth' })}>
              See what&apos;s included
            </Button>
            <Link to="/about" className="btn btn-secondary">
              About this kit
            </Link>
          </div>
        </Container>
      </section>

      <Container as="section" className="section">
        <FeatureGrid />
      </Container>
    </>
  )
}
