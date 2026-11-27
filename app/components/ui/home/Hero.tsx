import { GITHUB_USERNAME, SOCIAL_LINKS } from "~/data/social-links";
import { useGitHubStats } from "~/hooks/useGitHubStats";
import { useAnimatedCount } from "~/hooks/useAnimatedCount";
import { useSmoothNav } from "~/lib/smooth-nav";
import { useEffect, useState } from "react";

// What the avatar says when you keep poking it
const POKE_LINES: Record<number, string> = {
  3: "Hey, that tickles 😆",
  5: "I'm a picture, not a button.",
  7: "Okay okay, you got me. Hire me? 👉👈",
  10: "Fine. Secret: type “hire” anywhere 😉",
  15: "…you really have nothing to do, huh?",
};

// Cycled by the typewriter under the name
const ROLES = ["beautiful interfaces.", "full-stack web apps.", "cinematic videos.", "hand-drawn art."];

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

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

function Stat({ label, value }: { label: string; value: number | null }) {
  const count = useAnimatedCount(value ?? 0);
  return (
    <div className="flex flex-col items-center px-4 py-1">
      <p
        className="text-2xl font-bold tabular-nums md:text-3xl"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-1)" }}
      >
        {value === null ? "—" : count}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-3)" }}>
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  const stats = useGitHubStats(GITHUB_USERNAME);
  const { pokes, bubble, poke, roll } = usePokes();
  const role = useTypewriter(ROLES);
  const go = useSmoothNav();
  const yearsActive = Math.max(0, new Date().getFullYear() - 2021);
  const iconLinks = SOCIAL_LINKS.filter((s) => s.label === "GitHub" || s.label === "LinkedIn");

  return (
    <section className="relative flex min-h-[min(100svh,1000px)] flex-col items-center justify-center pb-28 pt-28 text-center">
      {/* Soft color aurora behind the content */}
      <div aria-hidden className="hero-aurora pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(1000px,100vw)] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative flex flex-col items-center">
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
            style={{ background: "radial-gradient(circle, var(--glow-a), transparent 70%)" }}
          />
          <div aria-hidden className="avatar-ring absolute inset-0 rounded-[26px]" />
          <div
            key={pokes}
            className={`absolute inset-0.75 flex items-center justify-center overflow-hidden rounded-[22px] text-2xl font-bold ${
              pokes === 0 ? "" : roll ? "egg-roll" : "egg-poke"
            }`}
            style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
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
          className="enter enter-2 mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md"
          style={{ border: "1px solid var(--border-col)", background: "color-mix(in srgb, var(--bg-card) 70%, transparent)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
            Available for work · Bulacan, PH
          </span>
        </div>

        <p className="enter enter-3 mt-8 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--text-3)" }}>
          Hi, I&apos;m
        </p>
        <h1
          className="enter enter-3 text-shimmer mt-2 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "'Playfair Display', 'Didot', Georgia, serif", letterSpacing: "-0.03em", color: "var(--text-1)" }}
        >
          Adriane Frane
        </h1>

        <p className="enter enter-4 mt-5 min-h-[1.6em] text-lg font-light md:text-2xl" style={{ color: "var(--text-2)" }}>
          I design &amp; build <span className="text-gradient font-medium">{role}</span>
          <span className="caret" aria-hidden />
        </p>

        <p className="enter enter-5 mt-4 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: "var(--text-3)" }}>
          UI/UX Designer &amp; Full-Stack Developer turning ideas into products that look as good as they work — from
          the first Figma frame to the final deploy.
        </p>

        {/* Buttons */}
        <div className="enter enter-6 mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="/projects" onClick={go("/projects")} className="btn btn-primary btn-shine px-6 py-3 text-sm">
            View Projects
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a href="/home#contact" onClick={go("/home#contact")} className="btn btn-secondary px-6 py-3 text-sm">
            Contact Me
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
          <span aria-hidden className="mx-1 hidden h-6 w-px sm:block" style={{ background: "var(--border-col)" }} />
          {iconLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="btn btn-icon"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div
          className="stat-divide enter enter-7 mt-12 grid grid-cols-2 gap-y-4 rounded-2xl px-2 py-4 backdrop-blur-md sm:grid-cols-4"
          style={{
            border: "1px solid var(--border-col)",
            background: "color-mix(in srgb, var(--bg-card) 65%, transparent)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <Stat label="Public Repos" value={stats?.repos ?? null} />
          <Stat label="Followers" value={stats?.followers ?? null} />
          <Stat label="Following" value={stats?.following ?? null} />
          <Stat label="Years Active" value={yearsActive} />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        onClick={go("/home#about")}
        aria-label="Scroll down"
        className="enter enter-8 hover-text-1 absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ color: "var(--text-3)" }}
      >
        <span className="relative h-9 w-5 rounded-full" style={{ border: "1.5px solid currentColor" }}>
          <span className="scroll-wheel absolute left-1/2 top-1.5 h-2 w-0.5 rounded-full" style={{ background: "currentColor" }} />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll</span>
      </a>
    </section>
  );
}
