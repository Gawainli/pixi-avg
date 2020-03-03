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
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.gameObjects = new Array();
        return _this;
    }
    GameScene.prototype.callObjFunction = function (fnName, obj, param) {
        var fn = obj[fnName];
        if (fn != undefined) {
            fn(param);
        }
    };
    GameScene.prototype.init = function () {
        var _this = this;
        this.gameObjects.forEach(function (element) {
            _this.callObjFunction("onInit", element);
        });
    };
    GameScene.prototype.update = function (deltaMS) {
        var _this = this;
        this.gameObjects.forEach(function (element) {
            _this.callObjFunction("onUpdate", element, deltaMS);
        });
    };
    GameScene.prototype.start = function () {
        var _this = this;
        this.gameObjects.forEach(function (element) {
            _this.callObjFunction("onStart", element);
        });
    };
    GameScene.prototype.remove = function () {
        var _this = this;
        this.gameObjects.forEach(function (element) {
            _this.callObjFunction("onRemove", element);
        });
    };
    GameScene.prototype.destroy = function () {
        var _this = this;
        this.gameObjects.forEach(function (element) {
            _this.callObjFunction("onDestroy", element);
        });
        delete this.gameObjects;
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;
//# sourceMappingURL=gameScene.js.map