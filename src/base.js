import GameObject from "./game-object.js";

export default class Base extends GameObject {
    constructor(arguments_) {
        super(arguments_);

        this.destroyed = false;
    }

    get sprite() {
        return this.sprites[Number(this.destroyed)];
    }
}
