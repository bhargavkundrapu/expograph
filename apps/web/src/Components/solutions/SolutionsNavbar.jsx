import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuToggleIcon } from "../ui/menu-toggle-icon";
import { useScroll } from "../ui/use-scroll";
import { cn } from "../../lib/utils";

const NAV = [
  { label: "Services", to: "/solutions", hash: "services" },
  { label: "Process", to: "/solutions/process", hash: null },
  { label: "Pricing", to: "/solutions/pricing", hash: null },
  { label: "Acadamey", to: "/", hash: null },
  { label: "Contact", to: "/solutions/book-a-meet", hash: null },
];

export default function SolutionsNavbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(8);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (to, hash) => {
    setOpen(false);
    if (hash) {
      if (location.pathname === "/solutions" || location.pathname === "/solutions/") {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(to);
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
      return;
    }
    navigate(to);
  };

  const linkBase =
    "rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50 hover:text-slate-900";

  const pathMatch = (to) =>
    to === "/solutions"
      ? location.pathname === "/solutions" || location.pathname === "/solutions/"
      : location.pathname === to || location.pathname === `${to}/`;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[9999] w-full border-b transition-[background-color,box-shadow] duration-200",
        scrolled ? "border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md" : "border-transparent bg-white/90 backdrop-blur-sm"
      )}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-400" aria-hidden />
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[height] duration-200 sm:px-6 lg:px-8",
          scrolled ? "h-[3.25rem]" : "h-14"
        )}
      >
        <Link to="/solutions" className="shrink-0 tracking-tight text-slate-900" onClick={() => setOpen(false)}>
          <span className={cn("font-semibold transition-[font-size] duration-200", scrolled ? "text-[0.95rem]" : "text-base")}>ExpoGraph</span>
          <span className="font-normal text-violet-700"> Solutions</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV.map(({ label, to, hash }) =>
            hash ? (
              <button key={label} type="button" className={linkBase} onClick={() => go(to, hash)}>
                {label}
              </button>
            ) : (
              <Link key={label} to={to} className={cn(linkBase, pathMatch(to) && "bg-violet-100 text-violet-900")} onClick={() => setOpen(false)}>
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/solutions/book-a-meet"
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Book a meet
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <MenuToggleIcon open={open} className="size-5" duration={280} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0.5">
            {NAV.map(({ label, to, hash }) =>
              hash ? (
                <button
                  key={label}
                  type="button"
                  className="rounded-xl px-3 py-3 text-left text-base font-medium text-slate-800 hover:bg-violet-50"
                  onClick={() => go(to, hash)}
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className="rounded-xl px-3 py-3 text-base font-medium text-slate-800 hover:bg-violet-50"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
            <Link
              to="/solutions/book-a-meet"
              className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
              onClick={() => setOpen(false)}
            >
              Book a meet
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
