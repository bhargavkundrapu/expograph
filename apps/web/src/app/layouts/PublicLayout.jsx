import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
      }
    >
      {children}
    </NavLink>
  )
}

export default function PublicLayout() {
  const { token, role, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-purple-400/40 border border-white/10" />
            <div>
              <div className="font-semibold">ExpoGraph</div>
              <div className="text-xs text-white/60 -mt-0.5">Exponential growth for students + clients</div>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <NavItem to="/academy">Academy</NavItem>
            <NavItem to="/solutions">IT Solutions</NavItem>
            {!token ? (
              <NavItem to="/auth/login">Login</NavItem>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl text-sm hover:bg-white/5 text-white/80"
                title={role || ''}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/60 flex items-center justify-between">
          <div>© {new Date().getFullYear()} ExpoGraph Tech Solution Pvt Ltd</div>
          <div className="text-white/40">Student-first • Bootstrapped • High standards</div>
        </div>
      </footer>
    </div>
  )
}
