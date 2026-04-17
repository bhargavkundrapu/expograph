import { Link } from "react-router-dom";
import BookMeetForm from "../../Components/solutions/BookMeetForm";
import SectionImage from "../../Components/solutions/SectionImage";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SITE_CONTACT } from "../../config/siteContact";
import { SOLUTIONS_AUX_BANNERS } from "../../content/solutions/sectionImages";

export default function SolutionsBookMeetPage() {
  return (
    <SolutionsShell>
      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">We are here for you</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Tell us what you need — we will help map the right solution
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
              Whether you need lead generation, AI automation, support systems, or a founder MVP, share what is on your mind.
              We read every message with care and reply with honest, practical next steps.
            </p>
          </div>
          <SectionImage
            src={SOLUTIONS_AUX_BANNERS.bookMeet}
            alt={SOLUTIONS_AUX_BANNERS.bookMeetAlt}
            aspectClass="aspect-[4/3]"
            className="shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-5 lg:gap-12 lg:px-8">
        <div className="lg:col-span-3">
          <BookMeetForm redirectOnSuccess />
        </div>
        <aside className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm lg:col-span-2 lg:h-fit lg:self-start">
          <h2 className="text-lg font-bold text-slate-900">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            <li>We read your note and any context you shared.</li>
            <li>We suggest a sensible starting point — sometimes smaller than you expected.</li>
            <li>We follow up with clear options, timing, and pricing direction — no pressure.</li>
          </ol>
          <div className="mt-6 space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Direct contact</p>
            <p>{SITE_CONTACT.phoneDisplay}</p>
            <p>
              <a href={`mailto:${SITE_CONTACT.email}`} className="font-medium text-violet-700 hover:underline">
                {SITE_CONTACT.email}
              </a>
            </p>
            <p>{SITE_CONTACT.addressLine}</p>
            <p className="pt-2 text-xs text-slate-500">We aim to respond within {SITE_CONTACT.responseTime}.</p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            Message us on WhatsApp
          </a>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Prefer email only? Use &quot;Request a proposal by email&quot; on the form — same friendly team, different channel.
          </p>
          <Link to="/solutions" className="mt-4 block text-center text-sm font-semibold text-violet-700 hover:underline">
            ← Back to Solutions overview
          </Link>
        </aside>
      </section>
    </SolutionsShell>
  );
}
