export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 50;
        this.health = 100;
        this.lastDirectionChange = 0;
    }

    update(player) {
        if (!player || !player.x || !player.y) return;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        const time = this.scene.time.now;

        // Chase if close
        if (distance < 300) {
            this.scene.physics.moveToObject(this, player, this.speed);
        } else {
            // Wander around every 2 seconds
            if (time - this.lastDirectionChange > 2000) {
                const angle = Phaser.Math.Between(0, 360);
                this.setVelocity(
                    Math.cos(angle) * this.speed,
                    Math.sin(angle) * this.speed
                );
                this.lastDirectionChange = time;
            }
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
        }
    }
}