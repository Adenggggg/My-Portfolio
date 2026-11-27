import { NavLink, useLocation } from "react-router";
import { SOCIAL_LINKS } from "~/data/social-links";
import { smoothScrollTo, useSmoothNav } from "~/lib/smooth-nav";

const footerLinks = [
  { label: "Home",     to: "/home"     },
  { label: "Projects", to: "/projects" },
  { label: "Videos",   to: "/videos"   },
  { label: "Designs",  to: "/designs"  },
];

const contactLinks = [
  { label: "Email",     href: "mailto:franeadriane10@gmail.com"         },
  { label: "LinkedIn",  href: "https://linkedin.com/in/frane-adriane"   },
  { label: "GitHub",    href: "https://github.com/Adenggggg"            },
  { label: "Instagram", href: "https://instagram.com/_freyn.alvr"       },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const go = useSmoothNav();
  const { pathname } = useLocation();
  // Home already ends with the full contact section, so the CTA card would repeat it
  const showCta = pathname !== "/home";

  return (
    <footer
      className="relative overflow-hidden transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border-col)", background: "var(--bg-base)" }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to bottom, transparent, #000 40%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 40%)",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="drift absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "min(900px, 100vw)",
          height: "320px",
          background: "radial-gradient(ellipse at 50% 100%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        {/* CTA card */}
        {showCta && (
          <div
            data-reveal
            className="spotlight relative mt-16 overflow-hidden rounded-3xl p-8 md:p-12"
            style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div aria-hidden className="hero-aurora pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
                  Got a project in mind?
                </p>
                <h2
                  className="mt-3 max-w-md text-3xl font-bold leading-tight md:text-4xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-1)" }}
                >
                  Let&apos;s build something <span className="text-gradient italic">great</span> together.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/home#contact" onClick={go("/home#contact")} className="btn btn-primary btn-shine px-6 py-3 text-sm">
                  Start a project
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
                <a href="mailto:franeadriane10@gmail.com" className="btn btn-secondary px-6 py-3 text-sm">
                  Email me
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Main row */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-1)" }}
              >
                adriane<span className="text-gradient">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              UI/UX Designer &amp; Full-Stack Developer based in Bulacan, Philippines. Building intentional digital
              experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="btn btn-icon !h-10 !w-10"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
              Pages
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={go(link.to)}
                    className="footer-link text-sm"
                    style={({ isActive }) => ({ color: isActive ? "var(--text-1)" : "var(--text-3)" })}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              {contactLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="footer-link group gap-1.5 text-sm"
                    style={{ color: "var(--text-3)" }}
                  >
                    {s.label}
                    {s.href.startsWith("http") && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row"
          style={{ borderTop: "1px solid var(--border-col)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-4)" }}>
            © 2024 – {year} <span style={{ color: "var(--text-3)" }}>Adriane Frane</span>. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => smoothScrollTo(0, 1200)}
            className="btn btn-secondary group px-4 py-2 text-xs"
          >
            Back to top
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
