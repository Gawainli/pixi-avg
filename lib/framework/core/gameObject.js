"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject(container) {
        this.active = true;
        this.rootContainer = new PIXI.Container();
        this.children = new Array();
        if (container != undefined) {
            this.rootContainer.addChild(container);
        }
    }
    GameObject.callObjFunction = function (fnName, obj, param) {
        if (obj == undefined || obj.active == false) {
            return;
        }
        var fn = obj[fnName];
        if (fn != undefined) {
            fn(param);
        }
        obj.children.forEach(function (element) {
            GameObject.callObjFunction(fnName, element, param);
        });
    };
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
    GameObject.prototype.add = function (child) {
        if (child == undefined) {
            return;
        }
        this.children.push(child);
        this.rootContainer.addChild(child.rootContainer);
        child.active = this.active;
        child.parent = this;
    };
    GameObject.prototype.remove = function (child) {
        var idx = this.children.indexOf(child);
        this.children.splice(idx, 1);
        this.rootContainer.removeChild(child.rootContainer);
        child.parent = null;
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=gameObject.js.map