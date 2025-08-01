import React, { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './MainScene';

const GameRoom = () => {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [MainScene],
      parent: 'phaser-container',
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container" />;
};

export default GameRoom;
