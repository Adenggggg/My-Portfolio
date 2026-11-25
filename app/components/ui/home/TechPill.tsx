export function TechPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div
      className="spotlight lift group flex shrink-0 items-center gap-3 rounded-xl py-3 pl-3 pr-5"
      style={{
        border: "1px solid var(--border-col)",
        background: "var(--bg-card)",
      }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
        style={{ background: "var(--bg-base)" }}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
        {name}
      </span>
    </div>
  );
}