import {
    CELL_SIZE,
    DIRECTION,
    PLAYER1_TANK_SPRITES,
    PLAYER1_TANK_START_X,
    PLAYER1_TANK_START_Y,
    TANK_HEIGHT,
    TANK_SPEED,
    TANK_WIDTH,
    WORLD_SIZE,
} from "./constants";
import { Tank } from "./tank";
import Wall from './wall';

export class World {
    level = null;
    player1Tank = new Tank({
        x: PLAYER1_TANK_START_X,
        y: PLAYER1_TANK_START_Y,
        width: TANK_WIDTH,
        height: TANK_HEIGHT,
        direction: DIRECTION.UP,
        speed: TANK_SPEED,
        frames: PLAYER1_TANK_SPRITES,
    });
    player2Tank = null;
    ememyTanks = [];

    get width() {
        return WORLD_SIZE;
    }

    get height() {
        return WORLD_SIZE;
    }

    get top() {
        return 0;
    }

    get right() {
        return this.width;
    }

    get bottom() {
        return this.height;
    }

    get left() {
        return 0;
    }

    setLevel(data) {
        this.level = data.map((blocks, y) => {
            return blocks.map((block, x) => {
                return block > 0
                    ? new Wall({
                          x: x * CELL_SIZE,
                          y: y * CELL_SIZE,
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          sprite: block,
                      })
                    : null;
            });
        });
    }

    isOutOfBounds(object) {
        return (
            object.top < this.top ||
            object.right > this.right ||
            object.bottom > this.bottom ||
            object.left < this.left
        );
    }

    hasCollision(object) {
        const collisionObject = this._getCollisionObject(object);

        if (collisionObject) {
            collisionObject.debug = true;
        }

        return Boolean(collisionObject);
    }

    _getCollisionObject(object) {
        return this.level
            .reduce((result, blocks) => result.concat(...blocks), [])
            .find(
                (block) => block && this._objectsHaveCollision(object, block)
            );
    }

    _objectsHaveCollision(a, b) {
        return (
            ((a.left >= b.left && a.left < b.right) ||
                (a.right > b.left && a.right <= b.right)) &&
            ((a.top >= b.top && a.top < b.bottom) ||
                (a.bottom > b.top && a.bottom <= b.bottom))
        );
    }

    update(activeKeys) {
        this.player1Tank.update(this, activeKeys);
    }
}
