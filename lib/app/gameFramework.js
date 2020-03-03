"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
window.PIXI = PIXI;
require("pixi-spine");
var resManager_1 = require("./resManager");
// import {TWEEN} from "tween.js";
// import * as TWEEN from 'tween.js';
var tween_js_1 = require("@tweenjs/tween.js");
var url = "./images/lenna.png";
var imgurl = "./images/test1.png";
var btnurl = "./images/btn.png";
var spurl = "./spine/hh/chara_13.json";
var GameFramework = /** @class */ (function () {
    function GameFramework(designW, designH) {
        if (designW === void 0) { designW = 0; }
        if (designH === void 0) { designH = 0; }
        this.oldTime = Date.now();
        this.added = false;
        this.offset = 0;
        this.designWidth = designW;
        this.designHeight = designH;
        // this.initPIXI();
        // this.initButton();
        // console.log(window.innerHeight, window.innerWidth);
        // this.addLenna();
        // window.requestAnimationFrame(this.update.bind(this));
    }
    GameFramework.prototype.init = function () {
        this.initPIXI();
        this.pixiApp.ticker.add(this.update.bind(this));
        resManager_1.ResManager.init();
        this.initButton();
        // this["initButton"]();
        // console.log(TWEEN.update);
        // console.log(PIXI);
        // let t = new TWEEN.Tween();
        // console.log(t);
    };
    GameFramework.prototype.update = function (delta) {
        // console.log(delta);
        // console.log(this.pixiApp.ticker.elapsedMS);
        resManager_1.ResManager.update(this.pixiApp.ticker.elapsedMS);
        tween_js_1.default.update(this.pixiApp.ticker.elapsedMS);
        // TWEEN.update();
        // TWEEN.update(this.pixiApp.ticker.elapsedMS);
    };
    GameFramework.prototype.initButton = function () {
        var _this = this;
        this.spbtn = PIXI.Sprite.from(btnurl);
        this.spbtn.anchor.set(0);
        this.spbtn.x = 0; //this.pixiApp.screen.width / 2;
        this.spbtn.y = 0; //this.pixiApp.screen.height / 2;
        this.pixiApp.stage.addChild(this.spbtn);
        this.spbtn.interactive = true;
        this.spbtn.buttonMode = true;
        // this.addLenna();
        this.spbtn.on('pointertap', function () {
            if (_this.added) {
                // this.removeAllLoadeedResource();
                _this.removeLenna();
                // this.removeSpine();
                _this.added = false;
            }
            else {
                _this.addLenna();
                // this.addSpine();
                // this.resLoader.getIdleLoader().add('lenna', url);
                // this.resLoader.getIdleLoader().add('test1', imgurl);
                // this.resLoader.getIdleLoader().load();
                _this.added = true;
            }
        });
    };
    GameFramework.prototype.initPIXI = function () {
        this.pixiApp = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio, autoDensity: true });
        this.pixiApp.start();
        PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.rootContainer = new PIXI.Container();
        this.pixiApp.stage.addChild(this.rootContainer);
        this.adaptScreen();
        this.imgLoader = new PIXI.Loader();
        this.spineLoader = new PIXI.Loader();
        document.body.replaceChild(this.pixiApp.view, document.body.lastElementChild);
        // this.container.x = (newWidth - gameWidth) / 2;
        // this.container.y = (newHeight - gameHeight) / 2;
        // this.scaleScene(this.pixiApp.renderer, this.container);
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
    GameFramework.prototype.addLenna = function () {
        // this.imgLoader.add("lenna", imgurl).load(() => {
        //     // console.log("img resources", this.imgLoader.resources);
        //     // console.log("tex cache", PIXI.utils.TextureCache);
        //     for (let index = 0; index < 1; index++) {
        //         this.splenna = new PIXI.Sprite(this.imgLoader.resources["lenna"].texture);
        //         this.splenna.anchor.set(0.5);
        //         this.splenna.x = this.designWidth / 2;// / 2 + this.offset;
        //         this.splenna.y = this.designHeight / 2;
        var _this = this;
        //         // this.splenna.scale.x = this.adaptRatio;
        //         // this.splenna.scale.y = this.adaptRatio;
        //         // this.pixiApp.stage.addChild(this.splenna);
        //         this.container.addChild(this.splenna);
        //         // this.offset += 50;
        //     }
        //     // console.log(PIXI.utils.TextureCache);
        // });
        resManager_1.ResManager.asyncLoad("test1", imgurl);
        resManager_1.ResManager.asyncLoad("test", url, function (key) {
            // console.log("tex cache", PIXI.utils.TextureCache);
            for (var index = 0; index < 3; index++) {
                _this.splenna = new PIXI.Sprite(PIXI.utils.TextureCache[key]);
                _this.splenna.anchor.set(0.5);
                _this.splenna.x = _this.designWidth / 2 + index * 10; // / 2 + this.offset;
                _this.splenna.y = _this.designHeight / 2;
                // this.splenna.scale.x = this.adaptRatio;
                // this.splenna.scale.y = this.adaptRatio;
                // this.pixiApp.stage.addChild(this.splenna);
                _this.rootContainer.addChild(_this.splenna);
                var t = new tween_js_1.default.Tween({ x: 0, y: 0 }).to({ x: 300, y: 200 }, 1000).start();
            }
        });
    };
    GameFramework.prototype.removeAllLoadeedResource = function () {
        resManager_1.ResManager.removeAllResources();
        console.log("tex cache", PIXI.utils.TextureCache);
    };
    GameFramework.prototype.removeLenna = function () {
        if (this.splenna == null) {
            return;
        }
        this.pixiApp.stage.removeChild(this.splenna);
        this.splenna.destroy({ children: true, texture: true, baseTexture: true });
        // console.log("img resources", this.imgLoader.resources);
        // console.log("tex cache", PIXI.utils.TextureCache);
        // delete this.imgLoader.resources["lenna"]
        this.splenna = null;
        // console.log("tex cache", PIXI.utils.TextureCache);
    };
    GameFramework.prototype.addSpine = function () {
        // // this.imgLoader.add('lenna', url);
        // // this.imgLoader.load();
        // // console.log("img resources", this.imgLoader.resources);
        // this.spineLoader.add('spine', spurl).load(() => {
        //     this.spine = new PIXI.spine.Spine(this.spineLoader.resources.spine.spineData);
        //     this.spine.x = this.gameWidth / 2;
        //     this.spine.y = this.gameHeight;
        //     // this.pixiApp.stage.addChild(this.spine);
        //     this.container.addChild(this.spine);
        //     // console.log("spineLoader resources added", this.spineLoader.resources);
        //     // console.log("shared resources", PIXI.Loader.shared.resources);
        //     // console.log("tex cache", PIXI.utils.TextureCache);
        //     // console.log("spine", this.spine);
        // });
        var _this = this;
        resManager_1.ResManager.asyncLoad("spine", spurl, function (key) {
            _this.spine = new PIXI.spine.Spine(resManager_1.ResManager.resources[key].spineData);
            _this.spine.x = _this.gameWidth / 2;
            _this.spine.y = _this.gameHeight;
            _this.rootContainer.addChild(_this.spine);
        });
    };
    GameFramework.prototype.removeSpine = function () {
        // console.log("spineLoader resources before remove", this.spineLoader.resources);
        this.pixiApp.stage.removeChild(this.spine);
        this.spine.destroy({ children: true, texture: true, baseTexture: true });
        resManager_1.ResManager.removeResource("spine");
        // this.removeSpineInResourceDict("spine", this.spineLoader);
        // console.log("spineLoader resources after remove", this.spineLoader.resources);
        // console.log("tex cache", PIXI.utils.TextureCache);
    };
    GameFramework.prototype.removeSpineInResourceDict = function (name, loader) {
        var spineJson = loader.resources[name];
        var altasName = name + "_atlas";
        // console.log("pages", spineJson.spineAtlas.pages);
        for (var index = 0; index < spineJson.spineAtlas.pages.length; index++) {
            var element = spineJson.spineAtlas.pages[index];
            var d = name + "_atlas_page_" + element.name;
            // console.log("remove name:" + d);
            delete loader.resources[d];
        }
        delete loader.resources[altasName];
        delete loader.resources[name];
    };
    return GameFramework;
}());
exports.GameFramework = GameFramework;
//# sourceMappingURL=gameFramework.js.map