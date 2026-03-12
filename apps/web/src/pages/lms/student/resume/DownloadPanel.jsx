/**
 * Legacy panel: PDF download is now handled in the main Resume Builder view
 * (client-side export via "Download PDF" button). No print dialog, no backend call.
 * This file is kept for reference; the active flow uses Components/resume/ResumeBuilder.
 */
export default function DownloadPanel() {
  return (
    <p className="text-slate-600 text-sm">
      Use the &quot;Download PDF&quot; button in the Resume Builder view to generate and download your resume.
    </p>
  );
}
