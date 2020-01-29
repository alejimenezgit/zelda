class keyboard{
    constructor(){
        this.left   = 37; 
        this.right  = 39;
        this.up     = 38;
        this.down   = 40;
        this.enter  = 13;
        this.keys   = {};
    }

    listenForEvents = function (keys) {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    
        keys.forEach(function (key) {
            this.keys[key] = false;
        }.bind(this));
    }.bind(this);

    onKeyDown = function (event) {
        var keyCode = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this._keys[keyCode] = true;
        }
    }.bind(this);

    _onKeyUp = function (event) {
        var keyCode = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        }
    }.bind(this);

    isDown = function (keyCode) {
        if (!keyCode in this.keys) {
            throw new Error('Keycode ' + keyCode + ' is not being listened to');
        }
        return this.keys[keyCode];
    }.bind(this);
}