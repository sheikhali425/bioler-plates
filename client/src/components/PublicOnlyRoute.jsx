import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Spinner label="Loading…" />

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return children
}
