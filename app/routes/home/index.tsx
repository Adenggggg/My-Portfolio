import { PageShell } from "~/components/ui/PageShell";
import { Divider } from "~/components/ui/Divider";
import { Hero } from "~/components/ui/home/hero";
import { AboutSection } from "~/components/ui/home/aboutSection";
import { TechSection } from "~/components/ui/home/techSection";
import { ProjectsSection } from "~/components/ui/home/projectsSection";
import { ContactSection } from "~/components/ui/home/contactSection";

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