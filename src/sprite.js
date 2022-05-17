export class Sprite {
    constructor(spriteImg, spriteMap) {
        this.img = spriteImg;
        this.image = new Image();
        this.image.src = spriteImg;
        this.spriteMap = spriteMap;
    }

    set(id, { x, y, width, height }) {
        this.spriteMap[id]([x, y, width, height]);
    }

    get(id) {
        return this.spriteMap[id];
    }
}
