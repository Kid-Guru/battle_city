import EventEmitter from "./event-emitter";
export default class GameObject extends EventEmitter {
    constructor({x, y, width, height, sprites} = {}) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprites = sprites;
        this.animationFrame = 0;
        this.animationSpeed = 0;
        this.frames = 0;
        this.isDestructable = false;
        this.isDestroyed = false;
    }

    static Direction = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3,
    };

    update() {
        throw new Error("Method update should be implemented in class " + this.constructor.name);
    }

    hit() {
        throw new Error("Method hit should be implemented in class " + this.constructor.name);
    }

    move(axis, value) {
        this[axis] += value * this.speed;
    }

    stop() {
        this.speed = 0;
    }

    get top() {
        return this.y;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }
}
