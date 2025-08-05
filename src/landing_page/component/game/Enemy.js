class Enemy {
    constructor(scene, x, y, key = 'sher') {
        this.scene = scene;
        this.hp = 3;
        this.sprite = scene.physics.add.sprite(x, y, key).setScale(0.3);
        this.sprite.setCollideWorldBounds(true);
        this.speed = 100;
        this.updateMovement();
    }

    update() {
        if (this.sprite && this.sprite.active && this.scene.player && this.scene.player.active) {
            this.updateMovement();
        }
    }

    updateMovement() {
        if (this.sprite && this.scene.player) {
            // Calculate direction to player
            const dx = this.scene.player.x - this.sprite.x;
            const dy = this.scene.player.y - this.sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                // Normalize direction and set velocity
                const vx = (dx / distance) * this.speed;
                const vy = (dy / distance) * this.speed;
                this.sprite.setVelocity(vx, vy);
            }
        }
    }

    destroy() {
        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }
    }
}

export default Enemy;