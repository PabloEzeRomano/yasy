import type { Metadata } from "next";
import { FichaForm } from "./FichaForm";

export const metadata: Metadata = {
  title: "Ficha inicial",
  description: "Contame un poco de vos antes de nuestra primera sesión.",
};

export default function FichaPage() {
  return <FichaForm />;
}
