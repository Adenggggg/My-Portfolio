import { useState } from "react";

// ✏️ Add your Figma project screenshots here
const figmaDesigns: { title: string; image: string; category?: string }[] = [
  // { title: "HRIS Dashboard", image: "/figma/hris.jpg", category: "UI Design" },
];

const artDesigns: { title: string; image: string; category?: string }[] = [
  { title: "David", image: "/arts/David.jpg", category: "Portrait" },
  { title: "The Black Beauty", image: "/arts/Illu1.jpg", category: "Portrait" },
  { title: "Nun", image: "/arts/Illu2.jpg", category: "Portrait" },
  { title: "David", image: "/arts/Illu3.jpg", category: "Portrait" },
  { title: "Greek", image: "/arts/Illu4.jpg", category: "Portrait" },
  { title: "Nude", image: "/arts/Illu5.jpg", category: "Portrait" },
  { title: "Nude", image: "/arts/Illu6.jpg", category: "Portrait" },
  { title: "Pennywise", image: "/arts/Illu7.jpg", category: "Portrait" },
  { title: "Poseidon", image: "/arts/Illu8.jpg", category: "Portrait" },
  { title: "Sagrada Família", image: "/arts/Illu9.jpg", category: "Infrastructure" },
  { title: "Strawberry", image: "/arts/Illu10.jpg", category: "Realism" },
  { title: "Doodle", image: "/arts/Digi1.png", category: "Digital Art" },
  { title: "Doodle", image: "/arts/Digi2.png", category: "Digital Art" },
  { title: "New York Style", image: "/arts/Digi3.png", category: "Digital Art" },
  { title: "Lisa Manoban", image: "/arts/Digi4.jpg", category: "Digital Art" },
  { title: "Covid", image: "/arts/Infograph1.png", category: "Inforgraphics" },
  { title: "Covid", image: "/arts/Infograph2.png", category: "Inforgraphics" },
  { title: "Covid", image: "/arts/Infograph3.png", category: "Inforgraphics" },
  { title: "Ningning", image: "/arts/Poster.jpg", category: "Poster" },
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
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(99,179,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,0.035) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      {/* Glow — same as videos page */}
      <div aria-hidden className="fixed left-0 top-0 pointer-events-none z-0"
        style={{
          width: "600px", height: "500px",
          background: "radial-gradient(ellipse at 0% 0%,rgba(63,130,210,0.06),transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-8">

        <div className="mb-14">
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">
            Portfolio — UI &amp; Visual Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Designs</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8 bg-white/18" />
            <p className="text-sm text-white/35">Figma projects, graphic arts, and illustrations.</p>
          </div>
        </div>

        {/* ── Toggle ──────────────────────────────────────── */}
        <div className="mb-12 flex justify-center">
          <div className="relative flex w-72 items-center rounded-xl border border-white/8 bg-[#0d1219] p-1">
            
            {/* 🔹 Sliding background */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-lg bg-white transition-all duration-300 ease-in-out ${
                activeTab === "figma" ? "left-1" : "left-1/2"
              }`}
            />

            {([
              { value: "figma" as Tab, label: "Figma", icon: FIGMA_ICON },
              { value: "arts"  as Tab, label: "Arts",  icon: PALETTE_ICON },
            ] as const).map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.value
                    ? "text-black"
                    : "text-white/45 hover:text-white/70"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-[#0d1219]">
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
              Add items to the{" "}
              <code className="text-white/25">
                {activeTab === "figma" ? "figmaDesigns" : "artDesigns"}
              </code>{" "}
              array at the top of this file.
            </p>
          </div>
        ) : (
          <div key={activeTab} className="columns-2 gap-4 space-y-4 md:columns-3">
            {items.map((design) => (
              <div
                key={design.title}
                className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/5"
              >
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
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