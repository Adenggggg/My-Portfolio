import { TECH_STACK } from "~/data/tech-stack";
import { TechPill } from "~/components/ui/home/TechPill";

export function TechCarousel() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {TECH_STACK.map((t) => (
          <TechPill key={t.name} name={t.name} icon={t.icon} />
        ))}
      </div>
    </div>
  );
}