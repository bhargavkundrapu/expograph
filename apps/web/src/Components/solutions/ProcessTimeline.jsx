/**
 * Process steps — `lean` for service pages (less copy), default for homepage-style grids.
 */
export default function ProcessTimeline({ steps, lean = false }) {
  return (
    <div className="@container w-full min-w-0">
      <div
        className={
          lean
            ? "flex flex-col gap-3"
            : "grid grid-cols-1 gap-4 @min-[36rem]:grid-cols-2 @min-[52rem]:grid-cols-3 @min-[72rem]:grid-cols-5"
        }
      >
        {steps.map((step) => (
          <article
            key={step.step}
            className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-violet-200/70 bg-white px-4 py-4 shadow-md ring-1 ring-violet-100 sm:px-5 sm:py-5"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-violet-700 sm:text-xs">{step.step}</p>
            <h3 className="sol-display mt-2 text-base leading-snug text-slate-900 sm:text-lg">{step.title}</h3>
            {lean ? (
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{step.whatYouGet}</p>
            ) : (
              <>
                <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <span className="font-medium text-slate-800">You:</span> {step.whatYouGet}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  <span className="font-medium text-slate-700">We:</span> {step.whatWeHandle}
                </p>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
