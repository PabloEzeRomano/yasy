import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Constellations } from "@/components/Decor";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "¡Gracias!",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-noche px-5 py-16 text-center text-marfil">
      <Constellations className="text-dorado opacity-30" />
      <Logo className="relative size-36 animate-rise text-dorado sm:size-[200px]" />
      <h1 className="relative flex items-center gap-4 font-display text-7xl leading-none sm:text-[120px]">
        ¡Gracias!
        <svg viewBox="0 0 24 24" className="size-9 sm:size-11" aria-hidden="true">
          <path
            d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </h1>
      <p className="relative max-w-[640px] font-display text-3xl italic leading-tight text-arena sm:text-[38px]">
        por estar un paso más cerca de conectar contigo.
      </p>
      <p className="relative flex items-center gap-3 font-display text-2xl italic text-dorado">
        Nos vemos pronto
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          <path d="M15 3a9 9 0 1 0 6 13A7 7 0 0 1 15 3z" fill="currentColor" />
        </svg>
      </p>
      <div className="relative mt-4 flex flex-col items-center gap-6 sm:flex-row sm:gap-7">
        <Link
          href="/"
          className="caps inline-flex h-14 items-center rounded-full border border-dorado px-8 text-sm tracking-[0.16em] text-dorado transition-colors hover:bg-dorado hover:text-noche"
        >
          Volver al inicio
        </Link>
        <a
          href={brand.contact.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] tracking-[0.06em] text-arena underline underline-offset-[6px] hover:text-dorado"
        >
          Seguime en {brand.contact.instagram.handle}
        </a>
      </div>
    </main>
  );
}
