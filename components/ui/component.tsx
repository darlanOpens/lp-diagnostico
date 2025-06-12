"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, LineChart, MessageSquare, Zap, Clock, Star, ChevronRight, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    app: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    // Aqui você implementaria o envio do formulário
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 w-full overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b border-white/10 bg-purple-900/95 backdrop-blur ${scrollY > 50 ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/Cópia de Logo Solid White.png" 
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
      </motion.header>

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
                src="/Cópia de Logo Solid White.png" 
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

      <main className="flex-1">
        {/* Hero Section */}
        <section id="diagnostico" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48">
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
                    onClick={() => {
                      document.getElementById('formulario')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
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
                  src="/Relatório completo.png"
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
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
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
        <section id="quem-e" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
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
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
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
        <section id="como-funciona" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
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
        <section id="formulario" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/20">
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

                  <div className="grid gap-6 md:grid-cols-2">
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
                src="/Cópia de Logo Solid White.png" 
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