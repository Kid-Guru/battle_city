import {STEEL_WALL_SPRITES} from "./constants";
import Wall from "./wall";

export default class SteelWall extends Wall {
    constructor(arguments_) {
        super(arguments_);

        this.sprites = STEEL_WALL_SPRITES;
    }

    hit() {
        if (this.isDestroyed) return;
    }
}
