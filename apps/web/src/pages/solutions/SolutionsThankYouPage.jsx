import { Link } from "react-router-dom";
import SolutionsShell from "../../Components/solutions/SolutionsShell";

export default function SolutionsThankYouPage() {
  return (
    <SolutionsShell>
      <section className="relative mx-auto flex min-h-[55vh] w-full max-w-lg flex-col justify-center overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-white" aria-hidden />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">Thank you</p>
          <h1 className="sol-display mt-3 text-3xl text-slate-900 sm:text-4xl">We have your message</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            If WhatsApp opened, you should see your thread there. Otherwise we will follow up by email with clear next steps.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/solutions"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-800 shadow-md transition hover:bg-slate-50"
            >
              Back to Solutions
            </Link>
            <Link
              to="/academy"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
            >
              ExpoGraph Academy
            </Link>
          </div>
        </div>
      </section>
    </SolutionsShell>
  );
}
