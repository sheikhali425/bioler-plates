import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          MERN Kit
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/app">Dashboard</NavLink>
              <span className="nav-user">{user?.name}</span>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
