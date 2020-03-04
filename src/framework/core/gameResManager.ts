import { Loader } from "pixi.js";

export class GameResMgr {
    private static resLoader: PIXI.Loader;
    private static resKeys: string[];
    private static resUrls: string[];
    private static idle: boolean;
    private static cbDict: Map<string, Function>;//: Dictionary<Function>;
    public static resources: PIXI.IResourceDictionary;
    public static dupReload: boolean;

    static init() {
        GameResMgr.resLoader = new PIXI.Loader();
        GameResMgr.resKeys = new Array();
        GameResMgr.resUrls = new Array();
        // ResManager.cbDict = new Dictionary<Function>();
        GameResMgr.cbDict = new Map<string, Function>();
        GameResMgr.resources = {};
        GameResMgr.resLoader.onComplete.add(GameResMgr.onComplete);
        GameResMgr.resLoader.onProgress.add(GameResMgr.onProcessPerFile);
        GameResMgr.idle = true;
        GameResMgr.dupReload = true;
    }

    static asyncLoad(key: string, url: string, cb?: Function) {
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
    }

    static removeAllResources() {
        console.log(GameResMgr.resources);
        for (const key in GameResMgr.resources) {
            let res = GameResMgr.resources[key];
            if (res.loadType == 2) {
                res.texture.destroy(true);
            }
        }
        delete GameResMgr.resources;
        GameResMgr.resources = {};
    }

    static removeResource(key: string) {
        let res = GameResMgr.resources[key];
        if (res == undefined) {
            console.warn("ResManager: Remove failed. Cannot find res:" + key);
            return;
        }

        if (res.texture != undefined) {
            res.texture.destroy(true);
        }

        if (res.spineData != undefined) {
            let altasName = name + "_atlas"
            for (let index = 0; index < res.spineAtlas.pages.length; index++) {
                var element = res.spineAtlas.pages[index];
                var d = key + "_atlas_page_" + element.name;
                GameResMgr.removeResource(d);
            }
            delete GameResMgr.resources[altasName];
        }
        delete GameResMgr.resources[key];
    }

    static onProcessPerFile(loader: PIXI.Loader, resource: PIXI.LoaderResource) {
        if (resource.isComplete) {
            let key = resource.name;
            GameResMgr.resources[key] = resource;
            if (GameResMgr.cbDict.has(key)) {
                GameResMgr.cbDict.get(key)(key);
                GameResMgr.cbDict.delete(key);
            }
        }
        else {
            console.warn("ResManager: Load failed. res:" + resource.name);
        }
    }

    static onComplete(target: Loader, resources: PIXI.IResourceDictionary) {
        // console.log("on complete", ResManager.resources);
        GameResMgr.resLoader.reset();
        GameResMgr.idle = true;
    }

    static update(dt: number) {
        if (GameResMgr.idle && GameResMgr.resKeys.length > 0) {
            while (GameResMgr.resKeys.length > 0) {
                let key = GameResMgr.resKeys.shift();
                let url = GameResMgr.resUrls.shift();
                GameResMgr.resLoader.add(key, url);
            }
            GameResMgr.resLoader.load();
            GameResMgr.idle = false;
        }
    }
}