// ✏️ Add your videos here
// For YouTube use: "https://www.youtube.com/embed/VIDEO_ID"
const videos: {
  title: string;
  url: string;
  description?: string;
}[] = [
  // Example:
  // { title: "My Reel 2024", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Motion graphics reel" },
];

export default function Videos() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#080d12" }}>
      {/* Grid background */}
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
        <h1 className="text-3xl font-bold mb-2">Videos</h1>
        <p className="text-white/40 text-sm mb-12">Motion graphics, films, and edits.</p>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
            <p className="text-white/30 text-sm">Videos coming soon.</p>
            <p className="text-white/15 text-xs mt-1">
              Add YouTube embed URLs to the <code className="text-white/25">videos</code> array at the top of this file.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.title} className="space-y-3">
                <div
                  className="aspect-video rounded-xl overflow-hidden border border-white/5"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <p className="text-base font-semibold text-white/80">{video.title}</p>
                {video.description && (
                  <p className="text-sm text-white/35">{video.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}