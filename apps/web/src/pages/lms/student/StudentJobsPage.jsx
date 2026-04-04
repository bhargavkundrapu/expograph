import JobsHub from "../../../Components/jobs/JobsHub.jsx";

/** Light Jobs Hub surface inside the student LMS (default theme). */
export default function StudentJobsPage() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-gradient-to-b from-slate-100 via-white to-slate-50 p-4 sm:p-6 lg:p-8">
      <JobsHub />
    </div>
  );
}
