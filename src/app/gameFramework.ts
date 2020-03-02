import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';
import { ResManager } from "../app/resManager";

var url = "./images/lenna.png";
var imgurl = "./images/test1.png";
var btnurl = "./images/btn.png";
var spurl = "./spine/hh/chara_13.json";

export class GameFramework {
    pixiApp: PIXI.Application;
    container: PIXI.Container;
    spbtn: PIXI.Sprite;
    splenna: PIXI.Sprite;
    added: boolean;
    offset: number;

    spine: PIXI.spine.Spine;

    imgLoader: PIXI.Loader;
    spineLoader: PIXI.Loader;

    oldTime = Date.now();

    designWidth: number;
    designHeight: number;

    gameWidth: number;
    gameHeight: number;

    //0:width 1:height
    adaptMode: number;

    adaptRatio: number;

    constructor(designW: number = 0, designH: number = 0) {
        this.added = false;
        this.offset = 0;
        this.designWidth = designW;
        this.designHeight = designH;
        // this.initPIXI();
        // this.initButton();
        console.log(window.innerHeight, window.innerWidth);
        // this.addLenna();
        // window.requestAnimationFrame(this.update.bind(this));

    }

    init() {
        this.initPIXI();
        this.pixiApp.ticker.add(this.update.bind(this));
        ResManager.init();
        this.initButton();
    }

    private update(delta) {
        // console.log(delta);
        // console.log(this.pixiApp.ticker.elapsedMS);
        ResManager.update(this.pixiApp.ticker.elapsedMS);
    }

    private initButton() {
        this.spbtn = PIXI.Sprite.from(btnurl);
        this.spbtn.anchor.set(0);

        this.spbtn.x = 0;//this.pixiApp.screen.width / 2;
        this.spbtn.y = 0;//this.pixiApp.screen.height / 2;

        this.pixiApp.stage.addChild(this.spbtn);

        this.spbtn.interactive = true;
        this.spbtn.buttonMode = true;

        // this.addLenna();

        this.spbtn.on('pointertap', () => {
            if (this.added) {
                // this.removeAllLoadeedResource();
                // this.removeLenna();
                this.removeSpine();
                this.added = false;
            }
            else {
                // this.addLenna();
                this.addSpine();
                // this.resLoader.getIdleLoader().add('lenna', url);
                // this.resLoader.getIdleLoader().add('test1', imgurl);
                // this.resLoader.getIdleLoader().load();
                this.added = true;
            }
        })
    }

    private initPIXI() {
        this.pixiApp = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio, autoDensity: true });
        this.pixiApp.start()
        PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.container = new PIXI.Container();
        this.pixiApp.stage.addChild(this.container)
        this.adaptScreen();

        this.imgLoader = new PIXI.Loader();
        this.spineLoader = new PIXI.Loader();
        document.body.replaceChild(this.pixiApp.view, document.body.lastElementChild);


        // this.container.x = (newWidth - gameWidth) / 2;
        // this.container.y = (newHeight - gameHeight) / 2;
        // this.scaleScene(this.pixiApp.renderer, this.container);
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
        this.container.scale.x = ratio;
        this.container.scale.y = ratio;
    }


    private addLenna() {

        // this.imgLoader.add("lenna", imgurl).load(() => {
        //     // console.log("img resources", this.imgLoader.resources);
        //     // console.log("tex cache", PIXI.utils.TextureCache);
        //     for (let index = 0; index < 1; index++) {
        //         this.splenna = new PIXI.Sprite(this.imgLoader.resources["lenna"].texture);
        //         this.splenna.anchor.set(0.5);
        //         this.splenna.x = this.designWidth / 2;// / 2 + this.offset;
        //         this.splenna.y = this.designHeight / 2;

        //         // this.splenna.scale.x = this.adaptRatio;
        //         // this.splenna.scale.y = this.adaptRatio;
        //         // this.pixiApp.stage.addChild(this.splenna);
        //         this.container.addChild(this.splenna);
        //         // this.offset += 50;
        //     }

        //     // console.log(PIXI.utils.TextureCache);
        // });

        ResManager.asyncLoad("test1", imgurl);
        ResManager.asyncLoad("test", url, (key: string) => {
            console.log("tex cache", PIXI.utils.TextureCache);

            for (let index = 0; index < 3; index++) {
                this.splenna = new PIXI.Sprite(PIXI.utils.TextureCache[key]);
                this.splenna.anchor.set(0.5);
                this.splenna.x = this.designWidth / 2 + index * 10;// / 2 + this.offset;
                this.splenna.y = this.designHeight / 2;

                // this.splenna.scale.x = this.adaptRatio;
                // this.splenna.scale.y = this.adaptRatio;
                // this.pixiApp.stage.addChild(this.splenna);
                this.container.addChild(this.splenna);
            }
        });


    }

    private removeAllLoadeedResource() {
        ResManager.removeAllResources();
        console.log("tex cache", PIXI.utils.TextureCache);
    }

    private removeLenna() {
        if (this.splenna == null) {
            return;
        }
        this.pixiApp.stage.removeChild(this.splenna);
        this.splenna.destroy({ children: true, texture: true, baseTexture: true });
        // console.log("img resources", this.imgLoader.resources);
        // console.log("tex cache", PIXI.utils.TextureCache);
        // delete this.imgLoader.resources["lenna"]
        this.splenna = null;
        console.log("tex cache", PIXI.utils.TextureCache);
    }

    private addSpine() {
        // // this.imgLoader.add('lenna', url);
        // // this.imgLoader.load();
        // // console.log("img resources", this.imgLoader.resources);
        // this.spineLoader.add('spine', spurl).load(() => {
        //     this.spine = new PIXI.spine.Spine(this.spineLoader.resources.spine.spineData);
        //     this.spine.x = this.gameWidth / 2;
        //     this.spine.y = this.gameHeight;
        //     // this.pixiApp.stage.addChild(this.spine);
        //     this.container.addChild(this.spine);
        //     // console.log("spineLoader resources added", this.spineLoader.resources);
        //     // console.log("shared resources", PIXI.Loader.shared.resources);
        //     // console.log("tex cache", PIXI.utils.TextureCache);
        //     // console.log("spine", this.spine);
        // });

        ResManager.asyncLoad("spine", spurl, (key: string) => {
            this.spine = new PIXI.spine.Spine(ResManager.resources[key].spineData);
            this.spine.x = this.gameWidth / 2;
            this.spine.y = this.gameHeight;
            this.container.addChild(this.spine);
        })
    }

    private removeSpine() {
        // console.log("spineLoader resources before remove", this.spineLoader.resources);
        this.pixiApp.stage.removeChild(this.spine);
        this.spine.destroy({ children: true, texture: true, baseTexture: true });
        ResManager.removeResource("spine");
        // this.removeSpineInResourceDict("spine", this.spineLoader);
        // console.log("spineLoader resources after remove", this.spineLoader.resources);
        // console.log("tex cache", PIXI.utils.TextureCache);
    }

    private removeSpineInResourceDict(name: string, loader: PIXI.Loader) {
        var spineJson = loader.resources[name];
        var altasName = name + "_atlas"
        // console.log("pages", spineJson.spineAtlas.pages);
        for (let index = 0; index < spineJson.spineAtlas.pages.length; index++) {
            var element = spineJson.spineAtlas.pages[index];
            var d = name + "_atlas_page_" + element.name;
            // console.log("remove name:" + d);
            delete loader.resources[d];
        }
        delete loader.resources[altasName];
        delete loader.resources[name];
    }
}
