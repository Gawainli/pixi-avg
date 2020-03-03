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
var GamePage = /** @class */ (function (_super) {
    __extends(GamePage, _super);
    function GamePage() {
        return _super.call(this) || this;
    }
    GamePage.prototype.update = function (deltaMS) { };
    GamePage.prototype.start = function () { };
    GamePage.prototype.remove = function () { };
    GamePage.prototype.destroy = function () { };
    return GamePage;
}(PIXI.Container));
exports.GamePage = GamePage;
//# sourceMappingURL=gamePage.js.map