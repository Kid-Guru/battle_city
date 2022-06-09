import {BASE_HEIGHT, BASE_POSITION, BASE_SPRITES, BASE_WIDTH} from "./constants";
import GameObject from "./game-object";

export default class Base extends GameObject {
    constructor(arguments_) {
        super(arguments_);

        this.x = BASE_POSITION[0];
        this.y = BASE_POSITION[1];
        this.width = BASE_WIDTH;
        this.height = BASE_HEIGHT;
        this.sprites = BASE_SPRITES;
        this.destroyed = false;
    }

    update() {}

    get sprite() {
        return this.sprites[Number(this.destroyed)];
    }

    hit() {
        this.emit("destroyed", this);
    }
}
