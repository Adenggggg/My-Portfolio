import { useState } from "react";

// ✏️ Add your Figma project screenshots here
const figmaDesigns: {
  title: string;
  image: string;
  category?: string;
}[] = [
  // Example:
  // { title: "HRIS Dashboard", image: "/figma/hris.jpg", category: "UI Design" },
  // { title: "Hotel Booking", image: "/figma/hotel.jpg", category: "Web Design" },
];

// ✏️ Add your graphic arts / illustrations here
const artDesigns: {
  title: string;
  image: string;
  category?: string;
}[] = [
  // Example:
  // { title: "Brand Poster", image: "/arts/poster.jpg", category: "Branding" },
  // { title: "Illustration", image: "/arts/illo.jpg", category: "Digital Art" },
];

type Tab = "figma" | "arts";

export default function Designs() {
  const [activeTab, setActiveTab] = useState<Tab>("figma");

  const items = activeTab === "figma" ? figmaDesigns : artDesigns;

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#080d12" }}>
      {/* Grid background — same as home */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-36 pb-24">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-1">Graphic Designs & Arts</h1>
        <p className="text-white/40 text-sm mb-10">A collection of my visual work.</p>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/8 w-72">
            <button
              onClick={() => setActiveTab("figma")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "figma"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              {/* Figma icon */}
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill={activeTab === "figma" ? "#0ACF83" : "#0ACF83"}/>
                <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill={activeTab === "figma" ? "#A259FF" : "#A259FF"}/>
                <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill={activeTab === "figma" ? "#F24E1E" : "#F24E1E"}/>
                <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill={activeTab === "figma" ? "#FF7262" : "#FF7262"}/>
                <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill={activeTab === "figma" ? "#1ABCFE" : "#1ABCFE"}/>
              </svg>
              Figma
            </button>

            <button
              onClick={() => setActiveTab("arts")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "arts"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              {/* Palette icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
              Arts
            </button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
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
            <p className="text-white/30 text-sm">
              {activeTab === "figma" ? "Figma projects coming soon." : "Artworks coming soon."}
            </p>
            <p className="text-white/15 text-xs mt-1">
              Add items to the <code className="text-white/25">{activeTab === "figma" ? "figmaDesigns" : "artDesigns"}</code>
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {items.map((design) => (
              <div
                key={design.title}
                className="break-inside-avoid rounded-xl overflow-hidden group relative border border-white/5"
              >
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <p className="text-white text-sm font-medium">{design.title}</p>
                  {design.category && (
                    <span className="text-xs px-2 py-1 rounded-md bg-white/20 text-white/90 backdrop-blur-sm">
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