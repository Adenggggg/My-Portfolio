"use client";

import { useState } from "react";

type Project = {
  title: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
  category: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
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
    title: "Say-NO",
    description:
      "A dating request app — lets users send, accept, or decline romantic interest requests in a clean, simple flow.",
    link: "https://master-jo-six.vercel.app/",
    github: "https://github.com/Adenggggg/Say-NO",
    tags: ["TypeScript"],
    category: "Dating App",
  },
  {
    title: "Saving Tracker",
    description:
      "A group savings monitoring app for tracking shared savings goals with friends, family, or a team.",
    link: "https://saving-tracker-gules.vercel.app/",
    github: "https://github.com/Adenggggg/Saving-Tracker",
    tags: ["TypeScript"],
    category: "Web App",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  React: { bg: "#0e2233", text: "#61DAFB" },
  TypeScript: { bg: "#0e1a2e", text: "#5b9bd5" },
  JavaScript: { bg: "#2a2200", text: "#F7DF1E" },
  "Node.js": { bg: "#0e2010", text: "#6bbf6b" },
  PHP: { bg: "#1a1a2e", text: "#a0a8d0" },
  ".NET": { bg: "#1a1030", text: "#9b7fe8" },
  MySQL: { bg: "#0d1e30", text: "#5b9fd6" },
  PostgreSQL: { bg: "#0d1e30", text: "#5b9fd6" },
  Prisma: { bg: "#131830", text: "#8d9cf5" },
  CSS: { bg: "#1a1030", text: "#b07ce8" },
  HTML: { bg: "#2a1008", text: "#f0804e" },
  Figma: { bg: "#1a1a1a", text: "#a259ff" },
  Remix: { bg: "#1a1a1a", text: "#e8e8e8" },
};

function TagPill({ name }: { name: string }) {
  const colors = TAG_COLORS[name] ?? {
    bg: "#1a1f2e",
    text: "rgba(255,255,255,0.5)",
  };

  return (
    <span
      className="rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {name}
    </span>
  );
}

function LivePreview({ url, title }: { url: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative aspect-16/10 w-full overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {!failed && (
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
        >
          <iframe
            src={url}
            title={title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className="h-full w-full border-0"
          />
        </div>
      )}

      {failed && (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ color: "var(--text-4)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Preview unavailable — open live site
          </span>
        </div>
      )}

      {!loaded && !failed && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "var(--bg-card)" }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
        style={{
          background: "linear-gradient(to top, var(--bg-card), transparent)",
        }}
      />

      <div
        className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.45)" }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/80">
          Live
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => window.open(project.link, "_blank", "noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.open(project.link, "_blank", "noreferrer");
        }
      }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      style={{
        border: "1px solid var(--border-col)",
        background: "var(--bg-card)",
      }}
    >
      <LivePreview url={project.link} title={project.title} />

      <div className="relative flex flex-1 flex-col justify-between gap-4 p-5">
        <svg
          className="absolute right-0 top-0 h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "var(--text-4)" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>

        <div className="space-y-2.5 pr-6">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "var(--text-3)" }}
          >
            {project.category}
          </p>
          <h3
            className="text-base font-semibold leading-snug transition-colors"
            style={{ color: "var(--text-1)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {project.description}
          </p>
        </div>

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
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div
        aria-hidden
        className="fixed left-0 top-0 pointer-events-none z-0"
        style={{
          width: "600px",
          height: "500px",
          background:
            "radial-gradient(ellipse at 0% 0%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-36 md:px-8">
        <div className="mb-14">
          <p
            className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-3)" }}
          >
            Portfolio — Work &amp; Builds
          </p>
          <h1
            className="text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--text-1)" }}
          >
            Projects
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--border-hov)" }} />
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Web apps, UI designs, and client builds.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}