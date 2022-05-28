import Base from "./base";
import BrickWall from "./brick-wall";
import * as constants from "./constants";
import EnemyTank from "./enemy-tank";
import PlayerTank from "./player-tank";
import SteelWall from "./steel-wall";

export default class Stage {
    constructor(data) {
        this.objects = new Set([new Base(), new PlayerTank(), ...Stage.createTerrain(data.map)]);
    }

    static TerrainType = {
        BRICK_WALL: 1,
        STEEL_WALL: 2,
        TREE: 3,
        WATER: 4,
        ICE: 5,
    };

    static createObject(type, arguments_) {
        switch (type) {
            case Stage.TerrainType.BRICK_WALL:
                return new BrickWall(arguments_);
            case Stage.TerrainType.STEEL_WALL:
                return new SteelWall(arguments_);
        }
    }

    static createTerrain(map) {
        const objects = [];

        for (let index = 0; index < map.length; index++) {
            for (const [index_, element] of map.entries()) {
                const value = element[index];

                if (value) {
                    const object = Stage.createObject(value, {
                        x: index * constants.TILE_SIZE,
                        y: index_ * constants.TILE_SIZE,
                    });

                    objects.push(object);
                }
            }
        }

        return objects;
    }

    static createEnemies(types) {
        return types.map((type) => new EnemyTank({type}));
    }

    get width() {
        return constants.STAGE_SIZE;
    }

    get height() {
        return constants.STAGE_SIZE;
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

    update(input, frameDelta) {
        const state = {
            input,
            frameDelta,
            world: this,
        };

        this.objects.forEach((object) => object.update(state));
    }

    isOutOfBounds(object) {
        return object.top < this.top || object.right > this.right || object.bottom > this.bottom || object.left < this.left;
    }

    hasCollision(object) {
        const collision = this.getCollision(object);

        return Boolean(collision);
    }

    getCollision(object) {
        const collisionObjects = this._getCollisionObjects(object);

        if (collisionObjects.size > 0) {
            return {objects: collisionObjects};
        }
    }

    _getCollisionObjects(object) {
        const objects = new Set();

        for (const other of this.objects) {
            if (other !== object && this._haveCollision(object, other)) {
                objects.add(other);
            }
        }

        return objects;
    }

    _haveCollision(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }
}
