import { useTheme } from "~/lib/theme";

type Project = {
  title: string;
  description: string;
  link: string;
  github?: string;
  tags: string[];
  category: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "HRIS System",
    description: "A full Human Resource Information System with employee management, payroll, attendance tracking, and role-based access control.",
    link: "#",
    tags: ["React", "Node.js", "MySQL", "PHP", ".NET"],
    category: "Web App",
    featured: true,
  },
  {
    title: "Hotel Resort Booking",
    description: "UI/UX design and front-end development for a hotel resort website with an integrated booking system and reservation flow.",
    link: "#",
    tags: ["Figma", "React", "TypeScript"],
    category: "UI/UX · Web",
  },
  {
    title: "Calqlation",
    description: "Interactive online quiz web app for college students with intuitive UX flow and real-time scoring.",
    link: "#",
    tags: ["React", "JavaScript", "CSS"],
    category: "Web App",
  },
  {
    title: "Caffetize",
    description: "Full front-end UI for a coffee shop website covering layout, typography, and brand visuals.",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
  },
  {
    title: "C&C Wear",
    description: "Front-end website for a streetwear shoe brand, emphasizing visual identity and product showcase.",
    link: "#",
    tags: ["React", "CSS"],
    category: "E-commerce",
  },
  {
    title: "Pinotax",
    description: "Accounting platform with a clean, functional interface built for small-business tax and bookkeeping workflows.",
    link: "#",
    tags: ["PHP", "MySQL", "JavaScript"],
    category: "Web App",
  },
  {
    title: "Matsu Solutions",
    description: "Outsourcing company website designed and developed from concept to deployment.",
    link: "#",
    tags: [".NET", "CSS", "JavaScript"],
    category: "Corporate Site",
  },
  {
    title: "Kiefer Prints",
    description: "Printing services website handling UI design and front-end implementation for a local print shop.",
    link: "#",
    tags: ["PHP", "MySQL", "CSS"],
    category: "Business Site",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "React":       { bg: "#0e2233", text: "#61DAFB" },
  "TypeScript":  { bg: "#0e1a2e", text: "#5b9bd5" },
  "JavaScript":  { bg: "#2a2200", text: "#F7DF1E" },
  "Node.js":     { bg: "#0e2010", text: "#6bbf6b" },
  "PHP":         { bg: "#1a1a2e", text: "#a0a8d0" },
  ".NET":        { bg: "#1a1030", text: "#9b7fe8" },
  "MySQL":       { bg: "#0d1e30", text: "#5b9fd6" },
  "PostgreSQL":  { bg: "#0d1e30", text: "#5b9fd6" },
  "Prisma":      { bg: "#131830", text: "#8d9cf5" },
  "CSS":         { bg: "#1a1030", text: "#b07ce8" },
  "HTML":        { bg: "#2a1008", text: "#f0804e" },
  "Figma":       { bg: "#1a1a1a", text: "#a259ff" },
  "Remix":       { bg: "#1a1a1a", text: "#e8e8e8" },
};

function TagPill({ name }: { name: string }) {
  const colors = TAG_COLORS[name] ?? { bg: "#1a1f2e", text: "rgba(255,255,255,0.5)" };
  return (
    <span
      className="rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {name}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl p-6 transition-all duration-300 ${project.featured ? "md:col-span-2" : ""}`}
      style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
    >
      {/* Arrow */}
      <svg
        className="absolute right-5 top-5 h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: "var(--text-4)" }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>

      {/* Content */}
      <div className="space-y-3 pr-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-3)" }}>
          {project.category}
        </p>
        <h3 className="text-lg font-semibold leading-snug transition-colors" style={{ color: "var(--text-1)" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <TagPill key={tag} name={tag} />
        ))}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "var(--text-3)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Source
          </a>
        )}
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="fixed left-0 top-0 pointer-events-none z-0"
        style={{ width: "600px", height: "500px", background: "radial-gradient(ellipse at 0% 0%, var(--glow-a), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-3)" }}>
            Portfolio — Work &amp; Builds
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "var(--text-1)" }}>
            Projects
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--border-hov)" }} />
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Web apps, UI designs, and client builds.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
}