// variables globales

document.addEventListener('DOMContentLoaded', (event) => {

    // recojer valores
    let game = document.getElementById('game');
    let splash = document.getElementById('splash');

    // splash screen
    window.onload = function() { document.onkeypress = mostrarInformacionCaracter; }

    // añadirlo en game?
    function mostrarInformacionCaracter(evObject) {
        var elCaracter = String.fromCharCode(evObject.which); 
        if(elCaracter === 'e'){
            game.classList.remove('hidden');
            splash.classList.add('hidden');
        }
    }

    // pintar pantalla del juego
    function printGameOver(){

    }

    // empezar
    function start(){

    }

    // pasar valores necesarios a game.js
//    game = new Game();


})