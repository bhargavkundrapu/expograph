export default function SuperAdminPlaceholder({ title = "Page", description = "Coming soon..." }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-600 mt-2">{description}</p>
    </div>
  );
}
