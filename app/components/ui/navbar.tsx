import { useState, useEffect } from "react";
import { NavLink } from "react-router";

const navLinks = [
  { label: "Home",     to: "/home"     },
  { label: "Projects", to: "/projects" },
  { label: "Videos",   to: "/videos"   },
  { label: "Designs",  to: "/designs"  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080d12]/80 backdrop-blur-xl border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-8">

        {/* ── Logo ──────────────────────────────────────── */}
        <NavLink
          to="/home"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-white transition-colors hover:text-white/70"
        >
          {/* Small dot accent */}
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-all duration-300 group-hover:scale-125" />
          adriane<span className="text-white/25">.</span>
        </NavLink>

        {/* ── Desktop links ─────────────────────────────── */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm transition-all duration-200 rounded-lg ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-white/50" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ───────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-lg border border-white/8 bg-[#111820] px-4 py-2 text-xs font-medium text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white"
          >
            Contact Me
          </a>
        </div>

        {/* ── Mobile hamburger ──────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-[#111820] text-white/50 transition-all duration-200 hover:border-white/15 hover:text-white md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="transition-all duration-300">
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

      {/* ── Mobile menu ───────────────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/6 bg-[#080d12]/95 px-4 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-white/6 text-white"
                      : "text-white/40 hover:bg-white/4 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`h-1 w-1 rounded-full transition-colors ${isActive ? "bg-emerald-400" : "bg-white/20"}`} />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-white/6 pt-3">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg border border-white/8 bg-[#111820] py-3 text-sm text-white/50 transition-all hover:text-white"
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