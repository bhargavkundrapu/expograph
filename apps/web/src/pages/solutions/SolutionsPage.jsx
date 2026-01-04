export default function SolutionsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold">ExpoGraph IT Solutions</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          We build web apps, internal tools, portals, and SaaS systems with clean engineering,
          speed, and long-term maintainability.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          ["Web Applications", "Dashboards, admin panels, LMS, custom portals."],
          ["SaaS Systems", "Multi-tenant architecture, RBAC, white-label."],
          ["Maintenance + Scaling", "Monitoring, performance, security hardening."],
          ["Consulting", "Architecture, deployment, product roadmap guidance."],
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
