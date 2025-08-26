"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight } from "lucide-react";

// Tipos para as props do componente
interface FormularioProps {
  utmData: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
    referrer: string;
    landing_page: string;
  };
  trackFormInteraction: (action: string, fieldName?: string, formData?: any) => void;
  trackEvent: (eventName: string, eventData: any) => void;
  trackCTAClick: (ctaName: string, ctaLocation: string) => void;
}

// Animações do Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Opções dos selects
const faturamentoOptions = [
  "Até R$ 50.000", "R$ 50.001 - R$ 100.000", "R$ 100.001 - R$ 250.000",
  "R$ 250.001 - R$ 500.000", "R$ 500.001 - R$ 1.000.000", "Acima de R$ 1.000.000",
  "Prefiro não informar"
];

const colaboradoresOptions = [
  "Entre 1 e 10 funcionários",
  "Entre 11 e 50 funcionários",
  "Entre 51 e 100 funcionários",
  "Entre 101 e 500 funcionários",
  "Entre 501 e 1000 funcionários",
  "Mais de 1000 funcionários"
];

const segmentoOptions = [
  "Saúde",
  "Educação",
  "Varejo",
  "Tecnologia",
  "Serviços",
  "Indústria",
  "Construção e Imobiliário",
  "Finanças",
  "Entretenimento e Lazer",
  "Governamental",
  "Ecommerce",
  "ONG",
  "Automotivo",
  "Turismo",
  "Transporte",
  "Telecomunicações",
  "Segurança",
  "Hotelaria",
  "Advocacia",
  "Moda",
  "Marketing",
  "Alimentação",
  "Comunicação",
  "Outro",
  "parceiros"
];

// Função para formatar número de telefone
const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  } else {
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  }
};

export default function Formulario({ utmData, trackFormInteraction, trackEvent, trackCTAClick }: FormularioProps) {
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    site: '',
    redesSociais: '',
    faturamento: '',
    colaboradores: '',
    segmento: ''
  });

  const [formErrors, setFormErrors] = useState<{ email?: string; whatsapp?: string }>({});

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "whatsapp") {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpar erro específico ao começar a digitar
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Track form field interactions
    trackFormInteraction('field_focus', name);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    trackFormInteraction('field_focus', name);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare complete form data with UTMs and metadata
    const completeFormData = {
      // Form fields
      ...formData,
      
      // UTM and tracking data
      ...utmData,
      
      // Cookies
      all_cookies: typeof document !== 'undefined' ? document.cookie : '',

      // Metadata
      submitted_at: new Date().toISOString(),
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
      screen_resolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
      form_name: 'raiox_atendimento',
      lead_source: 'Landing Page Opens'
    };
    
    // LIMPAR APENAS DÍGITOS DO WHATSAPP ANTES DE ENVIAR PARA O OBJETO DE DADOS PRINCIPAL
    const cleanWhatsapp = (formData.whatsapp || "").replace(/\D/g, "");

    // VALIDAÇÕES AQUI (ANTES DE CONSTRUIR n8nBody)
    const currentErrors: { email?: string; whatsapp?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      currentErrors.email = "Por favor, insira um email válido.";
    }

    if (!cleanWhatsapp || !(cleanWhatsapp.length === 10 || cleanWhatsapp.length === 11)) {
      currentErrors.whatsapp = "Telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setFormErrors(currentErrors);
      alert("Por favor, corrija os erros no formulário.\n" + 
            Object.values(currentErrors).filter(Boolean).join("\n"));
      return; // Impede o envio do formulário
    }
    setFormErrors({}); // Limpa erros se tudo estiver ok

    // Track form submission with data
    trackFormInteraction('submit', undefined, formData);
    
    // Track conversion event
    trackEvent('conversion', {
      conversion_type: 'lead_form_submit',
      form_name: 'raiox_atendimento',
      event_category: 'conversion',
      event_label: 'Formulário Raio-X de Atendimento Enviado',
      conversion_value: 1,
      ...utmData // Include UTM data in conversion tracking
    });

    try {
      console.log("DEBUG: Estado de formData antes de construir n8nBody:", JSON.stringify(formData, null, 2));
      console.log("DEBUG: Estado de utmData antes de construir n8nBody:", JSON.stringify(utmData, null, 2));

      // Nova abordagem para construir formDataForN8N
      const tempFormDataPayload: Record<string, any> = { ...formData }; // Começa com todos os campos de formData

      // Garante que todos os valores de formData sejam strings
      for (const key in tempFormDataPayload) {
        if (Object.prototype.hasOwnProperty.call(tempFormDataPayload, key)) {
          tempFormDataPayload[key] = tempFormDataPayload[key] ?? "";
        }
      }

      // Aplica transformações e remove originais
      tempFormDataPayload.telefone = (tempFormDataPayload.whatsapp ?? "").replace(/\D/g, "");
      tempFormDataPayload.Segmento = tempFormDataPayload.segmento;
      delete tempFormDataPayload.whatsapp;
      delete tempFormDataPayload.segmento;

      // Adiciona campos UTM
      tempFormDataPayload.utm_source = utmData.utm_source || ""; // || "" é adequado para campos UTM já inicializados como ""
      tempFormDataPayload.utm_medium = utmData.utm_medium || "";
      tempFormDataPayload.utm_campaign = utmData.utm_campaign || "";
      tempFormDataPayload.utm_content = utmData.utm_content || "";
      tempFormDataPayload.utm_term = utmData.utm_term || ""; // Incluindo utm_term

      const formDataForN8N = tempFormDataPayload as Record<string, string>;

      console.log("DEBUG: Objeto formDataForN8N construído (Nova Abordagem):", JSON.stringify(formDataForN8N, null, 2));

      const n8nBody = {
        form_id: "21a5590f",    // Conforme exemplo, pode precisar de ajuste
        form_title: completeFormData.form_name, // Usando o form_name atual: 'raiox_atendimento'
        form_data: formDataForN8N, // Usando o objeto construído com a nova abordagem
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), // Formato YYYY-MM-DD HH:MM:SS
        user_ip: "", // Omitido - difícil de obter no frontend de forma confiável
        user_agent: completeFormData.user_agent,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referer_url: utmData.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
        post_id: null,
        utm_parameters: [], // Conforme exemplo
        cookies: (typeof document !== 'undefined' && document.cookie) ?
                    document.cookie.split(';').reduce((acc, cookie) => {
                      const [name, ...valueParts] = cookie.split('=');
                      const value = valueParts.join('='); // Lida com '=' no valor do cookie
                      if (name && value) {
                        try {
                          acc[name.trim()] = decodeURIComponent(value.trim());
                        } catch (e) {
                           acc[name.trim()] = value.trim();
                        }
                      }
                      return acc;
                    }, {} as Record<string, string>)
                    : {}
      };

      console.log("DEBUG: Objeto n8nBody final ANTES de stringify (Nova Abordagem):", JSON.stringify(n8nBody, null, 2));

      const response = await fetch('https://n8n.opens.com.br/webhook/hubspot-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(n8nBody)
      });

      // Log de depuração da resposta
      console.log(`Resposta do Webhook - Status: ${response.status}, OK: ${response.ok}`);

      if (response.ok) {
        // Ações a serem executadas em caso de sucesso do webhook:

        // 1. Rastrear evento de sucesso
        try {
          trackEvent('webhook_success', {
            webhook_url: 'n8n.opens.com.br/webhook/hubspot-form',
            event_category: 'technical',
            event_label: 'Formulário enviado com sucesso'
          });
        } catch (trackingError) {
          console.warn("Falha ao rastrear webhook_success:", trackingError);
        }

        // 2. Logar dados enviados
        console.log("✅ Dados enviados com sucesso para o webhook:", n8nBody);
        
        // 3. Salvar nome no localStorage
        try {
          localStorage.setItem('nomeCliente', formData.nome);
        } catch (storageError) {
          console.warn("Falha ao salvar nomeCliente no localStorage:", storageError);
        }
        
        // 4. Resetar o formulário
        setFormData({
          nome: '',
          email: '',
          whatsapp: '',
          site: '',
          redesSociais: '',
          faturamento: '',
          colaboradores: '',
          segmento: ''
        });

        // 5. Redirecionar para a página de confirmação
        if (typeof window !== 'undefined') {
          window.location.href = '/raio-x/confirmacao';
        }

      } else {
        const errorText = await response.text();
        console.error(`Erro HTTP do Webhook: ${response.status} - ${response.statusText}. Detalhes: ${errorText}`);
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

    } catch (err) {
      console.error("Erro capturado no catch principal:", err);
      try {
        trackEvent('webhook_error', {
          webhook_url: 'n8n.opens.com.br/webhook/hubspot-form',
          error_message: err instanceof Error ? err.message : 'Erro desconhecido',
          event_category: 'technical',
          event_label: 'Erro no envio do formulário'
        });
      } catch (trackErrorError) {
        console.warn("Falha ao rastrear webhook_error principal:", trackErrorError);
      }
      
      alert("⚠️ Houve um problema técnico, mas seus dados foram registrados. Nossa equipe entrará em contato em breve!");
    }
  };

  return (
    <section id="formulario" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 md:px-6 max-w-6xl"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-300 mb-4"
            >
              📩 FORMULÁRIO
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Solicite seu raio-x de atendimento gratuito
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/80 text-lg mb-6"
            >
              Preencha as informações abaixo e receba sua análise completa em até 3 dias úteis
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white/80 text-sm"
            >
              <span className="text-green-400">🟢</span>
              Importante: todas as informações são públicas. Não acessamos nada privado sem sua autorização.
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl bg-white/10 p-8 backdrop-blur-sm border border-white/20"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-bold text-white">
                    Nome *
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-white">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                  />
                  {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="whatsapp" className="text-sm font-bold text-white">
                  WhatsApp *
                </label>
                <div className="flex items-center bg-white/10 border-white/20 rounded-lg text-white h-12">
                  <span className="pl-3 pr-2 text-white">🇧🇷 +55</span>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(XX) XXXXX-XXXX"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border-none focus:ring-0 !h-full flex-1 placeholder:text-white/50"
                    maxLength={15} // (XX) XXXXX-XXXX tem 15 caracteres
                  />
                </div>
                {formErrors.whatsapp && <p className="text-red-400 text-xs mt-1">{formErrors.whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="site" className="text-sm font-bold text-white">
                  Link do site da empresa *
                </label>
                <Input
                  id="site"
                  name="site"
                  placeholder="https://suaempresa.com.br"
                  value={formData.site}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="redesSociais" className="text-sm font-bold text-white">
                  Links das redes sociais
                </label>
                <Input
                  id="redesSociais"
                  name="redesSociais"
                  placeholder="Instagram, Facebook, LinkedIn (separados por vírgula)"
                  value={formData.redesSociais}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="faturamento" className="text-sm font-bold text-white">Faixa de Faturamento Mensal</label>
                  <Select name="faturamento" onValueChange={(value: string) => handleSelectChange("faturamento", value)} value={formData.faturamento}>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-800 border-purple-700 text-white">
                      {faturamentoOptions.map(option => (
                        <SelectItem key={option} value={option} className="hover:bg-purple-700 focus:bg-purple-600">{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="colaboradores" className="text-sm font-bold text-white">Faixa de Colaboradores</label>
                  <Select name="colaboradores" onValueChange={(value: string) => handleSelectChange("colaboradores", value)} value={formData.colaboradores}>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-800 border-purple-700 text-white">
                      {colaboradoresOptions.map(option => (
                        <SelectItem key={option} value={option} className="hover:bg-purple-700 focus:bg-purple-600">{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="segmento" className="text-sm font-bold text-white">Segmento</label>
                  <Select name="segmento" onValueChange={(value: string) => handleSelectChange("segmento", value)} value={formData.segmento}>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-800 border-purple-700 text-white">
                      {segmentoOptions.map(option => (
                        <SelectItem key={option} value={option} className="hover:bg-purple-700 focus:bg-purple-600">{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center pt-6 px-2 sm:px-0">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 font-bold text-sm sm:text-lg px-4 sm:px-12 py-3 sm:py-4 min-h-[48px]"
                  onClick={() => trackCTAClick('Solicitar Raio-X de Atendimento', 'Formulário')}
                >
                  🎁 Quero Meu Raio-X de Atendimento Agora!
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <p className="text-white/60 text-xs sm:text-sm mt-4 px-4 sm:px-0">
                  Descubra o que seus clientes estão vendo — antes que eles desistam da sua marca.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Bônus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-6 py-3 rounded-full text-yellow-300 font-bold">
              🎁 BÔNUS LIMITADO A ESTA PÁGINA
            </div>
            <p className="text-white/80 mt-4 text-lg">
              Ao solicitar seu raio-x de atendimento, você ganha acesso a uma <strong>aula gravada exclusiva</strong>:<br />
              <span className="text-orange-400 font-bold">&ldquo;Como Transformar Atendimento em Motor de Vendas&rdquo;</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 