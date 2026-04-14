import { useRef, useState, useEffect } from "react";

const videos = [
  { title: "Bukid",          url: "/videos/Bukid.mp4",          description: "Cinematic drone highlight of scenic countryside views, showcasing lush fields and peaceful rural landscapes.",                                                               tag: "Cinematic"    },
  { title: "Bec and Geri's", url: "/videos/Bec_and_Geri's.mp4", description: "Commercial ad showcasing plant-based dishes at Bec and Geri's focused on fresh ingredients, healthy living, and sustainable dining.",                                        tag: "Commercial"   },
  { title: "Rizal",          url: "/videos/Rizal.mp4",          description: "Video edit featuring José Rizal highlighting his life, legacy, and impact on Philippine history through cinematic and historical visuals.",                                    tag: "Documentary"  },
  { title: "VinciPH",        url: "/videos/Vinci.ph.mp4",       description: "Commercial ad for Vinci PH showcasing original paintings with artistic detail, creativity, and premium craftsmanship.",                                                        tag: "Commercial"   },
  { title: "Pugpog",         url: "/videos/Pugpog.mp4",         description: "Bike travel highlight featuring rugged highland trails and scenic mountain routes of Pugpog Biker Highlands.",                                                                 tag: "Travel"       },
  { title: "El Rio",         url: "/videos/El_Rio.mp4",         description: "Cinematic travel highlight of El Rio Adventura Café at San Rafael River Adventure featuring serene riverside views.",                                                          tag: "Travel"       },
  { title: "Lobo Batangas",  url: "/videos/Lobo.mp4",           description: "Cinematic nature highlight showcasing the lush forests, coastal landscapes, and serene natural beauty of Lobo, Batangas.",                                                    tag: "Cinematic"    },
];

type Video = typeof videos[0];

// ─── Modal ────────────────────────────────────────────────────
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
      style={{ animation: "fadeIn 0.2s ease both" }}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/8 bg-[#0d1520] shadow-2xl"
        style={{ animation: "slideUp 0.28s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div className="relative aspect-video bg-black">
          <video ref={videoRef} src={video.url} controls loop playsInline className="h-full w-full object-contain" />
        </div>
        <div className="flex items-start justify-between gap-4 px-6 py-5">
          <div>
            {video.tag && <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/35">{video.tag}</p>}
            <p className="text-lg font-semibold text-white">{video.title}</p>
            {video.description && <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/40">{video.description}</p>}
          </div>
          <button onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white/60 transition-colors hover:bg-white/[0.14]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────
function VideoCard({ video, featured = false, onOpen }: { video: Video; featured?: boolean; onOpen: (v: Video) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const onEnter = () => { videoRef.current?.play(); setPlaying(true); };
  const onLeave = () => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setPlaying(false);
  };
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); }
  };

  return (
    <div className="cursor-pointer" onClick={() => onOpen(video)}>
      <div
        className="relative overflow-hidden rounded-xl border border-white/6 bg-[#0d1520]"
        style={{ aspectRatio: featured ? "16/7" : "16/9" }}
        onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <video ref={videoRef} src={video.url} muted={muted} loop playsInline preload="metadata"
          className="h-full w-full object-cover transition-all duration-500"
          style={{ filter: playing ? "brightness(0.75)" : "brightness(0.45)", transform: playing ? "scale(1.03)" : "scale(1)" }} />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 transition-all duration-400"
          style={{ background: playing ? "linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 60%)" : "linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.15) 100%)" }} />

        {/* Tag */}
        {video.tag && (
          <div className="absolute left-3.5 top-3.5 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50 backdrop-blur-md">
            {video.tag}
          </div>
        )}

        {/* Mute toggle */}
        <div className={`absolute bottom-3.5 right-3.5 transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}>
          <button onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md">
            {muted ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>

        {/* Play button */}
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>

        {/* Featured overlay text */}
        {featured && (
          <div className="absolute bottom-6 left-6">
            <p className="text-[22px] font-semibold text-white">{video.title}</p>
            {video.description && <p className="mt-1.5 max-w-md text-sm leading-snug text-white/45">{video.description}</p>}
          </div>
        )}
      </div>

      {/* Below-card info */}
      {!featured && (
        <div className="mt-3 pl-0.5">
          <p className="text-sm font-semibold text-white/82">{video.title}</p>
          {video.description && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/30">{video.description}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Videos() {
  const [featured, ...rest] = videos;
  const [modalVideo, setModalVideo] = useState<Video | null>(null);

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: scale(.95) translateY(12px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
        .fade-up   { animation: fadeUp .7s ease both }
        .delay-1   { animation-delay: .05s }
        .delay-2   { animation-delay: .12s }
        .delay-3   { animation-delay: .19s }
        .delay-4   { animation-delay: .26s }
        .delay-5   { animation-delay: .33s }
        .delay-6   { animation-delay: .40s }
        .delay-7   { animation-delay: .47s }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#080d12] text-white">
        {/* Grid bg */}
        <div aria-hidden className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(99,179,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,0.035) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        {/* Glow */}
        <div aria-hidden className="fixed left-0 top-0 h-125 w-150 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 0% 0%,rgba(63,130,210,0.06),transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-8">
          {/* Header */}
          <div className="fade-up delay-1 mb-14">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">Portfolio — Films & Edits</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Videos</h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-8 bg-white/18" />
              <p className="text-sm text-white/35">Commercial Ads, Cinematics, and Edits.</p>
            </div>
          </div>

          {/* Featured */}
          <div className="fade-up delay-2 mb-10">
            <VideoCard video={featured} featured onOpen={setModalVideo} />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((video, i) => (
              <div key={video.title} className={`fade-up delay-${i + 3}`}>
                <VideoCard video={video} onOpen={setModalVideo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalVideo && <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />}
    </>
  );
}