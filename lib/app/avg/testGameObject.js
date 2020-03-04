"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gameObject_1 = require("../../framework/core/gameObject");
var gameResManager_1 = require("../../framework/core/gameResManager");
var TestGameObject = /** @class */ (function (_super) {
    __extends(TestGameObject, _super);
    function TestGameObject() {
        var _this = _super.call(this) || this;
        _this.btnurl = "./images/btn.png";
        _this.lennaurl = "./images/lenna.png";
        //correct this when using callback
        _this.onInit = function () {
            _this.addButton(0, 0).on('pointertap', function () {
                _this.addLenna();
            });
            _this.addButton(0, 100).on('pointertap', function () {
                _this.removeLenna();
            });
        };
        return _this;
    }
    TestGameObject.prototype.addButton = function (x, y) {
        var btn = PIXI.Sprite.from(this.btnurl);
        btn.anchor.set(0);
        btn.x = x; //this.pixiApp.screen.width / 2;
        btn.y = y; //this.pixiApp.screen.height / 2;
        btn.interactive = true;
        btn.buttonMode = true;
        this.rootContainer.addChild(btn);
        return btn;
    };
    TestGameObject.prototype.addLenna = function () {
        var _this = this;
        gameResManager_1.GameResMgr.asyncLoad("lenna", this.lennaurl, function (key) {
            for (var index = 0; index < 3; index++) {
                _this.splenna = new PIXI.Sprite(PIXI.utils.TextureCache[key]);
                _this.splenna.anchor.set(0.5);
                _this.splenna.x = 1080 / 2 + index * 10; // / 2 + this.offset;
                _this.splenna.y = 1920 / 2 + index * 10;
                _this.rootContainer.addChild(_this.splenna);
                GameEventEmitter.Disp.emit("test");
            }
        });
    };
    TestGameObject.prototype.removeLenna = function () {
        if (this.splenna == null) {
            return;
        }
        this.rootContainer.removeChild(this.splenna);
        this.splenna.destroy({ children: true, texture: true, baseTexture: true });
        this.splenna = null;
    };
    return TestGameObject;
}(gameObject_1.GameObject));
exports.TestGameObject = TestGameObject;
//# sourceMappingURL=testGameObject.js.map