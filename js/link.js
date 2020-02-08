class link{
    constructor(map, x, y, img){
        this.map    = map;
        this.x      = x;
        this.y      = y;
        this.width  = map.tsize;
        this.height = map.tsize;
        this.image  = img.getImage('hero');
        this.speed  = 3000;
        this.life   = [1,2,3,4,5,6];
        this.count  = 0;
    }

    move = function (delta, dirx, diry) {
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;
    
        this._collide(dirx, diry);
    
        var maxX = this.map.cols * this.map.tsize;
        var maxY = this.map.rows * this.map.tsize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    };

    _collide = function (dirx, diry) {
        var row, col;
        var left = this.x - this.width / 2 ;
        var right = this.x + this.width / 2 - 1;
        var top = this.y - this.height / 2;
        var bottom = this.y + this.height / 2 - 1;
    
        var collision =
            this.map.isSolidTileAtXY(left, top) ||
            this.map.isSolidTileAtXY(right, top) ||
            this.map.isSolidTileAtXY(right, bottom) ||
            this.map.isSolidTileAtXY(left, bottom);

        var enemy =
            this.map.isEnemy(left, top) ||
            this.map.isEnemy(right, top) ||
            this.map.isEnemy(right, bottom) ||
            this.map.isEnemy(left, bottom);

        var rupee = 
            this.map.isRupee(left, top) ||
            this.map.isRupee(right, top) ||
            this.map.isRupee(right, bottom) ||
            this.map.isRupee(left, bottom);
        
        var key = 
            this.map.iskey(left, top) ||
            this.map.iskey(right, top) ||
            this.map.iskey(right, bottom) ||
            this.map.iskey(left, bottom);

        var zelda = 
            this.map.isZelda(left, top) ||
            this.map.isZelda(right, top) ||
            this.map.isZelda(right, bottom) ||
            this.map.isZelda(left, bottom);


        if(enemy) { 
            var firstHeart = document.getElementById('firstHeart');
            var secondHeart = document.getElementById('secondHeart');
            var thirdHeart = document.getElementById('thirdHeart');
            this.count++;
            if(this.count == 20){
                this.life.pop();
                switch (this.life.length){
                    case 5:
                        thirdHeart.src = "./fotos/halfheart.gif";
                        this.count = 0;
                        break;
                    case 4:
                        thirdHeart.classList.add('hidden');
                        this.count = 0;
                        break;
                    case 3:
                        secondHeart.src = "./fotos/halfheart.gif";
                        this.count = 0;
                        break;
                    case 2:
                        secondHeart.classList.add('hidden');
                        this.count = 0;
                        break;
                    case 1:
                        firstHeart.src = "./fotos/halfheart.gif";
                        this.count = 0;
                        break;
                    case 0:
                        var gameover = document.getElementById('gameover');
                        gameover.classList.remove('hidden');
                        break;
                }
            }
        }
        else if (collision) { 
            if (diry > 0) {
                row = this.map.getRow(bottom);
                this.y = -this.height / 2 + this.map.getY(row);
            }
            else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.height / 2 + this.map.getY(row + 1);
            }
            else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.width / 2 + this.map.getX(col);
            }
            else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.width / 2 + this.map.getX(col + 1);
            }
        }
        else{
            return;
        }
    };
}