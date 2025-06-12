'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

// Configuração do GTM
const gtmArgs = {
  gtmId: 'GTM-K3SBSHG5'
}

export default function ClientLayout({
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

  return <>{children}</>;
} 