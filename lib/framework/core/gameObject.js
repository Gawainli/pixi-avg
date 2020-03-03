"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject() {
        this.active = true;
    }
    GameObject.callObjFunction = function (fnName, obj, param) {
        if (obj == undefined || obj.active == false) {
            return;
        }
        var fn = obj[fnName];
        if (fn != undefined) {
            fn(param);
            obj.childrens.forEach(function (element) {
                GameObject.callObjFunction(fnName, element, param);
            });
        }
    };
    GameObject.destroy = function (target) {
        if (target == undefined) {
            return;
        }
        var fn = target["onDestroy"];
        if (fn != undefined) {
            fn();
        }
        target.childrens.forEach(function (element) {
            GameObject.destroy(element);
        });
        target.removeFromParent();
    };
    GameObject.prototype.addChild = function (child) {
        if (child == undefined) {
            return;
        }
        this.childrens.push(child);
        this.rootContainer.addChild(child.rootContainer);
        child.active = this.active;
    };
    GameObject.prototype.removeChild = function (child) {
        var idx = this.childrens.indexOf(child);
        if (idx != -1) {
            this.childrens.splice(idx, 1);
        }
        this.rootContainer.removeChild(child.rootContainer);
    };
    GameObject.prototype.removeFromParent = function () {
        if (parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=gameObject.js.map