// variables globales

document.addEventListener('DOMContentLoaded', (event) => {

    // recojer valores
    let demo = document.getElementById('demo');
    let splash = document.getElementById('splash');

    // splash screen
    window.onload = function() { document.onkeypress = knowKey; }
    printGame();

    // añadirlo en game?
    function knowKey(evObject) {
        switch(String.fromCharCode(evObject.which))
        {
            case 'e':
                skipScreen();
                break;
            default:
                break;
        }
    }

    function skipScreen(){
        demo.classList.remove('hidden');
        splash.classList.add('hidden');

        // comience el juego
        start();
    }

    // pintar pantalla del juego
    function printGame (){
    }

    // empezar
    function start(){
        Game.init = function () {};
        Game.update = function (delta) {};
        Game.render = function () {};

        window.onload = function () {
            var context = document.getElementById('demo').getContext('2d');
            Game.run(context);
        };
    }

    // pasar valores necesarios a game.js
//    game = new Game();


})