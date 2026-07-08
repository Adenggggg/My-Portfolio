import { TECH_STACK } from "~/data/tech-stack";
import { TechPill } from "~/components/ui/home/techPill";

export function TechCarousel() {
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
        {row1.map((t, i) => (
          <TechPill key={`a-${i}`} name={t.name} icon={t.icon} />
        ))}
      </div>
      <div className="flex gap-3" style={{ animation: "marquee-r 75s linear infinite", width: "max-content" }}>
        {row2.map((t, i) => (
          <TechPill key={`b-${i}`} name={t.name} icon={t.icon} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-l { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-r { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}