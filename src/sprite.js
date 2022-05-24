export default class Sprite {
    constructor(spriteImg) {
        this.img = spriteImg;
        this.image = new Image();
        this.image.src = spriteImg;
    }
}
