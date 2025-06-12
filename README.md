# 🚀 Opens - Landing Page de Diagnóstico de Atendimento

Landing page moderna e responsiva para a captação de leads do diagnóstico gratuito de atendimento da Opens.

## 📋 Características

- ✅ **Framework:** Next.js 15 com TypeScript
- ✅ **Estilização:** Tailwind CSS + Framer Motion
- ✅ **UI Components:** Radix UI + Lucide Icons
- ✅ **Responsivo:** Design otimizado para mobile e desktop
- ✅ **Performance:** Build otimizado para produção
- ✅ **SEO:** Meta tags configuradas para Opens

## 🐳 Deploy no Easypanel

### Via Dockerfile (Recomendado)

1. **Clone o repositório**
2. **No Easypanel, crie um novo projeto**
3. **Conecte ao repositório Git**
4. **Configure as variáveis:**
   - `NODE_ENV=production`
   - `PORT=3000`
5. **O Easypanel detectará automaticamente o Dockerfile**

### Via Nixpacks (Alternativo)

Se preferir usar Nixpacks em vez de Docker:

1. **No Easypanel, desabilite o Dockerfile**
2. **O Nixpacks detectará automaticamente o projeto Next.js**
3. **Configure as mesmas variáveis de ambiente**

## 🔧 Comandos Locais

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Start em produção
npm run start

# Linting
npm run lint
```

## 📦 Estrutura do Projeto

```
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   └── ui/
│       └── component.tsx  # Landing page da Opens
├── public/                # Assets estáticos
│   ├── Relatório completo.png
│   └── Cópia de Logo Solid White.png
├── Dockerfile             # Container para produção
└── next.config.mjs       # Configuração do Next.js
```

## 🌐 URL de Produção

Após o deploy, a landing page estará disponível na URL fornecida pelo Easypanel.

## 📧 Contato

Desenvolvido para **Opens** - Transformando atendimento em crescimento.
