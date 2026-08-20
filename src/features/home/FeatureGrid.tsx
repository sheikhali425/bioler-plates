const features = [
  {
    title: 'Typed foundation',
    body: 'Strict TypeScript, path aliases, and validated Vite env vars.',
  },
  {
    title: 'App architecture',
    body: 'Router layouts, pages, features, hooks, and reusable UI primitives.',
  },
  {
    title: 'Quality gates',
    body: 'ESLint, Prettier, Vitest, Testing Library, and coverage scripts.',
  },
  {
    title: 'DX defaults',
    body: 'Fast Vite server, preview mode, VS Code recommendations, clear README.',
  },
] as const

export function FeatureGrid() {
  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <article key={feature.title} className="feature-card">
          <h2>{feature.title}</h2>
          <p>{feature.body}</p>
        </article>
      ))}
    </div>
  )
}
