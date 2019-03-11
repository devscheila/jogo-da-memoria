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
let jogada_1, jogada_2, movimentos, acertos, estrelas;


movimentos = 0;
acertos = 0;
estrelas = '3 estrelas';
bloqueia = false;
ini = undefined


const placar = document.getElementById("stars");
placar.innerHTML = '<span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span>';

function joga(p) {
    console.log(bloqueia);
    if (bloqueia) { return; }
    if (ini === undefined) { ini = new Date(); }
    if (jogada_1 === undefined) {
        jogada_1 = p;
        mostraCarta(p);
    } else if (jogada_2 === undefined && p != jogada_1 ) {
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
    pontuacao(movimentos);
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
        setTimeout(() => {
            carta_1 = document.getElementById(j_1);
            carta_2 = document.getElementById(j_2);
            carta_1.classList.remove('flip');
            carta_2.classList.remove('flip');
            bloqueia = false;
        }, 1500);
    }
    if (acertos === 8) {
        setTimeout(() => {
            clearInterval(contaTempo);
            exibePopup(movimentos);
        }, 1000);
    }
    jogada_1 = jogada_2 = undefined;
}

function pontuacao(mov) {
    if ( mov > 8 && mov <= 12 ) {
        placar.firstElementChild.remove();
        placar.innerHTML = '<span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="far fa-star"></i></span>';
        estrelas = '2 estrelas.';
    } else if ( mov > 12  && mov <= 16 ) {
        placar.firstElementChild.remove();
        placar.innerHTML = '<span><i class="fas fa-star"></i></span><span><i class="far fa-star"></i></span><span><i class="far fa-star"></i></span>';
        estrelas = '1 estrela.';
    } else if ( mov > 16 ) {
        placar.firstElementChild.remove();
        placar.innerHTML = '<span><i class="far fa-star"></i></span><span><i class="far fa-star"></i></span><span><i class="far fa-star"></i></span>';
        estrelas = 0;
    } else {
        estrelas = '3 estrelas.';
    };
}

function exibePopup(mov) {
    document.getElementById("modal").classList.remove("modal_off");
    document.getElementById("timer").innerHTML = document.getElementById("tempo").innerHTML;
    document.getElementById("jogadas").innerHTML = mov;
    document.getElementById("estrelas").innerHTML = estrelas;
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

function recomecarJogo() {
    for (let l = 0; l < cartas.length; l++) { 
        cartas[l].classList.remove("pares"); 
        cartas[l].classList.remove('flip');
    } 
    icones = shuffle(icones);
    jogada_1 = jogada_2 = undefined;
    movimentos = acertos = 0;
    let contaTempo = setInterval(myTimer, 1000);
    document.getElementById("tempo").innerHTML = '00:00:00';
    ini = undefined;
    spanMovimentos = document.getElementById('movimentos');
    spanMovimentos.innerHTML = movimentos;
    document.getElementById("modal").classList.add("modal_off");
    placar.innerHTML = '<span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span>';
}

// AÇÃO BOTÃO NOVO JOGO E JOGAR NOVAMENTE
document.getElementById('reiniciar').addEventListener('click', recomecarJogo);
document.getElementById('replay').addEventListener('click', recomecarJogo);

// AÇÃO DE CLICAR NA CARTA
for (let i = 0; i < cartas.length; i++) {
    cartas[i].addEventListener('click', function(e) {
        joga(i);
    });
}

let contaTempo = setInterval(myTimer, 1000);

function myTimer() {
    if (ini) {
        let d = new Date();
        let t = new Date(d - ini)

        let hour = t.getUTCHours();
            hour = ("0" + hour).slice(-2);
        let min = t.getUTCMinutes();
            min = ("0" + min).slice(-2);
        let sec = t.getUTCSeconds();
            sec = ("0" + sec).slice(-2);

        document.getElementById("tempo").innerHTML = hour + ":" + min + ":" + sec;
    }
}

