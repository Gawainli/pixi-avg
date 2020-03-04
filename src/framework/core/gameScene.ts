import { GameObject } from "./gameObject";


export class GameScene extends PIXI.Container {

    active: boolean;
    running: boolean;
    rootObject: GameObject;

    constructor() {
        super();
        this.rootObject = new GameObject();
        this.addChild(this.rootObject.rootContainer);
    }

    onInit() { }
    onUpdate(deltaMS: number) { }
    onStart() { }
    onRemove() { }
    onDestroy() { }

    init() {
        this.onInit();
        GameObject.callObjFunction("onInit", this.rootObject);
    }

    update(deltaMS: number) {
        this.onUpdate(deltaMS);
        GameObject.callObjFunction("onUpdate", this.rootObject, deltaMS);
    }

    start() {
        this.onStart();
        GameObject.callObjFunction("onStart", this.rootObject);
    }

    remove() {
        this.onRemove();
        GameObject.callObjFunction("onRemove", this.rootObject);
    }

    destroy() {
        this.onDestroy();
        GameObject.callObjFunction("onDestroy", this.rootObject);
    }

    // addGameObject(obj: GameObject) {
    //     if (obj == undefined) {
    //         return;
    //     }
    //     this.rootObject.add(obj);
    // }

}