import { GameObject } from "./gameObject";

export interface IScene extends PIXI.Container {

}

export class GameScene extends PIXI.Container {

    active: boolean;
    running: boolean;
    rootObject: GameObject;

    constructor() {
        super();
        this.rootObject = new GameObject();
        this.addChild(this.rootObject.rootContainer);
    }


    init() {
        GameObject.callObjFunction("onInit", this.rootObject);
    }

    update(deltaMS: number) {
        GameObject.callObjFunction("onUpdate", this.rootObject, deltaMS);
    }

    start() {
        GameObject.callObjFunction("onStart", this.rootObject);
    }

    remove() {
        GameObject.callObjFunction("onRemove", this.rootObject);
    }

    destroy() {
        GameObject.callObjFunction("onDestroy", this.rootObject);
    }

    addGameObject(obj: GameObject) {
        if (obj == undefined) {
            return;
        }
        this.rootObject.addChild(obj);
    }

}