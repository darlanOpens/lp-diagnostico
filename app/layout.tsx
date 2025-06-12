import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import ClientLayout from "./client-layout";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
