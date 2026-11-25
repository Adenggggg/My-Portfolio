import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CONTACT_PREFILL_EVENT } from "~/components/ui/home/ContactForm";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const SECRET_WORD = "hire";
const CONFETTI_COLORS = ["#34d399", "#788cff", "#f472b6", "#fbbf24", "#60a5fa", "#a78bfa"];

/** Small canvas confetti burst — no dependencies. */
function fireConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const pieces = Array.from({ length: 180 }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 120,
    y: window.innerHeight + 10,
    vx: (Math.random() - 0.5) * 16,
    vy: -(Math.random() * 16 + 12),
    size: Math.random() * 7 + 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));

  const start = performance.now();
  const frame = (now: number) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of pieces) {
      p.vy += 0.38;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (now - start < 4000) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
}

export function EasterEggs() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;
  const [toast, setToast] = useState<{ emoji: string; title: string; body: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  // Hello, fellow dev 👋
  useEffect(() => {
    const w = window as unknown as { __adrianeGreeted?: boolean };
    if (w.__adrianeGreeted) return;
    w.__adrianeGreeted = true;
    console.log(
      "%c👋 Hey there, curious dev!",
      "font-size:16px;font-weight:700;color:#788cff;"
    );
    console.log(
      "%cSince you're poking around: this site has a few secrets.\n" +
        "  • ↑ ↑ ↓ ↓ ← → ← → B A\n" +
        "  • Type a certain four-letter word that means “let's work together”\n" +
        "  • My avatar doesn't like being poked. Try it anyway.\n\n" +
        "Like what you see? franeadriane10@gmail.com",
      "font-size:12px;line-height:1.6;color:#8b95a7;"
    );
  }, []);

  useEffect(() => {
    let konamiIndex = 0;
    let typed = "";

    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // Konami code
      konamiIndex = key === KONAMI[konamiIndex] ? konamiIndex + 1 : key === KONAMI[0] ? 1 : 0;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        fireConfetti();
        setToast({
          emoji: "🎮",
          title: "Cheat code accepted!",
          body: "+99 hire-ability unlocked. Respect for knowing the classics.",
        });
        return;
      }

      // Secret word
      if (key.length === 1) {
        typed = (typed + key).slice(-SECRET_WORD.length);
        if (typed === SECRET_WORD) {
          typed = "";
          setToast({ emoji: "🤝", title: "Say no more.", body: "Taking you to the contact form…" });
          const prefill = () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(
              new CustomEvent(CONTACT_PREFILL_EVENT, {
                detail: {
                  message:
                    "Hi Adriane! I typed “hire” on your website, so I guess it's official. 😄\n\nI'd love to work with you on: ",
                },
              })
            );
          };
          if (pathRef.current === "/home") prefill();
          else {
            navigate("/home");
            setTimeout(prefill, 500);
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
        toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {toast && (
        <div
          className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl animate-in zoom-in-95 duration-300"
          style={{ border: "1px solid var(--border-hov)", background: "var(--bg-card)", color: "var(--text-1)" }}
        >
          <span className="text-2xl">{toast.emoji}</span>
          <div>
            <p className="text-sm font-semibold">{toast.title}</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              {toast.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
