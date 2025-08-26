'use client';

import { useEffect, useState } from 'react';

interface GTMStatus {
  isInitialized: boolean;
  dataLayerExists: boolean;
  dataLayerLength: number;
  gtmId: string;
  environment: string;
  lastEvent: any;
  errors: string[];
}

export default function GTMDebug() {
  const [status, setStatus] = useState<GTMStatus>({
    isInitialized: false,
    dataLayerExists: false,
    dataLayerLength: 0,
    gtmId: '',
    environment: '',
    lastEvent: null,
    errors: []
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkGTMStatus = () => {
      const newStatus: GTMStatus = {
        isInitialized: false,
        dataLayerExists: false,
        dataLayerLength: 0,
        gtmId: 'GTM-K3SBSHG5',
        environment: typeof window !== 'undefined' ? (window as any).dataLayer?.[0]?.environment || 'unknown' : 'server',
        lastEvent: null,
        errors: []
      };

      if (typeof window !== 'undefined') {
        try {
          // Verificar se dataLayer existe
          if ((window as any).dataLayer) {
            newStatus.dataLayerExists = true;
            newStatus.dataLayerLength = (window as any).dataLayer.length;

            // Verificar se há eventos no dataLayer
            if ((window as any).dataLayer.length > 0) {
              newStatus.lastEvent = (window as any).dataLayer[(window as any).dataLayer.length - 1];
            }

            // Verificar se o GTM foi inicializado (procurar por gtm.start)
            const gtmStartEvent = (window as any).dataLayer.find((item: any) =>
              item['gtm.start'] !== undefined
            );
            newStatus.isInitialized = !!gtmStartEvent;
          } else {
            newStatus.errors.push('dataLayer não encontrado');
          }
        } catch (error) {
          newStatus.errors.push(`Erro ao verificar GTM: ${error}`);
        }
      } else {
        newStatus.errors.push('Executando no servidor');
      }

      setStatus(newStatus);
    };

    // Verificar status inicial
    checkGTMStatus();

    // Verificar a cada 2 segundos
    const interval = setInterval(checkGTMStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  // Só mostrar se houver erros ou se estiver em desenvolvimento
  if (!isVisible && status.errors.length === 0 && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
        cursor: 'pointer'
      }}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        🐛 GTM Debug {isVisible ? '▼' : '▶'}
      </div>

      {isVisible && (
        <div>
          <div>🆔 ID: {status.gtmId}</div>
          <div>🌍 Env: {status.environment}</div>
          <div style={{ color: status.dataLayerExists ? 'green' : 'red' }}>
            📊 DataLayer: {status.dataLayerExists ? '✅' : '❌'}
          </div>
          <div style={{ color: status.isInitialized ? 'green' : 'red' }}>
            🚀 Inicializado: {status.isInitialized ? '✅' : '❌'}
          </div>
          <div>📈 Eventos: {status.dataLayerLength}</div>

          {status.lastEvent && (
            <div style={{ marginTop: '5px' }}>
              <div style={{ fontWeight: 'bold' }}>Último Evento:</div>
              <div>Evento: {status.lastEvent.event || 'N/A'}</div>
              <div>Timestamp: {status.lastEvent.timestamp || 'N/A'}</div>
            </div>
          )}

          {status.errors.length > 0 && (
            <div style={{ marginTop: '5px', color: 'red' }}>
              <div style={{ fontWeight: 'bold' }}>Erros:</div>
              {status.errors.map((error, index) => (
                <div key={index}>• {error}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
