import { Link } from "react-router-dom";
import { LazyMount } from "../LazyMount";
import { TubesBackground } from "../ui/neon-flow";

/** Same footer block as `AcademyPage` - WebGL tubes, deferred mount, legal links. */
export default function AcademyPageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 w-full min-h-[560px] sm:min-h-[70vh] border-t-0">
      <LazyMount
        placeholderHeight="min(560px, 70vh)"
        rootMargin="480px"
        className="w-full min-h-[560px] sm:min-h-[70vh]"
        placeholder={
          <div
            className="flex w-full min-h-[560px] flex-col items-center justify-center gap-4 bg-[#0a0a0a] text-sm text-white/40 sm:min-h-[70vh]"
            aria-hidden
          >
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/50" />
          </div>
        }
      >
        <TubesBackground className="min-h-[560px] sm:min-h-[70vh] bg-[#0a0a0a]" enableClickInteraction={true}>
          <div className="flex min-h-[560px] w-full flex-col items-center justify-center gap-6 px-4 text-center sm:min-h-[70vh]">
            <div className="pointer-events-auto cursor-default select-none space-y-2">
              <h2 className="text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] sm:text-6xl md:text-7xl lg:text-8xl">
                ExpoGraph flow
              </h2>
            </div>
            <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-white/50">
              <span className="text-xs uppercase tracking-widest">Move the cursor around to interact and Click to randomize.</span>
              <span className="text-xs text-white/40">
                © {year} ExpoGraph Academy
              </span>
            </div>
            <div className="pointer-events-auto absolute bottom-8 right-6 flex items-center gap-4 text-white/55">
              <Link to="/privacy-policy" className="text-xs underline underline-offset-2 hover:text-white/80">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-xs underline underline-offset-2 hover:text-white/80">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </TubesBackground>
      </LazyMount>
    </footer>
  );
}
