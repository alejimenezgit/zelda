class Game {
    constructor(img, keyboards, map){
        this.img                    = img;
        this.keyboards          = keyboards;
        this.map                = map;
        this.ctx                = undefined;
        this.previousElapsed    = 0;
        this.link               = undefined;
        this.tileAtlas          = undefined;
        this.rupee              = undefined;
        this.camera             = undefined;              
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
    }.bind(this);

    load = function () {
        return [
            this.img.loadImage('tiles', '../fotos/tiles.png'),
            this.img.loadImage('hero', '../fotos/zelda.gif'),
            this.img.loadImage('heroturn', '../fotos/turnzelda.gif'),
            this.img.loadImage('heroright', '../fotos/rightzelda.gif'),
            this.img.loadImage('heroleft', '../fotos/leftzelda.gif')
        ];
    };

    init = function () {
        this.keyboards.listenForEvents(
            [this.keyboards.left, this.keyboards.right,
             this.keyboards.up, this.keyboards.down]);
        this.tileAtlas = this.img.getImage('tiles');
        this.link = new link(this.map, 160, 160,this.img);
        this.camera = new camera(this.map, 832, 515);
        this.camera.follow(this.link);
    }.bind(this);

    update = function (delta) {
        var dirx = 0, diry = 0;
        if (this.keyboards.isDown(this.keyboards.left)) { 
            dirx = -1; 
            this.link.image = this.img.getImage('heroleft');
        }
        else if (this.keyboards.isDown(this.keyboards.right)) { 
            dirx = 1; 
            this.link.image = this.img.getImage('heroright');
        }
        else if (this.keyboards.isDown(this.keyboards.up)) { 
            diry = -1; 
            this.link.image = this.img.getImage('heroturn');
        }
        else if (this.keyboards.isDown(this.keyboards.down)) { 
            diry = 1; 
            this.link.image = this.img.getImage('hero');
        }
    
        this.link.move(delta, dirx, diry);
        this.camera.update();
    }.bind(this);

    drawLayer = function (layer) {
        var startCol = Math.floor(this.camera.x / this.map.tsize);
        var endCol = startCol + (this.camera.width / this.map.tsize);
        var startRow = Math.floor(this.camera.y / this.map.tsize);
        var endRow = startRow + (this.camera.height / this.map.tsize);
        var offsetX = -this.camera.x + startCol * this.map.tsize;
        var offsetY = -this.camera.y + startRow * this.map.tsize;
    
        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = this.map.getTile(layer, c, r);
                var x = (c - startCol) * this.map.tsize + offsetX;
                var y = (r - startRow) * this.map.tsize + offsetY;
                if (tile !== 0) {                       // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas,                 // image
                        (tile - 1) * this.map.tsize,    // source x
                        0,                              // source y
                        this.map.tsize,                 // source width
                        this.map.tsize,                 // source height
                        Math.round(x),                  // target x
                        Math.round(y),                  // target y
                        this.map.tsize,                 // target width
                        this.map.tsize                  // target height
                    );
                }
            }
        }
    }.bind(this);

    render = function () {
        this.drawLayer(0);
        this.ctx.drawImage(
            this.link.image,
            this.link.screenX - this.link.width / 2,
            this.link.screenY - this.link.height / 2);
        this.drawLayer(1);
    }.bind(this);
}

/*
        this.drawGrid();
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
    }.bind(this);


*/