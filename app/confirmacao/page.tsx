"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CheckCircle, Clock, MessageCircle, ArrowLeft, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const deliveryDays = 3;
const whatsappNumber = "554830361446";

const ConfirmacaoPage = () => {
  const confettiRef = useRef<HTMLDivElement>(null);
  const [customerName, setCustomerName] = useState("Cliente");

  useEffect(() => {
    const nome = localStorage.getItem("nomeCliente");
    if (nome) setCustomerName(nome);
  }, []);

  useEffect(() => {
    // Trigger confetti on component mount
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#F97316', '#EC4899', '#10B981']
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    "Análise detalhada do seu atendimento atual",
    "Identificação de pontos de melhoria específicos",
    "Elaboração de relatório personalizado",
    "Apresentação de soluções estratégicas"
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Acabei de solicitar o Diagnóstico de Atendimento Opens. Gostaria de saber mais informações.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Success Message */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                🎉 Pedido Confirmado!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                Olá, <span className="font-semibold text-purple-600">{customerName}</span>! 
                Seu Diagnóstico de Atendimento Opens foi solicitado com sucesso.
              </motion.p>
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                Próximos Passos
              </h2>
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mb-8 bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-6"
            >
              <div className="flex items-center mb-2">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Prazo de Entrega</h3>
              </div>
              <p className="text-gray-700">
                Seu diagnóstico completo será entregue em até <span className="font-bold text-purple-600">{deliveryDays} dias úteis</span>.
                Você receberá todas as informações por e-mail.
              </p>
            </motion.div>

            {/* WhatsApp Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="mb-8 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Dúvidas? Fale Conosco!</h3>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Opens
              </Button>
            </motion.div>

            {/* Thank You Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-center mb-8"
            >
              <p className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-purple-600">Obrigado por confiar na Opens!</span><br />
                Estamos ansiosos para ajudar você a transformar seu atendimento e 
                proporcionar experiências excepcionais aos seus clientes.
              </p>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="text-center"
            >
              <Button
                onClick={handleBackToHome}
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar à Página Inicial
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmacaoPage; 