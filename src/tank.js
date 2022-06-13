import Bullet from "./bullet";
import {
    Direction,
    TANK_EXPLOSION_HEIGHT,
    TANK_EXPLOSION_WIDTH,
    TANK_HEIGHT,
    TANK_SPEED,
    TANK_TURN_THRESHOLD,
    TANK_WIDTH,
    TILE_SIZE,
} from "./constants.js";
import GameObject from "./game-object.js";
import TankExplosion from "./tank-explosion.js";
export default class Tank extends GameObject {
    constructor(arguments_) {
        super(arguments_);

        this.width = TANK_WIDTH;
        this.height = TANK_HEIGHT;
        this.speed = TANK_SPEED;
        this.bulletSpeed = 4;
        this.bullet = null;
        this.explosion = null;
    }

    get sprite() {
        return this.sprites[this.direction * 2 + this.animationFrame];
    }

    get isExploding() {
        return Boolean(this.explosion?.isExploding);
    }

    turn(direction) {
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

    _move(axis, value) {
        this[axis] += value * this.speed;
    }

    fire() {
        if (!this.bullet) {
            const [x, y] = this.getBulletStartingPosition();

            this.bullet = new Bullet({
                x,
                y,
                tank: this,
                direction: this.direction,
                speed: this.bulletSpeed,
            });

            this.bullet.on("destroyed", () => {
                this.bullet = null;
            });

            this.emit("fire", this.bullet);
        }
    }

    hit() {
        this.explode();
        this.destroy();
    }

    explode() {
        if (this.isExploding) return;

        const [x, y] = this.getExplosionStartingPosition();

        this.explosion = new TankExplosion({x, y});
        this.emit("explode", this.explosion);
    }

    destroy() {
        this.isDestroyed = true;
        this.bullet = null;
        this.explosion = null;
        this.emit("destroyed", this);
    }

    animate(frameDelta) {
        this.frames += frameDelta;

        if (this.frames > 20) {
            this.animationFrame ^= 1;
            this.frames = 0;
        }
    }

    getBulletStartingPosition() {
        switch (this.direction) {
            case Tank.Direction.UP:
                return [this.left + 10, this.top];
            case Tank.Direction.RIGHT:
                return [this.right - 8, this.top + 12];
            case Tank.Direction.DOWN:
                return [this.left + 10, this.bottom - 8];
            case Tank.Direction.LEFT:
                return [this.left, this.top + 12];
        }
    }

    getExplosionStartingPosition() {
        return [this.left - TANK_EXPLOSION_WIDTH * 0.25, this.top - TANK_EXPLOSION_HEIGHT * 0.25];
    }
}
