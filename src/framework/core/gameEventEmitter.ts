
export class GameEventEmitter {
    private static _disp: PIXI.utils.EventEmitter;
    constructor() {
    }
    public static get Disp():PIXI.utils.EventEmitter{
        if (GameEventEmitter._disp == undefined) {
            GameEventEmitter._disp = new PIXI.utils.EventEmitter();
        }
        return GameEventEmitter._disp;
    }
}