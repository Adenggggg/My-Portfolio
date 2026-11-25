import { useEffect, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

type Toast = { type: "success" | "error"; message: string } | null;

const TOPICS = ["Web App", "UI/UX Design", "Video Edit", "Artwork", "Just saying hi"];
const MAX_MESSAGE = 1000;
const EMPTY = { name: "", email: "", message: "" };

/** Fired by the "hire" easter egg to drop a message into the form. */
export const CONTACT_PREFILL_EVENT = "contact-prefill";

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [topic, setTopic] = useState<string | null>(null);
  const [status, setStatus] = useState<FormState>("idle");
  const [toast, setToast] = useState<Toast>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string; topic?: string }>).detail;
      setStatus("idle");
      setForm((f) => ({ ...f, message: detail.message }));
      if (detail.topic) setTopic(detail.topic);
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const errors = {
    name: !form.name.trim(),
    email: !emailValid,
    message: !form.message.trim(),
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (errors.name || errors.email || errors.message) {
      setStatus("error");
      setToast({
        type: "error",
        message: errors.email && form.email.trim() ? "That email doesn't look quite right." : "Please fill out all fields.",
      });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: topic ? `[${topic}]\n\n${form.message}` : form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);
        setTopic(null);
        setTouched(false);
      } else {
        setStatus("error");
        setToast({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus("error");
      setToast({ type: "error", message: "Network error. Please try again." });
    }
  };

  const fieldStyle = (invalid: boolean) => ({
    border: `1px solid ${touched && invalid ? "rgba(248,113,113,0.6)" : "var(--border-col)"}`,
    background: "var(--bg-card2)",
    color: "var(--text-1)",
  });

  const labelClass = "mb-2 flex items-center justify-between text-xs uppercase tracking-widest";

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 13l4 4L19 7" className="draw-check" />
            </svg>
          </span>
        </div>
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-1)" }}
        >
          Message sent!
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Thanks for reaching out. I usually reply within a day — keep an eye on your inbox.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-8 rounded-xl px-5 py-2.5 text-sm"
          style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-2)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      {/* Topic chips */}
      <div>
        <p className={labelClass} style={{ color: "var(--text-3)" }}>
          What&apos;s it about?
        </p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(active ? null : t)}
                className={`rounded-full px-3.5 py-1.5 text-xs transition-all duration-200 ${active ? "scale-[1.03]" : "btn-ghost"}`}
                style={
                  active
                    ? { border: "1px solid var(--btn-bg)", background: "var(--btn-bg)", color: "var(--btn-text)" }
                    : { border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-3)" }
                }
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass} style={{ color: "var(--text-3)" }}>
            <span>
              Name <span style={{ color: "var(--text-4)" }}>*</span>
            </span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            aria-invalid={touched && errors.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="field w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none"
            style={fieldStyle(errors.name)}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass} style={{ color: "var(--text-3)" }}>
            <span>
              Email <span style={{ color: "var(--text-4)" }}>*</span>
            </span>
            {form.email && (
              <span className="normal-case tracking-normal" style={{ color: emailValid ? "#10b981" : "var(--text-4)" }}>
                {emailValid ? "✓ looks good" : "keep typing…"}
              </span>
            )}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            aria-invalid={touched && errors.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="field w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none"
            style={fieldStyle(errors.email)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass} style={{ color: "var(--text-3)" }}>
          <span>
            Message <span style={{ color: "var(--text-4)" }}>*</span>
          </span>
          <span
            className="font-mono normal-case tracking-normal tabular-nums"
            style={{ color: form.message.length > MAX_MESSAGE * 0.9 ? "#f59e0b" : "var(--text-4)" }}
          >
            {form.message.length}/{MAX_MESSAGE}
          </span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          maxLength={MAX_MESSAGE}
          placeholder="Tell me about your project — goals, timeline, budget, anything helps…"
          value={form.message}
          aria-invalid={touched && errors.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="field w-full resize-none rounded-xl px-4 py-3.5 text-sm leading-relaxed focus:outline-none"
          style={fieldStyle(errors.message)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine group flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-px disabled:opacity-60"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          {status === "sending" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Message
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </>
          )}
        </button>
        <p className="text-xs" style={{ color: "var(--text-4)" }}>
          Goes straight to my inbox — no spam, ever.
        </p>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast && (
          <div
            className="pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm shadow-lg"
            style={{
              border: "1px solid var(--border-col)",
              background: "var(--bg-card)",
              color: "var(--text-1)",
            }}
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{
                background: toast.type === "success" ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                color: toast.type === "success" ? "#34d399" : "#f87171",
              }}
            >
              {toast.type === "success" ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              )}
            </span>
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}
