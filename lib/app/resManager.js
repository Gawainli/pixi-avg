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
var dictionary_1 = require("../dictionary");
var ResManager = /** @class */ (function (_super) {
    __extends(ResManager, _super);
    function ResManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResManager.init = function () {
        ResManager.resLoader = new PIXI.Loader();
        ResManager.resKeys = new Array();
        ResManager.resUrls = new Array();
        ResManager.cbDict = new dictionary_1.Dictionary();
        ResManager.resources = {};
        ResManager.resLoader.onComplete.add(ResManager.onComplete);
        ResManager.idle = true;
    };
    ResManager.asyncLoad = function (key, url, cb) {
        // ResManager.resLoader.add(key, url).load();
        if (ResManager.resources[key] != null) {
        }
        ResManager.resKeys.push(key);
        ResManager.resUrls.push(url);
        if (cb !== null) {
            ResManager.cbDict.add(key, cb);
        }
    };
    ResManager.onComplete = function (target, resources) {
        console.log("complete target", target);
        console.log("complete resources", resources["test"]);
        for (var key in resources) {
            console.log("key", key);
            ResManager.resources[key] = resources[key];
        }
        ResManager.resLoader.reset();
        ResManager.idle = true;
        console.log(ResManager.resources);
        console.log(ResManager.resLoader.resources);
        console.log(PIXI.utils.TextureCache);
    };
    ResManager.update = function (dt) {
        if (ResManager.idle && ResManager.resKeys.length > 0) {
            while (ResManager.resKeys.length > 0) {
                console.log(ResManager.resKeys);
                var key = ResManager.resKeys.shift();
                var url = ResManager.resUrls.shift();
                ResManager.resLoader.add(key, url);
                console.log(ResManager.resKeys);
                console.log("start loading");
            }
            ResManager.resLoader.load();
            ResManager.idle = false;
        }
    };
    return ResManager;
}(PIXI.utils.EventEmitter));
exports.ResManager = ResManager;
//# sourceMappingURL=resManager.js.map