export function TechPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3 py-3"
      style={{
        border: "1px solid var(--border-col)",
        background: "var(--bg-card)",
      }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
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