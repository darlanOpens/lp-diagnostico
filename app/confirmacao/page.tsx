import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ConfirmacaoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 w-full overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white/10 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center text-center border border-white/10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-2">🙌 Pedido recebido com sucesso!</h1>
          <p className="text-lg text-white/90 font-medium mb-6">Agora é com a gente.<br />Você deu o primeiro passo para transformar seu atendimento em vantagem competitiva — parabéns por isso.</p>
          <div className="w-full border-t border-white/10 my-6" />
          <h2 className="text-xl font-bold text-white mb-4">📲 O que acontece a partir de agora?</h2>
          <ol className="text-left text-white/90 space-y-4 mb-6 list-decimal list-inside">
            <li><b>Nosso consultor estratégico vai te chamar no WhatsApp</b><br />Em até 1 dia útil, você vai receber uma mensagem para validar as informações e entender melhor o contexto da sua empresa.</li>
            <li><b>Faremos toda a coleta e análise dos seus canais públicos</b><br />Com base nas informações do seu site, redes sociais, Reclame Aqui, Google Meu Negócio e app (se houver), vamos montar um diagnóstico visual, claro e objetivo.</li>
            <li><b>Você recebe o relatório completo em uma nova call</b><br />Agendamos com você uma nova conversa para apresentar os resultados, mostrar os sinais críticos e sugerir os próximos passos.</li>
          </ol>
          <div className="w-full border-t border-white/10 my-6" />
          <p className="text-white/80 mb-2">⏳ <b>Prazo médio de entrega:</b> até 3 dias úteis após a coleta completa</p>
          <div className="w-full border-t border-white/10 my-6" />
          <p className="text-white/90 mb-4">Enquanto isso, aproveite para revisar os canais da sua empresa com um novo olhar:<br /><span className="font-bold text-orange-300">Eles estão dizendo o que você gostaria que seus clientes escutassem?</span></p>
          <div className="w-full border-t border-white/10 my-6" />
          <h3 className="text-lg font-bold text-white mb-2">📩 Qualquer dúvida, estamos por aqui!</h3>
          <p className="text-white/80 mb-4">Se não receber nosso contato em até 1 dia útil, mande uma mensagem para:<br />
            <Link href="https://wa.me/message/BAJUCJJV7YS7K1" target="_blank" className="text-green-400 underline font-bold">Clique aqui para falar no WhatsApp</Link>
          </p>
          <div className="w-full border-t border-white/10 my-6" />
          <p className="text-white/90 text-base mb-6">Obrigado por confiar no nosso trabalho.<br />Vamos juntos melhorar a experiência do seu cliente e destravar o crescimento da sua empresa!</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 font-bold text-lg px-8 py-4 mt-2">
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </main>
    </div>
  );
} 