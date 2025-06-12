import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Opens - Diagnóstico de Atendimento Gratuito",
  description: "Descubra o que seus canais estão realmente dizendo sobre sua empresa. Diagnóstico gratuito de atendimento em até 3 dias úteis.",
  icons: {
    icon: [
      {
        url: "/Cópia de Logo Solid White.png",
        type: "image/png",
        sizes: "32x32"
      }
    ]
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
