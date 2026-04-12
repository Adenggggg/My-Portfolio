import { useState } from "react";

// ✏️ Add your Figma project screenshots here
const figmaDesigns: { title: string; image: string; category?: string }[] = [
  // { title: "HRIS Dashboard", image: "/figma/hris.jpg", category: "UI Design" },
];

// ✏️ Add your graphic arts / illustrations here
const artDesigns: { title: string; image: string; category?: string }[] = [
  // { title: "Brand Poster", image: "/arts/poster.jpg", category: "Branding" },
];

type Tab = "figma" | "arts";

const FIGMA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
  </svg>
);

const PALETTE_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor"/>
    <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

export default function Designs() {
  const [activeTab, setActiveTab] = useState<Tab>("figma");
  const items = activeTab === "figma" ? figmaDesigns : artDesigns;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d12] text-white">
      {/* Grid bg */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(99,179,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,0.035) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-8">
        <h1 className="mb-1 text-3xl font-bold">Graphic Designs & Arts</h1>
        <p className="mb-10 text-sm text-white/40">A collection of my visual work.</p>

        {/* Toggle */}
        <div className="mb-12 flex justify-center">
          <div className="flex w-72 items-center rounded-xl border border-white/8 bg-white/5 p-1">
            {([
              { value: "figma" as Tab, label: "Figma", icon: FIGMA_ICON },
              { value: "arts"  as Tab, label: "Arts",  icon: PALETTE_ICON },
            ] as const).map((tab) => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.value ? "bg-white text-black shadow-sm" : "text-white/45 hover:text-white/70"
                }`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
              {activeTab === "figma" ? (
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
                  <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
                  <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
                  <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
                  <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
              )}
            </div>
            <p className="text-sm text-white/30">
              {activeTab === "figma" ? "Figma projects coming soon." : "Artworks coming soon."}
            </p>
            <p className="mt-1 text-xs text-white/15">
              Add items to the <code className="text-white/25">{activeTab === "figma" ? "figmaDesigns" : "artDesigns"}</code> array at the top of this file.
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-4 space-y-4 md:columns-3">
            {items.map((design) => (
              <div key={design.title} className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/5">
                <img src={design.image} alt={design.title} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end justify-between bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{design.title}</p>
                  {design.category && (
                    <span className="rounded-md bg-white/20 px-2 py-1 text-xs text-white/90 backdrop-blur-sm">
                      {design.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}