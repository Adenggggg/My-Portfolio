import { SectionHeading } from "~/components/ui/SectionHeading";

const TRAITS = ["Problem Solver", "Detail-Oriented", "Fast Learner", "Creative", "Open Source Enthusiast"];

export function AboutSection() {
  return (
    <section className="relative py-24">
      <div className="relative flex flex-col items-center text-center">
        <SectionHeading sub="01 — who I am">About me.</SectionHeading>
        <div data-reveal className="max-w-2xl space-y-5 text-base leading-[1.9]" style={{ color: "var(--text-2)" }}>
          <p>
            I&apos;m a full-stack developer and UI/UX designer from Bulacan, Philippines. I take pride in building
            products that are not just functional, but visually intentional and user-centered.
          </p>
          <p>
            I enjoy the entire product lifecycle — from wireframes in Figma to deploying scalable applications.
            I&apos;ve worked across design tools, front-end frameworks, and back-end systems.
          </p>
          <p>Currently open to freelance collaborations and interesting projects.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TRAITS.map((t, i) => (
            <span
              key={t}
              data-reveal
              className="btn-ghost cursor-default rounded-full px-4 py-1.5 text-xs tracking-wide"
              style={{ border: "1px solid var(--border-col)", background: "var(--bg-card2)", color: "var(--text-3)", ["--d" as string]: `${i * 80}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}