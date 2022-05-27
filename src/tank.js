import {Direction, Keys, TILE_SIZE, TANK_TURN_THRESHOLD, BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPRITES, BULLET_SPEED} from "./constants.js";
import {getDirectionForKeys, getAxisForDirection, getValueForDirection} from "./utils.js";
import GameObject from "./game-object.js";
import Bullet from "./bullet";
export default class Tank extends GameObject {
    constructor({direction, speed, ...rest}) {
        super(rest);

        this.direction = direction;
        this.speed = speed;
        this.isFiring = false;
        this.bullet = null;
        this.frames = 0;
    }

    get sprite() {
        return this.sprites[this.direction * 2 + this.animationFrame];
    }

    update(world, activeKeys, frameDelta) {
        if (activeKeys.has(Keys.UP) || activeKeys.has(Keys.RIGHT) || activeKeys.has(Keys.DOWN) || activeKeys.has(Keys.LEFT)) {
            const direction = getDirectionForKeys(activeKeys);

            this._turn(world, direction);
            this._move(world, direction);
            this._animate(frameDelta);
        }

        if (activeKeys.has(Keys.SPACE)) {
            this._fire(world);
        }
    }

    _turn(world, direction) {
        const previousDirection = this.direction;
        this.direction = direction;

        if (direction === Direction.UP || direction === Direction.DOWN) {
            if (previousDirection === Direction.RIGHT) {
                const value = TILE_SIZE - (this.x % TILE_SIZE);

                if (value <= TANK_TURN_THRESHOLD) {
                    this.x += value;
                }
            } else if (previousDirection === Direction.LEFT) {
                const value = this.x % TILE_SIZE;

                if (value <= TANK_TURN_THRESHOLD) {
                    this.x -= value;
                }
            }
        } else {
            if (previousDirection === Direction.UP) {
                const value = this.y % TILE_SIZE;

                if (value <= TANK_TURN_THRESHOLD) {
                    this.y -= value;
                }
            } else if (previousDirection === Direction.DOWN) {
                const value = TILE_SIZE - (this.y % TILE_SIZE);

                if (value <= TANK_TURN_THRESHOLD) {
                    this.y += value;
                }
            }
        }
    }

    _move(world, direction) {
        const axis = getAxisForDirection(direction);
        const value = getValueForDirection(direction);
        const delta = value * this.speed;

        this[axis] += delta;

        const isOutOfBounds = world.isOutOfBounds(this);
        const hasCollision = world.hasCollision(this);

        if (isOutOfBounds || hasCollision) {
            this[axis] += -delta;
        }
    }

    _fire(world) {
        if (!this.bullet) {
            const bullet = new Bullet({
                x: this.x,
                y: this.y,
                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                direction: this.direction,
                speed: BULLET_SPEED,
                sprites: BULLET_SPRITES,
                tank: this,
            });
            this.bullet = bullet;
            world.bullets.push(bullet);
        }
    }

    _animate(frameDelta) {
        this.frames += frameDelta;

        if (this.frames > 20) {
            this.animationFrame ^= 1;
            this.frames = 0;
        }
    }
}
