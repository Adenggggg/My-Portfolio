type PageShellProps = {
  children: React.ReactNode;
  /** Show a second glow blob in the bottom-right (used on Home). */
  showSecondGlow?: boolean;
};

export function PageShell({ children, showSecondGlow = false }: PageShellProps) {
  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Glow A */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-0"
        style={{
          top: "-10%",
          left: "-10%",
          width: "70vw",
          height: "70vh",
          background: "radial-gradient(ellipse, var(--glow-a) 0%, transparent 60%)",
        }}
      />

      {/* Glow B (optional second glow, e.g. Home page) */}
      {showSecondGlow && (
        <div
          aria-hidden
          className="fixed pointer-events-none z-0"
          style={{
            bottom: "-5%",
            right: "-10%",
            width: "50vw",
            height: "50vh",
            background: "radial-gradient(ellipse, var(--glow-b) 0%, transparent 60%)",
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">{children}</div>
    </div>
  );
}