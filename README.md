# YA·SY — El tiempo es hoy

Landing + ficha inicial interactiva para YASY (by 8moons). Next.js 16 (App Router), Tailwind CSS v4, Resend.

## Rutas

| Ruta       | Qué es                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| `/`        | Landing                                                                |
| `/ficha`   | Ficha inicial paso a paso (las respuestas "Sí" abren campos extra)     |
| `/gracias` | Pantalla de cierre después de enviar                                   |

Al enviar la ficha llega un email a `FICHA_TO_EMAIL` con todas las respuestas
(si la persona dejó un email, "Responder" le contesta directo).

## Desarrollo

```bash
pnpm install
cp .env.example .env.local   # y completá RESEND_API_KEY
pnpm dev
```

Sin `RESEND_API_KEY`, en desarrollo la ficha se imprime en la consola del servidor en vez de enviarse.

## Cambiar el logo

1. Reemplazá **`public/brand/logo.svg`** por tu versión vectorizada (mismo nombre).
2. Listo: se actualiza en la landing, la ficha, la pantalla de gracias y el favicon.

Por defecto el logo se usa en modo **`tint`**: el SVG funciona como silueta y se pinta con el color
de la marca según el fondo (dorado sobre azul noche). Para eso conviene un SVG de **un solo color**,
con fondo transparente y bien recortado (sin márgenes de sobra en el `viewBox`).

Si preferís mostrar el archivo con sus propios colores, cambiá `mode` a `"original"` en
[`src/lib/brand.ts`](src/lib/brand.ts). Ahí también están el nombre, el slogan y los datos de contacto.

## Paleta

Definida como tokens de Tailwind en [`src/app/globals.css`](src/app/globals.css):

| Token        | Color     | Uso                                   |
| ------------ | --------- | ------------------------------------- |
| `noche`      | `#1C2331` | Primario: fondos y textos principales |
| `arena`      | `#E8DFD8` | Secundario: fondos suaves             |
| `neblina`    | `#C3D6DD` | Secundario: transiciones, calma       |
| `dorado`     | `#D4AF37` | Acento: CTA, logo, detalles           |
| `dorado-ink` | `#8A6A1E` | Dorado legible sobre fondos claros    |
| `ciruela`    | `#581845` | Bordó, acento mínimo (avisos)         |

## Preguntas de la ficha

Viven en [`src/lib/ficha.ts`](src/lib/ficha.ts) (validación, compartida entre cliente y servidor),
[`src/app/ficha/FichaForm.tsx`](src/app/ficha/FichaForm.tsx) (UI) y
[`src/lib/email.ts`](src/lib/email.ts) (cómo se arma el email).

## Deploy

Pensado para Vercel. Configurá `RESEND_API_KEY`, `FICHA_TO_EMAIL` y `FICHA_FROM_EMAIL` en el proyecto.
Para producción, verificá un dominio en Resend: `onboarding@resend.dev` solo entrega al dueño de la cuenta.
