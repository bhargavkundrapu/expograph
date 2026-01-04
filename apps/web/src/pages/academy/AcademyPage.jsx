import { Link } from "react-router-dom";

export default function AcademyPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold leading-tight">
          Learn in a way that makes your career grow like an exponential graph 📈
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          ExpoGraph Academy = recorded sessions + cheat sheets + practice + real work systems
          (micro-internships + real client lab). Student-first. No gimmicks.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-200"
          >
            Login
          </Link>
          <Link
            to="/solutions"
            className="rounded-lg border border-slate-700 px-4 py-2 text-slate-100 hover:bg-slate-900"
          >
            See IT Solutions
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Student-first learning", "Clear path from zero → job-ready with proof-of-work."],
          ["Practice + reviews", "Submit tasks, get mentor feedback, improve fast."],
          ["Real world exposure", "Micro-internship ladder + real client lab later."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
