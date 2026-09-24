import { z } from "zod";

/**
 * Ficha inicial de YASY (basada en "Ficha_inicial_YASY.xlsx").
 * Las preguntas Sí/No abren un campo extra cuando la respuesta es "si".
 */

export type SiNo = "" | "no" | "si";

export type FichaData = {
  nombre: string;
  contacto: string;
  edad: string;
  yoga: SiNo;
  yogaDetalle: string;
  motivo: string;
  lesion: SiNo;
  lesionCual: string;
  lesionCuando: string;
  lesionEstado: string;
  dolor: SiNo;
  dolorDetalle: string;
  objetivo: string;
};

export const emptyFicha: FichaData = {
  nombre: "",
  contacto: "",
  edad: "",
  yoga: "",
  yogaDetalle: "",
  motivo: "",
  lesion: "",
  lesionCual: "",
  lesionCuando: "",
  lesionEstado: "",
  dolor: "",
  dolorDetalle: "",
  objetivo: "",
};

export const STEPS = [
  { id: "nombre", label: "Nombre" },
  { id: "edad", label: "Edad" },
  { id: "yoga", label: "Experiencia con yoga" },
  { id: "motivo", label: "Por qué estás acá" },
  { id: "lesion", label: "Lesiones" },
  { id: "dolor", label: "Dolor o molestia" },
  { id: "objetivo", label: "Objetivo" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

const blank = (s: string) => s.trim().length === 0;

/** Valida un paso y devuelve el mensaje de error (o "" si está ok). */
export function validateStep(id: StepId, d: FichaData): string {
  switch (id) {
    case "nombre":
      if (blank(d.nombre)) return "Contame tu nombre para empezar.";
      if (blank(d.contacto)) return "Dejame un email o WhatsApp para poder responderte.";
      return "";
    case "edad": {
      const n = Number(d.edad);
      return Number.isInteger(n) && n > 0 && n < 121 ? "" : "Escribí tu edad en números.";
    }
    case "yoga":
      return d.yoga ? "" : "Elegí una opción.";
    case "motivo":
      return blank(d.motivo) ? "Contame, aunque sea en pocas palabras." : "";
    case "lesion":
      if (!d.lesion) return "Elegí una opción.";
      if (d.lesion === "si" && blank(d.lesionCual)) return "Contame cuál es la lesión.";
      return "";
    case "dolor":
      if (!d.dolor) return "Elegí una opción.";
      if (d.dolor === "si" && blank(d.dolorDetalle)) return "Contame dónde sentís la molestia.";
      return "";
    case "objetivo":
      return blank(d.objetivo) ? "Contame qué te gustaría trabajar." : "";
  }
}

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1);
const siNo = z.enum(["no", "si"]);

/** Esquema del servidor: misma regla que el cliente, más límites de largo. */
export const fichaSchema = z
  .object({
    nombre: required(120),
    contacto: required(160),
    edad: z.coerce.number().int().min(1).max(120),
    yoga: siNo,
    yogaDetalle: text(2000),
    motivo: required(4000),
    lesion: siNo,
    lesionCual: text(300),
    lesionCuando: text(200),
    lesionEstado: text(300),
    dolor: siNo,
    dolorDetalle: text(2000),
    objetivo: required(4000),
  })
  .superRefine((d, ctx) => {
    if (d.lesion === "si" && !d.lesionCual)
      ctx.addIssue({ code: "custom", path: ["lesionCual"], message: "Falta la lesión." });
    if (d.dolor === "si" && !d.dolorDetalle)
      ctx.addIssue({ code: "custom", path: ["dolorDetalle"], message: "Falta el detalle del dolor." });
  })
  // Si la respuesta es "no", descartamos cualquier detalle que haya quedado escrito.
  .transform((d) => ({
    ...d,
    yogaDetalle: d.yoga === "si" ? d.yogaDetalle : "",
    lesionCual: d.lesion === "si" ? d.lesionCual : "",
    lesionCuando: d.lesion === "si" ? d.lesionCuando : "",
    lesionEstado: d.lesion === "si" ? d.lesionEstado : "",
    dolorDetalle: d.dolor === "si" ? d.dolorDetalle : "",
  }));

export type FichaValid = z.output<typeof fichaSchema>;
