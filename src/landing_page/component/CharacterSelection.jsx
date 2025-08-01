import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterSelection.css';

const characters = [
    { id: 'kp', name: 'KP Warrior', image: '/assets/images/kp.png' },
    { id: 'sher', name: 'Sher Assassin', image: '/assets/images/sher.png' },
    { id: 'prachanda', name: 'Prachanda Tank', image: '/assets/images/prachanda.png' },
];

const CharacterSelection = () => {
    const [selected, setSelected] = useState('kp');
    const navigate = useNavigate();

    const handleStart = () => {
        localStorage.setItem('selectedCharacter', selected);
        navigate('/game-room'); // or socket-connected route
    };

    return (
        <div className="character-selection-container">
            <h1>Choose Your Hero</h1>
            <div className="character-grid">
                {characters.map((char) => (
                    <div
                        key={char.id}
                        className={`character-card ${selected === char.id ? 'selected' : ''}`}
                        onClick={() => setSelected(char.id)}
                    >
                        <img src={char.image} alt={char.name} />
                        <p>{char.name}</p>
                    </div>
                ))}
            </div>
            <button className="start-button" onClick={handleStart}>
                Start Game
            </button>
        </div>
    );
};

export default CharacterSelection;
