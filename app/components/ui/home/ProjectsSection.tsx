import { SectionHeading } from "~/components/ui/SectionHeading";
import { RepoCard } from "~/components/ui/home/RepoCard";
import { useRepos } from "~/hooks/useRepos";
import { GITHUB_USERNAME } from "~/data/social-links";

export function ProjectsSection() {
  const { repos, loading } = useRepos(GITHUB_USERNAME);

  return (
    <section className="py-24">
      <SectionHeading sub="03 — my work">Most Popular Projects.</SectionHeading>

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
        <div className="relative">
          <div className="grid gap-4 md:grid-cols-2">
            {repos.slice(0, 4).map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {repos.length > 4 && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--bg-base))",
              }}
            />
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <a
          href="/projects"
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--text-3)" }}
        >
          Browse all repositories
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </section>
  );
}