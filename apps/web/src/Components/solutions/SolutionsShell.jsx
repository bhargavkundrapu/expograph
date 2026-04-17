import { Link } from "react-router-dom";
import { Header } from "../ui/header-2";
import SolutionsFooter from "./SolutionsFooter";

/**
 * Academy-style top nav + footer; main content uses a calm, LMS-inspired light theme.
 */
export default function SolutionsShell({ children }) {
  return (
    <div
      className="solutions-public-page relative min-h-screen w-full bg-white"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "#ffffff",
        color: "#334155",
      }}
    >
      <Header variant="solutions" />
      <div className="solutions-scroll-content overflow-x-hidden pb-24 pt-20 sm:pb-8 md:pt-24">{children}</div>
      <SolutionsFooter />
      {/* Mobile: quick path to talk to us — matches LMS “always reachable” feel */}
      <div className="fixed bottom-0 left-0 right-0 z-[5000] border-t border-slate-200 bg-white p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.06)] sm:hidden">
        <Link
          to="/solutions/book-a-meet"
          className="flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[0.99]"
        >
          Book a meet — we are here to help
        </Link>
      </div>
    </div>
  );
}
