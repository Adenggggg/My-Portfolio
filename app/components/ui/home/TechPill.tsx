export function TechPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div
      className="group flex shrink-0 select-none items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300"
      style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
    >
      <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="whitespace-nowrap text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-2)" }}>
        {name}
      </span>
    </div>
  );
}