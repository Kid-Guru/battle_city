import { CELL_SIZE } from './constants';
import { Tank } from "./tank";
export class World {
    _level = null;
    player1Tank = new Tank();
    player2Tank = null;
    ememyTanks = [];

    setLevel(data) {
        this.level = data.map((blocks, y) => {
            return blocks.map((block, x) => {
                return {
                    x: x * CELL_SIZE,
                    y: y * CELL_SIZE,
                    sprite: block,
                };
            });
        });
    }

    update(activeKeys) {
        this.player1Tank.update(activeKeys);
    }
}
