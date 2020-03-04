import { GameScene } from "./gameScene";

export class GameObject {
    position: PIXI.Point;
    rootContainer: PIXI.Container;
    children: GameObject[];
    parent: GameObject;
    active: boolean;

    constructor(container?: PIXI.Container) {
        this.active = true;
        this.rootContainer = new PIXI.Container();
        this.children = new Array<GameObject>();
        if (container != undefined) {
            this.rootContainer.addChild(container);
        }
    }


    static callObjFunction(fnName: string, obj: GameObject, param?: any) {
        if (obj == undefined || obj.active == false) {
            return;
        }

        let fn = obj[fnName];
        if (fn != undefined) {
            fn(param);

        }
        obj.children.forEach(element => {
            GameObject.callObjFunction(fnName, element, param);
        })
    }

    // static destroy(target: GameObject) {
    //     if (target == undefined) {
    //         return;
    //     }
    //     let fn = target["onDestroy"];
    //     if (fn != undefined) {
    //         fn();
    //     }
    //     target.children.forEach(element => {
    //         GameObject.destroy(element);
    //     });
    //     target.removeFromParent();
    // }

    add(child: GameObject) {
        if (child == undefined) {
            return;
        }
        this.children.push(child);
        this.rootContainer.addChild(child.rootContainer);
        child.active = this.active;
        child.parent = this;
    }

    remove(child: GameObject) {
        let idx = this.children.indexOf(child);
        this.children.splice(idx, 1);
        this.rootContainer.removeChild(child.rootContainer);
        child.parent = null;
    }
}