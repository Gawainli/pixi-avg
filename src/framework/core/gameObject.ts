import { GameScene } from "./gameScene";

export class GameObject {
    position: PIXI.Point;
    rootContainer: PIXI.Container;
    childrens: GameObject[];
    parent: GameObject;
    active: boolean;

    constructor() {
        this.active = true;
        this.rootContainer = new PIXI.Container();
        this.childrens = new Array<GameObject>();
    }


    static callObjFunction(fnName: string, obj: GameObject, param?: any) {
        if (obj == undefined || obj.active == false) {
            return;
        }

        let fn = obj[fnName];
        if (fn != undefined) {
            fn(param);
            obj.childrens.forEach(element => {
                GameObject.callObjFunction(fnName, element, param);
            })
        }
    }

    static destroy(target: GameObject) {
        if (target == undefined) {
            return;
        }
        let fn = target["onDestroy"];
        if (fn != undefined) {
            fn();
        }
        target.childrens.forEach(element => {
            GameObject.destroy(element);
        });
        target.removeFromParent();
    }

    addChild(child: GameObject) {
        if (child == undefined) {
            return;
        }
        this.childrens.push(child);
        this.rootContainer.addChild(child.rootContainer);
        child.active = this.active;
    }

    removeChild(child: GameObject) {
        let idx = this.childrens.indexOf(child);
        if (idx != -1) {
            this.childrens.splice(idx, 1);
        }
        this.rootContainer.removeChild(child.rootContainer);
    }

    removeFromParent() {
        if (parent != undefined) {
            this.parent.removeChild(this);
        }
    }
}