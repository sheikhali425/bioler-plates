import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <Layout wide>
      <section className="hero">
        <p className="eyebrow">Production-minded starter</p>
        <h1>MERN Kit</h1>
        <p className="lede">
          Auth, validation, secure headers, owned resources, and a clean React
          client — ready for real projects, not just demos.
        </p>
        <div className="hero-actions">
          {isAuthenticated ? (
            <Link to="/app" className="btn btn-primary">
              Open dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">
                Create account
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Log in
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="feature-grid">
        <article>
          <h2>Secure API</h2>
          <p>JWT auth, helmet, rate limits, mongo sanitize, and input validation.</p>
        </article>
        <article>
          <h2>Owned data</h2>
          <p>Every item belongs to a user. Routes are protected by default.</p>
        </article>
        <article>
          <h2>Modern client</h2>
          <p>Vite, React Router, auth context, and an axios API layer.</p>
        </article>
      </section>
    </Layout>
  )
}
