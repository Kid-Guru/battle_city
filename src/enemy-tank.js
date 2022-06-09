import {Direction, ENEMY_TANK_SPEED, ENEMY_TANK_SPRITES, ENEMY_TANK_START_POSITIONS, ENEMY_TANK_TURN_TIMER_THRESHOLD} from "./constants";
import Tank from "./tank";
import {getAxisForDirection, getValueForDirection} from "./utils";

export default class EnemyTank extends Tank {
    constructor(arguments_) {
        super(arguments_);

        this.type = "enemyTank";
        this.direction = Direction.DOWN;
        this.x = 0;
        this.y = 0;
        this.speed = ENEMY_TANK_SPEED;
        this.sprites = ENEMY_TANK_SPRITES[0];

        this.turnTimer = 0;
    }

    static createRandom() {
        const random = Math.floor(Math.random() * 3);
        const [x, y] = ENEMY_TANK_START_POSITIONS[random];
        const sprites = ENEMY_TANK_SPRITES[0];

        return new EnemyTank({x, y, sprites});
    }

    setPosition(positionIndex) {
        this.x = ENEMY_TANK_START_POSITIONS[positionIndex][0];
        this.y = ENEMY_TANK_START_POSITIONS[positionIndex][1];
    }

    update({world, frameDelta}) {
        if (this.isDestroyed) {
            this.explode();
            this.destroy();
        }

        const direction = this.direction;
        const axis = getAxisForDirection(direction);
        const value = getValueForDirection(direction);

        this.move(axis, value);
        this.fire();
        this.animate(frameDelta);

        const isOutOfBounds = world.isOutOfBounds(this);
        const hasCollision = world.hasCollision(this);

        if (isOutOfBounds || hasCollision) {
            this.move(axis, -value);

            if (this.shouldTurn(frameDelta)) {
                this.turnRandomly();
            }
        }
    }

    hit(bullet) {
        if (bullet.isFromEnemyTank) return;

        super.hit();
    }

    shouldTurn(frameDelta) {
        this.turnTimer += frameDelta;

        return this.turnTimer > ENEMY_TANK_TURN_TIMER_THRESHOLD;
    }

    turnRandomly() {
        const randomDirection = Math.floor(Math.random() * 4);

        this.turnTimer = 0;
        this.turn(randomDirection);
    }
}
