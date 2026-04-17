import { useState } from "react";

export default function FaqAccordion({ groups }) {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.group}>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{group.group}</h3>
          <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {group.items.map((item, index) => {
              const key = `${group.group}-${index}`;
              const open = openKey === key;
              const panelId = `faq-panel-${key}`;
              const buttonId = `faq-button-${key}`;
              return (
                <article key={key} className="first:rounded-t-2xl last:rounded-b-2xl">
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm text-slate-900 transition hover:bg-violet-50/40 sm:px-5 sm:py-4 sm:text-base"
                    onClick={() => setOpenKey(open ? null : key)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className="font-semibold leading-snug">{item.q}</span>
                    <span className="shrink-0 text-violet-600" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open ? (
                    <div id={panelId} role="region" aria-labelledby={buttonId} className="border-t border-slate-100 px-4 pb-4 sm:px-5">
                      <p className="pt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
