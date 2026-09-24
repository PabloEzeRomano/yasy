import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight, Constellations, Moon, MoonPhases } from "@/components/Decor";
import { brand } from "@/lib/brand";

const HERRAMIENTAS = ["Yoga", "Meditación", "Movimiento consciente", "Respiración", "Comunicación", "Escritura"];
const ROMANOS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

const PILARES = [
  { phase: "wax", title: "Comprender", text: "Parar y escuchar lo que te pasa, con tiempo y sin juicio." },
  { phase: "full", title: "Conectar", text: "Con el cuerpo, la respiración y la palabra, desde un lugar amable." },
  { phase: "wane", title: "Transformar", text: "Llevar lo que trabajamos a tu vida cotidiana, de forma consciente y real." },
] as const;

const ctaPrimary =
  "caps inline-flex h-[60px] items-center gap-3 rounded-full bg-dorado px-9 text-[15px] font-medium tracking-[0.14em] text-noche transition-colors hover:bg-[#e0bd4a]";

export default function Home() {
  const { contact } = brand;
  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden bg-noche text-marfil">
        <Constellations className="text-dorado opacity-30" />
        <nav className="relative mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:h-28 lg:px-24">
          <Link href="/" className="flex items-center gap-3.5">
            <Logo className="size-11 text-dorado lg:size-[52px]" label="" />
            <span className="font-display text-2xl tracking-[0.18em] lg:text-[30px]">{brand.name}</span>
          </Link>
          <div className="flex items-center gap-10 text-sm uppercase tracking-[0.16em]">
            <a href="#ofrezco" className="hidden text-arena hover:text-dorado lg:inline">Qué ofrezco</a>
            <a href="#para-quien" className="hidden text-arena hover:text-dorado lg:inline">Para quién</a>
            <a href="#contacto" className="hidden text-arena hover:text-dorado lg:inline">Contacto</a>
            <Link
              href="/ficha"
              className="inline-flex h-11 items-center rounded-full border border-dorado px-5 text-dorado transition-colors hover:bg-dorado hover:text-noche lg:h-[46px] lg:px-6"
            >
              <span className="sm:hidden">Ficha</span>
              <span className="max-sm:hidden">Completá tu ficha</span>
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-8 pb-20 sm:px-10 lg:min-h-[760px] lg:grid-cols-2 lg:px-24 lg:pt-0 lg:pb-24">
          <div className="flex flex-col gap-8">
            <h1 className="font-display text-7xl leading-[0.92] tracking-[-0.01em] sm:text-8xl lg:text-[132px]">
              El tiempo
              <br />
              es <em className="text-dorado">hoy.</em>
            </h1>
            <p className="max-w-[500px] text-lg leading-relaxed font-light text-arena sm:text-xl">
              Un lugar de encuentro con vos: un espacio para comprender, conectar y transformar, desde un lugar
              amable, consciente y real.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-7">
              <Link href="/ficha" className={ctaPrimary}>
                Empezá tu ficha <ArrowRight />
              </Link>
              <a
                href={contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] tracking-[0.08em] text-arena underline underline-offset-[6px] hover:text-dorado"
              >
                Escribime por WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-12">
            <Logo className="size-64 text-dorado sm:size-80 lg:size-[470px]" label="" />
            <MoonPhases size="size-7 lg:size-[34px]" className="text-dorado" />
          </div>
        </div>
      </header>

      <main>
        {/* QUÉ HAGO */}
        <section id="ofrezco" className="mx-auto flex max-w-[1440px] flex-col gap-20 px-5 py-24 sm:px-10 lg:gap-24 lg:px-24 lg:pt-36 lg:pb-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <h2 className="font-display text-5xl leading-[1.02] lg:col-span-5 lg:text-[64px]">
              Acompaño procesos de <em>transformación.</em>
            </h2>
            <div className="flex flex-col gap-6 text-lg leading-[1.7] font-light text-tinta lg:col-span-6 lg:col-start-7 lg:pt-3 lg:text-[19px]">
              <p>
                A través de sesiones individuales combinando yoga, meditación, movimiento consciente, respiración,
                comunicación y escritura, adaptadas a las necesidades de cada persona.
              </p>
              <p>
                También creo talleres y propuestas de bienestar tanto para grupos como para empresas y equipos,
                acercando herramientas simples y aplicables a la vida cotidiana.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-px border-y border-linea bg-[#DCCFB4] sm:grid-cols-3 xl:grid-cols-6">
            {HERRAMIENTAS.map((h, i) => (
              <li key={h} className="flex flex-col gap-3.5 bg-marfil px-5 py-8">
                <span className="font-display text-[22px] text-dorado-ink italic">{ROMANOS[i]}</span>
                <span className="font-display text-[28px] leading-[1.05] lg:text-3xl">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FORMATOS */}
        <section className="bg-arena">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 py-24 sm:px-10 lg:px-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-2">
              <article className="flex min-h-[400px] flex-col gap-6 rounded-[28px] bg-noche p-10 text-marfil lg:p-14">
                <Logo className="size-14 text-dorado" label="" />
                <h3 className="font-display text-5xl leading-none lg:text-[52px]">Sesiones individuales</h3>
                <p className="text-lg leading-[1.7] font-light text-arena">
                  Un acompañamiento a tu medida. Combino diferentes herramientas para adaptarme a lo que cada proceso
                  necesita.
                </p>
                <Link
                  href="/ficha"
                  className="mt-auto self-start text-sm tracking-[0.16em] text-dorado uppercase underline underline-offset-[6px] hover:text-marfil"
                >
                  Completá tu ficha inicial
                </Link>
              </article>
              <article className="flex min-h-[400px] flex-col gap-6 rounded-[28px] bg-neblina p-10 lg:p-14">
                <svg viewBox="0 0 56 56" className="size-14" aria-hidden="true">
                  {[
                    [18, 28],
                    [38, 28],
                    [28, 14],
                  ].map(([cx, cy]) => (
                    <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  ))}
                </svg>
                <h3 className="font-display text-5xl leading-none lg:text-[52px]">Talleres y bienestar</h3>
                <p className="text-lg leading-[1.7] font-light text-[#2C3444]">
                  Propuestas para grupos, empresas y equipos, con herramientas simples y aplicables a la vida
                  cotidiana.
                </p>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent("Talleres YASY")}`}
                  className="mt-auto self-start text-sm tracking-[0.16em] uppercase underline underline-offset-[6px] hover:text-ciruela"
                >
                  Consultá por tu grupo
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section id="para-quien" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-24 lg:py-36">
          <div className="flex max-w-[1100px] flex-col gap-9">
            <p className="font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
              Para quienes sienten la necesidad de <em className="text-dorado-ink">parar, escucharse</em> y comprender
              mejor lo que les sucede.
            </p>
            <p className="max-w-[680px] text-lg leading-[1.7] font-light text-tinta lg:text-[19px]">
              Especialmente si estás atravesando un momento de cambio, de búsqueda personal, o querés transformar algún
              aspecto de tu vida.
            </p>
          </div>
        </section>

        {/* DIFERENCIA */}
        <section className="mx-auto flex max-w-[1440px] flex-col gap-16 px-5 pb-24 sm:px-10 lg:px-24 lg:pb-36">
          <div className="flex flex-col justify-between gap-6 border-t border-linea pt-16 lg:flex-row lg:items-end lg:gap-12">
            <h2 className="max-w-[760px] font-display text-4xl leading-[1.05] sm:text-5xl lg:text-[56px]">
              Que lo que trabajamos no quede solo en la sesión.
            </h2>
            <p className="max-w-[420px] text-[17px] leading-[1.7] font-light text-tinta">
              Mi forma de acompañar parte de la escucha, la cercanía y la mirada integral de cada persona.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {PILARES.map((p) => (
              <div key={p.title} className="flex flex-col gap-5">
                <Moon phase={p.phase} className="size-10 text-dorado-ink" />
                <h3 className="font-display text-4xl font-medium">{p.title}</h3>
                <p className="text-[17px] leading-[1.7] font-light text-tinta">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center gap-9 bg-noche px-5 py-28 text-center text-marfil sm:px-10 lg:py-32">
          <MoonPhases size="size-7 lg:size-[34px]" className="text-dorado" />
          <h2 className="max-w-[900px] font-display text-5xl leading-none sm:text-6xl lg:text-[80px]">
            Tu primer paso es <em className="text-dorado">contarme de vos.</em>
          </h2>
          <p className="max-w-[560px] text-lg leading-[1.7] font-light text-arena lg:text-[19px]">
            Completá la ficha inicial antes de nuestra primera sesión. Son siete preguntas y te lleva unos minutos.
          </p>
          <Link href="/ficha" className={ctaPrimary}>
            Completar la ficha
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contacto" className="bg-noche-deep text-arena">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 pt-16 pb-12 sm:px-10 lg:px-24 lg:pt-[72px]">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5">
                <Logo className="size-14 text-dorado" label="" />
                <span className="font-display text-[34px] tracking-[0.18em] text-marfil">{brand.name}</span>
              </div>
              <span className="font-display text-2xl italic text-dorado">{brand.slogan}</span>
            </div>
            <dl className="grid gap-8 sm:grid-cols-3 sm:gap-14">
              {[
                { k: "Instagram", v: contact.instagram.handle, href: contact.instagram.url },
                { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
                { k: "WhatsApp", v: contact.whatsapp.display, href: contact.whatsapp.url },
              ].map((c) => (
                <div key={c.k} className="flex flex-col gap-2.5">
                  <dt className="text-sm text-[#A9B4C2]">{c.k}</dt>
                  <dd>
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-marfil underline-offset-4 hover:text-dorado hover:underline"
                    >
                      {c.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-center justify-between border-t border-[#2B3345] pt-6 text-[13px] text-[#A9B4C2]">
            <span>© {new Date().getFullYear()} {brand.name}</span>
            <span className="flex items-center gap-1.5 font-display text-lg tracking-[0.04em]">
              hecho por{" "}
              <a href="https://gemm-apps.com" target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
                gemm-apps
              </a>{" "}
              con
              <svg viewBox="0 0 24 24" className="size-4 text-dorado" role="img" aria-label="amor">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
