import {TANK_EXPLOSION_ANIMATION_SPEED, TANK_EXPLOSION_HEIGHT, TANK_EXPLOSION_SPRITES, TANK_EXPLOSION_WIDTH} from "./constants.js";
import Explosion from "./explosion";

export default class TankExplosion extends Explosion {
    constructor(arguments_) {
        super(arguments_);

        this.width = TANK_EXPLOSION_WIDTH;
        this.height = TANK_EXPLOSION_HEIGHT;
        this.sprites = TANK_EXPLOSION_SPRITES;
        this.animationSpeed = TANK_EXPLOSION_ANIMATION_SPEED;
    }
}
