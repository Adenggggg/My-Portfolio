import type { DesignTab } from "~/lib/design";
import { FigmaIcon, PaletteIcon } from "~/components/ui/design/icons";

const TABS: { value: DesignTab; label: string; icon: React.ReactNode }[] = [
  { value: "figma", label: "Figma", icon: <FigmaIcon /> },
  { value: "arts", label: "Arts", icon: <PaletteIcon /> },
];

export function DesignTabToggle({
  active,
  onChange,
}: {
  active: DesignTab;
  onChange: (tab: DesignTab) => void;
}) {
  return (
    <div className="mb-12 flex justify-center">
      <div
        className="relative flex w-72 items-center rounded-xl p-1"
        style={{ border: "1px solid var(--border-col)", background: "var(--bg-card)" }}
      >
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-in-out"
          style={{
            background: "var(--btn-bg)",
            left: active === "figma" ? "4px" : "calc(50%)",
          }}
        />

        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className="relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors duration-200"
            style={{ color: active === tab.value ? "var(--btn-text)" : "var(--text-3)" }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}