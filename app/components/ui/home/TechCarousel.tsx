import { TECH_STACK } from "~/data/tech-stack";
import { TechPill } from "~/components/ui/home/TechPill";

const half = Math.ceil(TECH_STACK.length / 2);
const ROWS = [
  { items: TECH_STACK.slice(0, half), dir: "marquee-l" },
  { items: TECH_STACK.slice(half), dir: "marquee-r" },
];

export function TechCarousel() {
  return (
    <div data-reveal className="marquee-mask relative flex flex-col gap-3 overflow-hidden py-2">
      {ROWS.map((row, r) => (
        <div key={r} className="marquee-row overflow-hidden">
          {/* Two identical copies so the -50% translate loops seamlessly */}
          <div className={`${row.dir} flex w-max gap-3 py-1`}>
            {[...row.items, ...row.items].map((t, i) => (
              <div key={`${t.name}-${i}`} aria-hidden={i >= row.items.length || undefined}>
                <TechPill name={t.name} icon={t.icon} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
