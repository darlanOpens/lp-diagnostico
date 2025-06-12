'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

// Configuração do GTM
const gtmArgs = {
  gtmId: 'GTM-K3SBSHG5'
}

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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  useEffect(() => {
    // Inicializar GTM
    TagManager.initialize(gtmArgs);
    
    // Enviar evento de page_view inicial
    TagManager.dataLayer({
      dataLayer: {
        event: 'page_view',
        page_title: 'Opens - Diagnóstico de Atendimento',
        page_location: window.location.href,
        content_group1: 'Landing Page',
        content_group2: 'Diagnóstico Atendimento',
        user_id: '',
        timestamp: new Date().toISOString()
      }
    });
  }, []);

  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
