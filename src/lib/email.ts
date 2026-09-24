import type { FichaValid } from "@/lib/ficha";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Row = { q: string; a: string };

function rows(f: FichaValid): Row[] {
  const siNo = (v: "si" | "no") => (v === "si" ? "Sí" : "No");
  const out: Row[] = [
    { q: "Nombre y apellido", a: f.nombre },
    { q: "Contacto", a: f.contacto },
    { q: "Edad", a: String(f.edad) },
    { q: "¿Tenés experiencia con el yoga?", a: siNo(f.yoga) },
  ];
  if (f.yoga === "si") out.push({ q: "→ Contame un poquito", a: f.yogaDetalle || "—" });
  out.push(
    { q: "¿Por qué estás acá?", a: f.motivo },
    { q: "¿Tenés alguna lesión?", a: siNo(f.lesion) },
  );
  if (f.lesion === "si")
    out.push(
      { q: "→ ¿Cuál?", a: f.lesionCual },
      { q: "→ ¿Cuándo fue?", a: f.lesionCuando || "—" },
      { q: "→ Estado actual", a: f.lesionEstado || "—" },
    );
  out.push({ q: "¿Tenés actualmente algún dolor o molestia física?", a: siNo(f.dolor) });
  if (f.dolor === "si") out.push({ q: "→ ¿Cuál/es?", a: f.dolorDetalle });
  out.push({ q: "¿Tenés algún objetivo o algo que te gustaría trabajar?", a: f.objetivo });
  return out;
}

export function fichaEmail(f: FichaValid) {
  const r = rows(f);
  const subject = `Nueva ficha inicial: ${f.nombre}`;

  const text = r.map(({ q, a }) => `${q}\n${a}\n`).join("\n");

  const html = `<!doctype html>
<html lang="es"><body style="margin:0;background:#F6F1EB;font-family:Helvetica,Arial,sans-serif;color:#1C2331">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1EB;padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden">
<tr><td style="background:#1C2331;padding:28px 32px">
<div style="font-family:Georgia,serif;font-size:24px;letter-spacing:4px;color:#F6F1EB">YA·SY</div>
<div style="margin-top:6px;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#D4AF37">Nueva ficha inicial</div>
</td></tr>
<tr><td style="padding:12px 32px 28px">
${r
  .map(
    ({ q, a }) => `<div style="padding:16px 0;border-bottom:1px solid #E8DFD8">
<div style="font-size:14px;font-weight:bold;color:#8A6A1E">${esc(q)}</div>
<div style="margin-top:6px;font-size:16px;line-height:1.55;white-space:pre-wrap">${esc(a)}</div>
</div>`,
  )
  .join("\n")}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  return { subject, text, html };
}

/** Si el contacto parece un email, lo usamos como reply-to. */
export function replyToFrom(contacto: string): string | undefined {
  const email = contacto.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}
