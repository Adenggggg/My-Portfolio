import { useLocation, useNavigate } from "react-router";

const NAV_OFFSET = 80; // fixed navbar height

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Animated window scroll with ease-in-out; resolves when finished. */
export function smoothScrollTo(top: number, maxDuration = 750): Promise<void> {
  return new Promise((resolve) => {
    const start = window.scrollY;
    const distance = top - start;
    if (Math.abs(distance) < 2 || prefersReducedMotion()) {
      window.scrollTo(0, top);
      resolve();
      return;
    }
    const duration = Math.min(maxDuration, 250 + Math.abs(distance) * 0.12);
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) return smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, 1100);
  return Promise.resolve();
}

/**
 * Returns an onClick factory for internal links: scrolls smoothly to the top (or to a
 * #hash section) before/after navigating, instead of jumping.
 *
 *   const go = useSmoothNav();
 *   <a href="/projects" onClick={go("/projects")}>
 */
export function useSmoothNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (to: string, after?: () => void) => (e: React.MouseEvent) => {
    // Let the browser handle new-tab / modified clicks
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    after?.();

    const [path, hash] = to.split("#");
    const target = path || pathname;

    if (target === pathname) {
      if (hash) scrollToId(hash);
      else smoothScrollTo(0);
      return;
    }

    smoothScrollTo(0, 600).then(() => {
      navigate(target);
      if (hash) setTimeout(() => scrollToId(hash), 350);
    });
  };
}
