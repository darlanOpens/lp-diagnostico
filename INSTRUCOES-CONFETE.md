# Como Adicionar o Efeito de Confete em uma Página

Este documento explica como implementar o efeito de confete, similar ao da página de confirmação, em qualquer outra página do projeto.

O efeito é gerado pela biblioteca [canvas-confetti](https://www.npmjs.com/package/canvas-confetti).

## Passo a Passo para Implementação

### 1. Instalação das Dependências

Primeiro, certifique-se de que a biblioteca e seus tipos (para projetos TypeScript) estão instalados. Se não estiverem, execute os seguintes comandos no seu terminal:

```bash
# Instala a biblioteca principal
npm install canvas-confetti

# Instala os tipos para TypeScript (recomendado)
npm install -D @types/canvas-confetti
```

### 2. Implementação no Componente React

Siga os passos abaixo no arquivo do componente onde o efeito de confete será exibido (por exemplo, `sua-pagina.tsx`).

#### a. Marcar como "Client Component"

O efeito de confete precisa ser executado no navegador. Portanto, o componente React deve ser um "Client Component". Adicione a seguinte diretiva no topo do arquivo:

```tsx
"use client";
```

#### b. Importar as Dependências

Importe o `React`, os hooks `useEffect` e `useRef`, e a biblioteca `confetti`:

```tsx
import React, { useEffect } from "react";
import confetti from "canvas-confetti";
```

#### c. Adicionar o Código do Efeito

Dentro do seu componente, use o hook `useEffect` para disparar a animação assim que o componente for montado. Isso garante que o efeito seja exibido quando a página carregar.

```tsx
const SuaPaginaComConfete = () => {
  useEffect(() => {
    // Um pequeno atraso para o efeito não ser instantâneo
    const timer = setTimeout(() => {
      // Chama a função confetti com as configurações desejadas
      confetti({
        particleCount: 100, // Número de partículas de confete
        spread: 70,         // O quão espalhado o confete aparece
        origin: { y: 0.6 }, // Ponto de origem na tela (0.6 = 60% do topo)
        colors: ['#8B5CF6', '#F97316', '#EC4899', '#10B981'] // Cores customizadas
      });
    }, 500); // Atraso de 500ms

    // Limpa o timer se o componente for desmontado antes do tempo
    return () => clearTimeout(timer);
  }, []); // O array de dependências vazio [] garante que o efeito rode apenas uma vez

  return (
    <div>
      <h1>Sua Página com Efeito de Confete!</h1>
      {/* O resto do seu código JSX aqui */}
    </div>
  );
};

export default SuaPaginaComConfete;
```

### 3. Customização

Você pode customizar facilmente a animação alterando os parâmetros do objeto passado para a função `confetti()`. Alguns dos principais parâmetros são:

-   `particleCount`: O número de confetes a serem lançados.
-   `angle`: O ângulo (em graus) em que os confetes são lançados. O padrão é 90 (para cima).
-   `spread`: O quão longe (em graus) os confetes se espalham.
-   `origin`: O ponto de partida da animação na tela. `{ x: 0.5, y: 0.5 }` é o centro.
-   `colors`: Um array de strings com as cores dos confetes em formato hexadecimal.
-   `scalar`: A "velocidade" da animação. Um valor maior torna a animação mais lenta.

Para mais opções de customização, consulte a [documentação oficial do `canvas-confetti`](https://github.com/catdad/canvas-confetti#options).





