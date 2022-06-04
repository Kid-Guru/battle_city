import {TILE_SIZE} from "./constants";
import GameObject from "./game-object";

export default class Wall extends GameObject {
    constructor(arguments_) {
        super(arguments_);

        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
        this.spriteIndex = 0;
        this.damage = 0;
    }

    update() {}

    get sprite() {
        return this.sprites[this.spriteIndex];
    }
}
