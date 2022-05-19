export class Game {
    constructor({ world, view, levels }) {
        this.world = world;
        this.view = view;
        this.levels = levels;
        this.level = 0;

        this.activeKeys = new Set();

        this.loop = this.loop.bind(this);
    }

    init() {
        this.world.setLevel(this.levels[this.level]);

        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                    event.preventDefault();
                    this.activeKeys.add(event.code);
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.code) {
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                    event.preventDefault();
                    this.activeKeys.delete(event.code);
            }
        });
    }

    start() {
        requestAnimationFrame(this.loop);
    }

    loop() {
        this.world.update(this.activeKeys);
        this.view.update(this.world);

        requestAnimationFrame(this.loop);
    }
}
