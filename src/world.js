import { Tank } from "./tank";

export class World {
    grid = [];
    player1Tank = new Tank();
    player2Tank = null;
    ememyTanks = [];

    update(activeKeys) {
        this.player1Tank.update(activeKeys);
    }
}
