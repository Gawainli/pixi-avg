"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
window.PIXI = PIXI;
require("pixi-spine");
var gameResManager_1 = require("./gameResManager");
var gameSceneMgr_1 = require("./gameSceneMgr");
// import {default as TWEEN} from '@tweenjs/tween.js';
var GameFramework = /** @class */ (function () {
    function GameFramework(designW, designH) {
        if (designW === void 0) { designW = 0; }
        if (designH === void 0) { designH = 0; }
        this.oldTime = Date.now();
        this.designWidth = designW;
        this.designHeight = designH;
    }
    GameFramework.prototype.init = function () {
        this.initPIXI();
        this.pixiApp.ticker.add(this.update.bind(this));
        gameResManager_1.GameResMgr.init();
        gameSceneMgr_1.GameSceneMgr.GetInstance().init(this.rootContainer);
    };
    GameFramework.prototype.update = function (delta) {
        // console.log(delta);
        // console.log(this.pixiApp.ticker.elapsedMS);
        gameResManager_1.GameResMgr.update(this.pixiApp.ticker.elapsedMS);
        // TWEEN.update(this.pixiApp.ticker.elapsedMS);
    };
    GameFramework.prototype.initPIXI = function () {
        this.pixiApp = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio, autoDensity: true });
        this.pixiApp.start();
        // PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
        this.rootContainer = new PIXI.Container();
        this.pixiApp.stage.addChild(this.rootContainer);
        this.adaptScreen();
        document.body.replaceChild(this.pixiApp.view, document.body.lastElementChild);
    };
    GameFramework.prototype.adaptScreen = function () {
        var newWidth = 0;
        var newHeight = 0;
        var ratio = 0;
        // console.log("innerW", window.innerWidth);
        // console.log("innerH", window.innerHeight);
        // console.log("screen width", window.screen.width);
        // console.log("screen height", window.screen.height);
        // console.log("devicePixelRatio", window.devicePixelRatio);
        if (this.designHeight > this.designWidth) {
            ratio = window.innerHeight / this.designHeight;
        }
        else {
            ratio = window.innerWidth / this.designWidth;
        }
        this.adaptRatio = ratio;
        newWidth = Math.round(ratio * this.designWidth); // * window.devicePixelRatio;
        newHeight = Math.round(ratio * this.designHeight); // * window.devicePixelRatio;
        this.gameWidth = newWidth;
        this.gameHeight = newHeight;
        // console.log("ratio", ratio * window.devicePixelRatio);
        // console.log("new width", newWidth);
        // console.log("new height", newHeight);
        // console.log("resolution", ratio * window.devicePixelRatio);
        // this.pixiApp.renderer.resolution = window.devicePixelRatio;//ratio * window.devicePixelRatio;
        this.pixiApp.renderer.resize(newWidth, newHeight);
        // this.pixiApp.renderer.resolution = 1/window.devicePixelRatio;
        this.pixiApp.renderer.view.style.margin = 'auto';
        this.rootContainer.scale.x = ratio;
        this.rootContainer.scale.y = ratio;
    };
    return GameFramework;
}());
exports.GameFramework = GameFramework;
//# sourceMappingURL=gameFramework.js.map