export type Project = {
  title: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
  category: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "My Portfolio",
    description:
      "Personal developer portfolio site showcasing projects, skills, and background.",
    link: "https://adriane-dev.vercel.app",
    github: "https://github.com/Adenggggg/My-Portfolio",
    tags: ["TypeScript", "React"],
    category: "Portfolio",
  },
  {
    title: "Smiski",
    description:
      "A dating request app — lets users send, accept, or decline romantic interest requests in a clean, simple flow.",
    link: "https://smiski-psi.vercel.app/",
    github: "https://github.com/Adenggggg/Smiski",
    tags: ["TypeScript", "React", "Remix"],
    category: "Dating App",
  },
  {
    title: "Saving Tracker",
    description:
      "A group savings monitoring app for tracking shared savings goals with friends, family, or a team.",
    link: "https://saving-tracker-gules.vercel.app/",
    github: "https://github.com/Adenggggg/Saving-Tracker",
    tags: ["TypeScript", "React", "Remix"],
    category: "Web App",
  },
    {
    title: "UNKNOWN",
    description:
      "A cozy, mobile-first interactive world to explore: step into a tiny house, drag the moon over a midnight beach, play small games, and snap a photobooth strip, all with soft sound and quiet secrets to find",
    link: "https://unknown-universe.vercel.app/",
    github: "https://github.com/Adenggggg/Unknown",
    tags: ["TypeScript", "React", "Remix"],
    category: "Web App",
  },
];
