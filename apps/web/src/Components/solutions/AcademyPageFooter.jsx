import { LazyMount } from "../LazyMount";
import { TubesBackground } from "../ui/neon-flow";
import FlowTubesFooterInner from "../ui/FlowTubesFooterInner";

/** Same footer block as `AcademyPage` - WebGL tubes, deferred mount, legal links. */
export default function AcademyPageFooter() {
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
          <FlowTubesFooterInner shellClassName="min-h-[560px] sm:min-h-[70vh]" />
        </TubesBackground>
      </LazyMount>
    </footer>
  );
}
