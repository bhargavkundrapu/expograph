import { Link } from "react-router-dom";

/** Light footer for Solutions routes — matches solid white page background. */
export default function SolutionsFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">ExpoGraph Solutions</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">ExpoGraph flow</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-base">
            Same care and craft you know from ExpoGraph Academy — now for your business systems, automation, and growth.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-8 text-sm font-medium text-slate-700 sm:justify-start">
          <Link to="/solutions" className="text-violet-700 hover:text-violet-800 hover:underline underline-offset-2">
            Overview
          </Link>
          <Link to="/solutions/pricing" className="text-violet-700 hover:text-violet-800 hover:underline underline-offset-2">
            Pricing
          </Link>
          <Link to="/solutions/book-a-meet" className="text-violet-700 hover:text-violet-800 hover:underline underline-offset-2">
            Book a Meet
          </Link>
          <Link to="/academy" className="text-slate-600 hover:text-slate-900 hover:underline underline-offset-2">
            Academy
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} ExpoGraph</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-800 hover:underline underline-offset-2">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-800 hover:underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
