const CELL_SIZE = 16;

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
                const object = level[i][j];
                const [x, y, width, height] = this.sprite.get(object.sprite);

                this.context.drawImage(
                    this.sprite.image,
                    x,
                    y,
                    width,
                    height,
                    j * CELL_SIZE,
                    i * CELL_SIZE,
                    width,
                    height
                );
            }
        }
    }

    renderPlayer1Tank(player1Tank) {
        this.context.drawImage(
            this.sprite.image,
            ...player1Tank.sprite,
            player1Tank.x,
            player1Tank.y,
            16,
            16
        );
    }
}