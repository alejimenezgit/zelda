class Game {
    constructor(){
        this.init = function () {};
        this.update = function (delta) {};
        this.render = function () {};
    }

    run = function (context) {
        this.ctx = context;
        this._previousElapsed = 0;
    
        var p = this.load();
        Promise.all(p).then(function (loaded) {
            this.init();
            window.requestAnimationFrame(this.tick);
        }.bind(this));
    };

    tick = function (elapsed) {
        window.requestAnimationFrame(this.tick);
    
        // clear previous frame
        this.ctx.clearRect(0, 0, 832, 515);
    
        // compute delta time in seconds -- also cap it
        var delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;
    
        this.update(delta);
        this.render();
    }.bind(Game);

    load = function () {
        return [
            img.loadImage('tiles', '../fotos/tiles.png'),
            img.loadImage('hero', '../fotos/character.png')
        ];
    };

    init = function () {
        Keyboard.listenForEvents(
            [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        this.tileAtlas = img.getImage('tiles');
    
        this.hero = new Hero(map, 160, 160);
        this.camera = new Camera(map, 832, 515);
        this.camera.follow(this.hero);
    };

    update = function (delta) {
        // handle hero movement with arrow keys
        var dirx = 0;
        var diry = 0;
        if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
        else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
        else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
        else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
    
        this.hero.move(delta, dirx, diry);
        this.camera.update();
    };

    drawLayer = function (layer) {
        var startCol = Math.floor(this.camera.x / map.tsize);
        var endCol = startCol + (this.camera.width / map.tsize);
        var startRow = Math.floor(this.camera.y / map.tsize);
        var endRow = startRow + (this.camera.height / map.tsize);
        var offsetX = -this.camera.x + startCol * map.tsize;
        var offsetY = -this.camera.y + startRow * map.tsize;
    
        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = map.getTile(layer, c, r);
                var x = (c - startCol) * map.tsize + offsetX;
                var y = (r - startRow) * map.tsize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile - 1) * map.tsize, // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        Math.round(x),  // target x
                        Math.round(y), // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
                }
            }
        }
    };

    _drawGrid = function () {
        var width = map.cols * map.tsize;
        var height = map.rows * map.tsize;
        var x, y;
        for (var r = 0; r < map.rows; r++) {
            x = - this.camera.x;
            y = r * map.tsize - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        for (var c = 0; c < map.cols; c++) {
            x = c * map.tsize - this.camera.x;
            y = - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
    };

    render = function () {
        // draw map background layer
        this._drawLayer(0);
    
        // draw main character
        this.ctx.drawImage(
            this.hero.image,
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2);
    
        // draw map top layer
        this._drawLayer(1);
    
        this._drawGrid();
    };
}

