import { Link } from "react-router-dom";
import "../../styles/solutions-presentation.css";
import AcademyPageFooter from "./AcademyPageFooter";
import SolutionsNavbar from "./SolutionsNavbar";

/** Solutions layout — presentation-style shell + Academy home footer (tubes). */
export default function SolutionsShell({ children }) {
  return (
    <div
      className="solutions-public-page min-h-screen w-full bg-white text-slate-900 selection:bg-violet-200/70"
      style={{ fontFamily: "var(--font-dm)" }}
    >
      <SolutionsNavbar />
      {/* Spacer for fixed navbar: gradient strip (h-0.5) + bar row (h-14) */}
      <div className="h-[calc(0.125rem+3.5rem)] shrink-0" aria-hidden />
      <div className="solutions-scroll-content overflow-x-clip">{children}</div>
      <AcademyPageFooter />
      <div className="fixed bottom-0 left-0 right-0 z-[5000] border-t border-slate-200/90 bg-white/95 p-3 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:hidden">
        <Link
          to="/solutions/book-a-meet"
          className="flex w-full min-h-[48px] items-center justify-center rounded-full bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700 active:scale-[0.99]"
        >
          Book a meet
        </Link>
      </div>
    </div>
  );
}
