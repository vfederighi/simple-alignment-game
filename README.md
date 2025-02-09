# Jogo de Alinhamento

## Descrição
O Jogo de Alinhamento é um jogo web interativo e divertido. O objetivo é parar uma luz que se move ao longo de um grid 5x5 (totalizando 25 quadrados). A cada rodada, a velocidade da luz aumenta, adicionando um desafio progressivo ao jogo. O jogador vence ao completar uma coluna com a luz.

## Regras do Jogo
- A tela de jogo é formada por um grid de 5x5 (totalizando 25 quadrados).
- O jogo começa após uma contagem regressiva de 3 segundos.
- Após a contagem, uma luz percorre todas as colunas da linha até o jogador apertar a tecla "ESPAÇO", parando a luz no quadrado da coluna naquele momento e passando para a linha seguinte.
- A cada mudança de linha, a velocidade da luz aumenta.
- A rodada termina após o jogador passar por todas as linhas.
- O jogo possui 3 rodadas.
- A condição de vitória é completar uma coluna.

## Interface
- **Menu Inicial:** Permite regular a velocidade inicial e o multiplicador de velocidade.
- **Jogo:** Controle a luz com a tecla "ESPAÇO" (ou toque na tela em dispositivos móveis).
- **Game Over:** Exibe se o jogador ganhou ou perdeu e o número de tentativas.
- **Tela Administrativa:** Acessível com a tecla "F" a qualquer momento, permite ajustar configurações e reiniciar a rodada. O jogo é pausado ao acessar essa tela.

## Tecnologias Utilizadas
- HTML
- CSS
- JavaScript

## Estrutura de Pastas

game/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── game.js


## Instruções para Executar
Clone o repositório:
```
bash
git clone https://github.com/seu-usuario/jogo-de-alinhamento.git
```

Navegue até o diretório do projeto:
```
bash
cd jogo-de-alinhamento
```

Abra o arquivo index.html em um navegador moderno:
```
bash
open index.html
```

## Funcionalidades Implementadas
- Menu Inicial com configurações de velocidade.
- Contagem regressiva apenas no início do jogo.
- Sistema de pontos e vidas.
- Controle por clique ou tecla espaço.
- Aceleração progressiva da luz.
- Tela de game over com estatísticas.
- Estrutura modular e orientada a objetos.
- Performance otimizada com manipulação eficiente do DOM.
- Reinício do grid a cada rodada.
- Luz iniciando sempre no array 0 de cada linha.
- Mensagem de tentativas restantes ao final de cada rodada.
- Tela administrativa acessível com a tecla "F" para configurar a velocidade inicial, o multiplicador e reiniciar a rodada.
- Pausa do jogo ao entrar na tela administrativa e retoma ao sair.

## Contribuições
Contribuições são bem-vindas! Se você tiver sugestões ou encontrar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.