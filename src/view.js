import {NUMBER_OF_UNITS, UNIT_SIZE, TILE_SIZE} from "./constants.js";

const PLAYFIELD_X = UNIT_SIZE;
const PLAYFIELD_Y = UNIT_SIZE;
const PLAYFIELD_WIDTH = NUMBER_OF_UNITS * UNIT_SIZE;
const PLAYFIELD_HEIGHT = NUMBER_OF_UNITS * UNIT_SIZE;
const PANEL_X = PLAYFIELD_X + PLAYFIELD_WIDTH;
const PANEL_Y = PLAYFIELD_Y;
// const PANEL_WIDTH = PANEL_X + UNIT_SIZE * 2;
const PANEL_HEIGHT = PANEL_Y + PLAYFIELD_HEIGHT;

export default class View {
    constructor(canvas, sprite) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.sprite = sprite;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    update(stage, player1, player2) {
        this.clearScreen();
        this.renderStage(stage);
        this.renderPanel(stage, player1, player2);
        this.renderGrid();
    }

    renderStage(stage) {
        this.context.fillStyle = "#636363";
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = "#000000";
        this.context.fillRect(PLAYFIELD_X, PLAYFIELD_Y, PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT);

        for (const object of stage.objects) {
            const {x, y, width, height, sprite, debug} = object;

            if (!sprite) return;

            this.context.drawImage(this.sprite.image, ...sprite, PLAYFIELD_X + x, PLAYFIELD_Y + y, width, height);

            if (debug) {
                this.context.strokeStyle = "#ff0000";
                this.context.lineWidth = 2;
                this.context.strokeRect(x + 1, y + 1, width - 2, height - 2);
                object.debug = false;
            }
        }
    }

    renderPanel(stage, player1) {
        this.renderEnemyTankIcons(stage.enemyTanks);
        this.renderPlayer1Lives(player1);
        this.renderStageNumber(stage);
    }

    renderGrid() {
        for (let y = 0; y < NUMBER_OF_UNITS; y++) {
            for (let x = 0; x < NUMBER_OF_UNITS; x++) {
                this.context.strokeStyle = "#ffffff";
                this.context.lineWidth = 0.2;
                this.context.strokeRect(PLAYFIELD_X + (x * UNIT_SIZE + 1), PLAYFIELD_Y + (y * UNIT_SIZE + 1), UNIT_SIZE - 2, UNIT_SIZE - 2);
            }
        }

        for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
            for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
                this.context.strokeStyle = "#ffffff";
                this.context.lineWidth = 0.1;
                this.context.strokeRect(PLAYFIELD_X + (x * TILE_SIZE + 1), PLAYFIELD_Y + (y * TILE_SIZE + 1), TILE_SIZE - 2, TILE_SIZE - 2);
            }
        }
    }

    renderEnemyTankIcons(enemyTanks) {
        this.context.fillStyle = "#000000";

        for (let index = 0, x = 0, y = 0; index < enemyTanks.length; index++) {
            this.context.drawImage(
                this.sprite.image,
                UNIT_SIZE * 18,
                UNIT_SIZE * 5.75,
                TILE_SIZE,
                TILE_SIZE,
                PANEL_X + x * TILE_SIZE + 16,
                PANEL_Y + y * TILE_SIZE + 16,
                TILE_SIZE,
                TILE_SIZE
            );

            if (x === 1) {
                x = 0;
                y++;
            } else {
                x++;
            }
        }
    }

    renderPlayer1Lives() {
        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 8.5,
            UNIT_SIZE,
            TILE_SIZE,
            PANEL_X + TILE_SIZE,
            PANEL_Y + PANEL_HEIGHT * 0.5,
            UNIT_SIZE,
            TILE_SIZE
        );

        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 9,
            TILE_SIZE,
            TILE_SIZE,
            PANEL_X + TILE_SIZE,
            PANEL_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 19.5,
            UNIT_SIZE * 5.25,
            TILE_SIZE,
            TILE_SIZE,
            PANEL_X + TILE_SIZE * 2,
            PANEL_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );
    }

    renderStageNumber() {
        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 11.5,
            UNIT_SIZE,
            UNIT_SIZE,
            PANEL_X + TILE_SIZE,
            PANEL_Y + PANEL_HEIGHT * 0.75,
            UNIT_SIZE,
            UNIT_SIZE
        );

        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 19.5,
            UNIT_SIZE * 5.25,
            TILE_SIZE,
            TILE_SIZE,
            PANEL_X + TILE_SIZE * 2,
            PANEL_Y + PANEL_HEIGHT * 0.75 + UNIT_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
