import { GameObject } from "../../framework/core/gameObject";
import { GameResMgr } from "../../framework/core/gameResManager";
import { GameEventEmitter } from "../../framework/core/gameEventEmitter";


export class TestGameObject extends GameObject {
    private addbtn: PIXI.Sprite;
    private removebtn: PIXI.Sprite;
    private btnurl = "./images/btn.png";
    private splenna: PIXI.Sprite;
    private lennaurl = "./images/lenna.png";

    constructor() {
        super();
    }

    //correct this when using callback
    onInit = () => {
        this.addButton(0, 0).on('pointertap', () => {
            this.addLenna();
        });

        this.addButton(0, 100).on('pointertap', () => {
            this.removeLenna();
        });
    }

    private addButton(x: number, y: number): PIXI.Sprite {
        let btn = PIXI.Sprite.from(this.btnurl);
        btn.anchor.set(0);

        btn.x = x;//this.pixiApp.screen.width / 2;
        btn.y = y;//this.pixiApp.screen.height / 2;
        btn.interactive = true;
        btn.buttonMode = true;
        this.rootContainer.addChild(btn);
        return btn;
    }

    private addLenna() {
        GameResMgr.asyncLoad("lenna", this.lennaurl, (key: string) => {
            for (let index = 0; index < 3; index++) {
                this.splenna = new PIXI.Sprite(PIXI.utils.TextureCache[key]);
                this.splenna.anchor.set(0.5);
                this.splenna.x = 1080 / 2 + index * 10;// / 2 + this.offset;
                this.splenna.y = 1920 / 2 + index * 10;
                this.rootContainer.addChild(this.splenna);
            }

        });
    }

    private removeLenna() {
        if (this.splenna == null) {
            return;
        }
        this.rootContainer.removeChild(this.splenna);
        this.splenna.destroy({ children: true, texture: true, baseTexture: true });
        this.splenna = null;
    }

}