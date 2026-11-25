import { useEffect, useState } from "react";
import { fetchGitHubCached } from "~/lib/github-cache";
import { PROJECTS } from "~/data/projects";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
};

// Shown when GitHub is unreachable and nothing is cached, so the section is never empty
const FALLBACK_REPOS: Repo[] = PROJECTS.map((p, i) => ({
  id: -(i + 1),
  name: p.title,
  description: p.description,
  html_url: p.github,
  homepage: p.link,
  stargazers_count: 0,
  language: p.tags[0] ?? null,
}));

export function useRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchGitHubCached<unknown>(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((data) => {
        if (cancelled) return;
        const filtered = Array.isArray(data)
          ? (data as Repo[]).filter(
              (r) => r && typeof r.name === "string" && !r.name.toLowerCase().includes(username.toLowerCase())
            )
          : [];
        setRepos(filtered.length > 0 ? filtered.slice(0, 6) : FALLBACK_REPOS);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setRepos(FALLBACK_REPOS);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading };
}