import { NavLink } from 'react-router-dom'
import { env } from '@/lib/env'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <NavLink to="/" className="brand" end>
          <span className="brand__mark" aria-hidden="true" />
          {env.appName}
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
