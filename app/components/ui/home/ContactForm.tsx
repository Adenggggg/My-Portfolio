import { useEffect, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

type Toast = { type: "success" | "error"; message: string } | null;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setToast({ type: "error", message: "Please fill out all fields." });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setToast({ type: "success", message: "Message sent! I'll get back to you soon." });
      } else {
        setStatus("error");
        setToast({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus("error");
      setToast({ type: "error", message: "Network error. Please try again." });
    }
  };

  const inputStyle = {
    border: "1px solid var(--border-col)",
    background: "var(--bg-card2)",
    color: "var(--text-1)",
  };

  return (
    <div className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
            Name <span style={{ color: "var(--text-4)" }}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
            Email <span style={{ color: "var(--text-4)" }}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
          Message <span style={{ color: "var(--text-4)" }}>*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project…"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-200 resize-none"
          style={inputStyle}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={submit}
          disabled={status === "sending"}
          className="rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
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
    </div>
  );
}