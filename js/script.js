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

icones = shuffle(icones);
console.log(icones);

const cartas = document.getElementsByClassName('carta');
let jogada_1, jogada_2, movimentos, acertos;

movimentos = 0;
acertos = 0;
bloqueia = false;
ini = undefined

function joga(p) {
    console.log(bloqueia);
    if (bloqueia) { return; }
    if (ini === undefined) { ini = new Date(); }
    if (jogada_1 === undefined) {
        jogada_1 = p;
        mostraCarta(p);
    } else if (jogada_2 === undefined ) {
        jogada_2 = p;
        bloqueia = true;
        mostraCarta(p);
        comparaCartas(jogada_1, jogada_2);     
    }
}

function mostraCarta(p) {
    let carta;
    carta = document.getElementById(p);
    carta.classList.add('flip');
    front = carta.getElementsByClassName("front")[0];
    front.innerHTML = icones[p];
}

function comparaCartas(j_1, j_2) {
    let carta_1, carta_2;
    movimentos++;
    spanMovimentos = document.getElementById('movimentos');
    spanMovimentos.innerHTML = movimentos;
    if (icones[j_1] === icones[j_2]) {
        acertos++;
        carta_1 = document.getElementById(j_1);
        carta_2 = document.getElementById(j_2);
        carta_1.classList.add("pares");
        carta_2.classList.add("pares");
        // TODO bloquear ação nas cartas
        carta_1.removeEventListener("click", function (evt) { evt.preventDefault(); });
        carta_2.removeEventListener("click", function (evt) { evt.preventDefault(); });
        bloqueia = false;
    } else {
        console.log('erroouuuu');
        setTimeout(() => {
            carta_1 = document.getElementById(j_1);
            carta_2 = document.getElementById(j_2);
            carta_1.classList.remove('flip');
            carta_2.classList.remove('flip');
            bloqueia = false;
        }, 1500);
    }
    if (acertos === 8) {
        alert("Você ganhou!");
        clearInterval(contaTempo);
    }
    jogada_1 = jogada_2 = undefined;
}

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

// AÇÃO BOTÃO NOVO JOGO
document.getElementById('reiniciar').addEventListener('click', function(e) {
    for (var l = 0; l < cartas.length; l++) { 
        cartas[l].classList.remove("pares"); 
        cartas[l].classList.remove('flip');
    } 
    icones = shuffle(icones);
    console.log(icones);
    jogada_1 = jogada_2 = undefined;
    movimentos = acertos = 0;
    var contaTempo = setInterval(myTimer, 1000);
    document.getElementById("tempo").innerHTML = '00:00:00';
    ini = undefined;
    spanMovimentos = document.getElementById('movimentos');
    spanMovimentos.innerHTML = movimentos;
});

// AÇÃO DE CLICAR NA CARTA
for (let i = 0; i < cartas.length; i++) {
    cartas[i].addEventListener('click', function(e) {
        joga(i);
    });
}

var contaTempo = setInterval(myTimer, 1000);

function myTimer() {
    if (ini) {
        var d = new Date();
        var t = new Date(d - ini)

        var hour = t.getUTCHours();
            hour = ("0" + hour).slice(-2);
        var min = t.getUTCMinutes();
            min = ("0" + min).slice(-2);
        var sec = t.getUTCSeconds();
            sec = ("0" + sec).slice(-2);

        document.getElementById("tempo").innerHTML = hour + ":" + min + ":" + sec;
    }
}

