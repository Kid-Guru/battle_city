import {BULLET_EXPLOSION_HEIGHT, BULLET_EXPLOSION_SPEED, BULLET_EXPLOSION_SPRITES, BULLET_EXPLOSION_WIDTH} from "./constants.js";
import Explosion from "./explosion.js";

export default class BulletExplosion extends Explosion {
    constructor(arguments_) {
        super(arguments_);

        this.width = BULLET_EXPLOSION_WIDTH;
        this.height = BULLET_EXPLOSION_HEIGHT;
        this.speed = BULLET_EXPLOSION_SPEED;
        this.sprites = BULLET_EXPLOSION_SPRITES;
    }
}
