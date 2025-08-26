'use client';

import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import GTMDebug from '../components/ui/gtm-debug';
import { getGTMConfig, isGTMEnabled } from '../lib/gtm-config';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    // Verificar se estamos no browser
    if (typeof window === 'undefined') {
      console.log('GTM: Skipping initialization - not in browser environment');
      return;
    }

    // Verificar se GTM está habilitado
    if (!isGTMEnabled()) {
      console.log('GTM: GTM está desabilitado para este ambiente');
      return;
    }

    try {
      // Obter configuração baseada no ambiente
      const gtmConfig = getGTMConfig();

      console.log('GTM: Starting initialization...');
      console.log('GTM: Current environment:', process.env.NODE_ENV);
      console.log('GTM: GTM Config:', gtmConfig);

      // Inicializar GTM
      TagManager.initialize(gtmConfig);
      console.log('GTM: Initialization completed');

      // Aguardar um momento para o GTM carregar
      setTimeout(() => {
        try {
          // Verificar se o dataLayer existe
          if (window.dataLayer) {
            console.log('GTM: dataLayer found, length:', window.dataLayer.length);

            // Enviar evento de page_view inicial
            const pageViewData = {
              event: 'page_view',
              page_title: 'Opens - Diagnóstico de Atendimento',
              page_location: window.location.href,
              content_group1: 'Landing Page',
              content_group2: 'Diagnóstico Atendimento',
              user_id: '',
              timestamp: new Date().toISOString(),
              environment: process.env.NODE_ENV
            };

            console.log('GTM: Sending page_view event:', pageViewData);

            // Usar window.dataLayer diretamente para melhor compatibilidade
            window.dataLayer.push(pageViewData);
            console.log('GTM: page_view event sent successfully');

            // Verificar se foi adicionado ao dataLayer
            console.log('GTM: dataLayer after push:', window.dataLayer.length, 'items');

          } else {
            console.error('GTM: dataLayer not found after initialization');
          }
        } catch (error) {
          console.error('GTM: Error sending page_view event:', error);
        }
      }, 1000); // Aguardar 1 segundo para o GTM carregar

    } catch (error) {
      console.error('GTM: Error during initialization:', error);
    }
  }, []);

  return (
    <>
      {children}
      <GTMDebug />
    </>
  );
} 