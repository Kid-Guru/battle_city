import { DIRECTION } from "./constants";

export class Tank {

    constructor({ x, y, width, height, direction, speed, frames }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.speed = speed;
        this.frames = frames;
        this.animationFrame = 0; // 0 or 1
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

    get sprite() {
        return this.frames[this.direction * 2 + this.animationFrame];
    }

    update(world, activeKeys) {
        if (activeKeys.has('ArrowUp')) {
            this._turn(DIRECTION.UP);
            this._move('y', -1);

            if (world.isOutOfBounds(this) || world.hasCollision(this)) {
                this._move('y', 1);
            }
        } else if (activeKeys.has('ArrowRight')) {
            this._turn(DIRECTION.RIGHT);
            this._move('x', 1);

            if (world.isOutOfBounds(this) || world.hasCollision(this)) {
                this._move('x', -1);
            }
        } else if (activeKeys.has('ArrowDown')) {
            this._turn(DIRECTION.DOWN);
            this._move('y', 1);

            if (world.isOutOfBounds(this) || world.hasCollision(this)) {
                this._move('y', -1);
            }
        } else if (activeKeys.has('ArrowLeft')) {
            this._turn(DIRECTION.LEFT);
            this._move('x', -1);

            if (world.isOutOfBounds(this) || world.hasCollision(this)) {
                this._move('x', 1);
            }
        }
    }

    _turn(direction) {
        this.direction = direction;
    }

    _move(axis, value) {
        this[axis] += value * this.speed;
        this.animationFrame ^= 1;
    }
}
