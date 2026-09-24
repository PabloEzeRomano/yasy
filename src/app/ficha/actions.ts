"use server";

import { Resend } from "resend";
import { fichaSchema } from "@/lib/ficha";
import { fichaEmail, replyToFrom } from "@/lib/email";
import { brand } from "@/lib/brand";

export type SubmitResult = { ok: true } | { ok: false; message: string };

const GENERIC_ERROR =
  "No pudimos enviar tu ficha. Probá de nuevo en un ratito o escribime por WhatsApp.";

export async function submitFicha(input: unknown, honeypot: string): Promise<SubmitResult> {
  // Campo trampa: los humanos no lo ven. Si viene lleno, fingimos éxito.
  if (honeypot) return { ok: true };

  const parsed = fichaSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Revisá tus respuestas: falta completar algo." };
  }

  const ficha = parsed.data;
  const { subject, html, text } = fichaEmail(ficha);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ficha] RESEND_API_KEY no configurada. Email que se enviaría:\n", subject, "\n", text);
      return { ok: true };
    }
    console.error("[ficha] Falta RESEND_API_KEY en producción.");
    return { ok: false, message: GENERIC_ERROR };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.FICHA_FROM_EMAIL ?? "YASY <onboarding@resend.dev>",
    to: process.env.FICHA_TO_EMAIL ?? brand.contact.email,
    replyTo: replyToFrom(ficha.contacto),
    subject,
    html,
    text,
  });

  if (error) {
    console.error("[ficha] Error de Resend:", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  return { ok: true };
}
