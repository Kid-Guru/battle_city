import {BRICK_WALL_SPRITES, Direction} from "./constants";
import Wall from "./wall";

const BRICK_WALL_SPRITE_MAP = {
    0: 0,
    1: 1,
    2: 2,
    4: 3,
    8: 4,
};
export default class BrickWall extends Wall {
    constructor(arguments_) {
        super(arguments_);

        this.sprites = BRICK_WALL_SPRITES;
        this.state = 0b0000;
        this.isDestructable = true;
        this.isDestroyed = false;
        this.lastHitDirection = -1;
    }

    get sprite() {
        return this.sprites[BRICK_WALL_SPRITE_MAP[this.state]];
    }

    update({world}) {
        if (this.isDestroyed) {
            world.objects.delete(this);
        }
    }

    hit(bullet) {
        if (this.isDestroyed) return;

        this.damage += 1;

        if (this.damage === 2) {
            this.isDestroyed = true;
        }

        switch (bullet.direction) {
            case Direction.UP:
                this.state = this.state | 0b1000;
                break;
            case Direction.RIGHT:
                this.state = this.state | 0b0001;
                break;
            case Direction.DOWN:
                this.state = this.state | 0b0010;
                break;
            case Direction.LEFT:
                this.state = this.state | 0b0100;
                break;
        }
    }
}
