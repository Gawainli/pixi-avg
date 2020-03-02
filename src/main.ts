import {GameApp} from "./app/app";
import { GameFramework } from "./app/gameFramework";

// const myGame = new GameApp(document.body,  window.innerWidth, window.innerHeight);
const myGame = new GameFramework(1080, 1920);
myGame.init();
