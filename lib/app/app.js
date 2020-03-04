"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameFramework_1 = require("../framework/core/gameFramework");
var gameSceneMgr_1 = require("../framework/core/gameSceneMgr");
var mainScene_1 = require("./avg/mainScene");
var GameApp = /** @class */ (function () {
    function GameApp(dwidth, dheight) {
        this.framework = new gameFramework_1.GameFramework(dwidth, dheight);
        this.framework.init();
    }
    GameApp.prototype.init = function () {
        window["AvgMainScene"] = mainScene_1.AvgMainScene;
        gameSceneMgr_1.GameSceneMgr.GetInstance().add(0, "AvgMainScene");
    };
    GameApp.prototype.start = function () {
        gameSceneMgr_1.GameSceneMgr.GetInstance().goto(0);
    };
    return GameApp;
}());
exports.GameApp = GameApp;
//# sourceMappingURL=app.js.map