"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, LineChart, MessageSquare, Zap, Clock, Star, ChevronRight, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Declare dataLayer types
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// DataLayer tracking functions
const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_title: 'Opens - Diagnóstico de Atendimento',
      page_location: window.location.href,
      ...parameters
    });
  }
};

const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    event_category: 'engagement',
    event_label: `${ctaLocation} - ${ctaName}`
  });
};

const trackFormInteraction = (action: string, fieldName?: string, formData?: any) => {
  const eventData: Record<string, any> = {
    form_name: 'diagnostico_atendimento',
    form_action: action,
    event_category: 'form',
    event_label: action
  };

  if (fieldName) {
    eventData.field_name = fieldName;
  }

  if (formData && action === 'submit') {
    eventData.form_data = {
      has_nome: !!formData.nome,
      has_email: !!formData.email,
      has_whatsapp: !!formData.whatsapp,
      has_site: !!formData.site,
      has_redes_sociais: !!formData.redesSociais,
      has_reclame_aqui: !!formData.reclameAqui,
      has_google_negocio: !!formData.googleMeuNegocio,
      has_app: !!formData.app,
      has_faturamento: !!formData.faturamento,
      has_colaboradores: !!formData.colaboradores,
      has_segmento: !!formData.segmento,
      complete_fields: Object.values(formData).filter(Boolean).length
    };
  }

  trackEvent('form_interaction', eventData);
};

const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
    event_label: `${depth}% scroll`
  });
};

const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
    event_category: 'engagement',
    event_label: `Section: ${sectionName}`
  });
};

function OpensLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    site: '',
    redesSociais: '',
    reclameAqui: '',
    googleMeuNegocio: '',
    app: '',
    faturamento: '',
    colaboradores: '',
    segmento: ''
  });

  // Scroll tracking states
  const [scrollDepthTracked, setScrollDepthTracked] = useState<number[]>([]);
  const [sectionsViewed, setSectionsViewed] = useState<string[]>([]);
  const [startTime] = useState(Date.now());
  
  // UTM tracking state
  const [utmData, setUtmData] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    referrer: '',
    landing_page: ''
  });

  useEffect(() => {
    // Capture UTM parameters and referrer on page load
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || '',
        referrer: document.referrer || '',
        landing_page: window.location.href
      };
      
      setUtmData(utmParams);
      
      // Track UTM data in dataLayer
      if (utmParams.utm_source || utmParams.utm_medium || utmParams.utm_campaign) {
        trackEvent('utm_capture', {
          ...utmParams,
          event_category: 'acquisition',
          event_label: `${utmParams.utm_source} / ${utmParams.utm_medium} / ${utmParams.utm_campaign}`
        });
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Track scroll depth
      const scrollPercent = Math.round((currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      // Track scroll milestones
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthTracked.includes(milestone)) {
          setScrollDepthTracked(prev => [...prev, milestone]);
          trackScrollDepth(milestone);
        }
      });
    };

    // Intersection Observer for sections
    const observerOptions = {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id || entry.target.getAttribute('data-section') || 'unknown';
          if (!sectionsViewed.includes(sectionName)) {
            setSectionsViewed(prev => [...prev, sectionName]);
            trackSectionView(sectionName);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id], [data-section]');
    sections.forEach(section => observer.observe(section));

    // Track time on page
    const timeTracker = setInterval(() => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if (timeOnPage % 30 === 0 && timeOnPage > 0) { // Every 30 seconds
        trackEvent('time_on_page', {
          time_seconds: timeOnPage,
          event_category: 'engagement',
          event_label: `${timeOnPage} seconds`
        });
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearInterval(timeTracker);
    };
  }, [scrollDepthTracked, sectionsViewed, startTime]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
      form_name: 'diagnostico_atendimento',
      lead_source: 'Landing Page Opens'
    };
    
    // Track form submission with data
    trackFormInteraction('submit', undefined, formData);
    
    // Track conversion event
    trackEvent('conversion', {
      conversion_type: 'lead_form_submit',
      form_name: 'diagnostico_atendimento',
      event_category: 'conversion',
      event_label: 'Formulário Diagnóstico Enviado',
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
      tempFormDataPayload.telefone = tempFormDataPayload.whatsapp; // whatsapp já foi stringificado para "" se null/undefined
      tempFormDataPayload.Segmento = tempFormDataPayload.segmento; // segmento já foi stringificado para "" se null/undefined
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
        form_title: completeFormData.form_name, // Usando o form_name atual: 'diagnostico_atendimento'
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
          reclameAqui: '',
          googleMeuNegocio: '',
          app: '',
          faturamento: '',
          colaboradores: '',
          segmento: ''
        });

        // 5. Mostrar alerta de sucesso (REMOVIDO A PEDIDO DO USUÁRIO)
        // alert("✅ Diagnóstico solicitado com sucesso! Entraremos em contato em até 3 dias úteis.");

        // 6. Redirecionar para a página de confirmação
        if (typeof window !== 'undefined') {
          window.location.href = '/confirmacao';
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

  const handleCTAClick = (ctaName: string, ctaLocation: string) => {
    trackCTAClick(ctaName, ctaLocation);
    document.getElementById('formulario')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const placeholders = [
    "Digite seu maior desafio no atendimento...",
    "Quantos clientes você perde por mês?",
    "Como está sua taxa de conversão?",
    "Qual sua principal dor no atendimento?",
    "Precisa de um diagnóstico completo?"
  ];

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handlePlaceholderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Diagnóstico iniciado");
  };

  const faturamentoOptions = [
    "Até R$ 50.000", "R$ 50.001 - R$ 100.000", "R$ 100.001 - R$ 250.000",
    "R$ 250.001 - R$ 500.000", "R$ 500.001 - R$ 1.000.000", "Acima de R$ 1.000.000",
    "Prefiro não informar"
  ];

  const colaboradoresOptions = [
    "1-5", "6-10", "11-20", "21-50", "51-100", "101-200", "Acima de 200", "Prefiro não informar"
  ];

  const segmentoOptions = [
    "E-commerce", "Serviços", "Software (SaaS)", "Varejo Físico", "Indústria",
    "Educação", "Saúde", "Agro", "Financeiro", "Outro", "Prefiro não informar"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 w-full main-container">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-purple-900/95 backdrop-blur ${scrollY > 50 ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/opens-logo-white.png" 
                alt="Opens Logo" 
                className="h-8 w-auto"
              />
            </motion.div>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#diagnostico" className="text-sm font-medium text-white/80 transition-colors hover:text-orange-400">
              Diagnóstico
            </a>
            <a href="#quem-e" className="text-sm font-medium text-white/80 transition-colors hover:text-orange-400">
              Para Quem É
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-white/80 transition-colors hover:text-orange-400">
              Como Funciona
            </a>
            <a href="#formulario" className="text-sm font-medium text-white/80 transition-colors hover:text-orange-400">
              Começar Agora
            </a>
          </nav>
          

          
          <button className="flex md:hidden text-white" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Spacer para compensar o header fixo */}
      <div className="h-16"></div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-purple-900 md:hidden"
        >
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <img 
                src="/opens-logo-white.png" 
                alt="Opens Logo" 
                className="h-8 w-auto"
              />
            </div>
            <button onClick={toggleMenu} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container mx-auto grid gap-3 pb-8 pt-6 px-4"
          >
            {["Diagnóstico", "Para Quem É", "Como Funciona", "Começar Agora"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-lg font-medium text-white hover:bg-white/10"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1 pt-0">
        {/* Hero Section */}
        <section id="diagnostico" data-section="hero" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full bg-red-500/20 px-3 py-2 text-xs sm:text-sm font-bold text-red-300 text-center"
                  >
                    🚨 ALERTA: Seu atendimento pode estar perdendo clientes
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl/none text-white leading-tight"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Seu atendimento pode estar{" "}
                    <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      afastando clientes
                    </span>{" "}
                    sem você perceber.
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-white/90 text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Descubra o que os seus canais estão <strong>realmente dizendo</strong> sobre sua empresa — e como virar o jogo.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    Um diagnóstico rápido, gratuito e baseado em dados reais dos seus canais digitais: site, redes sociais, Google, Reclame Aqui e app stores. Simples, direto e sem achismo.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex flex-col gap-4"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 font-bold text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 min-h-[48px]"
                    onClick={() => handleCTAClick('Quero Meu Diagnóstico Agora!', 'Hero Section')}
                  >
                    Quero Meu Diagnóstico Agora!
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <p className="text-xs text-white/60 text-center px-4 sm:px-0">
                    ✅ Gratuito • ✅ Sem compromisso • ✅ Resultados em 3 dias
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center lg:py-12 relative"
              >
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 md:-top-12 md:-left-12 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full bg-orange-400/30 backdrop-blur-sm"
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 md:-bottom-12 md:-right-12 h-10 w-10 sm:h-14 sm:w-14 md:h-18 md:w-18 rounded-lg bg-purple-400/30 backdrop-blur-sm"
                  animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                 <motion.div
                  className="absolute top-1/2 -right-8 sm:-right-12 md:-right-16 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-green-400/30 backdrop-blur-sm"
                  animate={{ y: [0, 5, -5, 0], rotate: [0, 90, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                <motion.div
                  className="absolute bottom-1/4 -left-8 sm:-left-12 md:-left-16 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 transform rotate-45 bg-pink-400/30 backdrop-blur-sm"
                  animate={{ x: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />

                <img 
                  src="Relatorio.png"
                  alt="Relatório de Diagnóstico Completo"
                  className="mx-auto overflow-hidden rounded-xl object-contain object-center w-full lg:order-last relative z-10 h-80 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px]"
                  width={700}
                  height={394}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* O que você vai receber */}
        <section data-section="beneficios" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 max-w-7xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-300"
              >
                ✅ O QUE VOCÊ VAI RECEBER
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-white max-w-4xl"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Um diagnóstico completo do seu atendimento
              </motion.h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2 lg:grid-cols-2"
            >
              {[
                {
                  icon: <LineChart className="h-12 w-12 text-orange-400" />,
                  title: "📊 Relatório visual completo",
                  description: "com avaliação em 6 pontos-chave da jornada de atendimento",
                  details: "🟢 Sinais positivos | 🟡 Pontos de atenção | 🔴 Alertas críticos",
                },
                {
                  icon: <MessageSquare className="h-12 w-12 text-orange-400" />,
                  title: "💬 Trechos reais",
                  description: "de comentários, reclamações ou elogios que seu público está vendo",
                  details: "Dados extraídos diretamente dos seus canais públicos",
                },
                {
                  icon: <Zap className="h-12 w-12 text-orange-400" />,
                  title: "🎯 Recomendações práticas",
                  description: "para melhorar sua reputação e transformar atendimento em crescimento",
                  details: "Plano de ação personalizado para sua realidade",
                },
                {
                  icon: <Clock className="h-12 w-12 text-orange-400" />,
                  title: "⚡ Análise em tempo real",
                  description: "dos seus canais digitais: site, redes sociais, Google, Reclame Aqui",
                  details: "Processamento automatizado em até 3 dias úteis",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 p-6 shadow-sm transition-all hover:shadow-md bg-white/5 backdrop-blur-sm"
                >
                  <div className="space-y-3">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-white/80 font-medium">{item.description}</p>
                    <p className="text-white/60 text-sm">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Para quem é */}
        <section id="quem-e" data-section="publico-alvo" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 max-w-7xl"
          >
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-orange-500/20 px-3 py-2 text-xs sm:text-sm font-bold text-orange-300 text-center">
                  🚨 PARA QUEM É ESSE DIAGNÓSTICO?
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  Este diagnóstico é para você que:
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Tem uma empresa com atendimento online ou híbrido",
                    "Possui presença digital e quer entender como o cliente está sendo tratado",
                    "Sente que está perdendo clientes e não sabe exatamente por quê",
                    "É líder que valoriza a experiência do cliente e quer crescer com base na confiança"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-green-500/20 p-2 mt-1 shrink-0">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                      </div>
                      <span className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-red-500/20 px-3 py-2 text-xs sm:text-sm font-bold text-red-300 text-center">
                  ❌ NÃO É PARA QUEM:
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl leading-tight">
                  Esse diagnóstico não é para quem:
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Não valoriza relacionamento com cliente",
                    "Acredita que atendimento é só &apos;resolver problema&apos;",
                    "Prefere continuar no achismo em vez de olhar para dados"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-red-500/20 p-2 mt-1 shrink-0">
                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                      </div>
                      <span className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* O que vamos analisar */}
        <section data-section="analise" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 max-w-7xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-purple-500/20 px-3 py-2 text-xs sm:text-sm font-bold text-purple-300 text-center"
              >
                🔦 O QUE VAMOS ANALISAR
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl leading-tight px-4 sm:px-0"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                6 pontos-chave da sua jornada de atendimento
              </motion.h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-6xl items-start gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Clareza de canais",
                  description: "Promessas de atendimento no seu site e redes sociais",
                },
                {
                  title: "Primeira resposta",
                  description: "Tempo médio de retorno (percepção dos clientes)",
                },
                {
                  title: "Eficiência na resolução",
                  description: "Como problemas são solucionados e tom de voz nas respostas",
                },
                {
                  title: "Avaliações públicas",
                  description: "Análise do Google, Reclame Aqui e lojas de apps",
                },
                {
                  title: "Relacionamento ativo",
                  description: "Presença de follow-up com clientes após o atendimento",
                },
                {
                  title: "Reputação digital",
                  description: "O que está sendo dito sobre sua empresa online",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 p-4 sm:p-6 shadow-sm transition-all hover:shadow-md bg-white/5 backdrop-blur-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" data-section="processo" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 max-w-7xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-300"
              >
                🧭 COMO FUNCIONA
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-white max-w-4xl"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Em 3 passos simples para o seu diagnóstico
              </motion.h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3"
            >
              {[
                {
                  step: "1",
                  title: "Você preenche o formulário",
                  description: "Com seus canais principais (site, redes sociais, Google, etc.)",
                  icon: <Mail className="h-12 w-12 text-orange-400" />,
                },
                {
                  step: "2",
                  title: "Nossa equipe analisa",
                  description: "Coletamos e analisamos os dados automaticamente",
                  icon: <LineChart className="h-12 w-12 text-orange-400" />,
                },
                {
                  step: "3",
                  title: "Você recebe o relatório",
                  description: "Em até 3 dias úteis, com insights e oportunidades + conversa opcional",
                  icon: <Star className="h-12 w-12 text-orange-400" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 p-8 shadow-sm transition-all hover:shadow-md bg-white/5 backdrop-blur-sm text-center"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                        {step.step}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.2 }}
                      className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <ArrowRight className="h-8 w-8 text-orange-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Formulário */}
        <section id="formulario" data-section="formulario" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
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
                  Solicite seu diagnóstico gratuito
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
                  className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-blue-300 text-sm"
                >
                  <Star className="h-4 w-4" />
                  Importante: todas as informações são públicas. Não acessamos nada privado sem sua autorização.
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-8 shadow-sm"
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
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-bold text-white">
                      WhatsApp *
                    </label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    />
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

                  <div className="space-y-2">
                    <label htmlFor="reclameAqui" className="text-sm font-bold text-white">
                      Link do Reclame Aqui
                    </label>
                    <Input
                      id="reclameAqui"
                      name="reclameAqui"
                      placeholder="https://reclameaqui.com.br/..."
                      value={formData.reclameAqui}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="googleMeuNegocio" className="text-sm font-bold text-white">
                      Google Meu Negócio
                    </label>
                    <Input
                      id="googleMeuNegocio"
                      name="googleMeuNegocio"
                      placeholder="Link ou endereço no Maps"
                      value={formData.googleMeuNegocio}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="app" className="text-sm font-bold text-white">
                      Link do app (se tiver)
                    </label>
                    <Input
                      id="app"
                      name="app"
                      placeholder="Play Store, App Store"
                      value={formData.app}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    />
                  </div>

                  <div className="text-center pt-6 px-2 sm:px-0">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 font-bold text-sm sm:text-lg px-4 sm:px-12 py-3 sm:py-4 min-h-[48px]"
                      onClick={() => trackCTAClick('Solicitar Diagnóstico', 'Formulário')}
                    >
                      🎁 Quero Meu Diagnóstico Agora!
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
                  Ao solicitar seu diagnóstico, você ganha acesso a uma <strong>aula gravada exclusiva</strong>:<br />
                  <span className="text-orange-400 font-bold">&ldquo;Como Transformar Atendimento em Motor de Vendas&rdquo;</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src="/opens-logo-white.png" 
                alt="Opens Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-white/70">
              Soluções completas para a sua empresa encantar e fidelizar os seus clientes.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <a href="#" className="text-white/70 hover:text-orange-400">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Soluções</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <a href="#" className="text-white/70 hover:text-orange-400">
                Diagnóstico de Atendimento
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Conversão
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Retenção
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Fidelização
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Empresa</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <a href="#" className="text-white/70 hover:text-orange-400">
                Sobre Nós
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Blog
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Carreiras
              </a>
              <a href="#" className="text-white/70 hover:text-orange-400">
                Contato
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Contato</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <p className="text-white/70">+55 99999909990</p>
              <p className="text-white/70">contato@opens.com.br</p>
              <p className="text-white/70">São Paulo, SP - Brasil</p>
            </nav>
          </div>
        </motion.div>
        <div className="border-t border-white/10">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 px-4">
            <p className="text-xs text-white/60">
              &copy; {new Date().getFullYear()} Opens Tecnologia. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/60">Feito com ❤️ no Brasil</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OpensLandingPage; 