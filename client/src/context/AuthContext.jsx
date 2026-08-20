import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const persistSession = useCallback((token, nextUser) => {
    if (token) localStorage.setItem('token', token)
    setUser(nextUser)
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  useEffect(() => {
    let active = true

    const bootstrap = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        if (active) setLoading(false)
        return
      }

      try {
        const { data } = await authApi.getMe()
        if (active) setUser(data.user)
      } catch {
        localStorage.removeItem('token')
        if (active) setUser(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    bootstrap()
    return () => {
      active = false
    }
  }, [])

  const register = useCallback(
    async (payload) => {
      const { data } = await authApi.register(payload)
      persistSession(data.token, data.user)
      return data.user
    },
    [persistSession]
  )

  const login = useCallback(
    async (payload) => {
      const { data } = await authApi.login(payload)
      persistSession(data.token, data.user)
      return data.user
    },
    [persistSession]
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // always clear local session
    } finally {
      clearSession()
    }
  }, [clearSession])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
    }),
    [user, loading, register, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
