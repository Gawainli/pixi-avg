"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameSceneMgr = /** @class */ (function () {
    function GameSceneMgr() {
        this.mapIdxToSceneClass = new Map();
    }
    GameSceneMgr.GetInstance = function () {
        if (!GameSceneMgr.instance) {
            GameSceneMgr.instance = new GameSceneMgr();
        }
        return GameSceneMgr.instance;
    };
    GameSceneMgr.prototype.init = function (container) {
        this.mainContainer = container;
    };
    GameSceneMgr.prototype.update = function (deltaMS) {
        this.currentScene.update(deltaMS);
    };
    GameSceneMgr.prototype.add = function (idx, sceneName) {
        if (this.mapIdxToSceneClass.has(idx)) {
            return;
        }
        this.mapIdxToSceneClass.set(idx, sceneName);
    };
    GameSceneMgr.prototype.goto = function (idx) {
        console.log(this.mapIdxToSceneClass.has(idx));
        if (!this.mapIdxToSceneClass.has(idx)) {
            return;
        }
        if (this.currentScene != undefined) {
            this.currentScene.destroy();
            delete this.currentScene;
        }
        this.currentScene = new window["AvgMainScene"]();
        this.currentScene.init();
    };
    return GameSceneMgr;
}());
exports.GameSceneMgr = GameSceneMgr;
//# sourceMappingURL=gameSceneMgr.js.map