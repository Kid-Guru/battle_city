import GameObject from "./game-object";
import {getAxisForDirection, getValueForDirection} from "./utils";

export default class Bullet extends GameObject {
    constructor({direction, speed, tank, ...properties}) {
        super(properties);
        this.direction = direction;
        this.speed = speed;
        this.tank = tank;
        this.animationFrame = 0;
        this.frames = 0;
        this.isExploding = false;
        this.isDestroyed = false;
    }

    get sprite() {
        return this.sprites[this.animationFrame];
    }

    _animate(frameDelta) {
        this.frames += frameDelta;

        if (!this.isExploding && !this.isDestroyed) {
            return;
        }

        if (this.animationFrame === 4) {
            this.isDestroyed = true;
        } else if (this.frames > 30) {
            this.animationFrame += 1;
            this.frames = 0;
        }
    }

    _move(world) {
        const axis = getAxisForDirection(this.direction);
        const value = getValueForDirection(this.direction);
        const delta = value * this.speed;

        if (this.isDestroyed) {
            this.tank.bullet = null;
            world.bullets = world.bullets.filter((b) => b !== this);
        } else {
            this[axis] += delta;

            const isOutOfBounds = world.isOutOfBounds(this);
            const hasCollision = world.hasCollision(this);

            if (isOutOfBounds || hasCollision) {
                this.speed = 0;
                this.isExploding = true;
            }
        }
    }

    update(world, _, frameDelta) {
        this._move(world);
        this._animate(frameDelta);
    }
}
