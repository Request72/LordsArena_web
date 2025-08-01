import Phaser from 'phaser';
import MainScene from './landing_page/component/game/MainScene';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainScene],
    backgroundColor: '#000000'
};

class PhaserGame extends Phaser.Game {
    constructor() {
        super(config);
    }
}

export default PhaserGame;