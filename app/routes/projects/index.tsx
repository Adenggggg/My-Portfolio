import { useEffect, useState } from "react";

const GITHUB_USERNAME = "adrianefrane"; // ✏️ your GitHub username

// ✏️ Pin specific repo names to control order/selection — leave empty to show all
const PINNED_REPOS: string[] = [];

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  PHP: "#8892BF",
  Python: "#3776AB",
  CSS: "#563D7C",
  HTML: "#E34F26",
  "C#": "#239120",
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
      .then((r) => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) { setLoading(false); return; }
        const filtered = PINNED_REPOS.length
          ? data.filter((r) => PINNED_REPOS.includes(r.name))
          : data.filter((r) => !r.name.toLowerCase().includes(GITHUB_USERNAME.toLowerCase()));
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#080d12" }}>
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-36 pb-24">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-white/40 text-sm mb-12">A collection of things I've built.</p>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-white/3 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <p className="text-white/30 text-sm">No projects to show yet.</p>
            <p className="text-white/15 text-xs mt-1">Push some repos to GitHub and they'll appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group p-6 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all flex flex-col gap-3"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">
                    {repo.name}
                  </h3>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {repo.description && (
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-sm text-white/30">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] ?? "#888" }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-sm text-white/30">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 text-sm text-white/30">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
                        <path d="M6 9v1a2 2 0 002 2h8a2 2 0 002-2V9M12 12v3"/>
                      </svg>
                      {repo.forks_count}
                    </span>
                  )}
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto text-sm text-white/30 hover:text-white/70 transition-colors"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}