import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { listAllTours, getTourByKey } from "../../../Components/onboarding/tours/tourRegistry";
import TourEngine from "../../../Components/onboarding/TourEngine";
import { FiPlay, FiHelpCircle, FiArrowLeft } from "react-icons/fi";

export default function StudentToursHelp() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [replaying, setReplaying] = useState(null); // tourKey when replaying

  const role = user?.role || user?.role || "Student";
  const tours = listAllTours(role);
  const replayMeta = replaying ? getTourByKey(replaying, role) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <FiHelpCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Guided Tours</h1>
            <p className="text-slate-400 text-sm">Replay a short tour for any part of the LMS.</p>
          </div>
        </div>
        <ul className="space-y-3">
          {tours.map((tour) => (
            <li
              key={tour.tourKey}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <span className="font-medium text-white">{tour.title}</span>
              <button
                type="button"
                onClick={() => setReplaying(tour.tourKey)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <FiPlay className="w-4 h-4" />
                Replay
              </button>
            </li>
          ))}
        </ul>
        {tours.length === 0 && (
          <p className="text-slate-500 text-center py-8">No tours available for your role.</p>
        )}
      </div>

      {replaying && replayMeta && (
        <TourEngine
          tourKey={replayMeta.tourKey}
          tourVersion={replayMeta.tourVersion}
          steps={replayMeta.steps}
          isOpen={true}
          onClose={() => setReplaying(null)}
          initialStepIndex={0}
          token={token}
          onComplete={() => setReplaying(null)}
          onDismiss={() => setReplaying(null)}
        />
      )}
    </div>
  );
}
