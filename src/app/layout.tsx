import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { OroDefs } from "@/components/Decor";
import { brand } from "@/lib/brand";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "YA·SY — El tiempo es hoy",
    template: "%s · YA·SY",
  },
  description:
    "Acompaño procesos de transformación con yoga, meditación, movimiento consciente, respiración, comunicación y escritura.",
  // El favicon sale del mismo archivo del logo: cambiás uno y cambian los dos.
  icons: { icon: brand.logo.src },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <OroDefs />
        {children}
      </body>
    </html>
  );
}
