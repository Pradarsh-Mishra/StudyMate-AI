export default function StatusCard({ title, value, description, accent }) {
  return (
    <div className="glass-card p-5 shadow-glass">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`rounded-3xl px-3 py-2 text-sm font-semibold ${accent}`}>{description}</div>
      </div>
    </div>
  );
}
