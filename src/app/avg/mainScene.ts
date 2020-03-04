import { GameScene } from "../../framework/core/gameScene";
import { TestGameObject } from "./testGameObject";


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