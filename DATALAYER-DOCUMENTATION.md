# 📊 Documentação do DataLayer - Opens Landing Page

## 🔧 Google Tag Manager ID
**Container ID:** `GTM-K3SBSHG5`

## 📋 Eventos Configurados

### 1. **Page View** (Carregamento da Página)
```javascript
{
  'event': 'page_view',
  'page_title': 'Opens - Diagnóstico de Atendimento',
  'page_location': 'URL_DA_PAGINA',
  'content_group1': 'Landing Page',
  'content_group2': 'Diagnóstico Atendimento',
  'user_id': '',
  'timestamp': '2024-01-01T12:00:00.000Z'
}
```

### 2. **UTM Capture** (Captura de Parâmetros UTM)
```javascript
{
  'event': 'utm_capture',
  'utm_source': 'google',
  'utm_medium': 'cpc',
  'utm_campaign': 'diagnostico-atendimento',
  'utm_term': 'diagnóstico atendimento',
  'utm_content': 'anuncio-principal',
  'referrer': 'https://google.com/',
  'landing_page': 'https://opens.com.br/?utm_source=google&utm_medium=cpc',
  'event_category': 'acquisition',
  'event_label': 'google / cpc / diagnostico-atendimento'
}
```

### 3. **CTA Clicks** (Cliques nos Botões de Ação)
```javascript
{
  'event': 'cta_click',
  'cta_name': 'Quero Meu Diagnóstico Agora!',
  'cta_location': 'Hero Section', // ou 'Formulário'
  'event_category': 'engagement',
  'event_label': 'Hero Section - Quero Meu Diagnóstico Agora!',
  'timestamp': '2024-01-01T12:00:00.000Z'
}
```

### 4. **Form Interactions** (Interações com Formulário)

#### 4.1 Focus em Campo
```javascript
{
  'event': 'form_interaction',
  'form_name': 'diagnostico_atendimento',
  'form_action': 'field_focus',
  'field_name': 'nome', // ou 'email', 'whatsapp', etc.
  'event_category': 'form',
  'event_label': 'field_focus'
}
```

#### 4.2 Envio do Formulário
```javascript
{
  'event': 'form_interaction',
  'form_name': 'diagnostico_atendimento',
  'form_action': 'submit',
  'event_category': 'form',
  'event_label': 'submit',
  'form_data': {
    'has_nome': true,
    'has_email': true,
    'has_whatsapp': true,
    'has_site': true,
    'has_redes_sociais': false,
    'has_reclame_aqui': false,
    'has_google_negocio': true,
    'has_app': false,
    'complete_fields': 6
  }
}
```

### 5. **Conversion Event** (Evento de Conversão + UTM)
```javascript
{
  'event': 'conversion',
  'conversion_type': 'lead_form_submit',
  'form_name': 'diagnostico_atendimento',
  'event_category': 'conversion',
  'event_label': 'Formulário Diagnóstico Enviado',
  'conversion_value': 1,
  'utm_source': 'google',
  'utm_medium': 'cpc',
  'utm_campaign': 'diagnostico-atendimento',
  'utm_term': 'diagnóstico atendimento',
  'utm_content': 'anuncio-principal',
  'referrer': 'https://google.com/',
  'landing_page': 'https://opens.com.br/?utm_source=google'
}
```

### 6. **Webhook Success** (Envio Bem-sucedido)
```javascript
{
  'event': 'webhook_success',
  'webhook_url': 'n8n.opens.com.br/webhook/hubspot-form',
  'event_category': 'technical',
  'event_label': 'Formulário enviado com sucesso'
}
```

### 7. **Webhook Error** (Erro no Envio)
```javascript
{
  'event': 'webhook_error',
  'webhook_url': 'n8n.opens.com.br/webhook/hubspot-form',
  'error_message': 'Failed to fetch',
  'event_category': 'technical',
  'event_label': 'Erro no envio do formulário'
}
```

### 8. **Scroll Depth** (Profundidade do Scroll)
```javascript
{
  'event': 'scroll_depth',
  'scroll_depth': 25, // 25%, 50%, 75%, 90%
  'event_category': 'engagement',
  'event_label': '25% scroll'
}
```

### 9. **Section Views** (Visualização de Seções)
```javascript
{
  'event': 'section_view',
  'section_name': 'hero', // 'beneficios', 'publico-alvo', 'analise', 'processo', 'formulario'
  'event_category': 'engagement',
  'event_label': 'Section: hero'
}
```

### 10. **Time on Page** (Tempo na Página)
```javascript
{
  'event': 'time_on_page',
  'time_seconds': 30, // a cada 30 segundos
  'event_category': 'engagement',
  'event_label': '30 seconds'
}
```

## 📦 Estrutura do JSON Enviado para o Webhook

```javascript
{
  // Dados do formulário
  "nome": "João Silva",
  "email": "joao@empresa.com",
  "whatsapp": "(11) 99999-9999",
  "site": "https://minhaempresa.com.br",
  "redesSociais": "instagram.com/empresa, linkedin.com/empresa",
  "reclameAqui": "https://reclameaqui.com.br/empresa",
  "googleMeuNegocio": "Empresa Ltda, São Paulo",
  "app": "",
  
  // Dados de UTM e origem
  "utm_source": "google",
  "utm_medium": "cpc", 
  "utm_campaign": "diagnostico-atendimento",
  "utm_term": "diagnóstico atendimento",
  "utm_content": "anuncio-principal",
  "referrer": "https://google.com/",
  "landing_page": "https://opens.com.br/?utm_source=google&utm_medium=cpc",
  
  // Metadados técnicos
  "submitted_at": "2024-01-01T12:00:00.000Z",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "screen_resolution": "1920x1080",
  "form_name": "diagnostico_atendimento",
  "lead_source": "Landing Page Opens"
}
```

## 🎯 Configurações Recomendadas no GTM

### **Para Google Analytics 4:**

#### 1. **Enhanced Ecommerce - Lead Generation**
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `generate_lead`
- **Parameters:**
  - `currency`: `BRL`
  - `value`: `{{DLV - conversion_value}}`
  - `campaign_source`: `{{DLV - utm_source}}`
  - `campaign_medium`: `{{DLV - utm_medium}}`
  - `campaign_name`: `{{DLV - utm_campaign}}`

#### 2. **UTM Attribution**
- **Custom Parameters:**
  - `utm_source`: `{{DLV - utm_source}}`
  - `utm_medium`: `{{DLV - utm_medium}}`
  - `utm_campaign`: `{{DLV - utm_campaign}}`

### **Para Facebook Pixel:**

#### 1. **Lead Event with UTM**
- **Event:** `Lead`
- **Parameters:**
  - `content_name`: "Diagnóstico de Atendimento"
  - `value`: 1
  - `source`: `{{DLV - utm_source}}`

### **Para Google Ads:**

#### 1. **Conversion Tracking with Source**
- **Conversion Action:** "Lead - Diagnóstico"
- **Conversion Value:** 1
- **Custom Parameters:**
  - `utm_source`: `{{DLV - utm_source}}`

## 🔍 Variables Recomendadas no GTM

### **UTM Variables:**
1. **DLV - utm_source** (Data Layer Variable)
2. **DLV - utm_medium** (Data Layer Variable)  
3. **DLV - utm_campaign** (Data Layer Variable)
4. **DLV - utm_term** (Data Layer Variable)
5. **DLV - utm_content** (Data Layer Variable)

### **Webhook Variables:**
6. **DLV - webhook_url** (Data Layer Variable)
7. **DLV - error_message** (Data Layer Variable)

### **Form Variables:**
8. **DLV - cta_name** (Data Layer Variable)
9. **DLV - form_name** (Data Layer Variable)
10. **DLV - conversion_value** (Data Layer Variable)

## 📈 Triggers Recomendados

1. **UTM Capture Trigger:** `event = utm_capture`
2. **Conversion with UTM Trigger:** `event = conversion`
3. **Webhook Success Trigger:** `event = webhook_success`
4. **Webhook Error Trigger:** `event = webhook_error`
5. **Form Submit Trigger:** `event = form_interaction AND form_action = submit`

## 🎪 Funil de Conversão Completo com UTMs

1. **UTM Capture** → Origem identificada
2. **Page View** → Visitante chegou
3. **Section Views** → Engajamento com conteúdo
4. **CTA Click** → Interesse demonstrado
5. **Form Interaction** → Início do processo
6. **Conversion** → Lead capturado
7. **Webhook Success/Error** → Integração confirmada

## 🔄 Integração com n8n/HubSpot

### **Webhook Endpoint:**
`https://n8n.opens.com.br/webhook/hubspot-form`

### **Dados Enviados:**
- ✅ **Campos do formulário** completos
- ✅ **Parâmetros UTM** para atribuição
- ✅ **Metadados técnicos** para análise
- ✅ **Timestamp** para ordenação

### **Monitoramento:**
- ✅ **Sucessos** trackados via `webhook_success`
- ✅ **Erros** trackados via `webhook_error`
- ✅ **Performance** monitorada via GTM

## 🚀 Próximos Passos

1. **Configurar tags no GTM** com as variáveis UTM
2. **Testar campanhas** com diferentes UTMs
3. **Configurar alertas** para erros de webhook
4. **Criar relatórios** de atribuição por canal
5. **Configurar audiências** por fonte de tráfego

## 📊 Exemplos de URLs para Teste

### **Google Ads:**
```
https://opens.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=diagnostico-atendimento&utm_term=diagnóstico%20atendimento&utm_content=anuncio-principal
```

### **Facebook Ads:**
```
https://opens.com.br/?utm_source=facebook&utm_medium=social&utm_campaign=diagnostico-leads&utm_content=carousel-1
```

### **LinkedIn Ads:**
```
https://opens.com.br/?utm_source=linkedin&utm_medium=social&utm_campaign=b2b-diagnostico&utm_content=sponsored-post
``` 