export default class GameObject {
    constructor({x, y, width, height, sprites} = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprites = sprites;
        this.animationFrame = 0;
        this.frames = 0;
    }

    static Direction = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3,
    };

    update() {
        throw new Error("Method update should be implemented in class " + this.constructor.name);
    }

    hit() {
        throw new Error("Method hit should be implemented in class " + this.constructor.name);
    }

    get top() {
        return this.y;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }
}
