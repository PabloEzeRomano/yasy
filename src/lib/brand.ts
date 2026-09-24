/**
 * Datos de marca en un solo lugar.
 *
 * Logo: reemplazá `public/brand/logo.svg` por tu versión vectorizada.
 * - mode "tint": el SVG se usa como máscara y se pinta con el color del
 *   contexto (dorado sobre noche, noche sobre arena…). Ideal para un logo
 *   de un solo color: la forma importa, el color del archivo no.
 * - mode "original": se muestra el archivo tal cual, con sus propios colores.
 */
export const brand = {
  name: "YA·SY",
  slogan: "El tiempo es hoy",
  logo: {
    src: "/brand/logo.svg",
    mode: "tint" as "tint" | "original",
  },
  contact: {
    instagram: {
      handle: "@yasy8moons",
      url: "https://www.instagram.com/yasy8moons/",
    },
    email: "aventuraadiario@gmail.com",
    whatsapp: {
      display: "+34 625 266 887",
      url: "https://wa.me/34625266887",
    },
  },
} as const;
