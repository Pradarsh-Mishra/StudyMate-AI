export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="glass-panel rounded-3xl border-white/10 px-6 py-5 shadow-glass">
      <div className="flex flex-col gap-1">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-400/80">{subtitle}</p>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
}
