import { useEffect, useState } from "react";
import { useTheme } from "~/lib/theme";

const GITHUB_USERNAME = "Adenggggg";

type GitHubStats = { repos: number; followers: number; following: number };
type Repo = {
  id: number; name: string; description: string | null;
  html_url: string; homepage: string | null;
  stargazers_count: number; language: string | null;
};
type FormState = "idle" | "sending" | "success" | "error";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", PHP: "#8892BF",
  Python: "#3776AB", CSS: "#563D7C", HTML: "#E34F26", "C#": "#239120",
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/_freyn.alvr",    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
  { label: "Facebook",  href: "https://facebook.com/adee.freyn",       icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: "TikTok",    href: "https://tiktok.com/@freynnn14",         icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
  { label: "LinkedIn",  href: "https://linkedin.com/in/frane-adriane", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "GitHub",    href: `https://github.com/${GITHUB_USERNAME}`, icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
];

const TECH_STACK = [
  { name: "React",        icon: <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="2.05" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
  { name: "TypeScript",   icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M13.5 14.5v1.9c.3.2.7.3 1.1.4.4.1.9.1 1.3.1.4 0 .9 0 1.3-.1.4-.1.8-.3 1.1-.5.3-.2.6-.5.7-.9.2-.4.3-.8.3-1.3 0-.4-.1-.7-.2-1-.1-.3-.3-.5-.5-.7-.2-.2-.5-.4-.8-.5-.3-.2-.6-.3-1-.4l-.8-.3c-.2-.1-.4-.2-.6-.3-.2-.1-.3-.2-.4-.3-.1-.1-.1-.3-.1-.4 0-.1 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.3-.1.4-.2.2 0 .4-.1.5-.1.4 0 .7.1 1 .2.3.1.6.3.8.5v-1.8c-.3-.1-.6-.2-.9-.3-.3 0-.7-.1-1.1-.1-.4 0-.8 0-1.2.1-.4.1-.7.3-1 .5-.3.2-.5.5-.7.8-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.5.3.4.8.7 1.5 1l.9.3c.3.1.5.2.7.3.2.1.3.2.4.4.1.1.1.3.1.5 0 .2 0 .3-.1.5-.1.1-.2.2-.3.3-.1.1-.3.1-.5.2H14c-.5 0-.9-.1-1.2-.3l-.3-.2zM9.3 10.3H12V8.8H5v1.5h2.7V18H9.3v-7.7z" fill="white"/></svg> },
  { name: "JavaScript",   icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M6.5 17.5c.3.5.7.9 1.5.9.7 0 1.2-.4 1.2-1.3V12h1.8v5.1c0 2-1.1 2.9-2.8 2.9-1.5 0-2.4-.8-2.8-1.7l1.1-.8zM12.8 17.4c.4.7 1 1.1 1.9 1.1.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.4-1.3l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.9 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.5-.6-.7-1.2-.7-.6 0-.9.4-.9.8 0 .6.4.8 1.2 1.2l.5.2c1.6.7 2.5 1.4 2.5 3 0 1.7-1.3 2.6-3.1 2.6-1.7 0-2.8-.8-3.4-1.9l1.4-.8z" fill="#000"/></svg> },
  { name: "Node.js",      icon: <svg viewBox="0 0 24 24" width="26" height="26" fill="#539E43"><path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.79-.78 1.35v8.6c0 .56.3 1.07.78 1.35l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.79.78-1.35v-8.6c0-.56-.3-1.07-.78-1.35L12.78 2.05c-.23-.13-.5-.2-.78-.2z"/></svg> },
  { name: "PHP",          icon: <svg viewBox="0 0 24 24" width="26" height="26"><ellipse cx="12" cy="12" rx="11" ry="7" fill="#8892BF"/><path d="M7.5 9.5H9c.8 0 1.3.3 1.3 1s-.5 1.1-1.3 1.1H8.2l-.3 1.5H6.7l.8-3.6zm1 1.6c.4 0 .6-.1.6-.4 0-.2-.2-.3-.5-.3H8.3l-.2.7h.4zM11 9.5h1.3l-.2.9h.9c.9 0 1.3.4 1.1 1.2l-.3 1.5h-1.2l.3-1.3c.1-.3 0-.4-.3-.4h-.8l-.4 1.7H10L11 9.5zm4.5 0h1.2l-.8 3.6h-1.2l.2-.9h-.9c-.9 0-1.3-.4-1.1-1.2l.3-1.5h1.2l-.3 1.3c-.1.3 0 .4.3.4h.7l.4-1.7z" fill="white"/></svg> },
  { name: ".NET",         icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="3" fill="#512BD4"/><path d="M4.5 15V9.5L7 13.5l2.5-4V15H11V8h-1.5L7 12 4.5 8H3v7h1.5zm8 0V8h4.5c1.4 0 2 .8 2 1.8 0 .8-.4 1.4-1.1 1.6.9.2 1.4.9 1.4 1.8 0 1.2-.8 1.8-2.2 1.8H12.5zm1.5-4.2h2.5c.5 0 .8-.3.8-.8s-.3-.8-.8-.8H14v1.6zm0 3h2.7c.6 0 .9-.3.9-.9s-.3-.9-.9-.9H14v1.8z" fill="white"/></svg> },
  { name: "MySQL",        icon: <svg viewBox="0 0 24 24" width="26" height="26" fill="#4479A1"><path d="M12 3C7 3 3 5.2 3 8v8c0 2.8 4 5 9 5s9-2.2 9-5V8c0-2.8-4-5-9-5zm7 11c0 1.7-3.1 3-7 3s-7-1.3-7-3v-2.3c1.5 1.1 4 1.8 7 1.8s5.5-.7 7-1.8V14zm0-5c0 1.7-3.1 3-7 3s-7-1.3-7-3V6.7C6.5 7.8 9 8.5 12 8.5s5.5-.7 7-1.8V9z"/></svg> },
  { name: "PostgreSQL",   icon: <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" fill="#336791"/><path d="M8 8h3c1.1 0 2 .9 2 2s-.9 2-2 2H9v3H8V8zm1 1v2h2c.6 0 1-.4 1-1s-.4-1-1-1H9zm5-1h1v7h-1V8z" fill="white"/></svg> },
  { name: "Prisma",       icon: <svg viewBox="0 0 24 24" width="26" height="26" fill="#5A67D8"><path d="M21.8 18.4L13 2.1c-.4-.8-1.6-.8-2 0L2.2 18.4c-.3.7.1 1.5.9 1.6l9 1.8c.2 0 .5 0 .7-.1l8.1-1.7c.8-.2 1.2-1 .9-1.6zM12 4.2l7.2 13.4-6.5 1.3V4.2zm-1 14.7l-6.5-1.3L11 5.2v13.7z"/></svg> },
  { name: "Git",          icon: <svg viewBox="0 0 24 24" width="26" height="26" fill="#F05032"><path d="M23.15 10.85L13.15.85a2 2 0 00-2.83 0l-2 2 2.54 2.54a2.38 2.38 0 013 3.03l2.44 2.44a2.38 2.38 0 11-1.42 1.42l-2.28-2.28v5.98a2.38 2.38 0 11-1.95-.07V9.72a2.38 2.38 0 01-1.29-3.12L7 4.03.85 10.15a2 2 0 000 2.83l10 10a2 2 0 002.83 0l9.47-9.47a2 2 0 000-2.66z"/></svg> },
  { name: "npm",          icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="3" fill="#CB3837"/><path d="M4 7h16v10H12v-8H8v8H4V7z" fill="white"/></svg> },
  { name: "pnpm",         icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="3" fill="#F69220"/><rect x="3" y="3" width="5" height="5" rx="1" fill="white"/><rect x="9.5" y="3" width="5" height="5" rx="1" fill="white"/><rect x="16" y="3" width="5" height="5" rx="1" fill="white"/><rect x="3" y="9.5" width="5" height="5" rx="1" fill="white"/><rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="white"/><rect x="3" y="16" width="5" height="5" rx="1" fill="white"/><rect x="9.5" y="16" width="5" height="5" rx="1" fill="white"/></svg> },
  { name: "Vercel",       icon: <svg viewBox="0 0 24 24" width="26" height="26"><path d="M12 2L2 19.5h20L12 2z" fill="currentColor"/></svg> },
  { name: "ESLint",       icon: <svg viewBox="0 0 24 24" width="26" height="26"><path d="M7.76 2.9L2.3 12l5.46 9.1h10.48L23.7 12 18.24 2.9H7.76z" fill="#4B32C3"/><path d="M16.39 15.5H7.61L6.22 13l4.95-2.86L16.12 13l-1.39 2.5h1.66z" fill="none" stroke="white" strokeWidth="1.2"/></svg> },
  { name: "Figma",        icon: <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/></svg> },
  { name: "Photoshop",    icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="4" fill="#001E36"/><path d="M6 17V7h3.1c2.4 0 3.9 1.3 3.9 3.3 0 2.2-1.7 3.4-4.1 3.4H7.7V17H6zm1.7-4.8h1.2c1.5 0 2.4-.7 2.4-2 0-1.2-.8-1.9-2.3-1.9H7.7v3.9zM14.5 14.5c.1.8.8 1.2 1.7 1.2.8 0 1.3-.4 1.3-1 0-.5-.3-.8-1.2-1l-.9-.3c-1.3-.4-2-.9-2-2.1 0-1.3 1-2.1 2.6-2.1 1.7 0 2.6.9 2.7 2.1h-1.5c-.1-.6-.6-1-1.2-1-.7 0-1.1.4-1.1.9 0 .5.3.7 1.2 1l.9.3c1.4.4 2 1 2 2.2 0 1.4-1.1 2.2-2.8 2.2-1.8 0-2.8-.9-2.9-2.4h1.2z" fill="#31A8FF"/></svg> },
  { name: "Illustrator",  icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="4" fill="#300"/><path d="M9.6 14.3H6.4L5.7 17H4l3-10h2l3 10h-1.7l-.7-2.7zm-2.9-1.3h2.5L8 9l-1.3 4zM15 7h1.7v10H15V7z" fill="#FF9A00"/></svg> },
  { name: "Premiere Pro", icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="4" fill="#00005B"/><path d="M5 17V7h3.3c2.5 0 4 1.3 4 3.4 0 2.2-1.6 3.5-4.2 3.5H6.7V17H5zm1.7-4.6h1.4c1.5 0 2.5-.7 2.5-2 0-1.2-.9-2-2.4-2H6.7v4zM14 7h3.2c2.5 0 4 1.3 4 3.4 0 2.2-1.6 3.5-4.2 3.5H15.7V17H14V7zm1.7 5.4h1.4c1.5 0 2.5-.7 2.5-2 0-1.2-.9-2-2.4-2h-1.5v4z" fill="#9999FF"/></svg> },
  { name: "CapCut",       icon: <svg viewBox="0 0 24 24" width="26" height="26"><rect width="24" height="24" rx="4" fill="#000"/><path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c1.8 0 3.46-.6 4.8-1.6l-2-2A5.02 5.02 0 0 1 12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5c.94 0 1.82.26 2.57.72l2.06-2.06A7.93 7.93 0 0 0 12 4z" fill="white"/></svg> },
];

// ─── Hooks ────────────────────────────────────────────────────
function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((d) => setStats({ repos: d.public_repos ?? 0, followers: d.followers ?? 0, following: d.following ?? 0 }))
      .catch(() => {});
  }, [username]);
  return stats;
}

function useRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) { setLoading(false); return; }
        setRepos(data.filter((r) => !r.name.toLowerCase().includes(username.toLowerCase())).slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);
  return { repos, loading };
}

// ─── Animated counter ─────────────────────────────────────────
function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}</>;
}

// ─── Section heading ──────────────────────────────────────────
function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-14">
      {sub && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-3)" }}>
          {sub}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl font-bold leading-tight"
        style={{ fontFamily: "'Playfair Display', 'Didot', 'Georgia', serif", letterSpacing: "-0.02em", color: "var(--text-1)" }}
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

// ─── Tech pill ────────────────────────────────────────────────
function TechPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div
      className="group flex shrink-0 select-none items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300"
      style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
    >
      <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="whitespace-nowrap text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-2)" }}>
        {name}
      </span>
    </div>
  );
}

// ─── Tech carousel ────────────────────────────────────────────
function TechCarousel() {
  const row1 = [...TECH_STACK, ...TECH_STACK];
  const row2 = [...TECH_STACK.slice(7), ...TECH_STACK.slice(0, 7), ...TECH_STACK.slice(7), ...TECH_STACK.slice(0, 7)];
  return (
    <div className="relative overflow-hidden space-y-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40"
        style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40"
        style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }}
      />
      <div className="flex gap-3" style={{ animation: "marquee-l 65s linear infinite", width: "max-content" }}>
        {row1.map((t, i) => <TechPill key={`a-${i}`} {...t} />)}
      </div>
      <div className="flex gap-3" style={{ animation: "marquee-r 75s linear infinite", width: "max-content" }}>
        {row2.map((t, i) => <TechPill key={`b-${i}`} {...t} />)}
      </div>
      <style>{`
        @keyframes marquee-l { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-r { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    border: "1px solid var(--border-col)",
    background: "var(--bg-card2)",
    color: "var(--text-1)",
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
            Name <span style={{ color: "var(--text-4)" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
            Email <span style={{ color: "var(--text-4)" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200"
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
          Message <span style={{ color: "var(--text-4)" }}>*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Tell me about your project…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200 resize-none"
          style={inputStyle}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={submit}
          disabled={status === "sending"}
          className="rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sent! I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center my-0">
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, transparent, var(--border-col), transparent)" }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Home() {
  const { theme } = useTheme();
  const stats = useGitHubStats(GITHUB_USERNAME);
  const { repos, loading } = useRepos(GITHUB_USERNAME);

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
          backgroundImage: "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      {/* Glow A */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-0"
        style={{ top: "-10%", left: "-10%", width: "70vw", height: "70vh", background: "radial-gradient(ellipse, var(--glow-a) 0%, transparent 60%)" }}
      />
      {/* Glow B */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-0"
        style={{ bottom: "-5%", right: "-10%", width: "50vw", height: "50vh", background: "radial-gradient(ellipse, var(--glow-b) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">

        {/* ── Hero ── */}
        <section className="pb-24 pt-44">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">

            {/* Avatar */}
            <div className="shrink-0 relative">
              <div className="relative h-28 w-28">
                <div
                  className="absolute inset-0 rounded-[28px] animate-[spin_8s_linear_infinite]"
                  style={{ background: "conic-gradient(from 0deg, transparent 60%, rgba(120,140,255,0.5) 80%, transparent 100%)", padding: "1.5px" }}
                >
                  <div className="h-full w-full rounded-[26px]" style={{ background: "var(--bg-base)" }} />
                </div>
                <div
                  className="absolute inset-0.75 flex items-center justify-center overflow-hidden rounded-[24px] text-2xl font-bold"
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
            </div>

            <div className="flex-1">
              {/* Available badge */}
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
                  Available for work
                </span>
              </div>

              <h1
                className="mb-3 text-5xl font-bold tracking-tight md:text-6xl"
                style={{ fontFamily: "'Playfair Display', 'Didot', Georgia, serif", letterSpacing: "-0.03em", color: "var(--text-1)" }}
              >
                Adriane Frane
              </h1>

              <p className="mb-2 text-lg font-light tracking-wide" style={{ color: "var(--text-2)" }}>
                UI/UX Designer
                <span className="mx-1" style={{ color: "var(--text-4)" }}>·</span>
                Full-Stack Developer
              </p>

              <p className="mb-8 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                I design and build digital experiences — from interactive web apps to visual identities. Based in Bulacan, Philippines.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/projects"
                  className="group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
                  style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </span>
                </a>

                {[
                  { label: "Contact Me", href: "#contact", ext: false },
                  { label: "GitHub",     href: `https://github.com/${GITHUB_USERNAME}`, ext: true },
                  { label: "LinkedIn",   href: "https://linkedin.com/in/frane-adriane", ext: true },
                ].map((b) => (
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
            </div>
          </div>

          {/* Stats bar */}
          {stats && (
            <div
              className="mt-16 flex flex-wrap rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
            >
              {[
                { label: "Public Repos", value: stats.repos },
                { label: "Followers",    value: stats.followers },
                { label: "Following",    value: stats.following },
                { label: "Years Active", value: new Date().getFullYear() - 2021 },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  className="flex-1 min-w-30 px-8 py-6 text-center"
                  style={{ borderRight: i < arr.length - 1 ? "1px solid var(--border-col)" : "none" }}
                >
                  <p className="text-3xl font-bold tabular-nums" style={{ fontFamily: "Georgia, serif", color: "var(--text-1)" }}>
                    <AnimatedCount target={s.value} />
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <Divider />

        {/* ── About ── */}
        <section className="relative py-24">
          <div className="relative flex flex-col items-center text-center">
            <SectionHeading sub="01 — who I am">About me.</SectionHeading>
            <div className="max-w-2xl space-y-5 text-base leading-[1.9]" style={{ color: "var(--text-2)" }}>
              <p>I'm a full-stack developer and UI/UX designer from Bulacan, Philippines. I take pride in building products that are not just functional, but visually intentional and user-centered.</p>
              <p>I enjoy the entire product lifecycle — from wireframes in Figma to deploying scalable applications. I've worked across design tools, front-end frameworks, and back-end systems.</p>
              <p>Currently open to freelance collaborations and interesting projects.</p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {["Problem Solver", "Detail-Oriented", "Fast Learner", "Creative", "Open Source Enthusiast"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-4 py-1.5 text-xs tracking-wide"
                  style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-3)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Tech ── */}
        <section className="py-24">
          <SectionHeading sub="02 — tools of the trade">Technologies I use.</SectionHeading>
          <TechCarousel />
        </section>

        <Divider />

        {/* ── Projects ── */}
        <section className="py-24">
          <SectionHeading sub="03 — my work">Most Popular Projects.</SectionHeading>
          <div className="mb-6 flex justify-center">
            <a
              href="/projects"
              className="text-sm flex items-center gap-1.5 transition-colors"
              style={{ color: "var(--text-3)" }}
            >
              Browse all repositories
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl"
                  style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
                />
              ))}
            </div>
          ) : repos.length === 0 ? (
            <p className="text-center text-sm" style={{ color: "var(--text-3)" }}>
              No projects yet. Add some repos on GitHub!
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
                  style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
                >
                  <div
                    className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100"
                    style={{ border: "1px solid var(--border-col)", background: "var(--bg-card3)" }}
                  >
                    <svg className="h-3.5 w-3.5" style={{ color: "var(--text-2)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <h3 className="pr-8 text-base font-semibold" style={{ color: "var(--text-2)" }}>
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {repo.description}
                    </p>
                  )}
                  <div
                    className="mt-auto flex items-center gap-4 pt-2"
                    style={{ borderTop: "1px solid var(--border-col)" }}
                  >
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#888" }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-3)" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ml-auto text-xs transition-colors"
                        style={{ color: "var(--text-3)" }}
                      >
                        Live →
                      </a>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <Divider />

        {/* ── Contact ── */}
        <section id="contact" className="py-24 pb-32">
          <SectionHeading sub="04 — let's work together">Contact me.</SectionHeading>
          <div className="grid gap-14 md:grid-cols-[1fr_220px]">
            <div>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                Want to order a project, or just want to stay in touch? Fill out the form below and I'll get back to you as soon as possible.
              </p>
              <ContactForm />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest" style={{ color: "var(--text-4)" }}>
                Find me on
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200"
                    style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
                  >
                    <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{s.icon}</span>
                    {s.label}
                    <svg className="ml-auto h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}