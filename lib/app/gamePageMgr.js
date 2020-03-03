"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GamePageMgr = /** @class */ (function () {
    function GamePageMgr() {
        this.mapPagesToIndex = new Map();
    }
    GamePageMgr.GetInstance = function () {
        if (!GamePageMgr.instance) {
            GamePageMgr.instance = new GamePageMgr();
        }
        return GamePageMgr.instance;
    };
    GamePageMgr.prototype.update = function (deltaMS) {
        this.mapPagesToIndex[this.currentIdx].update(deltaMS);
    };
    GamePageMgr.prototype.add = function (idx, page) {
        if (this.mapPagesToIndex.has(idx)) {
            return;
        }
        this.mapPagesToIndex[idx] = page;
    };
    GamePageMgr.prototype.remove = function (idx) {
        if (!this.mapPagesToIndex.has(idx)) {
            return;
        }
        this.mapPagesToIndex[idx].stop();
        this.mapPagesToIndex[idx].destroy();
        this.mapPagesToIndex.delete(idx);
    };
    return GamePageMgr;
}());
exports.GamePageMgr = GamePageMgr;
//# sourceMappingURL=gamePageMgr.js.map