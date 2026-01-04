import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { homePathForRole } from "../app/roles";

function linkClass({ isActive }) {
  return [
    "block rounded-lg px-3 py-2 text-sm",
    isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white",
  ].join(" ");
}

export default function PortalLayout() {
  const { role, user } = useAuth();

  const base = homePathForRole(role);

  // Basic nav per role (we expand later)
  const navItems = (() => {
    if (role === "SuperAdmin") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/content`, label: "Content Admin" },
      ];
    }
    if (role === "TenantAdmin") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/settings`, label: "Tenant Settings" },
      ];
    }
    if (role === "Mentor") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/submissions`, label: "Submissions Queue" },
      ];
    }
    return [
      { to: `${base}`, label: "Dashboard" },
      { to: `${base}/courses`, label: "Courses" },
      { to: `${base}/progress`, label: "Progress" },
      { to: `${base}/submissions`, label: "My Submissions" },
    ];
  })();

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
          <div className="mb-4">
            <div className="text-sm text-slate-400">Logged in as</div>
            <div className="font-semibold">{role}</div>
            <div className="mt-1 text-xs text-slate-400">{user?.email}</div>
          </div>

          <nav className="space-y-1">
            {navItems.map((i) => (
              <NavLink key={i.to} to={i.to} className={linkClass} end>
                {i.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 text-xs text-slate-500">
            Basic UI now. Later we’ll make it 🔥.
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
