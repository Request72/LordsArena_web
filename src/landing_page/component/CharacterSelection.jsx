import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import kp from '../../assets/images/kp.png';
import sher from '../../assets/images/sher.png';
import prachanda from '../../assets/images/prachanda.png';
import selectSound from '../../assets/audio/select.wav';
import './CharacterSelection.css';

const characters = [
  { name: 'KP', avatar: kp, health: 100, armor: 50 },
  { name: 'Sher Bahadur', avatar: sher, health: 90, armor: 60 },
  { name: 'Prachanda', avatar: prachanda, health: 95, armor: 55 },
];

const CharacterSelection = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(selectSound);
  }, []);

  const handleSelect = (character) => {
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => navigate('/dashboard'), 500); // delay for sound
  };

  return (
    <div className="select-character-container">
      <h1 className="select-character-title">Choose Your Hero</h1>
      <div className="character-grid">
        {characters.map((char, index) => (
          <div key={index} className="character-card" onClick={() => handleSelect(char)}>
            <img src={char.avatar} alt={char.name} />
            <div className="character-name">{char.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
