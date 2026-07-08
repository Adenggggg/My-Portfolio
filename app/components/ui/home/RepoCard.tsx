import { LANG_COLORS } from "~/data/lang-color";
import type { Repo } from "~/hooks/useRepo";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
    >
      {/* Title bar with traffic-light dots */}
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid var(--border-col)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} aria-hidden="true" />

        <div
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{ border: "1px solid var(--border-col)", background: "var(--bg-card3)" }}
        >
          <svg className="h-3 w-3" style={{ color: "var(--text-2)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* Header content */}
      <div className="px-5 pt-4">
        <h3 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
          {repo.name}
        </h3>
        {repo.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            {repo.description}
          </p>
        )}

        {(repo.language || repo.stargazers_count > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {repo.language && (
              <span
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
                style={{ background: "var(--bg-card2)", color: "var(--text-2)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#888" }}
                  aria-hidden="true"
                />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
                style={{ background: "var(--bg-card2)", color: "var(--text-2)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {repo.stargazers_count}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Code panel */}
      <div className="p-5 pt-4">
        <div
          className="rounded-xl p-4 font-mono text-xs leading-relaxed break-all"
          style={{ background: "var(--bg-card3)", border: "1px solid var(--border-col)", color: "var(--text-2)" }}
        >
          <span style={{ color: "var(--text-4)" }}>{"<"}</span>
          <span style={{ color: "var(--text-1)" }}>repo</span>
          <span style={{ color: "var(--text-4)" }}>{">"}</span>
          {" "}
          {repo.name}
          {" "}
          <span style={{ color: "var(--text-4)" }}>{"</"}</span>
          <span style={{ color: "var(--text-1)" }}>repo</span>
          <span style={{ color: "var(--text-4)" }}>{">"}</span>
        </div>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 inline-flex items-center gap-1 text-xs transition-colors"
            style={{ color: "var(--text-3)" }}
          >
            Live preview →
          </a>
        )}
      </div>
    </a>
  );
}