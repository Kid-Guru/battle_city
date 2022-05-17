import { CELL_SIZE } from '../src/constants';

export default {
    0: [22 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // empty
    1: [16 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // full wall
    2: [17 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // right wall
    3: [18 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // bottom wall
    4: [19 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // left wall
    5: [20 * CELL_SIZE, 0 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // top wall
    10: [20 * CELL_SIZE, 1 * CELL_SIZE, CELL_SIZE, CELL_SIZE],

    // Player1Tank
    11: [0 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // top
    12: [1 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
    13: [6 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // right
    14: [7 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
    15: [4 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // bottom
    16: [5 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
    17: [2 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // left
    18: [3 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
};
