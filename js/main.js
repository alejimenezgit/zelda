document.addEventListener('DOMContentLoaded', (event) => {
    
    const context = document.getElementById('demo').getContext('2d');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('select');
    const restBtn  = document.getElementById('restart');

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    restBtn.addEventListener('click', restart);

    const demo = document.getElementById('demo');
    const splash = document.getElementById('splash');
    const maker = document.getElementById('marker');
    const pauseScreen = document.getElementById('pause');

    function start(){
        if(!splash.classList.contains('hidden')){
            demo.classList.remove('hidden');
            splash.classList.add('hidden');
            maker.classList.remove('hidden');
            let game = new Game(new imgs(), new keyboard());
            game.run(context); 
        }
    }

    function pause(){
        if(splash.classList.contains('hidden')){
            if(pauseScreen.classList.contains('hidden')){
                pauseScreen.classList.remove('hidden');
                demo.classList.add('hidden');
                maker.classList.add('hidden');
            }else{
                pauseScreen.classList.add('hidden');
                demo.classList.remove('hidden');
                maker.classList.remove('hidden');
            }
        }
    }

    function restart() {
        if(splash.classList.contains('hidden')){
            demo.classList.remove('hidden');
            splash.classList.add('hidden');
            maker.classList.remove('hidden');
            const game = new Game(new imgs(), new keyboard());
            var rupe = document.getElementsByClassName('countRupees');
            rupe[0].innerHTML = 0;
            game.run(context); 
        }
    }
});