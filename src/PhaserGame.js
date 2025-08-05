import Phaser from 'phaser';
import PreloaderScene from './PreloaderScene';
import MainScene from './MainScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-container',
    scene: [PreloaderScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
};

class PhaserGame extends Phaser.Game {
    constructor() {
        super(config);
    }
}

export default PhaserGame;