import { GameScene } from "../../framework/core/gameScene";
import { TestGameObject } from "./testGameObject";
import { GameEventEmitter } from "../../framework/core/gameEventEmitter";


export class AvgMainScene extends GameScene {

    testObject: TestGameObject;

    constructor() {
        super();
    }

    onInit() {
        this.testObject = new TestGameObject();
        this.rootObject.add(this.testObject);
    }

}