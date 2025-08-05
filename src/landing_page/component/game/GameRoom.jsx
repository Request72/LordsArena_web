import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainScene from './MainScene';

const GameRoom = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-container',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [MainScene],
        callbacks: {
          preBoot: function (game) {
            // Ensure proper cleanup
            game.events.on('destroy', () => {
              if (game.scene && game.scene.scenes) {
                game.scene.scenes.forEach(scene => {
                  if (scene && scene.events) {
                    scene.events.removeAllListeners();
                  }
                });
              }
            });
          }
        }
      });
    }

    return () => {
      if (gameRef.current) {
        try {
          // Safely destroy the game
          const game = gameRef.current;
          if (game.scene && game.scene.scenes) {
            game.scene.scenes.forEach(scene => {
              if (scene && scene.events) {
                scene.events.removeAllListeners();
              }
            });
          }
          game.destroy(true);
        } catch (error) {
          console.error('Error destroying game:', error);
        }
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100%', height: '100vh' }} />;
};

export default GameRoom;
