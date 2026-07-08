import { PageShell } from "~/components/ui/PageShell";
import { Divider } from "~/components/ui/Divider";
import { Hero } from "~/components/ui/home/Hero";
import { AboutSection } from "~/components/ui/home/AboutSection";
import { TechSection } from "~/components/ui/home/TechSection";
import { ProjectsSection } from "~/components/ui/home/ProjectsSection";
import { ContactSection } from "~/components/ui/home/ContactSection";

export default function Home() {
  return (
    <PageShell showSecondGlow>
      <Hero />
      <Divider />
      <AboutSection />
      <Divider />
      <TechSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ContactSection />
    </PageShell>
  );
}