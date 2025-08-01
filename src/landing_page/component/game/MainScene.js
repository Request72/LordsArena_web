import Phaser from 'phaser';
import { socket } from './socket';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.players = {};
        this.healthBars = {};
        this.names = {};
    }

    preload() {
        this.load.image('background', '/assets/images/warzone.png');
        this.load.image('bullet', '/assets/images/bullet.png');
        this.load.image('kp', '/assets/images/kp.png');
        this.load.image('sher', '/assets/images/sher.png');
        this.load.image('prachanda', '/assets/images/prachanda.png');
        this.load.audio('bgMusic', '/assets/audio/background.mp3');
        this.load.audio('shoot', '/assets/audio/bullet.wav');
        this.load.audio('hit', '/assets/audio/hit.wav');
    }

    create() {
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-1);
        this.bg.setDisplaySize(this.scale.width, this.scale.height); // 🔥 scale background to full

        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.3 });
        this.bgMusic.play();

        this.shootSound = this.sound.add('shoot', { volume: 0.5 });
        this.hitSound = this.sound.add('hit', { volume: 0.5 });

        this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bullets = this.physics.add.group();

        socket.emit('join-room', this.roomId);

        socket.on('init-player', ({ id, x, y, character, username }) => {
            this.myId = id;
            this.spawnPlayer(id, x, y, character, username);
            this.cameras.main.startFollow(this.players[id]);
        });

        socket.on('player-joined', ({ id, x, y, character, username }) => {
            if (!this.players[id]) this.spawnPlayer(id, x, y, character, username);
        });

        socket.on('player-moved', ({ id, x, y }) => {
            if (this.players[id]) {
                this.players[id].setPosition(x, y);
                this.healthBars[id].setPosition(x - 25, y - 40);
                this.names[id].setPosition(x, y - 60);
            }
        });

        socket.on('player-disconnected', (id) => {
            if (this.players[id]) {
                this.players[id].destroy();
                this.healthBars[id].destroy();
                this.names[id].destroy();
                delete this.players[id];
                delete this.healthBars[id];
                delete this.names[id];
            }
        });

        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.destroy();
        });

        // 🔥 Fullscreen Resize Background
        this.scale.on('resize', (gameSize) => {
            this.bg.setDisplaySize(gameSize.width, gameSize.height);
        });
    }

    spawnPlayer(id, x, y, character, username) {
        const player = this.physics.add.sprite(x, y, character);
        this.players[id] = player;

        const healthBar = this.add.graphics();
        healthBar.fillStyle(0xff0000, 1);
        healthBar.fillRect(x - 25, y - 40, 50, 5);
        this.healthBars[id] = healthBar;

        const nameText = this.add.text(x, y - 60, username, {
            fontSize: '14px',
            fill: '#fff',
            fontFamily: 'Arial',
        }).setOrigin(0.5);
        this.names[id] = nameText;

        player.health = 100;
    }

    update() {
        const player = this.players[this.myId];
        if (!player) return;

        const speed = 200;
        player.setVelocity(0);

        if (this.cursors.left.isDown) player.setVelocityX(-speed);
        if (this.cursors.right.isDown) player.setVelocityX(speed);
        if (this.cursors.up.isDown) player.setVelocityY(-speed);
        if (this.cursors.down.isDown) player.setVelocityY(speed);

        this.healthBars[this.myId].setPosition(player.x - 25, player.y - 40);
        this.names[this.myId].setPosition(player.x, player.y - 60);

        socket.emit('move-player', {
            roomId: this.roomId,
            x: player.x,
            y: player.y,
        });

        if (Phaser.Input.Keyboard.JustDown(this.mKey)) {
            this.bgMusic.setMute(!this.bgMusic.mute);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            const bullet = this.bullets.create(player.x + 20, player.y, 'bullet');
            bullet.setVelocityX(400);
            bullet.setCollideWorldBounds(true);
            bullet.body.onWorldBounds = true;

            this.shootSound.play();

            Object.entries(this.players).forEach(([id, enemy]) => {
                if (id !== this.myId) {
                    this.physics.add.overlap(bullet, enemy, () => {
                        if (enemy.health > 0) {
                            enemy.health -= 10;
                            this.healthBars[id].scaleX = enemy.health / 100;
                            this.hitSound.play();
                        }
                        bullet.destroy();
                    });
                }
            });
        }
    }
}