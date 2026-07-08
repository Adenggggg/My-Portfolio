import { SectionHeading } from "~/components/ui/SectionHeading";
import { TechCarousel } from "~/components/ui/home/TechCarousel";

export function TechSection() {
  return (
    <section className="py-24">
      <SectionHeading sub="02 — tools of the trade">Technologies I use.</SectionHeading>
      <TechCarousel />
    </section>
  );
}