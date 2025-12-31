import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'expograph_token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [loading, setLoading] = useState(true)
  const [me, setMe] = useState(null) // { auth, tenant, permissions }

  async function refreshMe(nextToken = token) {
    if (!nextToken) {
      setMe(null)
      return
    }
    const res = await api.me(nextToken)
    setMe(res.data)
  }

  async function login({ email, password }) {
    const res = await api.auth.login({ email, password })
    const t = res.data.token
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
    await refreshMe(t)
    return res.data
  }

  async function register({ name, email, phone, password }) {
    const res = await api.auth.register({ name, email, phone, password })
    // auto-login after register
    const t = res.data.token
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
    await refreshMe(t)
    return res.data
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken('')
    setMe(null)
  }

  const role = me?.auth?.role || null
  const permissions = me?.permissions || []

  function hasPermission(key) {
    return permissions.includes(key)
  }

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        if (token) await refreshMe(token)
      } catch (e) {
        // token invalid
        if (alive) logout()
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({ token, loading, me, role, permissions, hasPermission, login, register, logout, refreshMe }),
    [token, loading, me, role, permissions]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
