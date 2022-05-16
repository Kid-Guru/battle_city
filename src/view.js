export class View {
    constructor(canvas, sprite) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext("2d");
    }

    update(world) {
        this.clearScreen();
        this.renderPlayer1Tank(world.player1Tank);
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

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
