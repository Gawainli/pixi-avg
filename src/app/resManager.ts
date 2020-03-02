import { Loader } from "pixi.js";
import { Dictionary } from "../dictionary";

export class ResManager {
    private static resLoader: PIXI.Loader;
    private static resKeys: string[];
    private static resUrls: string[];
    private static idle: boolean;
    private static cbDict: Dictionary<Function>;
    public static resources: PIXI.IResourceDictionary;
    public static dupReload: boolean;

    static init() {
        ResManager.resLoader = new PIXI.Loader();
        ResManager.resKeys = new Array();
        ResManager.resUrls = new Array();
        ResManager.cbDict = new Dictionary<Function>();
        ResManager.resources = {};
        ResManager.resLoader.onComplete.add(ResManager.onComplete);
        ResManager.resLoader.onProgress.add(ResManager.onProcessPerFile);
        ResManager.idle = true;
        ResManager.dupReload = true;
    }

    static asyncLoad(key: string, url: string, cb?: Function) {
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
            ResManager.cbDict.add(key, cb);
        }
    }

    static removeAllResources() {
        console.log(ResManager.resources);
        for (const key in ResManager.resources) {
            let res = ResManager.resources[key];
            if (res.loadType == 2) {
                res.texture.destroy(true);
            }
        }
        delete ResManager.resources;
        ResManager.resources = {};
    }

    static removeResource(key: string) {
        let res = ResManager.resources[key];
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
                ResManager.removeResource(d);
            }
            delete ResManager.resources[altasName];
        }
        delete ResManager.resources[key];
    }

    static onProcessPerFile(loader: PIXI.Loader, resource: PIXI.LoaderResource) {
        if (resource.isComplete) {
            let key = resource.name;
            ResManager.resources[key] = resource;
            if (ResManager.cbDict.containsKey(key)) {
                ResManager.cbDict[key](key);
                ResManager.cbDict.remove(key);
            }
        }
        else {
            console.warn("ResManager: Load failed. res:" + resource.name);
        }
    }

    static onComplete(target: Loader, resources: PIXI.IResourceDictionary) {
        // console.log("on complete", ResManager.resources);
        ResManager.resLoader.reset();
        ResManager.idle = true;
    }

    static update(dt: number) {
        if (ResManager.idle && ResManager.resKeys.length > 0) {
            while (ResManager.resKeys.length > 0) {
                let key = ResManager.resKeys.shift();
                let url = ResManager.resUrls.shift();
                ResManager.resLoader.add(key, url);
            }
            ResManager.resLoader.load();
            ResManager.idle = false;
        }
    }
}