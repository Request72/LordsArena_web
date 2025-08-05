import Phaser from 'phaser';
import Enemy from './Enemy';
import backgroundMusic from '../../../assets/audio/background.mp3';
import kpImg from '../../../assets/images/kp.png';
import sherImg from '../../../assets/images/sher.png';
import prachandaImg from '../../../assets/images/prachanda.png';
import bulletImg from '../../../assets/images/bullet.png';
import backgroundImg from '../../../assets/images/background.png';
import hitSound from '../../../assets/audio/hit.wav';

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.player = null;
        this.health = 100;
        this.score = 0;
        this.gameOver = false;
        this.enemyInstances = []; // Store enemy instances
        this.isDestroyed = false;
    }

    preload() {
        this.load.image('background', backgroundImg);
        this.load.image('bullet', bulletImg);
        this.load.audio('hit', hitSound);
        this.load.audio('bgMusic', backgroundMusic);
        this.load.image('kp', kpImg);
        this.load.image('sher', sherImg);
        this.load.image('prachanda', prachandaImg);
    }

    create() {
        if (this.isDestroyed) return;

        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);
        const character = JSON.parse(localStorage.getItem('selectedCharacter'));
        const avatarKey = character ? character.avatar.split('/').pop().split('.')[0] : 'kp';

        this.player = this.physics.add.sprite(400, 300, avatarKey).setScale(0.3).setCollideWorldBounds(true);
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();

        this.healthBar = this.add.rectangle(100, 30, 200, 20, 0xff0000).setScrollFactor(0);
        this.scoreText = this.add.text(16, 50, 'Score: 0', { fontSize: '18px', fill: '#fff' }).setScrollFactor(0);

        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerHit, null, this);
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();

        this.input.on('pointerdown', this.shootBullet, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({ delay: 2000, callback: this.spawnEnemy, callbackScope: this, loop: true });

        this.sound.add('hit');
    }

    update() {
        if (this.gameOver || this.isDestroyed) return;

        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-200);
        else if (this.cursors.right.isDown) this.player.setVelocityX(200);
        if (this.cursors.up.isDown) this.player.setVelocityY(-200);
        else if (this.cursors.down.isDown) this.player.setVelocityY(200);

        // Update all enemy instances
        this.enemyInstances.forEach(enemy => {
            if (enemy && enemy.sprite && enemy.sprite.active) {
                enemy.update();
            }
        });

        // Clean up destroyed enemies
        this.enemyInstances = this.enemyInstances.filter(enemy =>
            enemy && enemy.sprite && enemy.sprite.active
        );
    }

    shootBullet(pointer) {
        if (this.gameOver || this.isDestroyed) return;
        const bullet = this.bullets.create(this.player.x, this.player.y, 'bullet').setScale(0.03);
        this.physics.moveTo(bullet, pointer.x, pointer.y, 500);
    }

    spawnEnemy() {
        if (this.isDestroyed) return;
        const x = Phaser.Math.Between(0, this.scale.width);
        const y = Phaser.Math.Between(0, this.scale.height);
        const enemy = new Enemy(this, x, y, 'sher');
        this.enemies.add(enemy.sprite);
        this.enemyInstances.push(enemy);
    }

    hitEnemy(bullet, enemySprite) {
        bullet.destroy();

        // Find the enemy instance that corresponds to this sprite
        const enemyInstance = this.enemyInstances.find(enemy => enemy.sprite === enemySprite);

        if (enemyInstance) {
            enemyInstance.hp -= 1;
            if (enemyInstance.hp <= 0) {
                this.sound.play('hit');
                enemyInstance.destroy();
                this.enemyInstances = this.enemyInstances.filter(e => e !== enemyInstance);
                this.score += 10;
                this.scoreText.setText(`Score: ${this.score}`);
            }
        }
    }

    playerHit(player, enemySprite) {
        // Find the enemy instance that corresponds to this sprite
        const enemyInstance = this.enemyInstances.find(enemy => enemy.sprite === enemySprite);

        if (enemyInstance) {
            enemyInstance.destroy();
            this.enemyInstances = this.enemyInstances.filter(e => e !== enemyInstance);
        }

        this.health -= 25;
        this.healthBar.width = Math.max(0, (this.health / 100) * 200);
        if (this.health <= 0) this.handleGameOver();
    }

    handleGameOver() {
        this.gameOver = true;
        this.player.setTint(0xff0000);
        this.physics.pause();
        this.add.text(this.scale.width / 2 - 100, this.scale.height / 2, '💀 Game Over 💀', {
            fontSize: '32px',
            fill: '#fff',
        });
        this.sendScoreToBackend(this.score);

        // Clean up before restart
        this.cleanupGame();

        setTimeout(() => {
            try {
                this.scene.restart();
            } catch (error) {
                console.error('Scene restart error:', error);
                // Fallback: reload the page
                window.location.reload();
            }
        }, 4000);
    }

    cleanupGame() {
        // Clean up all enemies
        this.enemyInstances.forEach(enemy => {
            if (enemy && enemy.sprite) {
                enemy.destroy();
            }
        });
        this.enemyInstances = [];

        // Clean up bullets
        if (this.bullets) {
            this.bullets.clear(true, true);
        }

        // Clean up enemies group
        if (this.enemies) {
            this.enemies.clear(true, true);
        }

        // Stop background music
        if (this.bgMusic) {
            this.bgMusic.stop();
        }

        // Remove event listeners
        if (this.input) {
            this.input.off('pointerdown', this.shootBullet, this);
        }
    }

    sendScoreToBackend(score) {
        const username = localStorage.getItem('username') || 'anonymous';
        fetch('http://localhost:5000/api/game/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, score }),
        }).catch(err => console.error('Failed to send score:', err));
    }
}

export default MainScene;