import Input from "./input";
import View from "./view";
import Game from "./game";
import Sprite from "./sprite";

import stages from "../data/stages";
import Img from "./assets/sprite.png";

const canvas = document.querySelector("canvas");
const sprite = new Sprite(Img);

const game = new Game({
    input: new Input(),
    view: new View(canvas, sprite),
    stages,
});

game.init();
game.start();

console.log(game);
