import { Link } from "react-router-dom";
import FaqAccordion from "../../Components/solutions/FaqAccordion";
import SectionImage from "../../Components/solutions/SectionImage";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SOLUTIONS_AUX_BANNERS } from "../../content/solutions/sectionImages";
import { SOLUTIONS_FAQ_GROUPS } from "../../content/solutions/faqs";

export default function SolutionsFaqPage() {
  return (
    <SolutionsShell>
      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">FAQ</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions, answered with care</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              If you do not see your question here, reach out anyway — we are happy to help you think it through.
            </p>
          </div>
          <SectionImage
            src={SOLUTIONS_AUX_BANNERS.faq}
            alt={SOLUTIONS_AUX_BANNERS.faqAlt}
            aspectClass="aspect-[4/3]"
            className="shadow-md"
          />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <FaqAccordion groups={SOLUTIONS_FAQ_GROUPS} />
        <div className="mt-12 rounded-2xl border border-violet-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-800">Still deciding?</p>
          <Link to="/solutions/book-a-meet" className="mt-3 inline-flex text-sm font-semibold text-violet-700 hover:underline">
            Book a short meet — no obligation
          </Link>
        </div>
      </section>
    </SolutionsShell>
  );
}
