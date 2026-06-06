import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "@/styles/theme-medieval.css";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RPG Robusto | Sistema Medieval Premium",
  description: "Gerenciamento completo de campanhas e personagens de RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cinzel.variable}`}
    >
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}