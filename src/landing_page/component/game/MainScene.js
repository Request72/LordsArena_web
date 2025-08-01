import Phaser from 'phaser';
import backgroundImage from '../../../assets/images/background.png';
import bulletImage from '../../../assets/images/bullet.png';
import hitSound from '../../../assets/audio/hit.wav';
import backgroundMusic from '../../../assets/audio/background.mp3';
import sherImg from '../../../assets/images/sher.png';
import kpImg from '../../../assets/images/kp.png';
import prachandaImg from '../../../assets/images/prachanda.png';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.enemy = null;
        this.enemySpeed = 100;
        this.enemyHealth = 100;
    }

    preload() {
        this.load.image('bg', backgroundImage);
        this.load.image('bullet', bulletImage);
        this.load.audio('hit', hitSound);
        this.load.audio('bgm', backgroundMusic);
        this.load.image('sher', sherImg);
        this.load.image('kp', kpImg);
        this.load.image('prachanda', prachandaImg);
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const selectedCharacter = localStorage.getItem('selectedCharacter') || 'sher';
        this.player = this.physics.add.sprite(200, 300, selectedCharacter).setScale(0.4).setCollideWorldBounds(true);

        this.enemy = this.physics.add.sprite(800, 300, 'prachanda').setScale(0.4).setCollideWorldBounds(true);

        this.enemyHealthBar = this.add.graphics();
        this.drawEnemyHealth();

        this.bullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.hitSound = this.sound.add('hit');
        this.bgm = this.sound.add('bgm', { loop: true, volume: 0.3 });
        this.bgm.play();

        this.lastFired = 0;
        this.enemyLastShot = 0;

        this.physics.add.collider(this.bullets, this.enemy, this.handleEnemyHit, null, this);
        this.physics.add.collider(this.enemyBullets, this.player, this.handlePlayerHit, null, this);
    }

    update(time) {
        // Player movement
        const speed = 200;
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.player.setVelocityY(speed);

        // Player shooting
        if (this.shootKey.isDown && time > this.lastFired) {
            const bullet = this.bullets.create(this.player.x + 20, this.player.y, 'bullet');
            bullet.setVelocityX(400);
            this.lastFired = time + 400;
        }

        // Simple Enemy AI
        if (this.enemy && this.enemyHealth > 0) {
            this.physics.moveToObject(this.enemy, this.player, this.enemySpeed);

            const dist = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);
            if (dist < 300 && time > this.enemyLastShot) {
                const bullet = this.enemyBullets.create(this.enemy.x - 20, this.enemy.y, 'bullet');
                this.physics.moveToObject(bullet, this.player, 300);
                this.enemyLastShot = time + 1000;
            }
        }
    }

    handleEnemyHit(bullet, enemy) {
        bullet.destroy();
        this.enemyHealth -= 10;
        this.hitSound.play();
        this.drawEnemyHealth();

        if (this.enemyHealth <= 0) {
            this.enemy.destroy();
        }
    }

    handlePlayerHit(player, bullet) {
        bullet.destroy();
        this.hitSound.play();

    }

    drawEnemyHealth() {
        this.enemyHealthBar.clear();
        this.enemyHealthBar.fillStyle(0xff0000);
        this.enemyHealthBar.fillRect(this.enemy.x - 25, this.enemy.y - 50, 50 * (this.enemyHealth / 100), 6);
    }
}