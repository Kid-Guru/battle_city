import { World } from "./world";
import { View } from "./view";
import { Game } from "./game";
import { Sprite } from './sprite';

import levels from "../data/levels";
import spriteImg from "./assets/spriteImgUp.png";
import spriteMap from '../data/sprite-map';

const canvas = document.querySelector("canvas");
const sprite = new Sprite(spriteImg, spriteMap);

const game = new Game({
  world: new World(),
  view: new View(canvas, sprite),
  levels,
});

game.init();
game.start();

console.log(game);
