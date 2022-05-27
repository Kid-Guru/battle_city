import GameObject from "./game-object.js";

export default class Base extends GameObject {
    constructor(arguments_) {
        super(arguments_);

        this.destroyed = false;
    }

    update() {}

    get sprite() {
        return this.sprites[Number(this.destroyed)];
    }
}
