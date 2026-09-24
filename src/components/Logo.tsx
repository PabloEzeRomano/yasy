import { brand } from "@/lib/brand";

type LogoProps = {
  className?: string;
  /** Texto accesible. Pasá "" si el logo es decorativo (hay texto al lado). */
  label?: string;
};

/**
 * Logo de YASY. Lee el archivo definido en `brand.logo.src`.
 * En modo "tint" toma `currentColor`, así que se colorea con `text-*`.
 */
export function Logo({ className = "", label = brand.name }: LogoProps) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };

  if (brand.logo.mode === "original") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={brand.logo.src} alt={label} className={`object-contain ${className}`} />
    );
  }

  const mask = `url(${brand.logo.src}) center / contain no-repeat`;
  return (
    <span
      {...a11y}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
