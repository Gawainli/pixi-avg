import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';
import { GameResMgr } from "./gameResManager";
import { GameSceneMgr } from './gameSceneMgr';
// import {default as TWEEN} from '@tweenjs/tween.js';

export class GameFramework {
    pixiApp: PIXI.Application;
    rootContainer: PIXI.Container;
    oldTime = Date.now();

    designWidth: number;
    designHeight: number;
    gameWidth: number;
    gameHeight: number;

    //0:width 1:height
    adaptMode: number;

    adaptRatio: number;

    constructor(designW: number = 0, designH: number = 0) {
        this.designWidth = designW;
        this.designHeight = designH;
    }

    init() {
        this.initPIXI();
        this.pixiApp.ticker.add(this.update.bind(this));
        GameResMgr.init();
        GameSceneMgr.GetInstance().init(this.rootContainer);
    }

    private update(delta) {
        // console.log(delta);
        // console.log(this.pixiApp.ticker.elapsedMS);
        GameResMgr.update(this.pixiApp.ticker.elapsedMS);
        // TWEEN.update(this.pixiApp.ticker.elapsedMS);
    }

    private initPIXI() {
        this.pixiApp = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio, autoDensity: true });
        this.pixiApp.start()
        // PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
        this.rootContainer = new PIXI.Container();
        this.pixiApp.stage.addChild(this.rootContainer)
        this.adaptScreen();
        document.body.replaceChild(this.pixiApp.view, document.body.lastElementChild);

    }

    private adaptScreen() {
        let newWidth = 0;
        let newHeight = 0;
        let ratio = 0;
        // console.log("innerW", window.innerWidth);
        // console.log("innerH", window.innerHeight);
        // console.log("screen width", window.screen.width);
        // console.log("screen height", window.screen.height);
        // console.log("devicePixelRatio", window.devicePixelRatio);

        if (this.designHeight > this.designWidth) {
            ratio = window.innerHeight / this.designHeight;
        } else {
            ratio = window.innerWidth / this.designWidth;
        }
        this.adaptRatio = ratio;

        newWidth = Math.round(ratio * this.designWidth);// * window.devicePixelRatio;
        newHeight = Math.round(ratio * this.designHeight);// * window.devicePixelRatio;

        this.gameWidth = newWidth;
        this.gameHeight = newHeight;

        // console.log("ratio", ratio * window.devicePixelRatio);
        // console.log("new width", newWidth);
        // console.log("new height", newHeight);
        // console.log("resolution", ratio * window.devicePixelRatio);
        // this.pixiApp.renderer.resolution = window.devicePixelRatio;//ratio * window.devicePixelRatio;
        this.pixiApp.renderer.resize(newWidth, newHeight);
        // this.pixiApp.renderer.resolution = 1/window.devicePixelRatio;

        this.pixiApp.renderer.view.style.margin = 'auto';
        this.rootContainer.scale.x = ratio;
        this.rootContainer.scale.y = ratio;
    }
}
