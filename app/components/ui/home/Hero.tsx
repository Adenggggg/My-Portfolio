import { GITHUB_USERNAME } from "~/data/social-links";
import { useGitHubStats } from "~/hooks/useGitHubStats";
import { useAnimatedCount } from "~/hooks/useAnimatedCount";
import { useEffect, useState } from "react";

// What the avatar says when you keep poking it
const POKE_LINES: Record<number, string> = {
  3: "Hey, that tickles 😆",
  5: "I'm a picture, not a button.",
  7: "Okay okay, you got me. Hire me? 👉👈",
  10: "Fine. Secret: type “hire” anywhere 😉",
  15: "…you really have nothing to do, huh?",
};

function usePokes() {
  const [pokes, setPokes] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);

  useEffect(() => {
    if (POKE_LINES[pokes]) setBubble(POKE_LINES[pokes]);
  }, [pokes]);

  useEffect(() => {
    if (!bubble) return;
    const t = setTimeout(() => setBubble(null), 2600);
    return () => clearTimeout(t);
  }, [bubble]);

  const poke = () => setPokes((p) => p + 1);

  return { pokes, bubble, poke, roll: pokes === 7 || pokes === 15 };
}

function StatBlock({ label, value }: { label: string; value: number }) {
  const count = useAnimatedCount(value);
  return (
    <div
      className="spotlight lift flex flex-col items-center justify-center rounded-2xl px-5 py-4"
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
  const { pokes, bubble, poke, roll } = usePokes();
  const yearsActive = Math.max(0, new Date().getFullYear() - 2021);

  const ctaButtons = [
    { label: "Contact Me", href: "#contact", ext: false },
    { label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, ext: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/frane-adriane", ext: true },
  ];

  return (
    <section className="flex flex-col items-center pb-12 pt-28 text-center md:pt-32">
      {/* Avatar */}
      <div
        className="enter enter-1 relative z-10 h-24 w-24 cursor-pointer select-none md:h-28 md:w-28"
        onClick={poke}
        title="Don't poke me"
      >
        {/* Speech bubble */}
        <div
          aria-live="polite"
          className={`pointer-events-none absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium shadow-lg transition-all duration-300 ${
            bubble ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
          style={{ border: "1px solid var(--border-hov)", background: "var(--bg-card)", color: "var(--text-1)" }}
        >
          {bubble}
          <span
            className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1 rotate-45"
            style={{ borderLeft: "1px solid var(--border-hov)", borderTop: "1px solid var(--border-hov)", background: "var(--bg-card)" }}
          />
        </div>
        <div
          aria-hidden
          className="pulse-glow absolute -inset-6 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(120,140,255,0.25), transparent 70%)" }}
        />
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
          key={pokes}
          className={`absolute inset-0.75 flex items-center justify-center overflow-hidden rounded-[22px] text-2xl font-bold ${
            pokes === 0 ? "" : roll ? "egg-roll" : "egg-poke"
          }`}
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
        className="enter enter-2 mt-5 mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
          Available for work
        </span>
      </div>

      <h1
        className="enter enter-3 text-shimmer mb-2.5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ fontFamily: "'Playfair Display', 'Didot', Georgia, serif", letterSpacing: "-0.03em", color: "var(--text-1)" }}
      >
        Adriane Frane
      </h1>

      <p className="enter enter-4 mb-6 text-base font-light tracking-wide md:text-lg" style={{ color: "var(--text-2)" }}>
        UI/UX Designer
        <span className="mx-1" style={{ color: "var(--text-4)" }}>·</span>
        Full-Stack Developer
      </p>

      {/* Buttons — full set, desktop only, above stats */}
      <div className="enter enter-5 hidden flex-wrap justify-center gap-3 md:flex">
        <a
          href="/projects"
          className="btn-shine group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-px"
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
            className="btn-ghost rounded-xl px-5 py-2.5 text-sm transition-all duration-200"
            style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
          >
            {b.label}
          </a>
        ))}
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="enter enter-6 mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <StatBlock label="Public Repos" value={stats.repos} />
          <StatBlock label="Followers" value={stats.followers} />
          <StatBlock label="Following" value={stats.following} />
          <StatBlock label="Years Active" value={yearsActive} />
        </div>
      )}

      {/* View Projects only, mobile only, placed below stats — plain text-link style */}
      <a
        href="/projects"
        className="hover-text-1 enter enter-6 mt-6 flex items-center gap-1.5 text-sm transition-colors md:hidden"
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