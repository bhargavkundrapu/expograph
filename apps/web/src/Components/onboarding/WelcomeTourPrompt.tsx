import { useState } from "react";

type WelcomeTourPromptProps = {
  tourTitle: string;
  isWhatsNew?: boolean;
  onStart: () => void;
  onSkip: () => void;
  onRemindLater: () => void;
};

export function WelcomeTourPrompt({
  tourTitle,
  isWhatsNew,
  onStart,
  onSkip,
  onRemindLater,
}: WelcomeTourPromptProps) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  const handleStart = () => {
    setOpen(false);
    onStart();
  };
  const handleSkip = () => {
    setOpen(false);
    onSkip();
  };
  const handleRemind = () => {
    setOpen(false);
    onRemindLater();
  };

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[9998] rounded-xl shadow-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-md p-4 animate-in slide-in-from-bottom-4"
      role="dialog"
      aria-labelledby="tour-prompt-title"
      aria-describedby="tour-prompt-desc"
    >
      <h2 id="tour-prompt-title" className="text-white font-semibold text-lg mb-1">
        {isWhatsNew ? "What's new" : "Quick tour"}
      </h2>
      <p id="tour-prompt-desc" className="text-slate-300 text-sm mb-4">
        {isWhatsNew
          ? `${tourTitle} has been updated. Take a quick tour to see what's new.`
          : `See how ${tourTitle} works in a few steps.`}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleStart}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
        >
          Start tour
        </button>
        <button
          type="button"
          onClick={handleRemind}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm transition-colors"
        >
          Remind later
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-300 font-medium text-sm transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
