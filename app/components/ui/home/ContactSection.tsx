import { useEffect, useState } from "react";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { ContactForm } from "~/components/ui/home/ContactForm";
import { SOCIAL_LINKS } from "~/data/social-links";

const EMAIL = "franeadriane10@gmail.com";

function useManilaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
          {label}
        </p>
        <div className="mt-0.5 text-sm" style={{ color: "var(--text-1)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <div className="flex items-center gap-2">
      <a href={`mailto:${EMAIL}`} className="hover-text-1 truncate" style={{ color: "var(--text-1)" }}>
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="btn-ghost relative flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-[11px]"
        style={{
          border: "1px solid var(--border-col)",
          background: "var(--bg-card2)",
          color: copied ? "#10b981" : "var(--text-3)",
        }}
      >
        {copied ? (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

export function ContactSection() {
  const time = useManilaTime();

  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading sub="04 — let's work together">Contact me.</SectionHeading>

      <div
        data-reveal
        className="spotlight relative overflow-hidden rounded-3xl"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)", boxShadow: "var(--shadow-card)" }}
      >
        {/* Corner glow */}
        <div
          aria-hidden
          className="drift pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--glow-a)" }}
        />

        <div className="relative grid md:grid-cols-[320px_1fr]">
          {/* Info panel */}
          <aside
            className="flex flex-col gap-8 border-b p-6 md:border-b-0 md:border-r md:p-8"
            style={{ borderColor: "var(--border-col)", background: "color-mix(in srgb, var(--bg-card2) 55%, transparent)" }}
          >
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{ border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-500">
                  Accepting projects
                </span>
              </div>
              <h3
                className="mt-5 text-2xl font-bold leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-1)" }}
              >
                Got an idea? Let&apos;s make it real.
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                Want to order a project, or just want to stay in touch? Drop a message and I&apos;ll get back to you as
                soon as possible.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <InfoRow
                label="Email"
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 6L2 7" />
                  </svg>
                }
              >
                <CopyEmail />
              </InfoRow>
              <InfoRow
                label="Based in"
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                }
              >
                Bulacan, Philippines
                {time && (
                  <span className="ml-1.5 text-xs" style={{ color: "var(--text-3)" }}>
                    · {time} local
                  </span>
                )}
              </InfoRow>
              <InfoRow
                label="Response time"
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                }
              >
                Usually within 24 hours
              </InfoRow>
            </div>

            <div className="mt-auto">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-4)" }}>
                Find me on
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="btn-ghost group relative flex h-10 w-10 items-center justify-center rounded-xl hover:-translate-y-1"
                    style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
                  >
                    <span className="transition-transform duration-200 group-hover:scale-110">{s.icon}</span>
                    <span
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md px-2 py-1 text-[10px] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
                    >
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="p-6 md:p-8 md:pl-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
