type SectionHeadingProps = {
  children: React.ReactNode;
  sub?: string;
};

export function SectionHeading({ children, sub }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-14">
      {sub && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-3)" }}>
          {sub}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl font-bold leading-tight"
        style={{
          fontFamily: "'Playfair Display', 'Didot', 'Georgia', serif",
          letterSpacing: "-0.02em",
          color: "var(--text-1)",
        }}
      >
        {children}
      </h2>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, var(--border-col))" }} />
        <div className="h-1 w-1 rounded-full" style={{ background: "var(--border-hov)" }} />
        <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, var(--border-col))" }} />
      </div>
    </div>
  );
}