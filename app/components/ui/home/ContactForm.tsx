import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sent! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && <p className="text-sm text-red-500">Please fill out all fields, then try again.</p>}
      </div>
    </div>
  );
}