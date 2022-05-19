import { CELL_SIZE, DIRECTION } from "./constants";

export class Tank {
    direction = DIRECTION.UP;
    x = 3 * CELL_SIZE;
    y = 12 * CELL_SIZE;
    speed = 3;
    width = CELL_SIZE;
    height = CELL_SIZE;
    animationFrame = 0; // 0 or 1
    frames = [
        [0 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [1 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [6 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [7 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [4 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [5 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [2 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
        [3 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
    ];

    get sprite() {
        return this.frames[this.direction * 2 + this.animationFrame];
    }

    update(world, activeKeys) {
        if (activeKeys.has("ArrowUp")) {
            this._turn(DIRECTION.UP);
            world.canMove(this) && this._move("y", -1);
        } else if (activeKeys.has("ArrowDown")) {
            this._turn(DIRECTION.DOWN);
            world.canMove(this) && this._move("y", 1);
        } else if (activeKeys.has("ArrowLeft")) {
            this._turn(DIRECTION.LEFT);
            world.canMove(this) && this._move("x", -1);
        } else if (activeKeys.has("ArrowRight")) {
            this._turn(DIRECTION.RIGHT);
            world.canMove(this) && this._move("x", 1);
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
