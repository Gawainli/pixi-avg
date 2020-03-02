"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_1 = require("../assets/loader");
var PIXI = require("pixi.js");
// Prepare frames
var playerFrames = loader_1.bomberFrames;
// IMPORTANT: Change this value in order to see the Hot Module Reloading!
var currentFrame = 'front';
var GameApp = /** @class */ (function () {
    function GameApp(parent, width, height) {
        this.app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x000000 });
        parent.replaceChild(this.app.view, parent.lastElementChild); // Hack for parcel HMR
        // init Pixi loader
        var loader = new PIXI.Loader();
        // Add user player assets
        console.log('Player to load', playerFrames);
        Object.keys(playerFrames).forEach(function (key) {
            loader.add(playerFrames[key]);
        });
        // Load assets
        loader.load(this.onAssetsLoaded.bind(this));
    }
    GameApp.prototype.onAssetsLoaded = function () {
        var playerIdle = new PIXI.AnimatedSprite(playerFrames[currentFrame].map(function (path) { return PIXI.Texture.from(path); }));
        /*
        * An AnimatedSprite inherits all the properties of a PIXI sprite
        * so you can change its position, its anchor, mask it, etc
        */
        playerIdle.x = 100;
        playerIdle.y = 150;
        playerIdle['vx'] = 1;
        playerIdle.anchor.set(0, 1);
        // playerIdle.anchor.set(0.5);
        playerIdle.animationSpeed = 0.3;
        playerIdle.play();
        this.app.stage.addChild(playerIdle);
    };
    return GameApp;
}());
exports.GameApp = GameApp;
//# sourceMappingURL=app.js.map