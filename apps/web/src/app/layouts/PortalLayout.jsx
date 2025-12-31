import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

function SideItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-white/10' : 'hover:bg-white/5 text-white/80'}`
      }
    >
      {children}
    </NavLink>
  )
}

export default function PortalLayout({ variant = 'lms' }) {
  const { role, logout, me } = useAuth()

  const sidebar = (() => {
    if (variant === 'admin') {
      return (
        <>
          <SideItem to="/admin">Dashboard</SideItem>
          <SideItem to="/admin/content">Content</SideItem>
          <SideItem to="/admin/leads">Leads</SideItem>
        </>
      )
    }
    if (variant === 'mentor') {
      return (
        <>
          <SideItem to="/mentor">Dashboard</SideItem>
          <SideItem to="/mentor/submissions">Submissions Queue</SideItem>
        </>
      )
    }
    return (
      <>
        <SideItem to="/lms">Dashboard</SideItem>
        <SideItem to="/lms/courses">Courses</SideItem>
        <SideItem to="/lms/code-vault">Code Vault</SideItem>
        <SideItem to="/lms/launchpad">LaunchPad</SideItem>
        <SideItem to="/lms/internships">Micro-Internships</SideItem>
        <SideItem to="/lms/client-lab">Real Client Lab</SideItem>
      </>
    )
  })()

  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-white/10 bg-black/25">
        <div className="p-4">
          <div className="font-semibold">ExpoGraph</div>
          <div className="text-xs text-white/60">{me?.tenant?.name || 'Tenant'} • {role}</div>
        </div>
        <div className="px-2 pb-4 space-y-1">{sidebar}</div>
        <div className="p-4">
          <button onClick={logout} className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
            Logout
          </button>
        </div>
      </aside>

      <main className="col-span-12 md:col-span-9 lg:col-span-10">
        <Outlet />
      </main>
    </div>
  )
}
