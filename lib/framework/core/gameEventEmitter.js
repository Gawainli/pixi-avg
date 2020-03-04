var GameEventEmitter = /** @class */ (function () {
    function GameEventEmitter() {
    }
    Object.defineProperty(GameEventEmitter, "Disp", {
        get: function () {
            if (GameEventEmitter._disp == undefined) {
                GameEventEmitter._disp = new PIXI.utils.EventEmitter();
            }
            return GameEventEmitter._disp;
        },
        enumerable: true,
        configurable: true
    });
    return GameEventEmitter;
}());
//# sourceMappingURL=gameEventEmitter.js.map