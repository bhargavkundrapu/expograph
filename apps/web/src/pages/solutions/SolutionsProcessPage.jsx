import { Link } from "react-router-dom";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import ProcessTimeline from "../../Components/solutions/ProcessTimeline";
import { SOLUTIONS_PROCESS_STEPS } from "../../content/solutions/process";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function SolutionsProcessPage() {
  return (
    <SolutionsShell>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-white" aria-hidden />
        <div className={`relative ${shell} py-16 sm:py-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">Process</p>
          <h1 className="sol-display mt-3 max-w-3xl text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">Five steps. Same rhythm.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            You always know what we are doing, what we need from you, and what happens next. No mystery phases.
          </p>
        </div>
      </section>
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className={shell}>
          <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} />
          <div className="mt-12 text-center">
            <Link to="/solutions/book-a-meet" className="text-sm font-semibold text-violet-700 transition hover:text-violet-900">
              Discuss your scope →
            </Link>
          </div>
        </div>
      </section>
    </SolutionsShell>
  );
}
