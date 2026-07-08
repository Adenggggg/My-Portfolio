import { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
};

export function useRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("GitHub repos request failed"))))
      .then((data: unknown) => {
        if (cancelled) return;
        if (!Array.isArray(data)) {
          setRepos([]);
          setLoading(false);
          return;
        }
        const filtered = (data as Repo[]).filter(
          (r) => r && typeof r.name === "string" && !r.name.toLowerCase().includes(username.toLowerCase())
        );
        setRepos(filtered.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setRepos([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading };
}