import { useState } from "react";
import { TOOL_CARDS } from "../launchpadConfig";
import { useLaunchPad } from "../LaunchPadContext";
import FounderToolModal from "../FounderToolModal";

export default function ToolsScreen() {
  const { templatesUsed, updateProfile } = useLaunchPad();
  const [modalId, setModalId] = useState(null);
  const [toast, setToast] = useState("");

  const openTool = (id) => {
    setModalId(id);
  };

  const saveToolToProfile = () => {
    if (!modalId) return;
    updateProfile({
      templatesUsed: Array.from(new Set([...(templatesUsed || []), modalId])),
    });
    setToast("Saved to your startup profile.");
    setModalId(null);
    setTimeout(() => setToast(""), 2800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Founder Tools</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
          Practical utilities—not passive content. Pick a tool, follow the checklist, and save when you are done so your startup profile reflects what you used.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {TOOL_CARDS.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-800 w-fit px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200">
              {t.tag}
            </span>
            <p className="mt-3 font-semibold text-slate-900">{t.title}</p>
            <p className="mt-1 text-sm text-slate-600 flex-1">{t.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openTool(t.id)}
                className="min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-md"
              >
                Use Template
              </button>
              <button
                type="button"
                onClick={() => openTool(t.id)}
                className="min-h-[44px] px-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 shadow-sm"
              >
                Open Tool
              </button>
            </div>
          </div>
        ))}
      </div>
      {templatesUsed?.length > 0 && (
        <p className="text-sm text-slate-600">
          Startup profile: <span className="font-medium text-slate-800">{templatesUsed.length}</span> tool
          {templatesUsed.length === 1 ? "" : "s"} saved.
        </p>
      )}

      <FounderToolModal
        toolId={modalId}
        open={Boolean(modalId)}
        onClose={() => setModalId(null)}
        onSaveToProfile={saveToolToProfile}
      />

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
