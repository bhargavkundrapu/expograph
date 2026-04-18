import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsBookCtaSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.bookPreview;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 pb-28 pt-16 sm:pb-20 sm:pt-20"
      aria-labelledby="book-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.35),transparent_55%)]" aria-hidden />
      <div className={`relative ${SOLUTIONS_HOME_SHELL} text-center`}>
        <motion.div {...fade}>
          <h2 id="book-cta-heading" className="sol-display mx-auto max-w-2xl text-2xl text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">{body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/solutions/book-a-meet"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100 sm:w-auto"
            >
              Book a meet
            </Link>
            <Link
              to="/solutions/pricing"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
            >
              Review pricing first
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
