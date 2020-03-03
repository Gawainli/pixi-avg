import { GameScene } from "./gameScene";

export class GameSceneMgr {
    private static instance: GameSceneMgr;
    public static GetInstance(): GameSceneMgr {
        if (!GameSceneMgr.instance) {
            GameSceneMgr.instance = new GameSceneMgr();
        }
        return GameSceneMgr.instance;
    }

    mapIdxToSceneClass: Map<number, string>;
    currentScene: GameScene;
    private mainContainer: PIXI.Container;

    constructor() {
        this.mapIdxToSceneClass = new Map<number, string>();
    }

    init(container: PIXI.Container) {
        this.mainContainer = container;
    }

    update(deltaMS: number) {
        this.currentScene.update(deltaMS);
    }

    add(idx: number, sceneName: string) {
        if (this.mapIdxToSceneClass.has(idx)) {
            return;
        }
        this.mapIdxToSceneClass.set(idx,sceneName);
    }

    goto(idx: number) {
        console.log(this.mapIdxToSceneClass.has(idx));
        if (!this.mapIdxToSceneClass.has(idx)) {
            return;
        }
        if (this.currentScene != undefined) {
            this.currentScene.destroy();
            delete this.currentScene;
        }
        this.currentScene = new (<any>window)[this.mapIdxToSceneClass.get(idx)]();
        this.mainContainer.addChild(this.currentScene);
        this.currentScene.init();
    }
}