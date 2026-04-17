import SectionImage from "../../Components/solutions/SectionImage";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import ProcessTimeline from "../../Components/solutions/ProcessTimeline";
import { SOLUTIONS_AUX_BANNERS } from "../../content/solutions/sectionImages";
import { SOLUTIONS_PROCESS_STEPS } from "../../content/solutions/process";

export default function SolutionsProcessPage() {
  return (
    <SolutionsShell>
      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Our process</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How we work with you</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              No mystery phases. You always know what we are doing, why we are doing it, and what we need from you. The
              steps below are the same caring rhythm we bring to every engagement.
            </p>
          </div>
          <SectionImage
            src={SOLUTIONS_AUX_BANNERS.process}
            alt={SOLUTIONS_AUX_BANNERS.processAlt}
            aspectClass="aspect-[4/3]"
            className="shadow-md"
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} />
      </section>
    </SolutionsShell>
  );
}
