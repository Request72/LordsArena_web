import React, { useEffect } from 'react';
import PhaserGame from '../../../PhaserGame.js';

const GameRoom = () => {
  useEffect(() => {
    const gameInstance = new PhaserGame();

    return () => {
      gameInstance.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default GameRoom;
