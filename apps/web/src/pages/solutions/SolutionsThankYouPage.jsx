import { Link } from "react-router-dom";
import SectionImage from "../../Components/solutions/SectionImage";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SOLUTIONS_AUX_BANNERS } from "../../content/solutions/sectionImages";

export default function SolutionsThankYouPage() {
  return (
    <SolutionsShell>
      <section className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="mb-8 w-full">
          <SectionImage
            src={SOLUTIONS_AUX_BANNERS.thankYou}
            alt={SOLUTIONS_AUX_BANNERS.thankYouAlt}
            aspectClass="aspect-[16/10]"
            className="shadow-md"
          />
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Thank you</p>
          <h1 className="mt-2 text-2xl font-bold text-emerald-950 sm:text-3xl">We have got your message</h1>
          <p className="mt-4 text-sm leading-relaxed text-emerald-900 sm:text-base">
            Our team will review what you sent and get back to you with clear next steps. If you opened WhatsApp, you may
            already see a thread — we will continue there or by email, whichever you prefer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/solutions"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200"
            >
              Back to Solutions
            </Link>
            <Link
              to="/academy"
              className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              Visit ExpoGraph Academy
            </Link>
          </div>
        </div>
      </section>
    </SolutionsShell>
  );
}
