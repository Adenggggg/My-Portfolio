import { NavLink } from "react-router";

const footerLinks = [
  { label: "Home",     to: "/home"     },
  { label: "Projects", to: "/projects" },
  { label: "Videos",   to: "/videos"   },
  { label: "Designs",  to: "/designs"  },
];

const socialLinks = [
  { label: "Email",     href: "mailto:franeadriane10@gmail.com"         },
  { label: "LinkedIn",  href: "https://linkedin.com/in/frane-adriane"   },
  { label: "GitHub",    href: "https://github.com/Adenggggg"            },
  { label: "Instagram", href: "https://instagram.com/_freyn.alvr"       },
];

export default function Footer() {
  const year = new Date().getFullYear();

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
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "200px",
          background: "radial-gradient(ellipse at 50% 100%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">

        {/* Main row */}
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                adriane<span style={{ color: "var(--text-3)" }}>.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
              UI/UX Designer &amp; Full-Stack Developer based in Bulacan, Philippines. Building intentional digital experiences.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
              Pages
            </p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-sm transition-colors duration-200"
                    style={({ isActive }) => ({
                      color: isActive ? "var(--text-1)" : "var(--text-3)",
                    })}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
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
                        style={{ color: "var(--text-4)" }}
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
          className="flex flex-col items-center justify-between gap-3 py-6 md:flex-row"
          style={{ borderTop: "1px solid var(--border-col)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-4)" }}>
            © 2024 – {year}{" "}
            <span style={{ color: "var(--text-3)" }}>Adriane Frane</span>.
            {" "}All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-4)" }}>
            Built with React Router v7
          </p>
        </div>

      </div>
    </footer>
  );
}