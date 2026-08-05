import { useState } from "react";
import type { Design } from "~/lib/design";

export function DesignCard({ design }: { design: Design }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setRevealed((r) => !r)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setRevealed((r) => !r);
      }}
      className="group relative break-inside-avoid overflow-hidden rounded-xl"
      style={{ border: "1px solid var(--border-col)" }}
    >
      <img
        src={design.image}
        alt={design.title}
        loading="lazy"
        className={`w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75 ${
          revealed ? "scale-105 brightness-75" : ""
        }`}
      />

      {/* Title + category — hidden until hover (desktop) or tap (touch) */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
          revealed ? "opacity-100" : ""
        }`}
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <p className="text-sm font-medium text-white">{design.title}</p>
        {design.category && (
          <span
            className="rounded-md px-2 py-1 text-xs text-white backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            {design.category}
          </span>
        )}
      </div>
    </div>
  );
}