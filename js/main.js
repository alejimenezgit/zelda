var musica = document.getElementById('audio');
var gameover = document.getElementById('gameover');
var finishgame = document.getElementById('finishgame');

document.addEventListener('DOMContentLoaded', (event) => {
    const context = document.getElementById('demo').getContext('2d');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('select');
    const restBtn  = document.getElementById('restart');
    const musicBtn = document.getElementById('musicid');    

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    restBtn.addEventListener('click', restart);
    musicBtn.addEventListener('click', music)

    const demo = document.getElementById('demo');
    const splash = document.getElementById('splash');
    const musicid = document.getElementById('audio');
    const maker = document.getElementById('marker');
    const pauseScreen = document.getElementById('pause');

    function start(){
        if(!splash.classList.contains('hidden')){
            demo.classList.remove('hidden');
            splash.classList.add('hidden');
            maker.classList.remove('hidden');
            musica.play();
            let game = new Game(new imgs(), new keyboard());
            game.run(context); 
        }
    }

    function pause(){
        if(splash.classList.contains('hidden') && 
            gameover.classList.contains('hidden') &&
            finishgame.classList.contains('hidden')){
            var musicMain = document.getElementById('musicInit');
            if(pauseScreen.classList.contains('hidden')){
                pauseScreen.classList.remove('hidden');
                demo.classList.add('hidden');
                maker.classList.add('hidden');
                musicMain.play();
                musica.pause();
            }else{
                pauseScreen.classList.add('hidden');
                musica.play();
                musicMain.pause();
                demo.classList.remove('hidden');
                maker.classList.remove('hidden');
            }
        }
    }

    function restart() {
        if(splash.classList.contains('hidden') && pauseScreen.classList.contains('hidden')){
            demo.classList.remove('hidden');
            splash.classList.add('hidden');
            maker.classList.remove('hidden');
            musica.pause();
            musica  = new Audio('./musica/zelda-main-theme-song.mp3');
            musica.play();
            const game = new Game(new imgs(), new keyboard());
            var rupe = document.getElementsByClassName('countRupees');
            rupe[0].innerHTML = 0;
            var keyMaker = document.getElementsByClassName('key');
            if(!keyMaker[0].classList.contains('hidden')){
                keyMaker[0].classList.add('hidden');
            }
            var firstHeart = document.getElementById('firstHeart');
            var secondHeart = document.getElementById('secondHeart');
            var thirdHeart = document.getElementById('thirdHeart');
            thirdHeart.src = "./fotos/heart.gif";
            secondHeart.src = "./fotos/heart.gif";
            firstHeart.src = "./fotos/heart.gif";
            if(thirdHeart.classList.contains('hidden')){
                thirdHeart.classList.remove('hidden');
            }
            if(secondHeart.classList.contains('hidden')){
                secondHeart.classList.remove('hidden');
            }
            
            if(!gameover.classList.contains('hidden')){
                gameover.classList.add('hidden');
            }
            if(!finishgame.classList.contains('hidden')){
                finishgame.classList.add('hidden');
            }
            game.run(context); 
        }
    }

    function music(){
        if(musicid.classList.contains('hidden')){
            musicid.classList.remove('hidden');
        }else{
            musicid.classList.add('hidden');
        }
    }
});