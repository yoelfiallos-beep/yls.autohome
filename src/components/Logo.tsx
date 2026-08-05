import { BRAND } from '@/data';

/**
 * Brand logo. Renders the uploaded image when BRAND.logoUrl is set, otherwise
 * falls back to the built-in house-and-car icon mark.
 *
 * When showing the real logo (which already contains the full wordmark),
 * `showWordmark` is ignored — the name inside the image is the wordmark.
 * The image uses object-contain and never distorts regardless of aspect ratio.
 */
export function Logo({
  className = '',
  showWordmark = false,
  size = 'md',
}: {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const src = BRAND.logoDarkUrl || BRAND.logoUrl;

  // Height of the logo container per size
  const heights = { sm: 'h-9', md: 'h-11', lg: 'h-16' };
  // Width is wider because the logo is roughly square with padding; let it auto-size
  const textSizes = { sm: 'text-sm', md: 'text-base sm:text-lg', lg: 'text-xl sm:text-2xl' };

  if (src) {
    return (
      <span className={`group flex items-center ${className}`}>
        <img
          src={src}
          alt="YL's Auto & Home Care"
          className={`${heights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          style={{ maxHeight: { sm: '36px', md: '44px', lg: '64px' }[size] }}
        />
      </span>
    );
  }

  // Fallback icon + optional wordmark when no image is set
  const iconSize = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-16 w-16' }[size];
  return (
    <span className={`group flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative flex ${iconSize} shrink-0 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-600/30 transition-transform duration-300 group-hover:scale-105`}
      >
        <PlaceholderMark className="h-5 w-5" />
      </span>
      {showWordmark && (
        <span className={`font-display font-bold tracking-tight text-white ${textSizes[size]}`}>
          YL's <span className="text-brand-400">Auto &amp; Home Care</span>
        </span>
      )}
    </span>
  );
}

function PlaceholderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'white' }}
    >
      <path d="M3 12 L12 4 L21 12" />
      <path d="M5 11 V20 H9 V14 H15 V20 H19 V11" />
    </svg>
  );
}
