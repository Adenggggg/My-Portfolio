import type { DesignTab } from "~/lib/design";
import { FigmaIcon, PaletteIcon } from "~/components/ui/design/icons";

export function DesignsEmptyState({ tab }: { tab: DesignTab }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
      >
        {tab === "figma" ? (
          <FigmaIcon size={28} />
        ) : (
          <PaletteIcon size={28} className="text-[color:var(--text-3)]" />
        )}
      </div>
      <p className="text-sm" style={{ color: "var(--text-3)" }}>
        {tab === "figma" ? "Figma projects coming soon." : "Artworks coming soon."}
      </p>
    </div>
  );
}