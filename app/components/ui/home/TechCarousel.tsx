import { TECH_STACK } from "~/data/tech-stack";
import { TechPill } from "~/components/ui/home/TechPill";

export function TechCarousel() {
  return (
    <div className="relative">
      <div
        className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-3 md:grid-cols-4 md:overflow-visible lg:grid-cols-5"
        style={{ maxHeight: "340px" }}
      >
        {TECH_STACK.map((t) => (
          <TechPill key={t.name} name={t.name} icon={t.icon} />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:hidden"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-base))",
        }}
      />
    </div>
  );
}