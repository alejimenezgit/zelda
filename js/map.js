class map{
    constructor(){
        this.cols = 15;
        this.rows = 15;
        this.tsize = 64;
        this.layers = [[
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            3, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 3, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 3, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 3, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ], [
            4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 4,
            4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 3,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            4, 0, 5, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 3, 3, 0, 0, 5, 3, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 5, 0, 4,
            4, 5, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]];
    }

    getTile = function (layer, column, rowt) {
        return this.layers[layer][rowt * this.cols + column];
    };

    isSolidTileAtXY = function (x, y) {
        var column = Math.floor(x / this.tsize);
        var rowt = Math.floor(y / this.tsize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.layers.reduce(function (res, layer, index) {
            var tile = this.getTile(index, column, rowt);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false);
    };

    getCol = function (x) {
        return Math.floor(x / this.tsize);
    };

    getRow = function (y) {
        return Math.floor(y / this.tsize);
    };

    getX = function (col) {
        return col * this.tsize;
    };

    getY = function (row) {
        return row * this.tsize;
    };
}