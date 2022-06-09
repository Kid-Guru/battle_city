import Base from "./base";
import BrickWall from "./brick-wall";
import EventEmitter from "./event-emitter";
import {STAGE_SIZE, TerrainType, TILE_SIZE} from "./constants";
import EnemyTank from "./enemy-tank";
import PlayerTank from "./player-tank";
import SteelWall from "./steel-wall";

export default class Stage extends EventEmitter {
    constructor(data) {
        super();

        this.base = new Base();
        this.playerTank = new PlayerTank();
        this.enemyTanks = Stage.createEnemies(data.enemies);
        this.terrain = Stage.createTerrain(data.map);
        this.enemyTankCount = 0;
        this.enemyTankTimer = 0;
        this.enemyTankPositionIndex = 0;

        this.objects = new Set([this.base, this.playerTank, ...this.terrain]);

        this.init();
    }

    static createObject(type, arguments_) {
        switch (type) {
            case TerrainType.BRICK_WALL:
                return new BrickWall(arguments_);
            case TerrainType.STEEL_WALL:
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
                        x: index * TILE_SIZE,
                        y: index_ * TILE_SIZE,
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
        return STAGE_SIZE;
    }

    get height() {
        return STAGE_SIZE;
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

    init() {
        this.base.on("destroyed", () => {
            this.emit("gameOver");
        });

        this.playerTank.on("fire", (bullet) => {
            this.objects.add(bullet);

            bullet.on("explode", (explosion) => {
                this.objects.add(explosion);

                explosion.on("destroyed", () => {
                    this.objects.delete(explosion);
                });
            });

            bullet.on("destroyed", () => {
                this.objects.delete(bullet);
            });
        });

        this.playerTank.on("destroyed", (tank) => {
            this.objects.delete(tank);
        });

        this.enemyTanks.map((enemyTank) => {
            enemyTank.on("fire", (bullet) => {
                this.objects.add(bullet);

                bullet.on("explode", (explosion) => {
                    this.objects.add(explosion);

                    explosion.on("destroyed", () => {
                        this.objects.delete(explosion);
                    });
                });

                bullet.on("destroyed", () => {
                    this.objects.delete(bullet);
                });
            });

            enemyTank.on("explode", (explosion) => {
                this.objects.add(explosion);

                explosion.on("destroyed", () => {
                    this.objects.delete(explosion);
                });
            });

            enemyTank.on("destroyed", () => this.removeEnemyTank(enemyTank));
        });
    }

    update(input, frameDelta) {
        const state = {
            input,
            frameDelta,
            world: this,
        };

        if (this.shouldAddEnemyTank(frameDelta)) {
            this.addEnemyTank();
        }

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
        const collisionObjects = this.getCollisionObjects(object);

        if (collisionObjects.size > 0) {
            return {objects: collisionObjects};
        }
    }

    getCollisionObjects(object) {
        const objects = new Set();

        for (const other of this.objects) {
            if (other !== object && this.haveCollision(object, other)) {
                objects.add(other);
            }
        }

        return objects;
    }

    haveCollision(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }

    removeWall() {}

    shouldAddEnemyTank(frameDelta) {
        this.enemyTankTimer += frameDelta;

        return this.enemyTankTimer > 1000 && this.enemyTankCount < 4;
    }

    addEnemyTank() {
        const tank = this.enemyTanks.shift();

        if (tank) {
            tank.setPosition(this.enemyTankPositionIndex);

            this.enemyTankCount += 1;
            this.enemyTankTimer = 0;
            this.enemyTankPositionIndex = (this.enemyTankPositionIndex + 1) % 3;

            this.objects.add(tank);
        }
    }

    removeEnemyTank(enemyTank) {
        this.objects.delete(enemyTank);
        this.enemyTankCount -= 1;
    }
}
