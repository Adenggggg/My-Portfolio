import { useEffect, useState } from "react";

export type GitHubStats = { repos: number; followers: number; following: number };

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${username}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("GitHub stats request failed"))))
      .then((d) => {
        if (cancelled) return;
        setStats({
          repos: typeof d?.public_repos === "number" ? d.public_repos : 0,
          followers: typeof d?.followers === "number" ? d.followers : 0,
          following: typeof d?.following === "number" ? d.following : 0,
        });
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}