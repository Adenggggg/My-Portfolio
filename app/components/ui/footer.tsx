export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-white/5 relative"
      style={{ backgroundColor: "#080d12" }}
    >
      {/* Grid bg continues into footer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
        <p>
          © 2024 – {year}{" "}
          <span className="text-white/50">Adriane Frane</span>
          . All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="mailto:franeadriane10@gmail.com" className="hover:text-white/60 transition-colors">
            Email
          </a>
          <a href="https://linkedin.com/in/frane-adriane" target="_blank" rel="noreferrer" className="hover:text-white/60 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white/60 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}