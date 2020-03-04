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
var gameScene_1 = require("../../framework/core/gameScene");
var testGameObject_1 = require("./testGameObject");
var AvgMainScene = /** @class */ (function (_super) {
    __extends(AvgMainScene, _super);
    function AvgMainScene() {
        return _super.call(this) || this;
    }
    AvgMainScene.prototype.onInit = function () {
        this.testObject = new testGameObject_1.TestGameObject();
        this.rootObject.add(this.testObject);
    };
    return AvgMainScene;
}(gameScene_1.GameScene));
exports.AvgMainScene = AvgMainScene;
//# sourceMappingURL=mainScene.js.map