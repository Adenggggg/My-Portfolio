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

  // Scroll reveal — re-scans on navigation and when async content (e.g. GitHub repos) mounts
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [location.pathname]);

  return <div aria-hidden className="cursor-glow" />;
}
