document.addEventListener('DOMContentLoaded', (event) => {

    // ---------------------- START ---------------------------
    var context = document.getElementById('demo').getContext('2d');
    var game = new Game(new imgs(), new keyboard(),new map());
    game.run(context);
})








/*
    ----------------------- SPLASH -----------------------------

   // recojer valores
    let demo = document.getElementById('demo');
    let splash = document.getElementById('splash');

    //  ---------------------- splash screen ---------------------- 
    window.onload = function() { document.onkeypress = knowKey; }
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
*/