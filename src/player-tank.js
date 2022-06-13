import {Direction, Key, PLAYER1_TANK_POSITION, PLAYER1_TANK_SPRITES, TANK_SPEED} from "./constants";
import Tank from "./tank";

export default class PlayerTank extends Tank {
    constructor(arguments_) {
        super(arguments_);

        this.type = "playerTank";
        this.x = PLAYER1_TANK_POSITION[0];
        this.y = PLAYER1_TANK_POSITION[1];
        this.direction = Direction.UP;
        this.speed = TANK_SPEED;
        this.sprites = PLAYER1_TANK_SPRITES;
    }

    update({input, frameDelta, world}) {
        if (input.has(Key.UP, Key.RIGHT, Key.DOWN, Key.LEFT)) {
            const direction = Tank.getDirectionForKeys(input.keys);
            const axis = Tank.getAxisForDirection(direction);
            const value = Tank.getValueForDirection(direction);

            this.turn(direction);
            this.move(axis, value);
            this.animate(frameDelta);

            const isOutOfBounds = world.isOutOfBounds(this);
            const hasCollision = world.hasCollision(this);

            if (isOutOfBounds || hasCollision) {
                this.move(axis, -value);
            }
        }

        if (input.keys.has(Key.SPACE)) {
            this.fire();
        }
    }
}
