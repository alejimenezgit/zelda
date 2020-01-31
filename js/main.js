document.addEventListener('DOMContentLoaded', (event) => {
    
    var context = document.getElementById('demo').getContext('2d');
    var game = new Game(new imgs(), new keyboard() ,new map());
    const startBtn = document.getElementById('start');

    startBtn.addEventListener('click', start);

    function start(keyboards){
        let demo = document.getElementById('demo');
        let splash = document.getElementById('splash');
        let maker = document.getElementById('marker');
        demo.classList.remove('hidden');
        splash.classList.add('hidden');
        maker.classList.remove('hidden');
        game.run(context); 
    }
});