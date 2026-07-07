import { BRAND } from "@/lib/brand/config";

interface BrandLogoProps {
  /** Sizing classes for the tinted emblem box (used when logoTint is true). */
  emblemClass?: string;
  /** Sizing classes for the lockup image (used when logoTint is false). */
  lockupClass?: string;
  /** Render the wordmark text next to a tinted emblem. */
  showWordmark?: boolean;
}

/**
 * Brand-aware logo. Two modes driven by the active brand config:
 * - logoTint true (Indians Abroad): a monochrome emblem SVG tinted to the brand
 *   color via a CSS mask (purple in light mode, white in dark mode), with the
 *   wordmark text rendered alongside.
 * - logoTint false (MYST): a self-contained lockup image already containing the
 *   wordmark.
 */
export function BrandLogo({
  emblemClass,
  lockupClass,
  showWordmark = true,
}: BrandLogoProps) {
  if (!BRAND.logoTint) {
    return <img src={BRAND.logo.src} alt={BRAND.logo.alt} className={lockupClass} />;
  }

  return (
    <span className="flex items-center gap-2 md:gap-3">
      <span className={`relative block group ${emblemClass ?? ""}`}>
        {/* Gradient glow on hover */}
        <span className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
        <span className="relative block h-full w-full">
          <img
            src={BRAND.logo.src}
            alt={BRAND.logo.alt}
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              filter: "brightness(0) saturate(100%)",
              WebkitFilter: "brightness(0) saturate(100%)",
            }}
          />
          <span
            className="absolute inset-0 bg-primary dark:bg-white"
            style={{
              maskImage: `url(${BRAND.logo.src})`,
              WebkitMaskImage: `url(${BRAND.logo.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </span>
      </span>
      {showWordmark && BRAND.wordmark && (
        <span className="flex flex-col">
          <span className="text-sm md:text-lg lg:text-xl font-bold text-primary dark:text-white leading-tight">
            {BRAND.wordmark.name}
          </span>
          {BRAND.wordmark.tagline && (
            <span className="text-[11px] md:text-xs text-muted-foreground hidden sm:block">
              {BRAND.wordmark.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
