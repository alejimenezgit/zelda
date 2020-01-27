// variables globales

document.addEventListener('DOMContentLoaded', (event) => {

    // recojer valores
    let game = document.getElementById('game');
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
        game.classList.remove('hidden');
        splash.classList.add('hidden');
    }

    // pintar pantalla del juego
    function printGame (){
        var tbdy = document.createElement('tbody');
        tbdy.id = "idtbody";
        var total = 0;
        for (let x = 0; x < 10; x++) {
          var tr = document.createElement('tr');
          for (var y = 1; y <= 17; y++) {
              var td = document.createElement('td');
              td.id = total;
              total++;
              tr.appendChild(td);
          }
          tbdy.appendChild(tr);
        }
        game.append(tbdy);
    }

    // empezar
    function start(){
        
    }

    // pasar valores necesarios a game.js
//    game = new Game();


})