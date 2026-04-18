import { Link } from "react-router-dom";
import BookMeetForm from "../../Components/solutions/BookMeetForm";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SITE_CONTACT } from "../../config/siteContact";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function SolutionsBookMeetPage() {
  return (
    <SolutionsShell>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-100/90 via-white to-white" aria-hidden />
        <div className={`relative ${shell} py-16 text-center sm:py-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">Contact</p>
          <h1 className="sol-display mt-3 text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">Book a meet</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Tell us what you are trying to fix. We reply with honest fit and next steps — not a generic pitch deck.
          </p>
        </div>
      </section>

      <section className={`${shell} py-12 sm:py-16`}>
        <div className="mx-auto grid max-w-3xl gap-12 lg:max-w-none lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">What happens after you reach out</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-600">
              <li>We read your note and any context you shared.</li>
              <li>We suggest a sensible starting point — sometimes smaller than you expected.</li>
              <li>We follow up with options, timing, and pricing direction. No pressure.</li>
            </ol>
            <div className="mt-10">
              <BookMeetForm redirectOnSuccess />
            </div>
          </div>
          <aside className="lg:col-span-5 lg:pt-1">
            <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-b from-violet-50/60 to-white p-6 shadow-lg ring-1 ring-violet-100 sm:p-7">
              <h2 className="sol-display text-lg text-slate-900 sm:text-xl">Direct contact</h2>
              <p className="mt-4 text-sm text-slate-700 sm:text-base">{SITE_CONTACT.phoneDisplay}</p>
              <p className="mt-1 text-sm sm:text-base">
                <a href={`mailto:${SITE_CONTACT.email}`} className="font-medium text-violet-700 hover:underline">
                  {SITE_CONTACT.email}
                </a>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{SITE_CONTACT.addressLine}</p>
              <p className="mt-4 text-xs text-slate-500">We aim to respond within {SITE_CONTACT.responseTime}.</p>
              <a
                href={`https://wa.me/${SITE_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Message on WhatsApp
              </a>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 text-sm leading-relaxed text-slate-600 shadow-md">
              <p className="font-semibold text-slate-900">Quick reassurance</p>
              <p className="mt-2">No long forms beyond what you see here. If email is easier, use the proposal-by-email option on the form.</p>
            </div>
            <Link to="/solutions" className="mt-8 inline-block text-sm font-semibold text-violet-700 transition hover:text-violet-900">
              ← Back to Solutions
            </Link>
          </aside>
        </div>
      </section>
    </SolutionsShell>
  );
}
