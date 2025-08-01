import Phaser from 'phaser';
import Enemy from './Enemy';
import backgroundImg from '../../../assets/images/background.png';
import bulletImg from '../../../assets/images/bullet.png';
import hitSound from '../../../assets/audio/hit.wav';
import bgMusic from '../../../assets/audio/background.mp3';
import sherImg from '../../../assets/images/sher.png';
import kpImg from '../../../assets/images/kp.png';
import prachandaImg from '../../../assets/images/prachanda.png';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.enemies = null;
        this.bullets = null;
        this.score = 0;
        this.health = 100;
        this.healthBar = null;
        this.scoreText = null;
        this.gameOver = false;
    }

    preload() {
        const loadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
        });

        this.load.on('complete', () => {
            loadingText.destroy();
        });

        this.load.image('background', backgroundImg);
        this.load.image('bullet', bulletImg);
        this.load.audio('hit', hitSound);
        this.load.audio('bgMusic', bgMusic);
        this.load.image('sher', sherImg);
        this.load.image('kp', kpImg);
        this.load.image('prachanda', prachandaImg);
    }


    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

        const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
        const avatarKey = selectedCharacter && selectedCharacter.avatar ?
            selectedCharacter.avatar.split('.')[0] :
            'kp';
        this.player = this.physics.add.sprite(400, 300, avatarKey).setScale(0.3);
        this.player.setCollideWorldBounds(true);

        this.bullets = this.physics.add.group();
        this.input.on('pointerdown', this.shootBullet, this);

        this.enemies = this.physics.add.group();
        this.time.addEvent({ delay: 2000, callback: this.spawnEnemy, callbackScope: this, loop: true });

        this.healthBar = this.add.rectangle(100, 30, 200, 20, 0xff0000).setScrollFactor(0);
        this.scoreText = this.add.text(16, 50, 'Score: 0', { fontSize: '18px', fill: '#fff' }).setScrollFactor(0);

        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerHit, null, this);
        this.scoreboard = this.add.text(this.scale.width / 2, 10, 'Kills: 0', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Orbitron',
        }).setOrigin(0.5, 0).setScrollFactor(0);

        this.sound.add('hit');
        const music = this.sound.add('bgMusic', { loop: true });
        music.play();



        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreboardText = this.add.text(this.scale.width - 200, 30, 'Kills: 0', {
            fontSize: '18px',
            fill: '#ffffff',
        }).setScrollFactor(0);

    }

    update() {
        if (this.gameOver) return;

        const speed = 200;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
    }

    shootBullet(pointer) {
        if (this.gameOver) return;
        const bullet = this.bullets.create(this.player.x, this.player.y, 'bullet').setScale(0.03);
        this.physics.moveTo(bullet, pointer.x, pointer.y, 500);
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(0, this.scale.width);
        const y = Phaser.Math.Between(0, this.scale.height);
        const enemyObj = new Enemy(this, x, y, 'sher');
        this.enemies.add(enemyObj.sprite);
    }

    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.hp -= 1;
        if (enemy.hp <= 0) {
            this.sound.play('hit');
            enemy.destroy();
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);
            this.scoreboardText.setText(`Kills: ${this.enemies.getChildren().length}`);
            this.health += 5;
            this.killCount = (this.killCount || 0) + 1;
            this.scoreboard.setText(`Kills: ${this.killCount}`);


        }
    }

    playerHit(player, enemy) {
        enemy.destroy();
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

        setTimeout(() => {
            this.scene.restart();
        }, 4000);
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