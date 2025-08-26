// Configuração do Google Tag Manager para diferentes ambientes

export interface GTMConfig {
  gtmId: string;
  environment?: string;
  auth?: string;
  preview?: string;
  dataLayerName?: string;
}

export const GTM_CONFIGS: Record<string, GTMConfig> = {
  production: {
    gtmId: 'GTM-K3SBSHG5',
    environment: 'env-1',
    dataLayerName: 'dataLayer'
  },
  development: {
    gtmId: 'GTM-K3SBSHG5', // Mesmo ID para desenvolvimento, mas com environment diferente
    environment: 'env-2',
    dataLayerName: 'dataLayer'
  },
  test: {
    gtmId: 'GTM-K3SBSHG5', // Mesmo ID para teste, mas com environment diferente
    environment: 'env-3',
    dataLayerName: 'dataLayer'
  }
};

export const getGTMConfig = (environment?: string): GTMConfig => {
  const env = environment || process.env.NODE_ENV || 'development';

  // Mapear NODE_ENV para nossas configurações
  const configKey = env === 'production' ? 'production' :
                   env === 'test' ? 'test' : 'development';

  const config = GTM_CONFIGS[configKey];

  if (!config) {
    console.warn(`GTM: Configuração não encontrada para ambiente "${env}", usando desenvolvimento`);
    return GTM_CONFIGS.development;
  }

  console.log(`GTM: Usando configuração para ambiente "${configKey}":`, config);
  return config;
};

export const isGTMEnabled = (): boolean => {
  // Desabilitar GTM em alguns casos específicos
  if (typeof window !== 'undefined') {
    // Verificar se está em modo de preview ou debug
    const urlParams = new URLSearchParams(window.location.search);
    const disableGTM = urlParams.get('disable-gtm') === 'true';

    if (disableGTM) {
      console.log('GTM: Desabilitado via parâmetro URL');
      return false;
    }
  }

  // Verificar se há uma variável de ambiente para desabilitar
  if (process.env.NEXT_PUBLIC_DISABLE_GTM === 'true') {
    console.log('GTM: Desabilitado via variável de ambiente');
    return false;
  }

  return true;
};
