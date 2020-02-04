document.addEventListener('DOMContentLoaded', (event) => {
    
    var context = document.getElementById('demo').getContext('2d');
    var game = new Game(new imgs(), new keyboard() ,new map());

    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('select');
    const restBtn  = document.getElementById('buttonRest');
    const contBtn  = document.getElementById('buttonContinuar');

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    restBtn.addEventListener('click', start);
    contBtn.addEventListener('click', cont);

    let demo = document.getElementById('demo');
    let splash = document.getElementById('splash');
    
    let maker = document.getElementById('marker');
    let pauseScreen = document.getElementById('pause');

    function start(){
        if(!splash.classList.contains('hidden')){
            demo.classList.remove('hidden');
            splash.classList.add('hidden');
            maker.classList.remove('hidden');
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

    function cont(){
        pauseScreen.classList.remove('hidden');
    }
});