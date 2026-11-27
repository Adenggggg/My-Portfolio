import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Site-wide interaction layer:
 *  - cursor glow over the grid background
 *  - mouse-tracking spotlight on `.spotlight` cards
 *  - scroll-reveal for `[data-reveal]` elements
 *  - scroll progress (exposed as the --scroll CSS variable)
 */
export function Effects() {
  const location = useLocation();

  // Cursor glow + card spotlight
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cx", `${e.clientX}px`);
        root.style.setProperty("--cy", `${e.clientY}px`);
        const card = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", String(max > 0 ? window.scrollY / max : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll reveal — a plain position check (IntersectionObserver missed elements that moved
  // into view through layout shifts, e.g. cards growing once their previews load).
  // Re-checks on scroll, resize, DOM changes (async GitHub repos) and late layout settling.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) el.classList.add("is-visible");
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    schedule();
    const settle = [setTimeout(schedule, 300), setTimeout(schedule, 1200)];
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      settle.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      mo.disconnect();
    };
  }, [location.pathname]);

  return <div aria-hidden className="cursor-glow" />;
}
