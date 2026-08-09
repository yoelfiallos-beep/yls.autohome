import { Play, Video, Film } from 'lucide-react';

/**
 * Premium video placeholder.
 *
 * Shows a dark cinematic panel with an animated gradient and centered play icon.
 * Intentionally designed to look like a feature slot awaiting video — not like
 * missing content.
 *
 * ── HOW TO REPLACE WITH A REAL VIDEO ──────────────────────────────────
 *
 * 1. Add your video file to the project at the path shown in `replaceWith`.
 *    (e.g. create  public/videos/hero-video.mp4 )
 *
 * 2. Swap this component for a real <video> element, for example:
 *
 *      <video
 *        className="h-full w-full object-cover"
 *        autoPlay
 *        loop
 *        muted
 *        playsInline
 *      >
 *        <source src="/videos/hero-video.mp4" type="video/mp4" />
 *      </video>
 *
 * 3. Remove the <VideoPlaceholder> wrapper and the "replace" comment.
 * ──────────────────────────────────────────────────────────────────────
 */
export function VideoPlaceholder({
  label,
  replaceWith,
  className = '',
  rounded = 'rounded-2xl',
  aspect = 'aspect-video',
}: {
  /** Small label shown on the placeholder (e.g. "Detailing Process Video") */
  label: string;
  /** File path to show in the code comment (e.g. "/public/videos/detailing-work.mp4") */
  replaceWith: string;
  className?: string;
  rounded?: string;
  aspect?: string;
}) {
  return (
    // ┌──────────────────────────────────────────────────────────────┐
    // │  VIDEO PLACEHOLDER — replace with a real <video> element     │
    // │  Drop your file at:  {replaceWith}                           │
    // │  Then replace this entire div with a <video> tag (see        │
    // │  instructions in the component doc comment above).           │
    // └──────────────────────────────────────────────────────────────┘
    <div
      className={`reveal group relative ${aspect} ${rounded} overflow-hidden border border-silver-400/15 bg-ink-900 ${className}`}
      // REPLACE: video src → {replaceWith}
      data-video-src={replaceWith}
    >
      {/* Dark cinematic base */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950" />

      {/* Subtle animated gradient sheen */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -inset-[40%] bg-gradient-to-tr from-brand-600/20 via-transparent to-steel-600/15 animate-[shimmer_6s_ease-in-out_infinite]" />
      </div>

      {/* Grid texture for depth */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Film-style letterbox top/bottom */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-ink-950/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink-950/60 to-transparent" />

      {/* Centered play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-20 w-20 animate-pulse-ring rounded-full bg-brand-500/30" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-silver-400/20 bg-brand-500 text-white shadow-lg shadow-brand-600/40 transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5 fill-white" />
          </span>
        </span>
      </div>

      {/* Label badge (top-left) */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-silver-400/15 bg-ink-950/70 px-3 py-1.5 backdrop-blur">
        <Video className="h-4 w-4 text-brand-400" />
        <span className="text-xs font-medium text-white/90">{label}</span>
      </div>

      {/* "Placeholder" indicator (bottom-right) */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md bg-ink-950/60 px-2.5 py-1 backdrop-blur">
        <Film className="h-3 w-3 text-silver-500" />
        <span className="text-[11px] font-medium text-silver-500">Video Placeholder</span>
      </div>
    </div>
  );
}
