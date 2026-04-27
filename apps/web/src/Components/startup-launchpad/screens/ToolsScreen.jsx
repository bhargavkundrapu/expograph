import { useState } from "react";
import { TOOL_CARDS } from "../launchpadConfig";
import { useLaunchPad } from "../LaunchPadContext";
import FounderToolModal from "../FounderToolModal";

export default function ToolsScreen() {
  const { templatesUsed, updateProfile } = useLaunchPad();
  const [toolModalId, setToolModalId] = useState(null);
  const [toast, setToast] = useState("");

  const saveToolToProfile = () => {
    if (!toolModalId) return;
    updateProfile({
      templatesUsed: Array.from(new Set([...(templatesUsed || []), toolModalId])),
    });
    setToast("Saved to your startup profile.");
    setToolModalId(null);
    setTimeout(() => setToast(""), 2800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Founder Tools</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Each tool opens a checklist plus a <span className="font-medium text-slate-800">custom AI review prompt</span> (with placeholders) matched to
          that template-so ChatGPT critiques <em>your</em> inputs, not a generic chat. Tap <span className="font-medium text-slate-800">Open template</span>{" "}
          to use it.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
        {TOOL_CARDS.map((t) => {
          const isIdeaValidator = t.id === "idea-validator";
          return (
          <div
            key={t.id}
            className={`rounded-2xl border flex flex-col shadow-sm min-w-0 w-full max-w-full overflow-hidden ${
              isIdeaValidator
                ? "border-violet-200/90 bg-gradient-to-br from-white to-violet-50/50 p-4 sm:p-5 sm:min-h-[200px]"
                : "border-slate-200 bg-white p-4 sm:p-5"
            }`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-800 w-fit max-w-full px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200 break-words">
              {t.tag}
            </span>
            <p className={`mt-3 font-semibold text-slate-900 leading-snug ${isIdeaValidator ? "text-base sm:text-lg" : "text-base"}`}>{t.title}</p>
            <p className="mt-1.5 text-sm text-slate-600 flex-1 leading-relaxed break-words">{t.blurb}</p>
            <div className="mt-4 w-full">
              <button
                type="button"
                onClick={() => setToolModalId(t.id)}
                className="w-full min-h-[48px] sm:min-h-[44px] px-4 rounded-xl text-sm font-semibold text-white shadow-md active:opacity-95 bg-gradient-to-r from-violet-600 to-fuchsia-600"
              >
                Open template
              </button>
            </div>
          </div>
          );
        })}
      </div>
      {templatesUsed?.length > 0 && (
        <p className="text-sm text-slate-600">
          Startup profile: <span className="font-medium text-slate-800">{templatesUsed.length}</span> tool
          {templatesUsed.length === 1 ? "" : "s"} saved.
        </p>
      )}

      <FounderToolModal toolId={toolModalId} open={Boolean(toolModalId)} onClose={() => setToolModalId(null)} onSaveToProfile={saveToolToProfile} />

      {toast && (
        <div
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white shadow-xl"
          role="status"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
