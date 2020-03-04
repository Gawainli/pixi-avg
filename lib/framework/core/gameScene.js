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
var gameObject_1 = require("./gameObject");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.rootObject = new gameObject_1.GameObject();
        _this.addChild(_this.rootObject.rootContainer);
        return _this;
    }
    GameScene.prototype.onInit = function () { };
    GameScene.prototype.onUpdate = function (deltaMS) { };
    GameScene.prototype.onStart = function () { };
    GameScene.prototype.onRemove = function () { };
    GameScene.prototype.onDestroy = function () { };
    GameScene.prototype.init = function () {
        this.onInit();
        gameObject_1.GameObject.callObjFunction("onInit", this.rootObject);
    };
    GameScene.prototype.update = function (deltaMS) {
        this.onUpdate(deltaMS);
        gameObject_1.GameObject.callObjFunction("onUpdate", this.rootObject, deltaMS);
    };
    GameScene.prototype.start = function () {
        this.onStart();
        gameObject_1.GameObject.callObjFunction("onStart", this.rootObject);
    };
    GameScene.prototype.remove = function () {
        this.onRemove();
        gameObject_1.GameObject.callObjFunction("onRemove", this.rootObject);
    };
    GameScene.prototype.destroy = function () {
        this.onDestroy();
        gameObject_1.GameObject.callObjFunction("onDestroy", this.rootObject);
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;
//# sourceMappingURL=gameScene.js.map