import { SectionHeading } from "~/components/ui/SectionHeading";
import { ContactForm } from "~/components/ui/home/contactForm";
import { SOCIAL_LINKS } from "~/data/social-links";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 pb-32">
      <SectionHeading sub="04 — let's work together">Contact me.</SectionHeading>
      <div className="grid gap-14 md:grid-cols-[1fr_220px]">
        <div>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            Want to order a project, or just want to stay in touch? Fill out the form below and I&apos;ll get back to
            you as soon as possible.
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
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}