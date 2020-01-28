class imgs{
    constructor(){
        this.images = {};
    }

    loadImage = function (key, src) {
        var img = new Image();
    
        var d = new Promise(function (resolve, reject) {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(this);
    
            img.onerror = function () {
                reject('Could not load image: ' + src);
            };
        }.bind(this));
    
        img.src = src;
        return d;
    };

    getImage = function (key) {
        return (key in this.images) ? this.images[key] : null;
    };
    
}