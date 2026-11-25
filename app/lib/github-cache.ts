/**
 * GitHub's unauthenticated API allows only 60 requests/hour per IP, so responses are
 * cached in localStorage. Fresh cache is used as-is; when a request fails (e.g. rate
 * limited) the last good response is returned instead, however old.
 */
const TTL_MS = 60 * 60 * 1000;

type Entry<T> = { at: number; data: T };

function read<T>(key: string): Entry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Entry<T>) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {}
}

export async function fetchGitHubCached<T>(url: string): Promise<T> {
  const key = `gh-cache:${url}`;
  const cached = read<T>(key);
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub request failed: ${res.status}`);
    const data = (await res.json()) as T;
    write(key, data);
    return data;
  } catch (err) {
    if (cached) return cached.data;
    throw err;
  }
}
