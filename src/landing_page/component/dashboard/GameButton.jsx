import React from 'react';

const GameButton = ({ label, onClick, danger }) => (
    <button
        className={`neon-button ${danger ? 'logout-btn' : ''}`}
        onClick={onClick}
    >
        {label}
    </button>
);

export default GameButton;
