import { useState } from "react";
import type { DesignTab } from "~/lib/design";
import { figmaDesigns } from "~/data/figma-designs";
import { artDesigns } from "~/data/art-designs";
import { DesignTabToggle } from "~/components/ui/design/DesignTabToggle";
import { DesignsEmptyState } from "~/components/ui/design/DesignsEmptyState";
import { DesignCard } from "~/components/ui/design/DesignCard";

export default function Designs() {
  const [activeTab, setActiveTab] = useState<DesignTab>("figma");
  const items = activeTab === "figma" ? figmaDesigns : artDesigns;

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-base)", color: "var(--text-1)" }}
    >
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div
        aria-hidden
        className="fixed left-0 top-0 pointer-events-none z-0"
        style={{
          width: "600px",
          height: "500px",
          background: "radial-gradient(ellipse at 0% 0%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-3)" }}>
            Portfolio — UI &amp; Visual Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "var(--text-1)" }}>
            Designs
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--border-hov)" }} />
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Figma projects, graphic arts, and illustrations.
            </p>
          </div>
        </div>

        <DesignTabToggle active={activeTab} onChange={setActiveTab} />

        {items.length === 0 ? (
          <DesignsEmptyState tab={activeTab} />
        ) : (
          <div key={activeTab} className="columns-2 gap-4 space-y-4 md:columns-3">
            {items.map((design, i) => (
              <DesignCard key={`${design.title}-${i}`} design={design} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}