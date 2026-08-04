import { GITHUB_USERNAME } from "~/data/social-links";
import { useGitHubStats } from "~/hooks/useGitHubStats";
import { useAnimatedCount } from "~/hooks/useAnimatedCount";

function StatBlock({ label, value }: { label: string; value: number }) {
  const count = useAnimatedCount(value);
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl px-5 py-4"
      style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
    >
      <p className="text-2xl font-bold tabular-nums" style={{ fontFamily: "Georgia, serif", color: "var(--text-1)" }}>
        {count}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  const stats = useGitHubStats(GITHUB_USERNAME);
  const yearsActive = Math.max(0, new Date().getFullYear() - 2021);

  const ctaButtons = [
    { label: "Contact Me", href: "#contact", ext: false },
    { label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, ext: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/frane-adriane", ext: true },
  ];

  return (
    <section className="flex flex-col items-center pb-12 pt-16 text-center md:pt-20">
      {/* Avatar */}
      <div className="relative h-24 w-24 md:h-28 md:w-28">
        <div
          className="absolute inset-0 rounded-[26px] animate-[spin_8s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, rgba(120,140,255,0.5) 80%, transparent 100%)",
            padding: "1.5px",
          }}
        >
          <div className="h-full w-full rounded-[24px]" style={{ background: "var(--bg-base)" }} />
        </div>
        <div
          className="absolute inset-0.75 flex items-center justify-center overflow-hidden rounded-[22px] text-2xl font-bold"
          style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-3)" }}
        >
          AF
        </div>
        <div
          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2"
          style={{ borderColor: "var(--bg-base)", background: "var(--bg-card2)" }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Available badge */}
      <div
        className="mt-5 mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
          Available for work
        </span>
      </div>

      <h1
        className="mb-2.5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ fontFamily: "'Playfair Display', 'Didot', Georgia, serif", letterSpacing: "-0.03em", color: "var(--text-1)" }}
      >
        Adriane Frane
      </h1>

      <p className="mb-6 text-base font-light tracking-wide md:text-lg" style={{ color: "var(--text-2)" }}>
        UI/UX Designer
        <span className="mx-1" style={{ color: "var(--text-4)" }}>·</span>
        Full-Stack Developer
      </p>

      {/* Buttons — full set, desktop only, above stats */}
      <div className="hidden flex-wrap justify-center gap-3 md:flex">
        <a
          href="/projects"
          className="group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            View Projects
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </a>

        {ctaButtons.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target={b.ext ? "_blank" : undefined}
            rel={b.ext ? "noreferrer" : undefined}
            className="rounded-xl px-5 py-2.5 text-sm transition-all duration-200"
            style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
          >
            {b.label}
          </a>
        ))}
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <StatBlock label="Public Repos" value={stats.repos} />
          <StatBlock label="Followers" value={stats.followers} />
          <StatBlock label="Following" value={stats.following} />
          <StatBlock label="Years Active" value={yearsActive} />
        </div>
      )}

      {/* View Projects only, mobile only, placed below stats — plain text-link style */}
      <a
        href="/projects"
        className="mt-6 flex items-center gap-1.5 text-sm transition-colors md:hidden"
        style={{ color: "var(--text-3)" }}
      >
        View Projects
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    </section>
  );
}