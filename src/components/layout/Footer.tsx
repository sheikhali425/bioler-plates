import { env } from '@/lib/env'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          {env.appName} · Vite · React · TypeScript
        </p>
        <p className="muted">Built for real product work, not throwaway demos.</p>
      </div>
    </footer>
  )
}
