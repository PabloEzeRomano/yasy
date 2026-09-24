"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type KeyboardEvent, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ArrowRight, MoonPhases } from "@/components/Decor";
import { brand } from "@/lib/brand";
import { STEPS, emptyFicha, validateStep, type FichaData, type SiNo } from "@/lib/ficha";
import { submitFicha } from "./actions";

const DRAFT_KEY = "yasy:ficha";
const TOTAL = STEPS.length;

export function FichaForm() {
  const router = useRouter();
  const [data, setData] = useState<FichaData>(emptyFicha);
  const [step, setStep] = useState(0); // 0 = bienvenida, 1..TOTAL = preguntas
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);

  // Recuperar borrador (si recarga la página no pierde lo escrito).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratar desde storage solo en el cliente
      if (raw) setData({ ...emptyFicha, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  // Al cambiar de paso, llevar el foco a la pregunta.
  useEffect(() => {
    const el = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    el?.focus({ preventScroll: true });
  }, [step]);

  const set = <K extends keyof FichaData>(key: K, value: FichaData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setError("");
  };

  const current = step >= 1 ? STEPS[step - 1] : null;

  const next = () => {
    if (!current) return setStep(1);
    const err = validateStep(current.id, data);
    if (err) return setError(err);
    if (step < TOTAL) {
      setStep(step + 1);
      return;
    }
    startTransition(async () => {
      const res = await submitFicha(data, honeypot);
      if (res.ok) {
        try {
          sessionStorage.removeItem(DRAFT_KEY);
        } catch {}
        router.push("/gracias");
      } else {
        setError(res.message);
      }
    });
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      next();
    }
  };
  // En textos largos Enter es salto de línea; Cmd/Ctrl + Enter avanza.
  const onCmdEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      next();
    }
  };

  const isLast = step === TOTAL;

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(380px,480px)_1fr]">
      {/* Panel lateral (desktop) */}
      <aside className="hidden flex-col gap-12 bg-noche px-14 py-12 text-marfil lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="size-11 text-dorado" label="" />
          <span className="font-display text-[26px] tracking-[0.18em]">{brand.name}</span>
        </Link>
        <div className="flex flex-col gap-3.5">
          <h1 className="font-display text-6xl leading-none">
            Ficha <em className="text-dorado">inicial</em>
          </h1>
          <p className="font-light leading-relaxed text-bruma">
            Para conocerte un poco antes de nuestra primera sesión.
          </p>
        </div>
        <ol className="flex flex-col gap-1">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => {
                    setError("");
                    setStep(n);
                  }}
                  aria-current={active ? "step" : undefined}
                  className={`flex w-full items-center gap-4 py-2.5 text-left transition-colors ${
                    active ? "text-marfil" : done ? "text-bruma hover:text-marfil" : "text-[#7E8798]"
                  }`}
                >
                  <span
                    className={`inline-flex size-[30px] shrink-0 items-center justify-center rounded-full text-[13px] ${
                      active
                        ? "bg-dorado text-noche"
                        : done
                          ? "border border-dorado text-dorado"
                          : "border border-[#4A5366]"
                    }`}
                  >
                    {done ? "✓" : n}
                  </span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-auto flex items-center justify-between text-dorado">
          <span className="font-display text-xl italic">{brand.slogan}</span>
          <MoonPhases size="size-4" />
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex min-h-dvh flex-col">
        {/* Encabezado móvil */}
        <header className="flex h-16 items-center justify-between bg-noche px-5 text-marfil lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="size-[34px] text-dorado" label="" />
            <span className="font-display text-xl tracking-[0.18em]">{brand.name}</span>
          </Link>
          {current && (
            <span className="text-sm text-dorado">
              {step} / {TOTAL}
            </span>
          )}
        </header>

        <div className="flex flex-1 flex-col px-5 py-8 sm:px-10 lg:py-14 lg:pr-28 lg:pl-28">
          <div className="flex h-10 items-center gap-5" aria-hidden={!current}>
            {current && (
              <>
                <div className="h-0.5 flex-1 overflow-hidden rounded bg-[#E1D6C8]">
                  <div
                    className="h-full bg-dorado transition-[width] duration-500"
                    style={{ width: `${(step / TOTAL) * 100}%` }}
                  />
                </div>
                <span className="whitespace-nowrap text-sm text-gris">
                  Pregunta {step} de {TOTAL}
                </span>
              </>
            )}
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className="flex flex-1 flex-col"
          >
            {/* Campo trampa anti-spam: oculto para personas */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                No completar
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <div ref={panelRef} key={step} className="flex max-w-[700px] flex-1 animate-rise flex-col justify-center py-8">
              {step === 0 && (
                <div className="flex flex-col gap-7">
                  <h2 className="font-display text-5xl leading-none sm:text-[76px]">
                    Qué lindo que <em>estés acá.</em>
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-tinta sm:text-xl">
                    Antes de empezar me gustaría conocerte un poco. Son siete preguntas, no hay respuestas
                    correctas: contame lo que quieras, a tu ritmo.
                  </p>
                  <div>
                    <button
                      type="submit"
                      data-autofocus
                      className="caps h-[60px] rounded-full bg-noche px-10 text-[15px] tracking-[0.14em] text-marfil transition-colors hover:bg-noche-deep"
                    >
                      Empezar
                    </button>
                  </div>
                </div>
              )}

              {current?.id === "nombre" && (
                <div className="flex flex-col gap-9">
                  <QuestionLabel htmlFor="f-nombre">¿Cómo te llamás?</QuestionLabel>
                  <input
                    id="f-nombre"
                    data-autofocus
                    autoComplete="name"
                    placeholder="Nombre y apellido"
                    value={data.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    onKeyDown={onEnter}
                    className="h-[72px] border-0 border-b border-noche bg-transparent font-display text-3xl outline-none focus:border-dorado sm:text-[38px]"
                  />
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="f-contacto" className="text-lg text-tinta">
                      Email o WhatsApp para responderte
                    </label>
                    <input
                      id="f-contacto"
                      autoComplete="email"
                      placeholder="tu@email.com / +34 …"
                      value={data.contacto}
                      onChange={(e) => set("contacto", e.target.value)}
                      onKeyDown={onEnter}
                      className="h-14 border-0 border-b border-[#B9AE9E] bg-transparent text-xl outline-none focus:border-dorado"
                    />
                  </div>
                </div>
              )}

              {current?.id === "edad" && (
                <div className="flex flex-col gap-9">
                  <QuestionLabel htmlFor="f-edad">¿Qué edad tenés?</QuestionLabel>
                  <div className="flex items-baseline gap-4">
                    <input
                      id="f-edad"
                      data-autofocus
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={120}
                      placeholder="00"
                      value={data.edad}
                      onChange={(e) => set("edad", e.target.value)}
                      onKeyDown={onEnter}
                      className="h-[88px] w-[180px] border-0 border-b border-noche bg-transparent font-display text-6xl outline-none focus:border-dorado [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="font-display text-3xl text-gris">años</span>
                  </div>
                </div>
              )}

              {current?.id === "yoga" && (
                <YesNo
                  name="yoga"
                  legend="¿Tenés experiencia con el yoga?"
                  value={data.yoga}
                  onChange={(v) => set("yoga", v)}
                >
                  <Area
                    id="f-yoga"
                    label="Contame un poquito: ¿hace cuánto?, ¿qué estilo?, ¿cómo te sentís practicando?"
                    placeholder="Escribí acá…"
                    rows={4}
                    value={data.yogaDetalle}
                    onChange={(v) => set("yogaDetalle", v)}
                    onKeyDown={onCmdEnter}
                  />
                </YesNo>
              )}

              {current?.id === "motivo" && (
                <div className="flex flex-col gap-9">
                  <QuestionLabel htmlFor="f-motivo">¿Por qué estás acá?</QuestionLabel>
                  <textarea
                    id="f-motivo"
                    data-autofocus
                    rows={6}
                    placeholder="Lo que te trajo hasta acá, lo que sentís, lo que buscás…"
                    value={data.motivo}
                    onChange={(e) => set("motivo", e.target.value)}
                    onKeyDown={onCmdEnter}
                    className={areaClass}
                  />
                </div>
              )}

              {current?.id === "lesion" && (
                <YesNo
                  name="lesion"
                  legend="¿Tenés alguna lesión?"
                  value={data.lesion}
                  onChange={(v) => set("lesion", v)}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="f-lesion-cual"
                      className="sm:col-span-2"
                      label="¿Cuál?"
                      placeholder="Ej.: rodilla derecha, lumbar…"
                      value={data.lesionCual}
                      onChange={(v) => set("lesionCual", v)}
                      onKeyDown={onEnter}
                    />
                    <Field
                      id="f-lesion-cuando"
                      label="¿Cuándo fue?"
                      placeholder="Ej.: hace 2 años"
                      value={data.lesionCuando}
                      onChange={(v) => set("lesionCuando", v)}
                      onKeyDown={onEnter}
                    />
                    <Field
                      id="f-lesion-estado"
                      label="Estado actual"
                      placeholder="Ej.: recuperada, en tratamiento"
                      value={data.lesionEstado}
                      onChange={(v) => set("lesionEstado", v)}
                      onKeyDown={onEnter}
                    />
                  </div>
                </YesNo>
              )}

              {current?.id === "dolor" && (
                <YesNo
                  name="dolor"
                  legend="¿Tenés actualmente algún dolor o molestia física?"
                  value={data.dolor}
                  onChange={(v) => set("dolor", v)}
                >
                  <Area
                    id="f-dolor"
                    label="¿Cuál o cuáles?"
                    placeholder="Dónde lo sentís, desde cuándo…"
                    rows={3}
                    value={data.dolorDetalle}
                    onChange={(v) => set("dolorDetalle", v)}
                    onKeyDown={onCmdEnter}
                  />
                </YesNo>
              )}

              {current?.id === "objetivo" && (
                <div className="flex flex-col gap-9">
                  <QuestionLabel htmlFor="f-objetivo">
                    ¿Tenés algún objetivo o algo que te gustaría trabajar durante las sesiones?
                  </QuestionLabel>
                  <textarea
                    id="f-objetivo"
                    data-autofocus
                    rows={5}
                    placeholder="Puede ser algo concreto o solo una sensación…"
                    value={data.objetivo}
                    onChange={(e) => set("objetivo", e.target.value)}
                    onKeyDown={onCmdEnter}
                    className={areaClass}
                  />
                </div>
              )}

              <p role="alert" aria-live="polite" className="mt-5 flex min-h-6 items-center gap-2.5 text-ciruela">
                {error && (
                  <>
                    <span className="size-1.5 rounded-full bg-ciruela" aria-hidden="true" />
                    {error}
                  </>
                )}
              </p>
            </div>

            {current && (
              <div className="flex max-w-[700px] items-center justify-between gap-4 border-t border-[#E1D6C8] pt-5 lg:border-0 lg:pt-0">
                <button
                  type="button"
                  onClick={back}
                  className="caps inline-flex h-14 items-center gap-2.5 px-2 text-[15px] tracking-[0.14em] text-tinta hover:text-noche"
                >
                  <ArrowLeft />
                  <span className="max-sm:sr-only">Atrás</span>
                </button>
                <div className="flex items-center gap-5">
                  <span className="hidden whitespace-nowrap text-[13px] text-gris xl:inline">
                    {current.id === "motivo" || current.id === "objetivo" ? "o ⌘ + Enter" : "o presioná Enter"}
                  </span>
                  <button
                    type="submit"
                    disabled={pending}
                    className={`caps inline-flex h-[60px] items-center gap-3 rounded-full px-9 text-[15px] tracking-[0.14em] transition-colors disabled:opacity-60 ${
                      isLast ? "bg-dorado text-noche hover:bg-[#c9a42e]" : "bg-noche text-marfil hover:bg-noche-deep"
                    }`}
                  >
                    {pending ? "Enviando…" : isLast ? "Enviar" : "Siguiente"}
                    <ArrowRight />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

const areaClass =
  "w-full resize-none rounded-2xl border border-borde bg-campo px-5 py-4 text-lg leading-relaxed outline-none transition-colors focus:border-dorado";

function QuestionLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="font-display text-4xl leading-[1.05] sm:text-[56px]">
      {children}
    </label>
  );
}

function YesNo({
  name,
  legend,
  value,
  onChange,
  children,
}: {
  name: string;
  legend: string;
  value: SiNo;
  onChange: (v: "no" | "si") => void;
  children: ReactNode;
}) {
  const options = [
    { v: "no", label: "No" },
    { v: "si", label: "Sí" },
  ] as const;
  return (
    <fieldset className="flex flex-col gap-8">
      <legend className="mb-8 font-display text-4xl leading-[1.05] sm:text-[56px]">{legend}</legend>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
        {options.map((o, i) => (
          <label key={o.v} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.v}
              checked={value === o.v}
              onChange={() => onChange(o.v)}
              data-autofocus={i === 0 && !value ? true : value === o.v ? true : undefined}
              className="peer sr-only"
            />
            <span className="flex h-[60px] items-center justify-center rounded-full border border-[#9C927F] font-display text-[26px] transition-colors peer-checked:border-noche peer-checked:bg-noche peer-checked:text-marfil peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-dorado hover:border-noche sm:h-[72px] sm:w-[168px] sm:text-3xl">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {value === "si" && <div className="animate-rise">{children}</div>}
    </fieldset>
  );
}

type InputProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  className?: string;
};

function Field({ id, label, placeholder, value, onChange, onKeyDown, className = "" }: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-base text-tinta">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="h-14 rounded-[14px] border border-borde bg-campo px-4 text-lg outline-none transition-colors focus:border-dorado"
      />
    </div>
  );
}

function Area({ id, label, placeholder, value, onChange, onKeyDown, rows }: InputProps & { rows: number }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-lg text-tinta">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className={areaClass}
      />
    </div>
  );
}
