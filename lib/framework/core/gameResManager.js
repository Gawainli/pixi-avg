"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameResMgr = /** @class */ (function () {
    function GameResMgr() {
    }
    GameResMgr.init = function () {
        GameResMgr.resLoader = new PIXI.Loader();
        GameResMgr.resKeys = new Array();
        GameResMgr.resUrls = new Array();
        // ResManager.cbDict = new Dictionary<Function>();
        GameResMgr.cbDict = new Map();
        GameResMgr.resources = {};
        GameResMgr.resLoader.onComplete.add(GameResMgr.onComplete);
        GameResMgr.resLoader.onProgress.add(GameResMgr.onProcessPerFile);
        GameResMgr.idle = true;
        GameResMgr.dupReload = true;
    };
    GameResMgr.asyncLoad = function (key, url, cb) {
        if (GameResMgr.resources[key] != undefined) {
            if (GameResMgr.dupReload) {
                console.warn("ResManager: Duplicate res:" + key + " async reload.");
            }
            else {
                console.warn("ResManager: Duplicate res:" + key + "async load failed.");
                return;
            }
        }
        GameResMgr.resKeys.push(key);
        GameResMgr.resUrls.push(url);
        if (cb !== undefined) {
            GameResMgr.cbDict.set(key, cb);
        }
    };
    GameResMgr.removeAllResources = function () {
        console.log(GameResMgr.resources);
        for (var key in GameResMgr.resources) {
            var res = GameResMgr.resources[key];
            if (res.loadType == 2) {
                res.texture.destroy(true);
            }
        }
        delete GameResMgr.resources;
        GameResMgr.resources = {};
    };
    GameResMgr.removeResource = function (key) {
        var res = GameResMgr.resources[key];
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
                GameResMgr.removeResource(d);
            }
            delete GameResMgr.resources[altasName];
        }
        delete GameResMgr.resources[key];
    };
    GameResMgr.onProcessPerFile = function (loader, resource) {
        if (resource.isComplete) {
            var key = resource.name;
            GameResMgr.resources[key] = resource;
            if (GameResMgr.cbDict.has(key)) {
                GameResMgr.cbDict[key](key);
                GameResMgr.cbDict.delete(key);
            }
        }
        else {
            console.warn("ResManager: Load failed. res:" + resource.name);
        }
    };
    GameResMgr.onComplete = function (target, resources) {
        // console.log("on complete", ResManager.resources);
        GameResMgr.resLoader.reset();
        GameResMgr.idle = true;
    };
    GameResMgr.update = function (dt) {
        if (GameResMgr.idle && GameResMgr.resKeys.length > 0) {
            while (GameResMgr.resKeys.length > 0) {
                var key = GameResMgr.resKeys.shift();
                var url = GameResMgr.resUrls.shift();
                GameResMgr.resLoader.add(key, url);
            }
            GameResMgr.resLoader.load();
            GameResMgr.idle = false;
        }
    };
    return GameResMgr;
}());
exports.GameResMgr = GameResMgr;
//# sourceMappingURL=gameResManager.js.map