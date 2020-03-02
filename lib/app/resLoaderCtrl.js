"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResLoaderCtrl = /** @class */ (function () {
    function ResLoaderCtrl() {
        this.frontIdx = 0;
        this.cbDict = {};
        // this.loaders = [new PIXI.Loader(), new PIXI.Loader()];
        this.loader = new PIXI.Loader();
        this.loader.onComplete.add(this.onLoaderComplete.bind(this));
        this.pendingRes = [];
        this.cbDict['t'] = function () { };
        // console.log(this.cbDict);
    }
    ResLoaderCtrl.prototype.load = function (key, url, cb) {
        if (this.loader.loading) {
            this.pendingRes.push[key];
            this.pendingRes.push[url];
            this.cbDict[key] = cb;
        }
        else {
            this.loader.add(key, url).load();
        }
    };
    ResLoaderCtrl.prototype.getIdleLoader = function () {
        // var idx = this.frontIdx == 0 ? 1 : 0;
        return this.loader;
    };
    ResLoaderCtrl.prototype.onLoaderComplete = function (target, resources) {
        // console.log(target);
        console.log(resources);
        var date = new Date();
        // console.log(date.getTime());
        // console.log(this.cbDict);
        // for (const res in resources) {
        //     if (this.cbDict[res] != null) {
        //         this.cbDict[res]();
        //         delete this.cbDict[res];
        //     }
        // }
        // while (this.pendingRes.length > 0) {
        //     let key = this.pendingRes.shift();
        //     let url = this.pendingRes.shift();
        //     this.loader.add(key, url);
        // }
        this.loader.load();
    };
    return ResLoaderCtrl;
}());
exports.ResLoaderCtrl = ResLoaderCtrl;
//# sourceMappingURL=resLoaderCtrl.js.map