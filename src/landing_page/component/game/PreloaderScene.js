import Phaser from 'phaser';
import backgroundImg from '../../assets/images/background.png';
import loadingSound from '../../assets/audio/loading.wav';

class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        this.load.image('background', backgroundImg);
        this.load.audio('loadingSound', loadingSound);

        const width = this.scale.width;
        const height = this.scale.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: { font: '20px Orbitron', fill: '#ffffff' },
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('complete', () => {
            this.sound.play('loadingSound');
            this.scene.start('MainScene');
        });
    }

    create() {}
}

export default PreloaderScene;