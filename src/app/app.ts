import { GameFramework } from "../framework/core/gameFramework";
import { GameSceneMgr } from "../framework/core/gameSceneMgr";
import { AvgMainScene } from "../framework/avg/mainScene";

export class GameApp {
    framework: GameFramework;
    constructor(dwidth: number, dheight: number) {
        this.framework = new GameFramework(dwidth, dheight);
        this.framework.init();
    }

    init() {
        window["AvgMainScene"] = AvgMainScene;
        GameSceneMgr.GetInstance().add(0, "AvgMainScene");
    }

    start() {
        GameSceneMgr.GetInstance().goto(0);
    }
}
