import { World } from "./world";
import { View } from "./view";
import { Game } from "./game";
import { Sprite } from './sprite';

import levels from "../data/levels";
import spriteImg from "./assets/spriteImg.png";

const canvas = document.querySelector("canvas");
const sprite = new Sprite(spriteImg);

const game = new Game({
  world: new World(),
  view: new View(canvas, sprite),
  levels,
});

game.init();
game.start();

console.log(game);
