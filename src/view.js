import { CELL_SIZE } from "./constants";

export class View {
    constructor(canvas, sprite) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext("2d");
    }

    update(world) {
        this.clearScreen();
        this.renderLevel(world.level);
        this.renderPlayer1Tank(world.player1Tank);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderLevel(level) {
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j < level.length; j++) {
                const block = level[i][j];

                if (block) {
                    const [x, y, width, height] = this.sprite.get(block.sprite);

                    this.context.drawImage(
                        this.sprite.image,
                        x, y, width, height,
                        block.x, block.y, width, height
                    );

                    if (block.debug) {
                        this.context.strokeStyle = '#ffffff';
                        this.context.lineWidth = 1;
                        this.context.strokeRect(block.x + 1, block.y + 1, block.width - 2, block.height - 2);
                        block.debug = false;
                    }
                }
            }
        }
    }

    renderPlayer1Tank(player1Tank) {
        const [x, y, width, height] = player1Tank.sprite;

        this.context.drawImage(
            this.sprite.image,
            x,
            y,
            width,
            height,
            player1Tank.x,
            player1Tank.y,
            width,
            height
        );
    }
}
