import { SectionHeading } from "~/components/ui/SectionHeading";
import { RepoCard } from "~/components/ui/home/repoCard";
import { useRepos } from "~/hooks/useRepo";
import { GITHUB_USERNAME } from "~/data/social-links";

export function ProjectsSection() {
  const { repos, loading } = useRepos(GITHUB_USERNAME);

  return (
    <section className="py-24">
      <SectionHeading sub="03 — my work">Most Popular Projects.</SectionHeading>

      <div className="mb-6 flex justify-center">
        <a href="/projects" className="text-sm flex items-center gap-1.5 transition-colors" style={{ color: "var(--text-3)" }}>
          Browse all repositories
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl"
              style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
            />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <p className="text-center text-sm" style={{ color: "var(--text-3)" }}>
          No projects yet. Add some repos on GitHub!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}