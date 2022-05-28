import {ENEMY_TANK_SPRITES, ENEMY_TANK_START_POSITIONS, TANK_SPEED} from "./constants";
import Tank from "./tank";

export default class EnemyTank extends Tank {
    static createRandom() {
        const random = Math.floor(Math.random() * 3);
        const [x, y] = ENEMY_TANK_START_POSITIONS[random];
        const sprites = ENEMY_TANK_SPRITES[random];

        return new EnemyTank({x, y, sprites});
    }

    constructor(arguments_) {
        super(arguments_);

        this.direction = Tank.Direction.DOWN;
        this.speed = TANK_SPEED;
    }

    // eslint-disable-next-line no-unused-vars
    update({world, input, frameDelta}) {}
}
