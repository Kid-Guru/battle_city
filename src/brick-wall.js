import {BRICK_WALL_SPRITES} from "./constants";
import Wall from "./wall";

export default class BrickWall extends Wall {
    constructor(arguments_) {
        super(arguments_);

        this.sprites = BRICK_WALL_SPRITES;
    }

    hit(bullet) {
        console.log("HIT", this, bullet);
    }
}
