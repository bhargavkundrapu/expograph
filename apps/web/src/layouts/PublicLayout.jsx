import { Outlet, Link, NavLink } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/academy" className="font-semibold tracking-wide">
            ExpoGraph
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/academy"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-slate-300 hover:text-white"
              }
            >
              Academy
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-slate-300 hover:text-white"
              }
            >
              IT Solutions
            </NavLink>

            <Link
              to="/login"
              className="rounded-lg bg-white px-3 py-1.5 text-slate-900 hover:bg-slate-200"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-6">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-400">
          © {new Date().getFullYear()} ExpoGraph Tech Solution Pvt Ltd
        </div>
      </footer>
    </div>
  );
}
