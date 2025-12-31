import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

export function RequireAuth({ children }) {
  const { token, loading } = useAuth()
  if (loading) return null
  if (!token) return <Navigate to="/auth/login" replace />
  return children
}

export function RequireRole({ allow = [], children }) {
  const { role, loading } = useAuth()
  if (loading) return null
  if (!role) return <Navigate to="/auth/login" replace />

  // SuperAdmin can go everywhere
  if (role === 'SuperAdmin') return children

  if (!allow.includes(role)) return <Navigate to="/academy" replace />
  return children
}
