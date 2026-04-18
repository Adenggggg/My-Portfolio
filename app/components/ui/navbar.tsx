import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useTheme } from "~/lib/theme";

const navLinks = [
  { label: "Home",     to: "/home"     },
  { label: "Projects", to: "/projects" },
  { label: "Videos",   to: "/videos"   },
  { label: "Designs",  to: "/designs"  },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg-base) 80%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-col)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-8">

        {/* ── Logo ── */}
        <NavLink
          to="/home"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors"
          style={{ color: "var(--text-1)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-all duration-300 group-hover:scale-125" />
          adriane<span style={{ color: "var(--text-3)" }}>.</span>
        </NavLink>

        {/* ── Desktop links ── */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className="relative px-4 py-2 text-sm transition-all duration-200 rounded-lg"
                style={({ isActive }) => ({
                  color: isActive ? "var(--text-1)" : "var(--text-3)",
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full"
                        style={{ background: "var(--text-2)" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop right side ── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              border: "1px solid var(--border-col)",
              background: "var(--bg-card2)",
              color: "var(--text-2)",
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200"
            style={{
              border: "1px solid var(--border-col)",
              background: "var(--bg-card2)",
              color: "var(--text-2)",
            }}
          >
            Contact Me
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 md:hidden"
          style={{
            border: "1px solid var(--border-col)",
            background: "var(--bg-card2)",
            color: "var(--text-2)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="7"  x2="21" y2="7"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{ maxHeight: menuOpen ? "320px" : "0px", opacity: menuOpen ? 1 : 0 }}
      >
        <div
          className="px-4 py-4 backdrop-blur-xl"
          style={{
            borderTop: "1px solid var(--border-col)",
            background: "color-mix(in srgb, var(--bg-base) 95%, transparent)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200"
                style={({ isActive }) => ({
                  background: isActive ? "var(--bg-card)" : "transparent",
                  color: isActive ? "var(--text-1)" : "var(--text-3)",
                })}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: isActive ? "#34d399" : "var(--text-4)" }}
                    />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}

            <div className="mt-2 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border-col)", paddingTop: "12px" }}>
              {/* Theme toggle mobile */}
              <button
                onClick={() => { toggle(); setMenuOpen(false); }}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200"
                style={{
                  border: "1px solid var(--border-col)",
                  background: "var(--bg-card2)",
                  color: "var(--text-2)",
                }}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              {/* Contact mobile */}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg py-3 text-sm transition-all"
                style={{
                  border: "1px solid var(--border-col)",
                  background: "var(--bg-card2)",
                  color: "var(--text-2)",
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}