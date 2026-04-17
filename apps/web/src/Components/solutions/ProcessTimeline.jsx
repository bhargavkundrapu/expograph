/**
 * Step cards use container queries so columns follow the *timeline* width,
 * not the viewport — avoids five squeezed columns inside a half-width layout.
 */
export default function ProcessTimeline({ steps }) {
  return (
    <div className="@container w-full min-w-0">
      <div className="grid grid-cols-1 gap-4 @min-[30rem]:grid-cols-2 @min-[45rem]:grid-cols-3 @min-[62rem]:grid-cols-5">
        {steps.map((step) => (
          <article
            key={step.step}
            className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5"
          >
            <p className="text-[0.65rem] font-bold uppercase leading-tight tracking-wide text-violet-600 sm:text-xs">{step.step}</p>
            <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 sm:text-base">{step.title}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
              <span className="font-semibold text-slate-900">You get:</span> {step.whatYouGet}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              <span className="font-semibold text-slate-800">We handle:</span> {step.whatWeHandle}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              <span className="font-semibold text-slate-800">Why it works:</span> {step.whyItWorks}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
