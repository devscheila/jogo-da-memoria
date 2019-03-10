/*
1. Lógica do Jogo da Memória:
O jogo aleatoriamente embaralha as cartas. Um usuário ganha quando todas as cartas forem correspondidas com sucesso.
    ao clicar na carta:
    - definir icone da carta
    - mostrar icone
    - clicar na segunda carta
    - comparar posição da carta com posição do array
    - se for igual mudar a classe "pares"
    - desativar clique de cartas "pares"
    - limitar a duas jogadas por vez
    - timer para desvirar as cartas
    - exibir mensagem final de partida

2. Parabéns Popup:
Quando um usuário vence o jogo, um modal aparece para parabenizar o jogador e perguntar se ele quer jogar novamente.
Ele também deve informar ao usuário quanto tempo demorou para ganhar o jogo e qual foi a classificação por estrelas.

3. Botão Reiniciar:
Um botão de reinicialização permite que o jogador redefina o tabuleiro de jogo, o cronômetro e a classificação por estrelas.

4. Classificação por estrelas:
O jogo exibe uma classificação por estrelas (de 1 a pelo menos 3) que reflete o desempenho do jogador.
No início de um jogo, ele deve exibir pelo menos 3 estrelas. Depois de alguns movimentos, ele deve mudar
para uma classificação menor de estrelas. Depois de mais alguns movimentos, ele deve mudar para uma
classificação de estrelas ainda mais baixa (até 1).
O número de movimentos necessários para mudar a classificação depende de você, mas isso deve acontecer em algum momento.

5. Cronômetro:
Quando o jogador inicia um jogo, um temporizador exibido também deve começar. Quando o jogador vence o jogo, o cronômetro para.

6. Mover Contador:
O jogo exibe o número atual de movimentos que um usuário fez.

Extras:
- Adicione animações CSS quando os cartões forem clicados, correspondidos sem sucesso e correspondidos com êxito.
- Adicione funcionalidade exclusiva além dos requisitos mínimos (Implemente um placar, armazene o estado do jogo usando o armazenamento local, etc.)
- Implemente otimizações adicionais que melhorem o desempenho e a experiência do usuário do jogo (atalhos de teclado para jogabilidade, etc.).

*/

/* Array de icones */

let icones = [ '<i class="fas fa-dove"></i>', '<i class="fas fa-dove"></i>',
    '<i class="fas fa-child"></i>', '<i class="fas fa-child"></i>',
    '<i class="fas fa-bomb"></i>', '<i class="fas fa-bomb"></i>',
    '<i class="fas fa-bell"></i>', '<i class="fas fa-bell"></i>',
    '<i class="fas fa-anchor"></i>', '<i class="fas fa-anchor"></i>',
    '<i class="fas fa-heart"></i>', '<i class="fas fa-heart"></i>',
    '<i class="fas fa-umbrella"></i>', '<i class="fas fa-umbrella"></i>',
    '<i class="fas fa-tooth"></i>', '<i class="fas fa-tooth"></i>'];

/* Embaralhar cartas - fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

icones = shuffle(icones);

let clique = document.getElementsByClassName('carta');

for (let i = 0; i < clique.length; i++) {
    clique[i].addEventListener('click', function(e) {
        console.log(e);
        joga(e.target.id);
    });
}

document.getElementById('reiniciar').addEventListener('click', function(e) {
    for (var l = 0; l < clique.length; l++) { 
        clique[l].classList.remove("ativo"); 
        clique[l].classList.remove("pares"); 
    } 
    icones = shuffle(icones);
    jogada_1 = jogada_2 = undefined;
    movimentos = acertos = 0;
});

let jogada_1, jogada_2, movimentos, acertos;
movimentos = 0;
acertos = 0;

function joga(p) {
    if (jogada_1 === undefined) {
        jogada_1 = p;
        mostraCarta(p);
    } else if (jogada_2 === undefined ) {
        jogada_2 = p;
        mostraCarta(p);
        comparaCartas(jogada_1, jogada_2);
    }
}

function mostraCarta(p) {
    let carta;
    console.log(p);
    //carta = document.getElementById(p).getElementsByClassName("back")[0];
    //carta.innerHTML = icones[p];
}

function comparaCartas(j_1, j_2) {
    let carta_1, carta_2;
    movimentos++;
    spanMovimentos = document.getElementById('movimentos');
    spanMovimentos.innerHTML = movimentos;
    if (icones[j_1] === icones[j_2]) {
        acertos++;
        carta_1 = document.getElementById(j_1);
        carta_1.classList.remove("ativo");
        carta_1.classList.add("pares");
        carta_2 = document.getElementById(j_2);
        carta_2.classList.remove("ativo");
        carta_2.classList.add("pares");
    } else {
        carta_1 = document.getElementById(j_1);
        carta_1.classList.remove("ativo");
        carta_2 = document.getElementById(j_2);
        carta_2.classList.remove("ativo");
    }
    if (acertos === 8) {
        alert("Você ganhou!");
    }
    jogada_1 = jogada_2 = undefined;
}

function reiniciar(icones) {
    //jogada_1 = jogada_2 = undefined;
    //movimentos = acertos = 0;
    let cartas = document.getElementsByClassName('carta');
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].classList.remove("ativo");
    }
    console.log("clique");
    shuffle(icones);

}



/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
*/

const cards = document.querySelectorAll('.carta');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));