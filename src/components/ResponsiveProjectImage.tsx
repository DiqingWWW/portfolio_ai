import type { ComponentProps } from "react";

type ResponsiveProjectImageProps = Omit<ComponentProps<"img">, "src" | "loading"> & {
  src: string;
  mobileSrc?: string;
  priority?: boolean;
};

/**
 * Serves pre-generated project media directly instead of routing it through
 * Vercel's on-demand image optimizer. Every public WebP has a smaller mobile
 * counterpart so the browser can select it before a cross-network transfer.
 */
export default function ResponsiveProjectImage({
  src,
  mobileSrc,
  priority = false,
  alt,
  ...imageProps
}: ResponsiveProjectImageProps) {
  const derivedMobileSrc = mobileSrc ?? src.replace(/-display\.webp$/, "-mobile.webp");
  const hasMobileVariant = derivedMobileSrc !== src;

  return (
    <picture>
      {hasMobileVariant ? <source media="(max-width: 767px)" srcSet={derivedMobileSrc} type="image/webp" /> : null}
      <img
        {...imageProps}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
