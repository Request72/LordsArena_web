export default class Enemy {
    constructor(scene, x, y, texture = 'sher') {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture).setScale(0.3);
        this.sprite.hp = 3;

        // Simple AI movement
        this.scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                if (scene.player && !scene.gameOver) {
                    this.scene.physics.moveToObject(this.sprite, scene.player, 60);
                }
            },
        });
    }
}