import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainScene from './MainScene';

const GameRoom = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [MainScene],
        parent: 'phaser-container',
      };

      gameRef.current = new Phaser.Game(config);
    }

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />;
};

export default GameRoom;
