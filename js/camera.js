class camera{
    constructor(map, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.cols * map.tsize - width;
        this.maxY = map.rows * map.tsize - height;
    }

    follow = function (sprite) {
        this.following = sprite;
        sprite.screenX = 0;
        sprite.screenY = 0;
    };

    update = function () {
        this.following.screenX = this.width / 2;
        this.following.screenY = this.height / 2;
        this.x = this.following.x - this.width / 2;
        this.y = this.following.y - this.height / 2;
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
        if (this.following.x < this.width / 2 ||
            this.following.x > this.maxX + this.width / 2) {
            this.following.screenX = this.following.x - this.x;
        }
        if (this.following.y < this.height / 2 ||
            this.following.y > this.maxY + this.height / 2) {
            this.following.screenY = this.following.y - this.y;
        }
    };
}