import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterSelection.css';

const characters = [
  { name: 'KP', avatar: 'kp.png', health: 100, armor: 50 },
  { name: 'Sher Bahadur', avatar: 'sher.png', health: 90, armor: 60 },
  { name: 'Prachanda', avatar: 'prachanda.png', health: 95, armor: 55 },
];

const CharacterSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (character) => {
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    navigate('/dashboard');
  };

  return (
    <div className="character-selection-container">
      <h1>Select Your Hero</h1>
      <div className="character-grid">
        {characters.map((char, index) => (
          <div key={index} className="character-card" onClick={() => handleSelect(char)}>
            <img src={`/assets/images/${char.avatar}`} alt={char.name} className="character-image" />
            <h2>{char.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
