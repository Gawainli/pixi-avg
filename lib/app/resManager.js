"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResManager = /** @class */ (function () {
    function ResManager() {
    }
    ResManager.init = function () {
        ResManager.resLoader = new PIXI.Loader();
        ResManager.resKeys = new Array();
        ResManager.resUrls = new Array();
        // ResManager.cbDict = new Dictionary<Function>();
        ResManager.cbDict = new Map();
        ResManager.resources = {};
        ResManager.resLoader.onComplete.add(ResManager.onComplete);
        ResManager.resLoader.onProgress.add(ResManager.onProcessPerFile);
        ResManager.idle = true;
        ResManager.dupReload = true;
    };
    ResManager.asyncLoad = function (key, url, cb) {
        if (ResManager.resources[key] != undefined) {
            if (ResManager.dupReload) {
                console.warn("ResManager: Duplicate res:" + key + " async reload.");
            }
            else {
                console.warn("ResManager: Duplicate res:" + key + "async load failed.");
                return;
            }
        }
        ResManager.resKeys.push(key);
        ResManager.resUrls.push(url);
        if (cb !== undefined) {
            ResManager.cbDict.set(key, cb);
        }
    };
    ResManager.removeAllResources = function () {
        console.log(ResManager.resources);
        for (var key in ResManager.resources) {
            var res = ResManager.resources[key];
            if (res.loadType == 2) {
                res.texture.destroy(true);
            }
        }
        delete ResManager.resources;
        ResManager.resources = {};
    };
    ResManager.removeResource = function (key) {
        var res = ResManager.resources[key];
        if (res == undefined) {
            console.warn("ResManager: Remove failed. Cannot find res:" + key);
            return;
        }
        if (res.texture != undefined) {
            res.texture.destroy(true);
        }
        if (res.spineData != undefined) {
            var altasName = name + "_atlas";
            for (var index = 0; index < res.spineAtlas.pages.length; index++) {
                var element = res.spineAtlas.pages[index];
                var d = key + "_atlas_page_" + element.name;
                ResManager.removeResource(d);
            }
            delete ResManager.resources[altasName];
        }
        delete ResManager.resources[key];
    };
    ResManager.onProcessPerFile = function (loader, resource) {
        if (resource.isComplete) {
            var key = resource.name;
            ResManager.resources[key] = resource;
            if (ResManager.cbDict.has(key)) {
                ResManager.cbDict[key](key);
                ResManager.cbDict.delete(key);
            }
        }
        else {
            console.warn("ResManager: Load failed. res:" + resource.name);
        }
    };
    ResManager.onComplete = function (target, resources) {
        // console.log("on complete", ResManager.resources);
        ResManager.resLoader.reset();
        ResManager.idle = true;
    };
    ResManager.update = function (dt) {
        if (ResManager.idle && ResManager.resKeys.length > 0) {
            while (ResManager.resKeys.length > 0) {
                var key = ResManager.resKeys.shift();
                var url = ResManager.resUrls.shift();
                ResManager.resLoader.add(key, url);
            }
            ResManager.resLoader.load();
            ResManager.idle = false;
        }
    };
    return ResManager;
}());
exports.ResManager = ResManager;
//# sourceMappingURL=resManager.js.map