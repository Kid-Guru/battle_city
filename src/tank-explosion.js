import {TANK_EXPLOSION_WIDTH, TANK_EXPLOSION_HEIGHT, TANK_EXPLOSION_SPEED, TANK_EXPLOSION_SPRITES} from "./constants.js";
import Explosion from "./explosion";

export default class TankExplosion extends Explosion {
    constructor(arguments_) {
        super(arguments_);

        this.width = TANK_EXPLOSION_WIDTH;
        this.height = TANK_EXPLOSION_HEIGHT;
        this.speed = TANK_EXPLOSION_SPEED;
        this.sprites = TANK_EXPLOSION_SPRITES;
    }
}
