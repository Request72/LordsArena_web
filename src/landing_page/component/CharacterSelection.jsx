import React from 'react';
import { useNavigate } from 'react-router-dom';
import kpAvatar from '../../assets/images/kp.png';
import sherAvatar from '../../assets/images/sher.png';
import prachandaAvatar from '../../assets/images/prachanda.png';
import selectSound from '../../assets/audio/select.wav';
import './CharacterSelection.css';

const characters = [
  { name: 'KP', avatar: kpAvatar, health: 100, armor: 50 },
  { name: 'Sher Bahadur', avatar: sherAvatar, health: 90, armor: 60 },
  { name: 'Prachanda', avatar: prachandaAvatar, health: 95, armor: 55 },
];

const CharacterSelection = () => {
  const navigate = useNavigate();
  const audio = new Audio(selectSound);

  const handleSelect = (character) => {
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    audio.play();
    setTimeout(() => {
      navigate('/dashboard');
    }, 300); // Delay so sound plays before routing
  };

  return (
    <div className="select-character-container">
      <h1 className="select-character-title">Choose Your Hero</h1>
      <div className="character-grid">
        {characters.map((char, index) => (
          <div key={index} className="character-card" onClick={() => handleSelect(char)}>
            <img src={char.avatar} alt={char.name} className="character-image" />
            <h2>{char.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
